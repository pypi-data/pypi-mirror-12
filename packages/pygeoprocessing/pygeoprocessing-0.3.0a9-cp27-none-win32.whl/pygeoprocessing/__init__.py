"""__init__ module for pygeprocessing, imports all the geoprocessing functions
    into the pygeoprocessing namespace"""

import natcap.versioner
__version__ = natcap.versioner.get_version('pygeoprocessing')

import os
import unittest
import logging
import types

import pygeoprocessing.geoprocessing as geoprocessing
from geoprocessing import *

# Expose test()
from pygeoprocessing.tests import test

__all__ = []
for attrname in dir(geoprocessing):
    if type(getattr(geoprocessing, attrname)) is types.FunctionType:
        __all__.append(attrname)

LOGGER = logging.getLogger('pygeoprocessing')
LOGGER.setLevel(logging.DEBUG)

