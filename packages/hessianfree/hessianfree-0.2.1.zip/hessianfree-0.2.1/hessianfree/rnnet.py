"""Implementation of recurrent network, including Gauss-Newton approximation
for use in Hessian-free optimization.

Author: Daniel Rasmussen (drasmussen@princeton.edu)

Based on
Martens, J., & Sutskever, I. (2011). Learning recurrent neural networks with
hessian-free optimization. Proceedings of the 28th International Conference on
Machine Learning.
"""

import numpy as np

from hessianfree import FFNet


class RNNet(FFNet):
    def __init__(self, shape, struc_damping=None, rec_layers=None,
                 W_rec_params={}, truncation=None, **kwargs):
        """Initialize the parameters of the network.

        :param struc_damping: controls scale of structural damping (relative
            to Tikhonov damping)
        :param rec_layers: by default, all layers except the first and last
            are recurrently connected. A list of booleans can be passed here
            to override that on a layer-by-layer basis.
        :param W_rec_params: weight initialization parameter dict for recurrent
            weights (passed to init_weights, see parameter descriptions there)
        :param truncation: a tuple (n,k) where backpropagation through time
            will be executed every n timesteps and run backwards for k steps
            (defaults to full backprop if None)

        See FFNet for the rest of the parameters.
        """

        # define recurrence for each layer (needs to be done before super
        # constructor because this is used in compute_offsets)
        if rec_layers is None:
            # assume all recurrent except first/last layer
            rec_layers = [False] + [True] * (len(shape) - 2) + [False]

        if len(rec_layers) != len(shape):
            raise ValueError("Must define recurrence for each layer")

        self.rec_layers = rec_layers

        # super constructor
        super(RNNet, self).__init__(shape, **kwargs)

        self.struc_damping = struc_damping
        self.truncation = truncation

        # add on recurrent weights
        if kwargs.get("load_weights", None) is None and np.any(rec_layers):
            self.W = np.concatenate(
                (self.W, self.init_weights([(self.shape[l], self.shape[l])
                                            for l in range(self.n_layers)
                                            if rec_layers[l]],
                                           **W_rec_params)))

    def forward(self, input, params, deriv=False, init_activations=None,
                init_state=None):
        """Compute activations for given input sequence and parameters.

        If deriv=True then also compute the derivative of the activations.

        If init_activations/init_state are set then they will be used to
        initialize the recurrent inputs or the nonlinearity states,
        respectively.
        """

        # input shape = [batch_size, seq_len, input_dim]
        # activations shape = [n_layers, batch_size, seq_len, layer_size]

        if callable(input):
            # reset the plant
            # TODO: allow the initial state of plant to be set?
            input.reset()

        batch_size = input.shape[0]
        sig_len = input.shape[1]

        activations = [np.zeros((batch_size, sig_len, l),
                                dtype=self.dtype)
                       for l in self.shape]

        # temporary space to minimize memory allocations
        tmp_space = [np.zeros((batch_size, l), dtype=self.dtype)
                    for l in self.shape]

        if deriv:
            d_activations = [None for l in self.layers]

        for i, l in enumerate(self.layers):
            # reset any state in the nonlinearities
            l.reset(None if init_state is None else init_state[i])

        W_recs = [self.get_weights(params, (i, i))
                  for i in np.arange(self.n_layers)]
        for s in np.arange(sig_len):
            for i in np.arange(self.n_layers):
                if i == 0:
                    # get the external input
                    if callable(input):
                        if s == 0 and init_activations is not None:
                            ff_input = input(init_activations[-1])
                        else:
                            # call the plant with the output of the previous
                            # timestep to generate the next input
                            # note: this will pass zeros on the first timestep
                            # if init_activations is not set
                            ff_input = input(activations[-1][:, s - 1])
                    else:
                        ff_input = input[:, s]
                else:
                    # compute feedforward input
                    ff_input = np.zeros_like(activations[i][:, s])
                    for pre in self.back_conns[i]:
                        W, b = self.get_weights(params, (pre, i))

                        ff_input += np.dot(activations[pre][:, s], W,
                                           out=tmp_space[i])
                        ff_input += b

                # recurrent input
                if self.rec_layers[i]:
                    if s > 0:
                        rec_input = np.dot(activations[i][:, s - 1],
                                           W_recs[i][0], out=tmp_space[i])
                    elif init_activations is None:
                        # apply bias input on first timestep
                        rec_input = W_recs[i][1]
                    else:
                        # use the provided activations to initialize the
                        # 'previous' timestep
                        rec_input = np.dot(init_activations[i],
                                           W_recs[i][0], out=tmp_space[i])
                else:
                    rec_input = 0

                # apply activation function
                activations[i][:, s] = (
                    self.layers[i].activation(ff_input + rec_input))

                # compute derivative
                if deriv:
                    d_act = self.layers[i].d_activation(ff_input + rec_input,
                                                        activations[i][:, s])
                    if d_activations[i] is None:
                        # note: we can't allocate this array ahead of time,
                        # because we don't know if d_activations will be
                        # returning diagonal vectors or matrices
                        d_activations[i] = np.zeros(
                            np.concatenate(([batch_size], [sig_len],
                                            d_act.shape[1:])),
                            dtype=self.dtype)
                    d_activations[i][:, s] = d_act

        if deriv:
            return activations, d_activations

        return activations

    def calc_grad(self):
        """Compute parameter gradient."""

        grad = np.zeros_like(self.W)
        W_recs = [self.get_weights(self.W, (l, l))
                  for l in np.arange(self.n_layers)]
        batch_size = self.inputs.shape[0]
        sig_len = self.inputs.shape[1]

        # temporary space to minimize memory allocations
        tmp_act = [np.zeros((batch_size, l), dtype=self.dtype)
                   for l in self.shape]
        tmp_grad = {}
        for k, v in self.offsets.items():
            tmp_grad[k] = [np.zeros(v[1] - v[0], dtype=self.dtype),
                           np.zeros(v[2] - v[1], dtype=self.dtype)]

        if self.truncation is None:
            trunc_per = trunc_len = sig_len
        else:
            trunc_per, trunc_len = self.truncation

        for n in np.arange(trunc_per - 1, sig_len, trunc_per):
            # every trunc_per timesteps we want to run backprop

            deltas = [np.zeros((batch_size, l), dtype=self.dtype)
                      for l in self.shape]
            state_deltas = [None if not l.stateful else
                            np.zeros((batch_size, self.shape[i]),
                                     dtype=self.dtype)
                            for i, l in enumerate(self.layers)]

            # backpropagate error
            for s in np.arange(n, np.maximum(n - trunc_len, -1), -1):
                # execute trunc_len steps of backprop through time

                error = self.loss.d_loss([a[:, s] for a in self.activations],
                                         self.targets[:, s])
                error = [np.zeros_like(self.activations[i][:, s]) if e is None
                         else e for i, e in enumerate(error)]

                for l in np.arange(self.n_layers - 1, -1, -1):
                    for post in self.conns[l]:
                        error[l] += np.dot(deltas[post],
                                           self.get_weights(self.W,
                                                            (l, post))[0].T,
                                           out=tmp_act[l])

                        # feedforward gradient
                        offset, W_end, b_end = self.offsets[(l, post)]
                        grad[offset:W_end] += self.outer_sum(
                            self.activations[l][:, s]
                            if self.GPU_activations is None else
                            [l, np.index_exp[:, s]], deltas[post],
                            out=tmp_grad[(l, post)][0])
                        grad[W_end:b_end] += np.sum(deltas[post], axis=0,
                                                    out=tmp_grad[(l, post)][1])

                    # add recurrent error
                    if self.rec_layers[l]:
                        error[l] += np.dot(deltas[l], W_recs[l][0].T,
                                           out=tmp_act[l])

                    # compute deltas
                    if not self.layers[l].stateful:
                        self.J_dot(self.d_activations[l][:, s], error[l],
                                   transpose=True, out=deltas[l])
                    else:
                        d_input = self.d_activations[l][:, s, ..., 0]
                        d_state = self.d_activations[l][:, s, ..., 1]
                        d_output = self.d_activations[l][:, s, ..., 2]

                        state_deltas[l] += self.J_dot(d_output, error[l],
                                                      transpose=True,
                                                      out=tmp_act[l])
                        self.J_dot(d_input, state_deltas[l], transpose=True,
                                   out=deltas[l])

                        # note: this can't be done in-place, because
                        # state_deltas is both an input and output (outputs
                        # get set to zero before the operation)
                        state_deltas[l] = self.J_dot(d_state, state_deltas[l],
                                                     transpose=True)

                    # gradient for recurrent weights
                    if self.rec_layers[l]:
                        offset, W_end, b_end = self.offsets[(l, l)]
                        if s > 0:
                            grad[offset:W_end] += self.outer_sum(
                                self.activations[l][:, s - 1]
                                if self.GPU_activations is None else
                                [l, np.index_exp[:, s - 1]], deltas[l],
                                out=tmp_grad[(l, l)][0])
                        else:
                            # put remaining gradient into initial bias
                            grad[W_end:b_end] += np.sum(
                                deltas[l], axis=0, out=tmp_grad[(l, l)][1])

        grad /= batch_size

        return grad

    def check_grad(self, calc_grad):
        """Check gradient via finite differences (for debugging)."""

        eps = 1e-6
        grad = np.zeros(calc_grad.shape)

        sig_len = self.inputs.shape[1]
        if self.truncation is None:
            trunc_per = trunc_len = sig_len
        else:
            trunc_per, trunc_len = self.truncation

        inc_W = np.zeros_like(self.W)

        for n in np.arange(trunc_per, sig_len + 1, trunc_per):
            start = np.maximum(n - trunc_len, 0)

            # the truncated backprop gradient is equivalent to running the
            # network normally for the initial timesteps and then just changing
            # the parameters for the truncation period.  so that's what we're
            # simulating here.
            if start > 0:
                prev = self.forward(self.inputs[:, :start], self.W)
                init_a = [p[:, -1] for p in prev]
                init_s = [l.state.copy() if l.stateful else None
                          for l in self.layers]
            else:
                init_a = None
                init_s = None

            for i in np.arange(len(self.W)):
                inc_W[:] = 0
                inc_W[i] = eps

                out_inc = self.forward(self.inputs[:, start:n], self.W + inc_W,
                                       init_activations=init_a,
                                       init_state=init_s)
                out_dec = self.forward(self.inputs[:, start:n], self.W - inc_W,
                                       init_activations=init_a,
                                       init_state=init_s)

                error_inc = self.loss.batch_loss(out_inc,
                                                 self.targets[:, start:n])

                error_dec = self.loss.batch_loss(out_dec,
                                                 self.targets[:, start:n])

                grad[i] += (error_inc - error_dec) / (2 * eps)

        try:
            assert np.allclose(calc_grad, grad, rtol=1e-3)
        except AssertionError:
            print "calc_grad"
            print calc_grad
            print "finite grad"
            print grad
            print "calc_grad - finite grad"
            print calc_grad - grad
            print "calc_grad / finite grad"
            print calc_grad / grad
            raw_input("Paused (press enter to continue)")

    def calc_G(self, v, damping=0):
        """Compute Gauss-Newton matrix-vector product."""

        Gv = np.zeros(self.W.size, dtype=self.dtype)

        batch_size = self.inputs.shape[0]
        sig_len = self.inputs.shape[1]

        # temporary space to minimize memory allocations
        tmp_act = [np.zeros((batch_size, l), dtype=self.dtype)
                   for l in self.shape]
        tmp_grad = {}
        for key, off in self.offsets.items():
            tmp_grad[key] = [np.zeros(off[1] - off[0], dtype=self.dtype),
                             np.zeros(off[2] - off[1], dtype=self.dtype)]

        # R forward pass
        R_states = [None if not l.stateful else
                    np.zeros((batch_size, self.shape[i]), dtype=self.dtype)
                    for i, l in enumerate(self.layers)]
        R_activations = [np.zeros_like(a) for a in self.activations]
        R_inputs = [np.zeros((batch_size, l), dtype=self.dtype)
                    for l in self.shape]
        v_recs = [self.get_weights(v, (l, l))
                  for l in np.arange(self.n_layers)]
        W_recs = [self.get_weights(self.W, (l, l))
                  for l in np.arange(self.n_layers)]

        for s in np.arange(sig_len):
            for l in np.arange(self.n_layers):
                R_inputs[l][:] = 0

                # input from feedforward connections
                if l > 0:
                    for pre in self.back_conns[l]:
                        vw, vb = self.get_weights(v, (pre, l))
                        Ww, _ = self.get_weights(self.W, (pre, l))

                        R_inputs[l] += np.dot(self.activations[pre][:, s], vw,
                                              out=tmp_act[l])
                        R_inputs[l] += vb
                        R_inputs[l] += np.dot(R_activations[pre][:, s], Ww,
                                              out=tmp_act[l])

                # recurrent input
                if self.rec_layers[l]:
                    if s == 0:
                        # bias input on first step
                        R_inputs[l] += v_recs[l][1]
                    else:
                        R_inputs[l] += np.dot(self.activations[l][:, s - 1],
                                              v_recs[l][0], out=tmp_act[l])
                        R_inputs[l] += np.dot(R_activations[l][:, s - 1],
                                              W_recs[l][0], out=tmp_act[l])

                if not self.layers[l].stateful:
                    self.J_dot(self.d_activations[l][:, s], R_inputs[l],
                               out=R_activations[l][:, s])
                else:
                    d_input = self.d_activations[l][:, s, ..., 0]
                    d_state = self.d_activations[l][:, s, ..., 1]
                    d_output = self.d_activations[l][:, s, ..., 2]


                    R_states[l] = self.J_dot(d_state, R_states[l])

                    R_states[l] += self.J_dot(d_input, R_inputs[l],
                                              out=tmp_act[l])
                    self.J_dot(d_output, R_states[l],
                               out=R_activations[l][:, s])

        # R backward pass
        if self.truncation is None:
            trunc_per = trunc_len = sig_len
        else:
            trunc_per, trunc_len = self.truncation

        # note: we're just reusing the memory from R_inputs here, not values
        R_error = R_inputs

        for n in np.arange(trunc_per - 1, sig_len, trunc_per):
            R_deltas = [np.zeros((batch_size, l), dtype=self.dtype)
                        for l in self.shape]
            for x in R_states:
                if x is not None:
                    x[...] = 0

            for s in np.arange(n, np.maximum(n - trunc_len, -1), -1):
                error = self.loss.d2_loss([a[:, s] for a in self.activations],
                                          self.targets[:, s])

                for l in np.arange(self.n_layers - 1, -1, -1):
                    if error[l] is not None:
                        R_error[l] = error[l] * R_activations[l][:, s]
                    else:
                        R_error[l][...] = 0

                    # error from feedforward connections
                    for post in self.conns[l]:
                        W, _ = self.get_weights(self.W, (l, post))
                        R_error[l] += np.dot(R_deltas[post], W.T,
                                             out=tmp_act[l])

                        # feedforward gradient
                        offset, W_end, b_end = self.offsets[(l, post)]
                        Gv[offset:W_end] += self.outer_sum(
                            self.activations[l][:, s]
                            if self.GPU_activations is None else
                            [l, np.index_exp[:, s]], R_deltas[post],
                            out=tmp_grad[(l, post)][0])
                        Gv[W_end:b_end] += np.sum(R_deltas[post], axis=0,
                                                  out=tmp_grad[(l, post)][1])

                    # add recurrent error
                    if self.rec_layers[l]:
                        R_error[l] += np.dot(R_deltas[l], W_recs[l][0].T,
                                             out=tmp_act[l])

                    # compute deltas
                    if not self.layers[l].stateful:
                        self.J_dot(self.d_activations[l][:, s], R_error[l],
                                   transpose=True, out=R_deltas[l])
                    else:
                        d_input = self.d_activations[l][:, s, ..., 0]
                        d_state = self.d_activations[l][:, s, ..., 1]
                        d_output = self.d_activations[l][:, s, ..., 2]

                        R_states[l] += self.J_dot(d_output, R_error[l],
                                                  transpose=True,
                                                  out=tmp_act[l])
                        self.J_dot(d_input, R_states[l], transpose=True,
                                   out=R_deltas[l])
                        R_states[l] = self.J_dot(d_state, R_states[l],
                                                 transpose=True)

                    # apply structural damping
                    struc_damping = getattr(self.optimizer, "struc_damping",
                                            None)
                    # TODO: could we just define struc_damping as a loss
                    # function instead?
                    if struc_damping is not None and self.rec_layers[l]:
                        # penalize change in the output w.r.t. input (which is
                        # what R_activations represents)
                        R_deltas[l] += struc_damping * R_activations[l][:, s]

                    # recurrent gradient
                    if self.rec_layers[l]:
                        offset, W_end, b_end = self.offsets[(l, l)]
                        if s > 0:
                            Gv[offset:W_end] += self.outer_sum(
                                self.activations[l][:, s - 1]
                                if self.GPU_activations is None else
                                [l, np.index_exp[:, s - 1]], R_deltas[l],
                                out=tmp_grad[(l, l)][0])
                        else:
                            Gv[W_end:b_end] += np.sum(R_deltas[l], axis=0,
                                                      out=tmp_grad[(l, l)][1])

        Gv /= batch_size

        Gv += damping * v  # Tikhonov damping

        return Gv

    def check_J(self, start=0, stop=None):
        """Compute the Jacobian of the network via finite differences."""

        eps = 1e-6
        N = self.W.size

        # as in check_grad, the truncation is equivalent to running the network
        # normally for the initial timesteps and then changing the parameters,
        # so that's what we do here to compute the Jacobian

        if start > 0:
            prev = self.forward(self.inputs[:, :start], self.W)
            init_a = [p[:, -1] for p in prev]
            init_s = [l.state.copy() if l.stateful else None
                      for l in self.layers]
        else:
            init_a = None
            init_s = None

        if stop is None:
            stop = self.inputs.shape[1]

        # compute the Jacobian
        J = [None for _ in self.layers]
        for i in range(N):
            inc_i = np.zeros(N)
            inc_i[i] = eps

            inc = self.forward(self.inputs[:, start:stop], self.W + inc_i,
                               init_activations=init_a, init_state=init_s)
            dec = self.forward(self.inputs[:, start:stop], self.W - inc_i,
                               init_activations=init_a, init_state=init_s)

            if start > 0:
                inc = np.concatenate((prev[-1], inc), axis=1)
                dec = np.concatenate((prev[-1], dec), axis=1)

            for l in range(self.n_layers):
                J_i = (inc[l] - dec[l]) / (2 * eps)
                if J[l] is None:
                    J[l] = J_i[..., None]
                else:
                    J[l] = np.concatenate((J[l], J_i[..., None]), axis=-1)

        return J

    def check_G(self, calc_G, v, damping=0):
        """Check Gv calculation via finite differences (for debugging)."""

        sig_len = self.inputs.shape[1]
        if self.truncation is None:
            trunc_per = trunc_len = sig_len
        else:
            trunc_per, trunc_len = self.truncation

        G = np.zeros((len(self.W), len(self.W)))

        for n in np.arange(trunc_per, sig_len + 1, trunc_per):
            start = np.maximum(n - trunc_len, 0)

            # compute Jacobian
            # note that we do a full forward pass and a partial backwards
            # pass, so we only truncate the backwards J matrix
            J = self.check_J(0, n)
            trunc_J = self.check_J(start, n) if start > 0 else J

            # second derivative of loss function
            L = self.loss.d2_loss([a[:, :n] for a in self.activations],
                                  self.targets[:, :n])
            # TODO: check loss via finite differences

            G += np.sum([np.einsum("abji,abj,abjk->ik", trunc_J[l], L[l], J[l])
                         for l in range(self.n_layers) if L[l] is not None],
                        axis=0)

        # divide by batch size
        G /= self.inputs.shape[0]

        Gv = np.dot(G, v)
        Gv += damping * v

        try:
            assert np.allclose(calc_G, Gv, rtol=1e-3)
        except AssertionError:
            print "calc_G"
            print calc_G
            print "finite G"
            print Gv
            print "calc_G - finite G"
            print calc_G - Gv
            print "calc_G / finite G"
            print calc_G / Gv
            raw_input("Paused (press enter to continue)")

    def compute_offsets(self):
        """Precompute offsets for layers in the overall parameter vector."""

        ff_offset = super(RNNet, self).compute_offsets()

        # offset for recurrent weights is end of ff weights
        offset = ff_offset
        for l in np.arange(self.n_layers):
            if self.rec_layers[l]:
                self.offsets[(l, l)] = (
                    offset,
                    offset + self.shape[l] * self.shape[l],
                    offset + (self.shape[l] + 1) * self.shape[l])
                offset += (self.shape[l] + 1) * self.shape[l]

        return offset - ff_offset
