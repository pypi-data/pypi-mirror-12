import numpy as np
import pytest

from hessianfree import FFNet, RNNet
from hessianfree.nonlinearities import (Logistic, Tanh, Softmax, SoftLIF, ReLU,
                                        Continuous, Linear, Nonlinearity,
                                        Gaussian)
from hessianfree.optimizers import HessianFree, SGD
from hessianfree.loss_funcs import (SquaredError, CrossEntropy, SparseL1,
                                    SparseL2, ClassificationError)

try:
    import pycuda
    pycuda_installed = True
except ImportError:
    pycuda_installed = False


def test_xor():
    inputs = np.asarray([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=np.float32)
    targets = np.asarray([[0], [1], [1], [0]], dtype=np.float32)

    ff = FFNet([2, 5, 1], debug=True)

    ff.run_batches(inputs, targets, optimizer=HessianFree(CG_iter=2),
                   max_epochs=40)

    outputs = ff.forward(inputs, ff.W)

    assert ff.loss.batch_loss(outputs, targets) < 1e-5


def test_SGD():
    inputs = np.asarray([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=np.float32)
    targets = np.asarray([[0], [1], [1], [0]], dtype=np.float32)

    ff = FFNet([2, 5, 1], debug=False)

    ff.run_batches(inputs, targets, optimizer=SGD(l_rate=1),
                   max_epochs=10000)

    outputs = ff.forward(inputs, ff.W)

    assert ff.loss.batch_loss(outputs, targets) < 1e-3


@pytest.mark.skipif(not pycuda_installed, reason="PyCUDA not installed")
def test_GPU():
    inputs = np.asarray([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=np.float32)
    targets = np.asarray([[0], [1], [1], [0]], dtype=np.float32)

    ff = FFNet([2, 5, 1], debug=True, use_GPU=True)
    ff.GPU_threshold = 0

    ff.run_batches(inputs, targets, optimizer=HessianFree(CG_iter=2),
                   max_epochs=40)

    # using gradient descent (for comparison)
#     ff.run_batches(inputs, targets, optimizer=SGD(l_rate=1),
#                    max_epochs=10000, plotting=True)

    outputs = ff.forward(inputs, ff.W)

    assert ff.loss.batch_loss(outputs, targets) < 1e-5


def test_softlif():
    inputs = np.asarray([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=np.float32)
    targets = np.asarray([[0.1], [1], [1], [0.1]], dtype=np.float32)

    lifs = SoftLIF(sigma=1, tau_ref=0.002, tau_rc=0.02, amp=0.01)

    ff = FFNet([2, 10, 1], layers=lifs, debug=True)

    ff.run_batches(inputs, targets, optimizer=HessianFree(CG_iter=50),
                   max_epochs=50)

    outputs = ff.forward(inputs, ff.W)

    assert ff.loss.batch_loss(outputs, targets) < 1e-5


def test_crossentropy():
    inputs = np.asarray([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=np.float32)
    targets = np.asarray([[0, 1], [1, 0], [1, 0], [0, 1]], dtype=np.float32)

    ff = FFNet([2, 5, 2], layers=[Linear(), Tanh(), Softmax()],
               debug=True, loss_type=CrossEntropy())

    ff.run_batches(inputs, targets, optimizer=HessianFree(CG_iter=50),
                   max_epochs=100)

    outputs = ff.forward(inputs, ff.W)

    assert ff.loss.batch_loss(outputs, targets) < 1e-5


def test_testerr():
    inputs = np.asarray([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=np.float32)
    targets = np.asarray([[0, 1], [1, 0], [1, 0], [0, 1]], dtype=np.float32)

    ff = FFNet([2, 5, 2], layers=[Linear(), Tanh(), Softmax()],
               debug=True, loss_type=CrossEntropy())

    err = ClassificationError()

    ff.run_batches(inputs, targets, optimizer=HessianFree(CG_iter=50),
                   max_epochs=100, test_err=err, target_err=-1)

    outputs = ff.forward(inputs, ff.W)

    assert ff.loss.batch_loss(outputs, targets) < 1e-4

    print outputs[-1]

    assert err.batch_loss(outputs, targets) == 0.0


def test_connections():
    inputs = np.asarray([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=np.float32)
    targets = np.asarray([[0], [1], [1], [0]], dtype=np.float32)

    ff = FFNet([2, 5, 5, 1], layers=Tanh(), debug=True,
               conns={0: [1, 2], 1: [3], 2: [3]})

    ff.run_batches(inputs, targets, optimizer=HessianFree(CG_iter=50),
                   max_epochs=50)

    outputs = ff.forward(inputs, ff.W)

    assert ff.loss.batch_loss(outputs, targets) < 1e-5


def test_sparsity():
    inputs = np.asarray([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=np.float32)
    targets = np.asarray([[0], [1], [1], [0]], dtype=np.float32)

    ff = FFNet([2, 8, 1], debug=True,
               loss_type=[SquaredError(), SparseL1(0.01, target=0)])

    ff.run_batches(inputs, targets, optimizer=HessianFree(CG_iter=50),
                   max_epochs=100)

    outputs = ff.forward(inputs, ff.W)

    assert ff.loss.batch_loss(outputs, targets) < 1e-2

    assert np.mean(outputs[1]) < 0.1


if __name__ == "__main__":
    pytest.main("-x -v --tb=native test_ffnet.py")
