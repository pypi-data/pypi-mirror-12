from __future__ import with_statement
from unittest import TestCase, main
from _ppeg import Pattern as P
import sys
from cStringIO import StringIO
from contextlib import contextmanager

@contextmanager
def stdout(fd):
    old = sys.stdout
    sys.stdout = fd
    yield fd
    sys.stdout = old

class TestBasic(TestCase):
    def testpat(self):
        p = P()
        self.assertEqual(type(p), P)
    def testdisplay(self):
        p = P.Any(1)
        with stdout(StringIO()) as s:
            p.display()
        self.assertNotEqual(s.getvalue(), '')

class TestEquivalents(TestCase):
    def testfail(self):
        self.assertEqual(P(None), P.Fail())
    def testany(self):
        self.assertEqual(P(1), P.Any(1))
        self.assertEqual(P(1000), P.Any(1000))
        self.assertEqual(P(-1), P.Any(-1))
        self.assertEqual(P(-1000), P.Any(-1000))
        self.assertEqual(P(0), P.Any(0))
    def testmatch(self):
        self.assertEqual(P("a"), P.Match("a"))
        self.assertEqual(P("abcdef"), P.Match("abcdef"))
        self.assertEqual(P(""), P.Match(""))
        self.assertEqual(P("a\0b"), P.Match("a\0b"))
    def testset(self):
        self.assertEqual(P(set=""), P.Set(""))
        self.assertEqual(P(set="ab12"), P.Set("ab12"))
        self.assertEqual(P(set="ab\0\1\2"), P.Set("ab\0\1\2"))
        self.assertEqual(P(set="abc"), P(set=u"abc"))
    def testrange(self):
        self.assertEqual(P(range=""), P.Range(""))
        self.assertEqual(P(range="azAZ"), P.Range("azAZ"))
        self.assertEqual(P(range="\0\255"), P.Range("\0\255"))
        self.assertEqual(P(range="ac"), P(range=u"ac"))

class TestInitChecks(TestCase):
    def testtoomany(self):
        self.assertRaises(TypeError, P, 1, set="ab")
        self.assertRaises(TypeError, P, 1, range="ab")
        self.assertRaises(TypeError, P, range="az", set="ab")
    def testtype(self):
        self.assertRaises(TypeError, P, set())
        # Maybe this should work (by converting to string, like set/range)
        self.assertRaises(TypeError, P, u"unicode")
        self.assertRaises(TypeError, P, 1.5)
    def testset(self):
        self.assertRaises(TypeError, P, set=12)
        self.assertRaises(TypeError, P, set=None)
    def testrange(self):
        self.assertRaises(TypeError, P, range=12)
        self.assertRaises(TypeError, P, range=None)
        self.assertRaises(ValueError, P, range=u"abc")
        self.assertRaises(ValueError, P, range="abc")

class TestBuild(TestCase):
    def match(self, pat, items):
        self.assertEqual([i[0] for i in pat.dump()], items + ['end'])
    def testany(self):
        self.match(P.Any(0), [])
        self.match(P.Any(1), ['any'])
        # Negative self.match - any & fail
        self.match(P.Any(-1), ['any', 'fail'])
        # Overflow - max of 255 per opcode
        self.match(P.Any(300), ['any', 'any'])
    def testmatch1(self):
        self.match(P.Match('a'), ['char'])
    def testmatch2(self):
        self.match(P.Match('ab'), ['char', 'char'])
    def testfail(self):
        self.match(P.Fail(), ['fail'])
    def testset(self):
        p = P.Set("abdef")
        self.match(p, ['set'])
        self.assertEqual([p(s).pos for s in "abcdefgh"],
                [1, 1, -1, 1, 1, 1, -1, -1])
    def testrange(self):
        p = P.Range("bceg")
        self.match(p, ['set'])
        self.assertEqual([p(s).pos for s in "abcdefgh"],
                [-1, 1, 1, -1, 1, 1, 1, -1])

