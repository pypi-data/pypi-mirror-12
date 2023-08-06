# -*- coding: utf-8 -*-

from __future__ import absolute_import, division, print_function

import inspect
import warnings

import numpy as np


def _ensure_2args(func):
    if func is None:
        return None

    if len(inspect.getargspec(func)[0]) == 1:
        return lambda x, params: func(x)
    else:
        return func


def solve_series(solve, x0, params, var_data, var_idx, **kwargs):
    xout = np.empty((len(var_data), len(x0)))
    sols = []
    new_x0 = np.array(x0, dtype=np.float64)
    new_params = np.atleast_1d(np.array(params, dtype=np.float64))
    for idx, value in enumerate(var_data):
        try:
            new_params[var_idx] = value
        except TypeError:
            new_params = value  # e.g. type(new_params) == int
        x, sol = solve(new_x0, new_params, **kwargs)
        if sol.success:
            new_x0 = x
        xout[idx, :] = x
        sols.append(sol)
    return xout, sols


class NeqSys(object):
    """Represent a system of non-linear equations

    Object representing nonlinear equation system.
    Provides unified interface to:

    - scipy.optimize.root
    - nleq2

    Parameters
    ----------
    nf: int
        number of functions
    nx: int
        number of parameters
    f: callback
        function to solve for signature f(x) where ``len(x) == nx``
        f should return an array_like of length ``nf``
    jac: callback or None (default)
        Jacobian matrix (dfdy). optional
    band: tuple (default: None)
        number of sub- and super-diagonals in jacobian.
    names: iterable of str (default: None)
        names of variables, used for plotting
    pre_processor: callback (array -> array)
        (forward) transformation of user-input to :py:meth:`solve`
    post_processor: callback (array -> array)
        (backward) transformation of result from :py:meth:`solve`

    Examples
    --------
    >>> neqsys = NeqSys(2, 2, lambda x, p: [(x[0] - x[1])**p[0]/2 + x[0] - 1,
    ...                                     (x[1] - x[0])**p[0]/2 + x[1]])
    >>> x, sol = neqsys.solve('scipy', [1, 0], [3])
    >>> assert sol.success
    >>> print(x)
    [ 0.8411639  0.1588361]

    See Also
    --------
    pyneqsys.symbolic.SymbolicSys : use a CAS (SymPy by default) to derive
                                    the jacobian.
    """

    def __init__(self, nf, nx, f, jac=None, band=None, names=None,
                 pre_processor=None, post_processor=None):
        if nf < nx:
            raise ValueError("Under-determined system")
        self.nf, self.nx = nf, nx
        self.f_callback = _ensure_2args(f)
        self.j_callback = _ensure_2args(jac)
        self.band = band
        self.names = names
        self.pre_processor = pre_processor
        self.post_processor = post_processor

    def pre_process(self, x0):
        # Should be used by all methods matching "solve_*"
        if self.pre_processor is None:
            return x0
        else:
            return self.pre_processor(x0)

    def post_process(self, out):
        # Should be used by all methods matching "solve_*"
        if self.post_processor is None:
            return out
        else:
            return self.post_processor(out)

    def solve(self, solver, *args, **kwargs):
        """
        Solve with ``solver``. Convenience method.
        """
        return getattr(self, 'solve_'+solver)(*args, **kwargs)

    def solve_series(self, solver, x0, params, var_data, var_idx, **kwargs):
        return solve_series(getattr(self, 'solve_'+solver),
                            x0, params, var_data, var_idx, **kwargs)

    def solve_scipy(self, x0, params=None, tol=1e-8, method=None, **kwargs):
        """
        Use scipy.optimize.root
        see: http://docs.scipy.org/doc/scipy/reference/
                 generated/scipy.optimize.root.html

        Parameters
        ----------
        x0: array_like
            initial guess
        params: array_like (default: None)
            (Optional) parameters of type float64
        tol: float
            Tolerance
        method: str (default: None)
            what method to use.

        Returns
        -------
        array of length self.nx
        """
        from scipy.optimize import root
        if method is None:
            if self.nf > self.nx:
                method = 'lm'
            elif self.nf == self.nx:
                method = 'hybr'
            else:
                raise ValueError('Underdetermined problem')
        if 'band' in kwargs:
            raise ValueError("Set 'band' at initialization instead.")
        if 'args' in kwargs:
            raise ValueError("Set 'args' as params in initialization instead.")

        new_kwargs = kwargs.copy()
        if self.band is not None:
            warnings.warn("Band argument ignored (see SciPy docs)")
            new_kwargs['band'] = self.band
        if params is None:
            new_kwargs['args'] = []
        else:
            new_kwargs['args'] = np.atleast_1d(np.array(
                params, dtype=np.float64))

        sol = root(self.f_callback, self.pre_process(x0),
                   jac=self.j_callback, method=method, tol=tol,
                   **new_kwargs)

        return self.post_process(sol.x), sol

    def solve_nleq2(self, x0, params=None, tol=1e-8, method=None, **kwargs):
        """ Provisional, subject to unnotified API breaks """
        from pynleq2 import solve

        def f(x, ierr):
            return self.f_callback(x[:self.nx], x[self.nx:])
        x, ierr = solve(
            (lambda x, ierr: (self.f_callback(x, params), ierr)),
            (lambda x, ierr: (self.j_callback(x, params), ierr)),
            self.pre_process(x0),
            **kwargs
        )
        return self.post_process(x), ierr

    def plot_series(self, idx_varied, varied_data, xres, sols=None, plot=None,
                    plot_kwargs_cb=None, ls=('-', '--', ':', '-.'),
                    c=('k', 'r', 'g', 'b', 'c', 'm', 'y')):
        if plot is None:
            from matplotlib.pyplot import plot
        if plot_kwargs_cb is None:
            names = getattr(self, 'names', None)

            def plot_kwargs_cb(idx):
                kwargs = {'ls': ls[idx % len(ls)],
                          'c': c[idx % len(c)]}
                if names:
                    kwargs['label'] = names[idx]
                return kwargs
        else:
            plot_kwargs_cb = plot_kwargs_cb or (lambda idx: {})
        for idx in range(xres.shape[1]):
            plot(varied_data, xres[:, idx], **plot_kwargs_cb(idx))


