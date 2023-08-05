import subprocess

from pytest import mark

from pytest_benchmark.utils import clonefunc
from pytest_benchmark.utils import get_commit_info
from pytest_benchmark.utils import parse_warmup

pytest_plugins = 'pytester',

f1 = lambda a: a


def f2(a):
    return a


@mark.parametrize('f', [f1, f2])
def test_clonefunc(f):
    assert clonefunc(f)(1) == f(1)
    assert clonefunc(f)(1) == f(1)


def test_clonefunc_not_function():
    assert clonefunc(1) == 1


@mark.parametrize('scm', ['git', 'hg'])
def test_get_commit_info(scm, testdir):
    subprocess.check_call([scm, 'init', '.'])
    if scm == 'git':
        subprocess.check_call('git config user.email you@example.com'.split())
        subprocess.check_call('git config user.name you'.split())
    else:
        testdir.tmpdir.join('.hg', 'hgrc').write("""
[ui]
username = you <you@example.com>
""")

    testdir.makepyfile('asdf')
    subprocess.check_call([scm, 'add', 'test_get_commit_info.py'])
    subprocess.check_call([scm, 'commit', '-m', 'asdf'])
    out = get_commit_info()

    assert out.get('dirty') == False
    assert 'id' in out

    testdir.makepyfile('sadf')
    out = get_commit_info()

    assert out.get('dirty') == True
    assert 'id' in out


def test_parse_warmup():
    assert parse_warmup('yes') == True
    assert parse_warmup('on') == True
    assert parse_warmup('true') == True
    assert parse_warmup('off') == False
    assert parse_warmup('off') == False
    assert parse_warmup('no') == False
    assert parse_warmup('') == True
    assert parse_warmup('auto') in [True, False]