class TestConcat(TestCase):
    def testany(self):
        p1 = P.Any(2)
        p2 = P.Any(1) + P.Any(1)
        self.assertEqual(p1.dump(), p2.dump())
    def testid(self):
        p1 = P.Dummy()
        p2 = P() + p1
        self.assertEqual(p1.dump(), p2.dump())
        p2 = p1 + P()
        self.assertEqual(p1.dump(), p2.dump())
    def testfail(self):
        p1 = P.Dummy()
        p2 = P.Fail() + p1
        self.assertEqual(p2.dump(), P.Fail().dump())
        p2 = p1 + P.Fail()
        self.assertEqual(p2.dump(), P.Fail().dump())
    def testmatch(self):
        splits = [
            ('a', 'bcd'),
            ('ab', 'cd'),
            ('abc', 'd'),
            ('a', '', 'bcd'),
            ('a', 'b', 'cd'),
            ('a', 'bc', 'd'),
            ('ab', '', 'cd'),
            ('ab', 'c', 'd'),
            ('abc', '', 'd'),
            ('a', 'b', 'c', 'd'),
        ]
        p1 = P.Match("abcd")
        for split in splits:
            p2 = P.Match(split[0])
            for s in split[1:]:
                p2 = p2 + P.Match(s)
            self.assertEqual(p1.dump(), p2.dump())
            p2 = P.Match('')
            for s in split:
                p2 = p2 + P.Match(s)
            self.assertEqual(p1.dump(), p2.dump())
            p2 = P.Match(split[0])
            for s in split[1:]:
                p2 = p2 + P.Match(s)
            p2 = p2 + P.Match('')
            self.assertEqual(p1.dump(), p2.dump())

class TestAnd(TestCase):
    def match(self, pat, items):
        self.assertEqual([i[0] for i in pat.dump()], items + ['end'])
    def testtrue(self):
        self.match(+P(), [])
    def testfail(self):
        self.match(+P.Fail(), ['fail'])
    def testanycset(self):
        # &Any(1) is a 0-length match of any character. This is
        # optimised as a match against a character set with every bit set -
        # if the match succeeds, the pattern fails.
        self.match(+P.Any(1), ['set', 'fail'])
    def testother(self):
        self.match(+P.Any(5), ['choice', 'any', 'back_commit', 'fail'])
    def testlonger(self):
        p = P.Any(1) + P.Match('ab')
        self.match(+p, ['choice', 'any', 'char', 'char', 'back_commit', 'fail'])

class TestPow(TestCase):
    # TODO: Add more tests!!!
    def match(self, pat, items):
        self.assertEqual([i[0] for i in pat.dump()], items + ['end'])
    def testsimple(self):
        self.match(P.Any(1) ** 3, ['any', 'any', 'any', 'span'])
    def testmatch(self):
        p = P.Match("foo") ** 0
        self.assertEqual(p("boofoo").pos, 0)
        self.assertEqual(p("foofoo").pos, 6)

class TestDiff(TestCase):
    def match(self, pat, items):
        self.assertEqual([i[0] for i in pat.dump()], items + ['end'])
    def testtrue(self):
        self.match(-P(), ['fail'])
    def testfail(self):
        self.match(-P.Fail(), [])
    def testdiff(self):
        # Not an obvious translation - the optimizer hits us. This has been
        # validated against the Lua lpeg implementation
        p = P.Match('bc') - P.Match('ef')
        self.match(p, ['char', 'choice', 'char', 'failtwice', 'char', 'char'])

class TestCapture(TestCase):
    def captype(self, n, p):
        return p.dump()[n][1] & 0xF
    def match(self, pat, items):
        self.assertEqual([i[0] for i in pat.dump()], items + ['end'])
    def testfullcap(self):
        p = P.Cap(P.Any(1))
        self.match(p, ['any', 'fullcapture'])
        off = p.dump()[1][2]
        # Csimple == 5
        self.assertEqual(self.captype(1, p), 5)
        self.assertEqual(off, 0)
    def testopenclose(self):
        p = P.Cap(P.Any(1)**1)
        self.match(p, ['any', 'opencapture', 'span', 'closecapture'])
        off = p.dump()[1][2]
        # Csimple == 5
        self.assertEqual(self.captype(1, p), 5)
        self.assertEqual(off, 0)
    def testtypes(self):
        self.assertEqual(self.captype(0, P.CapP()), 1)
        self.assertEqual(self.captype(0, P.CapA(1)), 4)
        self.assertEqual(self.captype(1, P.CapT(P.Any(1))), 6)
        self.assertEqual(self.captype(1, P.CapS(P.Any(1))), 10)

