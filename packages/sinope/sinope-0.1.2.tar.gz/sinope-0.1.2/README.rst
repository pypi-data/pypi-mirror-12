Sinope
======

Split Implicit Numerics Of Parabolic Equations
----------------------------------------------
pronounced (sin-Oh-pee)

A package for solving parabolic differential equations, in particular the
Schrodinger equation and the Gross-Pitaevskii equation using the Crank Nicolson
method.

To install the package from PyPI use `pip install sinope`, or download the
source distribution sinope-0.1.tar.gz and run `pip install sinope-0.1.tar.gz`.

Alternatively if you prefer to keep the code in its own directory, download the
github repository and compile the extension module with `make`.

To run tests use `sinope_run_tests.py`. This requires the package hypothesis_.
which can be installed with `pip install hypothesis`.

.. _hypothesis: https://hypothesis.readthedocs.org/en/latest/index.html

Examples for how to use the code are available in scripts. The user code
should define a grid class which inherits from one of Grid1D or Grid2D. The
user then needs to define four methods:

1) `initialise_solvers(self, \*\*kwargs)`:

This is called when the grid is initialised using with the keyword
arguments that are passed to the grid constructor. In this method the
chosen solvers (to be found in the solvers module) should be constructed.

2) `set_time_step(self, dt)`:

This method needs to initialise all of the needed solvers with a common
step size, which is dt. This method should have some mechanism to choose
the step size if it is called with dt as None. In which case the
longest\_time\_step methods of the solver classes should be used.

3) `advance_single(self)`:

This advances the solution by a single time step using the previously
defined solvers.

4) `n_components(self)`:

Additionally the method `n_components(self)` can be overridden (default
function returns 1) if the solution u has more than one component. This
allows for multiple (possibly dependent) variables to be evolved together.
Note that each component is necessarily real, so if one of the variables is
complex then it requires two components (one for each of the real and
imaginary parts).

The solvers are defined in the solver module. The available solvers are
Explicit (for a real parabolic PDE) using a FTCS explicit scheme. A Crank
Nicolson implicit solver also for real PDEs is also available using Cholesky
factorisation (cholesky module). This is implicit and is unconditionally stable
while the explicit one has a strict stability condition.  Crank Nicolson is
therefore faster overall, especially on large grids. On the other hand it is
less easily parallelised than an explicit scheme.

The solvers are entirely one dimensional and are intended to be used on the 2D
grid with dimensional splitting. See the scripts folder for examples.

The tst package implements the multiplying of TST (tridiagonal symmetric
Toeplitz) matrices by vectors using c++ and a swig interface. This is
significantly faster than the equivalent numpy code since it cannot be
implemented using elementwise operations, but requires slicing.
