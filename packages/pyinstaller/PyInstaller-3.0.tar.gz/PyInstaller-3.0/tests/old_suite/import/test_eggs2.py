#-----------------------------------------------------------------------------
# Copyright (c) 2013, PyInstaller Development Team.
#
# Distributed under the terms of the GNU General Public License with exception
# for distributing bootloader.
#
# The full license is in the file COPYING.txt, distributed with this software.
#-----------------------------------------------------------------------------


# This file is part of the package for testing eggs in `PyInstaller`.


import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), 'zipped.egg'))

import pkg_resources

expected_data = 'This is data file for `zipped`.'.encode('ascii')

t = pkg_resources.resource_string('zipped_egg', 'data/datafile.txt')
assert t.rstrip() == expected_data

import zipped_egg
assert zipped_egg.data == expected_data

print('Okay.')
