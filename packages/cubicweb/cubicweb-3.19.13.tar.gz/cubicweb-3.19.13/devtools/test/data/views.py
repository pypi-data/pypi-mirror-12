# copyright 2003-2012 LOGILAB S.A. (Paris, FRANCE), all rights reserved.
# contact http://www.logilab.fr/ -- mailto:contact@logilab.fr
#
# This file is part of CubicWeb.
#
# CubicWeb is free software: you can redistribute it and/or modify it under the
# terms of the GNU Lesser General Public License as published by the Free
# Software Foundation, either version 2.1 of the License, or (at your option)
# any later version.
#
# CubicWeb is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
# FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more
# details.
#
# You should have received a copy of the GNU Lesser General Public License along
# with CubicWeb.  If not, see <http://www.gnu.org/licenses/>.
"""only for unit tests !"""

from cubicweb.view import EntityView
from cubicweb.predicates import is_instance

HTML_PAGE = u"""<html>
  <body>
    <h1>Hello World !</h1>
  </body>
</html>
"""

class SimpleView(EntityView):
    __regid__ = 'simple'
    __select__ = is_instance('Bug',)

    def call(self, **kwargs):
        self.cell_call(0, 0)

    def cell_call(self, row, col):
        self.w(HTML_PAGE)

class RaisingView(EntityView):
    __regid__ = 'raising'
    __select__ = is_instance('Bug',)

    def cell_call(self, row, col):
        raise ValueError()
