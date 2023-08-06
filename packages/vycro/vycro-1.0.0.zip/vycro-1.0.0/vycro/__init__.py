"""File contains package initialization data."""

from __future__ import absolute_import, division, print_function
from .wrappers import MacroWrapper

from vycro.__about__ import (
    __author__, __copyright__, __email__, __license__, __summary__, __title__,
    __uri__, __version__
)

__all__ = [
    '__title__', '__summary__', '__uri__', '__version__', '__author__',
    '__email__', '__license__', '__copyright__', 'wrappers'
]
