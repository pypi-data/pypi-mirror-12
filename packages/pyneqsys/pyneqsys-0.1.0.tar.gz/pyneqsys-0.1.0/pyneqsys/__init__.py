# -*- coding: utf-8 -*-

from __future__ import absolute_import

from .core import NeqSys
from .symbolic import SymbolicSys
assert NeqSys, SymbolicSys  # silence pyflakes
