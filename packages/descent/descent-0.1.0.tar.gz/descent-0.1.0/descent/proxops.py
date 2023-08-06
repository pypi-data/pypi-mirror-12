"""
Proximal operators / mappings

"""

from __future__ import division
from .utils import proxify, coroutine
import numpy as np

try:
    from scipy.optimize import minimize as scipy_minimize
    from scipy.sparse import spdiags
    from scipy.sparse.linalg import spsolve
except ImportError: # pragma no cover
    print("Package 'scipy' not found. L-BFGS and smooth proximal operators will not work.")

try:
    from skimage.restoration import denoise_tv_bregman
except ImportError:
    print('Error: scikit-image not found. TVD will not work.')

__all__ = ['nucnorm', 'sparse', 'clip', 'linsys', 'squared_error',
           'lbfgs', 'tvd', 'smooth', 'linear', 'fantope', 'identity']


@proxify
def identity(x, rho):
    return x

@proxify
def nucnorm(x, rho, penalty):
    """
    Nuclear norm
    """
    u, s, v = np.linalg.svd(x, full_matrices=False)
    sthr = np.maximum(s - (penalty / rho), 0)
    return np.linalg.multi_dot((u, np.diag(sthr), v))


@proxify
def sparse(x, rho, penalty):
    """
    Proximal operator for the l1-norm: soft thresholding

    Parameters
    ----------
    penalty : float
        Strength or weight on the l1-norm

    """

    lmbda = penalty / rho
    return (x - lmbda) * (x >= lmbda) + (x + lmbda) * (x <= -lmbda)


@proxify
def clip(x, rho, value=0):
    """
    Clip the input below a certain value

    """
    return np.maximum(x, value)


@coroutine
def linsys(A, b):
    """
    Proximal operator for solving a linear least squares system, Ax = b

    Parameters
    ----------
    A : array_like
        Sensing matrix (Ax = b)

    b : array_like
        Responses (Ax = b)

    """
    P = A.T.dot(A)
    q = A.T.dot(b)

    x, rho = yield

    while True:
        y = np.linalg.solve(rho * np.eye(q.size) + P, rho * x + q)
        x, rho = yield y


@proxify
def squared_error(x, rho, x_obs):
    """
    Proximal operator for squared error (l2 or Fro. norm)

    squared_error(x_obs)

    Parameters
    ----------
    x_obs : array_like
        Observed array or matrix that you want to stay close to

    """
    return (x + x_obs / rho) / (1. + 1. / rho)


@proxify
def lbfgs(x, rho, f_df, maxiter=20):

    def f_df_augmented(theta):
        f, df = f_df(theta)
        obj = f + (rho / 2.) * np.linalg.norm(theta - x) ** 2
        grad = df + rho * (theta - x)
        return obj, grad

    res = scipy_minimize(f_df_augmented, x, jac=True, method='L-BFGS-B',
                            options={'maxiter': maxiter, 'disp': False})

    return res.x


@proxify
def tvd(x, rho, penalty):
    """
    Total variation denoising proximal operator

    Parameters
    ----------
    penalty : float

    """

    return denoise_tv_bregman(x, rho / penalty)


@proxify
def smooth(x, rho, penalty, axis=0):
    """
    Applies a smoothing operator along one dimension

    currently only accepts a matrix as input
    """

    # Apply Laplacian smoothing (l2 norm on the parameters multiplied by
    # the laplacian)
    n = x.shape[axis]
    lap_op = spdiags([(2 + rho / penalty) * np.ones(n), -1 * np.ones(n), -1 * np.ones(n)], [0, -1, 1], n, n, format='csc')
    return np.rollaxis(spsolve(penalty * lap_op, rho * np.rollaxis(x, axis, 0)), axis, 0)


@proxify
def sdcone(x, rho):
    """
    Projection onto the semidefinite cone

    """
    U, V = np.linalg.eigh(x)
    return V.dot(np.diag(np.maximum(U, 0)).dot(V.T))


@proxify
def linear(x, rho, weights):
    """
    Proximal operator for a linear function w^T x

    """
    return x - weights / rho


@proxify
def fantope(x, rho, dim, tol=1e-4):
    """
    Projection onto the fantope

    TODO: add citation

    """

    U, V = np.linalg.eigh(x)

    minval, maxval = np.maximum(u.min(), 0), np.maximum(u.max(), 20 * dim)

    while True:

        theta = 0.5 * (maxval + minval)
        thr_eigvals = np.minimum(np.maximum((u - theta), 0), 1)
        constraint = np.sum(thr_eigvals)

        if np.abs(constraint - dim) <= tol:
            break

        elif constraint < dim:
            maxval = theta

        elif constraint > dim:
            minval = theta

        else:
            break

    return np.linalg.multi_dot((U, np.diag(thr_eigvals), V))
