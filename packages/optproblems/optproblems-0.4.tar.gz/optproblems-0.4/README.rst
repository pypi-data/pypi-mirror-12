
optproblems has been tested with Python 2.7 and 3.4. The recommended version is
Python 3.x, because compatibility is reached by avoiding usage of xrange. So,
the code has a higher memory consumption under Python 2.



Changes
=======

0.4
---
* New method get_peaks_sorted_by_importance() of MultiplePeaksModel2.
* Added new module `real` containing the collection of Dixon and Szegö and some
  other problems.
* Fixed bug in base.BoundConstraintsChecker, where the previous preprocessor
  was not called before everything else.

0.3
---
* Added new module dtlz with multiobjective DTLZ problems 1-7.
* Added new module cec2007 with problems from the Special Session & Competition
  on Performance Assessment of Multi-Objective Optimization Algorithms at the
  Congress on Evolutionary Computation (CEC), Singapore, 25-28 September 2007.
* The problem classes in base are now (more) agnostic to the return type of the
  objective function, i.e., it is not required for objective functions to return
  sequences anymore.

0.2
---
* Slightly refined Pareto-front sampling for multiobjective test problems.
* Added module wfg with (multiobjective) test problems from the Walking
  Fish Group.

0.1
---
* Initial version containing binary problems, ZDT, and MPM2.
