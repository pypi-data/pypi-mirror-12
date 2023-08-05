The ``PythonQwt`` project was initiated to solve -at least temporarily- the 
obsolescence issue of `PyQwt` (the Python-Qwt C++ bindings library) which is 
no longer maintained. The idea was to translate the original Qwt C++ code to 
Python and then to optimize some parts of the code by writing new modules 
based on NumPy and other libraries.


The ``PythonQwt`` package consists of a single Python package named `qwt` 
which is a pure Python implementation of Qwt C++ library with the following 
limitations.

The following `Qwt` classes won't be reimplemented in `qwt` because more
powerful features already exist in `guiqwt`: `QwtPlotZoomer`, `QwtCounter`, 
`QwtEventPattern`, `QwtPicker`, `QwtPlotPicker`.

Only the following plot items are currently implemented in `qwt` (the only 
plot items needed by `guiqwt`): `QwtPlotItem` (base class), `QwtPlotItem`, 
`QwtPlotMarker`, `QwtPlotSeriesItem`, `QwtPlotHistogram`, `QwtPlotCurve`.

The `QwtClipper` class is not implemented yet (and it will probably be 
very difficult or even impossible to implement it in pure Python without 
performance issues). As a consequence, when zooming in a plot curve, the 
entire curve is still painted (in other words, when working with large 
amount of data, there is no performance gain when zooming in).

