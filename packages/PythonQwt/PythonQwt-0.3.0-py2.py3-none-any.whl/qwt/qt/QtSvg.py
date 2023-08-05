# -*- coding: utf-8 -*-
#
# Copyright © 2012 Pierre Raybaut
# Licensed under the terms of the MIT License
# (see LICENSE file for details)

import os

if os.environ['QT_API'] == 'pyqt5':
    from PyQt5.QtSvg import *                                 # analysis:ignore
elif os.environ['QT_API'] == 'pyqt':
    from PyQt4.QtSvg import *                                 # analysis:ignore
else:
    from PySide.QtSvg import *                                # analysis:ignore
