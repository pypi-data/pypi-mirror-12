"""
Copyright (c) 2015 Maciej Nabozny

This file is part of CloudOver project.

OverCluster is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
"""

import os
import sys

def setup_module(module):
    os.environ['DJANGO_SETTINGS_MODULE'] = 'overCluster.settings'
    sys.path.append('/etc/cloudOver/')
    sys.path.append('/usr/lib/cloudOver/')

def teardown_module(module):
    pass

def setup_function(function):
    pass

def teardown_function(function):
    pass

def test_to_dict():
    from overCluster.models.core.task import Task
    t = Task()
    t.set_prop('x', 1)
    t.set_prop('y', 2)
    d = t.to_dict
    assert 'data' in d
    assert 'type' in d
    assert 'action' in d