class TestMatch(TestCase):
    def testdummy(self):
        p = P.Dummy()
        self.assertEqual(p("aOmega").pos, 6)
    def testany(self):
        p = P.Any(0)
        self.assertEqual(p("fred").pos, 0)
        p = P.Any(1)
        self.assertEqual(p("fred").pos, 1)
        p = P.Any(-1)
        self.assertEqual(p("fred").pos, -1)
        p = P.Any(-1)
        self.assertEqual(p("").pos, 0)
    def testmatch(self):
        p = P.Match("fred")
        self.assertEqual(p("fred").pos, 4)
        self.assertEqual(p("freddy").pos, 4)
        self.assertEqual(p("jim").pos, -1)
    def testfail(self):
        p = P.Fail()
        self.assertEqual(p("jim").pos, -1)
        self.assertEqual(p("").pos, -1)

class TestCaptureRet(TestCase):
    def testpos(self):
        p = P.Any(3) + P.CapP() + P.Any(2) + P.CapP()
        self.assertEqual(p("abcdef").captures, [3, 5])
    def testarg(self):
        p = P.CapA(1) + P.CapA(3) + P.CapA(2)
        self.assertEqual(p("abcdef", 1, "hi", None).captures, [1, None, "hi"])
    def testconst(self):
        p = P.CapC(["foo", 1, None, "bar"])
        self.assertEqual(p("abcdef").captures, [["foo", 1, None, "bar"]])
    def testsimple(self):
        p = P.Any(1) + P.Cap(P.Any(2))
        self.assertEqual(p("abc").captures, ["bc"])
        self.assertEqual(P.Cap(p)("abc").captures, ["abc", "bc"])
    def testsubst(self):
        p = P.Any(1) + P.CapS(P.CapP() + P.Any(2))
        self.assertEqual(p("abc").captures, ["1bc"])
        self.assertEqual(P.Cap(p)("abc").captures, ["abc", "1bc"])

class TestOpenCall(TestCase):
    def testopencall(self):
        p = P.Var("Unset")
        self.assertRaises(RuntimeError, p, "test")

class TestGrammar(TestCase):
    def testsimple(self):
        p = P.Any(1)
        pg = P.Grammar(p)
        self.assertEqual(pg("ab").pos, 1)
    def testnamedrule(self):
        p = P.Grammar(P.Var("a") + P.Var("a"), a=P(1))
        self.assertEqual(p("ab").pos, 2)
    def testexplicitstart(self):
        p = P.Grammar(P.Var("a") + P.Var("a"), a=P(1), start="a")
        self.assertEqual(p("ab").pos, 1)
    def testpositionalrules(self):
        p = P.Grammar(P.Var(1) + P.Var(2), P(1), P(1))
        self.assertEqual(p("ab").pos, 2)
    def testleftrecursion(self):
        self.assertRaises(RuntimeError, P.Grammar, P.Var(0) + P(1))

class TestDummy(TestCase):
    def testbuilddummy(self):
        patt = P.Grammar(P.Match("Omega") | P.Any(1) + P.Var(0))
        d = P.Dummy()
        self.assertEqual(patt.dump(), d.dump())

def lines(str):
    return [l.strip() for l in str.strip().splitlines()]

class TestCaptureBug(TestCase):
    def testbug001(self):
        p = P.Grammar(P.Match("Omega") | P.Any(1) + P.Var(0))
        p2 = P.CapC("hello") + p | P.CapC(12)
        with stdout(StringIO()) as s:
            p2.display()
        expected = """\
00: choice -> 15 (0)
01: emptycaptureidx constant(n = 0)  (off = 1)
02: call -> 4
03: jmp -> 14
04: char 'O'-> 11
05: choice -> 11 (1)
06: char 'm'-> FAIL
07: char 'e'-> FAIL
08: char 'g'-> FAIL
09: char 'a'-> FAIL
10: commit -> 13
11: any * 1-> FAIL
12: jmp -> 4
13: ret
14: commit -> 16
15: emptycaptureidx constant(n = 0)  (off = 3)
16: end
"""
        result = s.getvalue()
        for l1, l2 in zip(lines(result), lines(expected)):
            self.assertEqual(l1, l2)