class ConditionalNeqSys(object):
    """ Collect multiple systems of non-linear equations with different
    conditionals.

    If a problem in a fixed number of variables is described by different
    systems of equations this class may be used to describe that set of
    systems.

    The user provides a set of conditions which governs what system of
    equations to apply. The set of conditions then represent a vector
    of booleans which is passed to a user provided NeqSys-factory.
    The conditions may be asymmetrical (each condition consits of two
    callbacks, one for evaluating when the condition was previously False,
    and one when it was previously False. The motivation for this asymmetry
    is that a user may want to introduce a tolerance for numerical noise in
    the solution (and avoid possibly infinte recursion)

    Parameters
    ----------
    conditions: list of (callback, callback) tuples
        callbacks should have the signature: f(x, p) -> bool
    neqsys_factory: callback
        should have the signature f(conds) -> NeqSys instance
        where conds is a list of bools

    Example
    -------
    >>> from math import sin, pi
    >>> f_a = lambda x, p: [sin(p[0]*x[0])]  # when x <= 0
    >>> f_b = lambda x, p: [x[0]*(p[1]-x[0])]  # when x >= 0
    >>> factory = lambda conds: NeqSys(1, 1, f_b) if conds[0] else NeqSys(
    ...     1, 1, f_a)
    >>> cneqsys = ConditionalNeqSys([(lambda x, p: x[0] > 0,  # no 0-switch
    ...                               lambda x, p: x[0] >= 0)],  # no 0-switch
    ...                             factory)
    >>> x, sol = cneqsys.solve('scipy', [0], [pi, 3])
    >>> assert sol.success
    >>> print(x)
    [ 0.]
    >>> x, sol = cneqsys.solve('scipy', [-1.4], [pi, 3])
    >>> assert sol.success
    >>> print(x)
    [-1.]
    >>> x, sol = cneqsys.solve('scipy', [2], [pi, 3])
    >>> assert sol.success
    >>> print(x)
    [ 3.]
    >>> x, sol = cneqsys.solve('scipy', [7], [pi, 3])
    >>> assert sol.success
    >>> print(x)
    [ 3.]
    """

    def __init__(self, conditions, neqsys_factory):
        self.conditions = conditions
        self.neqsys_factory = neqsys_factory

    def solve(self, solver, x0, params, conditional_maxiter=15, **kwargs):
        conds = [fw(x0, params) for fw, bw in self.conditions]
        idx = 0
        while idx < conditional_maxiter:
            neqsys = self.neqsys_factory(conds)
            x0, sol = neqsys.solve(solver, x0, params, **kwargs)
            new_conds = [bw(x0, params) if prev else fw(x0, params)
                         for prev, (fw, bw) in zip(conds, self.conditions)]
            if new_conds == conds:
                break
            else:
                conds = new_conds
            idx += 1
        if idx == conditional_maxiter:
            raise Exception("Solving failed, conditional_maxiter reached")
        return x0, sol

    def solve_series(self, solver, x0, params, var_data, var_idx, **kwargs):
        return solve_series(lambda x, p, **kw: self.solve(solver, x, p, **kw),
                            x0, params, var_data, var_idx, **kwargs)
