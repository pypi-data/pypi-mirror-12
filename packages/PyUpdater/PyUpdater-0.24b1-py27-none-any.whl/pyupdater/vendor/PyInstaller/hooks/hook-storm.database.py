#-----------------------------------------------------------------------------
# Copyright (c) 2013, PyInstaller Development Team.
#
# Distributed under the terms of the GNU General Public License with exception
# for distributing bootloader.
#
# The full license is in the file COPYING.txt, distributed with this software.
#-----------------------------------------------------------------------------


"""
Hook for storm ORM.
"""


hiddenimports = [
    'storm.databases.sqlite',
    'storm.databases.postgres',
    'storm.databases.mysql'
    ]