class TestSubclass(TestCase):
    class T(P):
        pass
    def testcreation(self):
        T = self.T
        self.assertEqual(T(1), P(1))
        self.assertEqual(type(T(1)), T)
        self.assert_(isinstance(T(1), P))
    def testassert(self):
        T = self.T
        self.assert_(isinstance(+T(1), T))
    def testnegate(self):
        T = self.T
        self.assert_(isinstance(-T(1), T))
    def testconcat(self):
        T = self.T
        self.assert_(isinstance(T(1) + T(1), T))
        self.assert_(isinstance(T(1) + P(1), T))
    def testchoice(self):
        T = self.T
        self.assert_(isinstance(T(1) | T(1), T))
        self.assert_(isinstance(T(1) | P(1), T))
    def testdiff(self):
        T = self.T
        self.assert_(isinstance(T(1) - T(1), T))
        self.assert_(isinstance(T(1) - P(1), T))
    def testpow(self):
        T = self.T
        self.assert_(isinstance(T(1) ** 1, T))

class TestCoercion(TestCase):
    def testconcat(self):
        self.assertEqual(P(1)+1, 1+P(1))
        self.assertEqual(P("a")+1, "a"+P(1))
        self.assertEqual(P(None)+1, None+P(1))
    def testchoice(self):
        self.assertEqual(P(1)|1, 1|P(1))
        self.assertEqual(P("a")|1, "a"|P(1))
        self.assertEqual(P(None)|1, None|P(1))
    def testdiff(self):
        self.assertEqual(P(1)-1, 1-P(1))
        self.assertEqual(P("a")-1, "a"-P(1))
        self.assertEqual(P(None)-1, None-P(1))

class TestGroupCap(TestCase):
    def testsimple(self):
        self.assertEqual(P.CapG(P(1))("a").captures, ["a"])
    def testnamed(self):
        self.assertEqual(P.CapG(P(1), "dummy")("a").captures, [])
    def testbackref(self):
        p = P.CapG(P(1), "dummy") + P.CapB("dummy") + P.CapB("dummy")
        self.assertEqual(p("a").captures, ["a", "a"])
    def testunknownbackref(self):
        p = P.CapG(P(1), "dummy") + P.CapB("unknown")
        self.assertRaises(RuntimeError, p, "a")

class TestOtherCap(TestCase):
    def testquery(self):
        tbl = dict(a="fail", bc="result", ab="fail")
        p = P(1) + P.Cap(P(2))
        self.assertEqual((p/tbl)("abcdef").captures, ["result"])
    def testfunction(self):
        def fn(s):
            return s.upper()
        p = P(1) + P.Cap(P(2))
        self.assertEqual((p/fn)("abcdef").captures, ["BC"])
    def testfold(self):
        def fn(a, v):
            return a + ", " + v.upper()
        p = P.CapF(P(1) + (P.Cap(P(2))**1), fn)
        # Note: Initial value is unchanged!
        self.assertEqual(p("abcdefg").captures, ["bc, DE, FG"])
    def testfolddummyaccum(self):
        def fn(a, v):
            a.append(v.upper())
            return a
        p = P.CapF(P.CapC([]) + P(1) + (P.Cap(P(2))**1), fn)
        self.assertEqual(p("abcdefg").captures, [["BC", "DE", "FG"]])

class TestRuntimeCap(TestCase):
    def testbasic(self):
        matchone = P.Cap(P(1))
        # Icky interface :-(
        def fn(str, rest, pos, caps):
            if (rest.startswith(caps[0])):
                return pos+len(caps[0])
            return None
        matchtwo = P.CapRT(matchone, fn)
        self.assertEqual(matchtwo("aa").pos, 2)
        self.assertEqual(matchtwo("aab").pos, 2)
        self.assertEqual(matchtwo("ab").pos, -1)

if __name__ == '__main__':
    main()
