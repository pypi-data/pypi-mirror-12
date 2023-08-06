# -*- coding: utf-8 -*-

from __future__ import print_function, division, absolute_import

import os
import sys
import unittest

from ..__main__ import GenerateReqs
from ..reqs import is_stdlib


class ReqsTests(unittest.TestCase):

    def setUp(self):
        self._installed_packages = {
            'foo': ('Foo', '0.1.0'),
            'bar': ('Bar', '1.1.1'),
            'baz': ('Baz', '2.2.2'),
        }
        self._module_infos = {
            'os': ['pigar/tests/imports_example/example1.py: 3'],
            'sys': ['pigar/tests/imports_example/example1.py: 4'],
            'collections': ['pigar/tests/imports_example/example1.py: 5'],
            'foobar': ['pigar/tests/imports_example/example1.py: 7'],
            'FooBar': ['pigar/tests/imports_example/example1.py: 7'],
            'Foo': ['pigar/tests/imports_example/example1.py: 10'],
            'Bar': ['pigar/tests/imports_example/example1.py: 13'],
            'Baz': ['pigar/tests/imports_example/example1.py: 29'],
            'json': ['pigar/tests/imports_example/example1.py: 17'],
            'itertools': ['pigar/tests/imports_example/example1.py: 23'],
            'Queue': ['pigar/tests/imports_example/example1.py: 35'],
            'bisect': ['pigar/tests/imports_example/example1.py: 37'],
            'urlparse': ['pigar/tests/imports_example/example2.py: 4'],
            'urllib': ['pigar/tests/imports_example/example2.py: 6'],
            '__builtin__': ['pigar/tests/imports_example/example2.py: 8'],
            'builtins': ['pigar/tests/imports_example/example2.py: 10'],
            'example1': ['pigar/tests/imports_example/example2.py: 12'],
        }
        if sys.version_info[0] == 2:
            self._installed_packages.update({'foobar': ('FooBar', '3.6.9')})
        self._path = os.path.abspath(
            os.path.join(os.path.dirname(__file__), 'imports_example/'))

    def tearDown(self):
        del self._installed_packages
        del self._path
        del self._module_infos

    @unittest.skipIf(sys.version_info[0] != 3, 'Not python 3.x')
    def test_py3_reqs(self):
        pv = {k: v for k, v in self._installed_packages.values()}
        reqs, guess = self._extract_reqs()
        self.assertListEqual(sorted(reqs.keys()), sorted(pv.keys()))
        # Assume 'foobar' is Py3 builtin package, no need install.
        self.assertListEqual(
            sorted(guess.keys()),
            sorted(['Queue', '__builtin__', 'foobar', 'urlparse']))
        self._check_detail(reqs, pv)
        self._check_detail(guess, pv, False)

    @unittest.skipIf(sys.version_info[0] != 2, 'Not python 2.x')
    def test_py2_reqs(self):
        self._installed_packages.update({'foobar': ('FooBar', '3.3.3')})
        pv = {k: v for k, v in self._installed_packages.values()}
        reqs, guess = self._extract_reqs()
        self.assertListEqual(sorted(reqs.keys()), sorted(pv.keys()))
        self.assertListEqual(guess.keys(), ['builtins'])
        self._check_detail(reqs, pv)
        self._check_detail(guess, pv, False)

    def _check_detail(self, reqs_mods, pv, version=True):
        for pkg, detail in reqs_mods.items():
            if version:
                if pkg not in pv:
                    self.fail('"{0}" not installed'.format(pkg))
                self.assertEqual(detail.version, pv[pkg])
            self.assertListEqual(
                sorted(detail.comments), sorted(self._module_infos[pkg]))

    def _extract_reqs(self):
        gr = GenerateReqs('', self._path, [], self._installed_packages)
        return gr.extract_reqs()


class StdlibTest(unittest.TestCase):

    def test_stdlib(self):
        self.assertTrue(is_stdlib('os'))
        self.assertTrue(is_stdlib('sys'))
