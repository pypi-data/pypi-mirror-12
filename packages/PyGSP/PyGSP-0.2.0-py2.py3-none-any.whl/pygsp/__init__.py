# -*- coding: utf-8 -*-

"""
Package documentation.
"""

# When importing the toolbox, you surely want these modules.
from pygsp import graphs
from pygsp import operators
from pygsp import utils
from pygsp import filters
from pygsp import pointsclouds
from pygsp import data_handling
from pygsp import optimization
from pygsp import reduction
from pygsp import plotting

# Silence the code checker warning about unused symbols.
assert graphs
assert operators
assert utils
assert filters
assert pointsclouds
assert data_handling
assert optimization
assert reduction
assert plotting

__version__ = '0.2.0'
__email__ = 'LTS2Graph@groupes.epfl.ch'
__release_date__ = '2015-10-05'
