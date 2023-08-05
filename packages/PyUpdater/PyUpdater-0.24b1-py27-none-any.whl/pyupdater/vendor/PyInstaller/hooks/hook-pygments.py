#-----------------------------------------------------------------------------
# Copyright (c) 2005-2015, PyInstaller Development Team.
#
# Distributed under the terms of the GNU General Public License with exception
# for distributing bootloader.
#
# The full license is in the file COPYING.txt, distributed with this software.
#-----------------------------------------------------------------------------


"""
PyInstaller hook file for Pygments. Tested with version 2.0.2.
"""

from PyInstaller.utils.hooks import collect_submodules

# The following applies to pygments version 2.0.2, as reported by ``pip show
# pygments``.
#
# From pygments.formatters, line 37::
#
#    def _load_formatters(module_name):
#        """Load a formatter (and all others in the module too)."""
#        mod = __import__(module_name, None, None, ['__all__'])
#
# Therefore, we need all the modules in ``pygments.formatters``.

hiddenimports = collect_submodules('pygments.formatters')
hiddenimports.extend(collect_submodules('pygments.lexers'))
hiddenimports.extend(collect_submodules('pygments.styles'))
