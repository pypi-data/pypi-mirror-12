"""
Utilities
---------

This package contains helper functions that did not fit into any other packages.
These functions include helper functions for common operations when dealing with :mod:`sympy`,
as well as functions that help with memoisation of CPU intensive function results.

These functions are designed to be package-specific.
The users of the software are generally discouraged to use any of these functions.
"""

import sympyhelpers
from memoisation import MemoisableObject, memoised_property
import memoisation
import decorators
from decorators import cache