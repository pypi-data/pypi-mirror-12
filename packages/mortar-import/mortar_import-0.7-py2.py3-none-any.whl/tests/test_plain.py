from collections import namedtuple
from mock import Mock, call
from unittest import TestCase
from mortar_import.extractors import DictExtractor, NamedTupleExtractor
from testfixtures import compare, ShouldRaise
from mortar_import.diff import Diff


class TestPlain(TestCase):

    def test_abstract(self):
        with ShouldRaise(TypeError(
                "Can't instantiate abstract class Diff with abstract methods "
                "add, delete, extract_existing, extract_imported, update"
        )):
            Diff([], [])

    def make_differ(self):
        mock = Mock()

        class DiffTuple(Diff):
            def extract_existing(self, obj):
                return obj[0], (obj[0], obj[-1])

            extract_imported = extract_existing

            add = mock.add
            update = mock.update
            delete = mock.delete

        return DiffTuple, mock

    def test_tuple(self):

        DiffTuple, mock = self.make_differ()

        diff = DiffTuple(
            [('a', 1, 2), ('b', 3, 4), ('c', 5, 6)],
            [('b', 3, 4), ('c', 5, 7), ('d', 7, 8)]
        )

        compare([], mock.mock_calls)

        diff.apply()

        compare([
            call.delete('a', ('a', 1, 2), ('a', 2)),
            call.update('c', ('c', 5, 6), ('c', 6), ('c', 5, 7), ('c', 7)),
            call.add('d', ('d', 7, 8), ('d', 8)),
        ], mock.mock_calls)

    def test_post_actions(self):

        mock = Mock()

        class DiffTuple(Diff):
            def extract_existing(self, obj):
                return obj[0], obj

            extract_imported = extract_existing

            add = mock.add
            update = mock.update
            delete = mock.delete
            post_add = mock.post_add
            post_update = mock.post_update
            post_delete = mock.post_delete

        diff = DiffTuple(
            [('a1', 2), ('a2', 2),  ('c1', 6),  ('c2', 6)],
            [('c1', 7), ('c2', 7), ('d1', 8), ('d2', 8)]
        )

        compare([], mock.mock_calls)

        diff.apply()

        compare([
            call.delete('a1', ('a1', 2), ('a1', 2)),
            call.delete('a2', ('a2', 2), ('a2', 2)),
            call.post_delete(),
            call.update('c1', ('c1', 6), ('c1', 6), ('c1', 7), ('c1', 7)),
            call.update('c2', ('c2', 6), ('c2', 6), ('c2', 7), ('c2', 7)),
            call.post_update(),
            call.add('d1', ('d1', 8), ('d1', 8)),
            call.add('d2', ('d2', 8), ('d2', 8)),
            call.post_add(),
        ], mock.mock_calls)

    def test_compute(self):

        DiffTuple, mock = self.make_differ()

        diff = DiffTuple(
            [('a', 1, 2), ('b', 3, 4), ('c', 5, 6)],
            [('b', 3, 4), ('c', 5, 7), ('d', 7, 8)]
        )

        diff.compute()

        compare([('d', ('d', 7, 8), ('d', 8))],
                diff.to_add)
        compare([('c', ('c', 5, 6), ('c', 6), ('c', 5, 7), ('c', 7))],
                diff.to_update)
        compare([('a', ('a', 1, 2), ('a', 2))],
                diff.to_delete)

        compare([], mock.mock_calls)

    def test_duplicate_existing_key(self):

        DiffTuple, mock = self.make_differ()

        diff = DiffTuple([('a', 1, 2), ('a', 3, 4)], [])

        with ShouldRaise(
                KeyError("'a' occurs more than once in existing, "
                         "first was ('a', 2) from ('a', 1, 2), "
                         "next was ('a', 4) from ('a', 3, 4)")):
            diff.apply()

    def test_duplicate_imported_key(self):

        DiffTuple, mock = self.make_differ()

        diff = DiffTuple([], [('a', 1, 2), ('a', 3, 4)])

        with ShouldRaise(
                KeyError("'a' occurs more than once in imported, "
                         "first was ('a', 2) from ('a', 1, 2), "
                         "next was ('a', 4) from ('a', 3, 4)")):
            diff.apply()

    def test_dict(self):
        mock = Mock()

        class DiffTuple(Diff):

            extract_imported = extract_existing = DictExtractor('k')

            add = mock.add
            update = mock.update
            delete = mock.delete

        a = dict(k='a', v=1)
        b = dict(k='b', v=2)
        c = dict(k='c', v=3)
        c_ = dict(k='c', v=4)
        d = dict(k='d', v=5)

        diff = DiffTuple([a, b, c], [b, c_, d])
        diff.apply()

        compare([
            call.delete('a', a, a),
            call.update('c', c, c, c_, c_),
            call.add('d', d, d),
        ], mock.mock_calls)

    def test_dict_multi_key(self):
        mock = Mock()

        class DiffTuple(Diff):

            extract_imported = extract_existing = DictExtractor('k', 'k2')

            add = mock.add
            update = mock.update
            delete = mock.delete

        a = dict(k='a', k2=0, v=1)
        b = dict(k='b', k2=0, v=2)
        c = dict(k='c', k2=0, v=3)
        c_ = dict(k='c', k2=0, v=4)
        d = dict(k='d', k2=0, v=5)

        diff = DiffTuple([a, b, c], [b, c_, d])
        diff.apply()

        compare([
            call.delete(('a', 0), a, a),
            call.update(('c', 0), c, c, c_, c_),
            call.add(('d', 0), d, d),
        ], mock.mock_calls)

    def test_named_tuple(self):
        mock = Mock()

        X = namedtuple('X', 'foo bar')
        Y = namedtuple('Y', 'foo bar')

        class DiffTuple(Diff):

            extract_imported = extract_existing = NamedTupleExtractor('foo')

            add = mock.add
            update = mock.update
            delete = mock.delete

        aX = X('a', 1)
        bX = X('b', 2)
        cX = X('c', 3)
        bY = Y('b', 2)
        cY = Y('c', 4)
        dY = Y('d', 5)

        daX = dict(foo='a', bar=1)
        dcX = dict(foo='c', bar=3)
        dcY = dict(foo='c', bar=4)
        ddY = dict(foo='d', bar=5)

        diff = DiffTuple([aX, bX, cX], [bY, cY, dY])
        diff.apply()

        compare([
            call.delete(('a',), aX, daX),
            call.update(('c',), cX, dcX, cY, dcY),
            call.add(('d', ), dY, ddY),
        ], mock.mock_calls)
