=========
Changelog
=========

Created with gitcommand: git shortlog v0.9.12..v0.9.13


2015
====

October 30
^^^^^^^^^^

Version 0.9.13
--------------

pbrod (21):
      Updated README.rst and CHANGES.rst.
      updated Limits.
      Made it possible to differentiate complex functions and allow zero'th order derivative.
      BUG: added missing derivative order, n to Gradient, Hessian, Jacobian.
      Made test more robust.
      Updated structure in setup according to pyscaffold version 2.4.2.
      Updated setup.cfg and deleted duplicate tests folder.
      removed unused code.
      Added appveyor.yml.
      Added required appveyor install scripts
      Fixed bug in appveyor.yml.
      added wheel to requirements.txt.
      updated appveyor.yml.
      Removed import matplotlib.

Justin Lecher (1):
      Fix min version for numpy.

kikocorreoso (1):
      fix some prints on run_benchmark.py to make it work with py3


August 28
^^^^^^^^^

Version 0.9.12
--------------

pbrod (12):
      
      Updated documentation.
      Updated version in conf.py.
      Updated CHANGES.rst.
      Reimplemented outlier detection and made it more robust.     
      Added limits.py with tests.
      Updated main tests folder.        
      Moved Richardson and dea3 to extrapolation.py.
      Making a new release in order to upload to pypi.

August 27
^^^^^^^^^

Version 0.9.11
--------------

pbrod (2):
      Fixed sphinx-build and updated docs.
      Fixed issue #9 Backward differentiation method fails with additional parameters.


August 26
^^^^^^^^^
Version 0.9.10
--------------

pbrod (7):
      Fixed sphinx-build and updated docs.
      Added more tests to nd_algopy.
      Dropped support for Python 2.6.


Version 0.9.4
-------------

pbrod (7):
      Fixed sphinx-build and updated docs.


Version 0.9.3
-------------

Paul Kienzle (1):
      more useful benchmark plots.

pbrod (7):
      Fixed bugs and updated docs.
      Major rewrite of the easy to use interface to Algopy.
      Added possibility to calculate n'th order derivative not just for n=1 in nd_algopy.
      Added tests to the easy to use interface to algopy.


August 20
^^^^^^^^^

Version 0.9.2
-------------

pbrod (3):
      Updated documentation
      Added parenthesis to a call to the print function
      Made the test less strict in order to pass the tests on Travis for python 2.6 and 3.2.
      

Version 0.9.1
-------------

Christoph Deil (1):
      Fix Sphinx build

pbrod (47):
      Total remake of numdifftools with slightly different call syntax.
         Can compute derivatives of order up to 10-14 depending on function and method used. 
         Updated documentation and tests accordingly.
         Fixed a bug in dea3.
         Added StepsGenerator as an replacement for the adaptive option.
         Added bicomplex class for testing the complex step second derivative.
         Added fornberg_weights_all for computing optimal finite difference rules in a stable way.
         Added higher order complex step derivative methods.
      

2014
====

December 18
^^^^^^^^^^^

Version 0.7.7
-------------

pbrod (35):
      Got travis-ci working in order to run the tests automatically.
      Fixed bugs in Dea class.
      Fixed better error estimate for the Hessian.
      Fixed tests for python 2.6.
      Adding tests as subpackage.
      Restructerd folders of numdifftools.


December 17
^^^^^^^^^^^

Version 0.7.3
-------------

pbrod (5):
      Small cosmetic fixes.
      pep8 + some refactorings.
      Simplified code by refactoring.


February 8
^^^^^^^^^^

Version 0.6.0
-------------

pbrod (20):
      Update and rename README.md to README.rst.
      Simplified call to Derivative: removed step_fix.
      Deleted unused code.
      Simplified and Refactored. Now possible to choose step_num=1.
      Changed default step_nom from max(abs(x0), 0.2) to max(log2(abs(x0)), 0.2).
      pep8ified code and made sure that all tests pass.

January 10
^^^^^^^^^^

Version 0.5.0
-------------

pbrod (9):
      Updated the examples in Gradient class and in info.py.
      Added test for vec2mat and docstrings + cosmetic fixes.
      Refactored code into private methods.
      Fixed issue #7: Derivative(fun)(numpy.ones((10,5)) * 2) failed.
      Made print statements compatible with python 3.


2012
====

May 5
^^^^^

Version 0.4.0
--------------

pbrod (1)
      Fixed a bug for inf and nan values.


2011
====

May 19
^^^^^^

Version 0.3.5
--------------

pbrod (1)
      Fixed a bug for inf and nan values.


Feb 24
^^^^^^
Version 0.3.4
-------------

pbrod (11)
      Made automatic choice for the stepsize more robust.
      Added easy to use interface to the algopy and scientificpython modules.


2009
====

May 20
^^^^^^

Version 0.3.1
-------------

pbrod (4)
      First version of numdifftools published on google.code


