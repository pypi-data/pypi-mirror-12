.. -*- mode: rst -*-

======================
Mercurial Path Pattern
======================

Don't repeat yourself defining ``[paths]`` over many repositories,
specify the general rule once in ``~/.hgrc``.

``path_pattern`` is a Mercurial_ extension used to define default
remote path aliases. You may find it helpful if you maintain
consistently layed out repository trees on a few machines.

Typical use case
=====================

Install the extension (``sudo pip install mercurial_path_pattern`` or just
download ``path_pattern.py`` and drop it somewhere).

Write in your ``~/.hgrc``::

    [extensions]
    path_pattern =

    [path_pattern]
    lagrange.local = ~/devel/{repo}
    lagrange.remote =  ssh://johny@lagrange.mekk.net/sources/{repo}

Imagine ``~/devel/pymodules/acme`` and ``~/devel/personal/blog/drafts``
are both some mercurial repositories. Then::

    cd ~/devel/pymodules/acme
    hg pull lagrange
    # Works, pulls from ssh://johny@lagrange.mekk.net/sources/pymodules/acme

    cd ~/devel/personal/blog/drafts
    hg push lagrange
    # Works, pushes to ssh://johny@lagrange.mekk.net/sources/personal/blog/drafts

Note: path ``lagrange`` need not be defined in any of those
repositories (they may even lack ``.hg/hgrc`` at all).

For two repositories that's not very useful, but once you have hundred
of them, managing individual ``.hg/hgrc`` becomes a hassle (imaginge
changing ``lagrange.mekk.net`` to ``lagrange.mekk.com`` everywhere, or
maybe adding second remote alias for new development machine).

Path patterns have lower priority than per-repository paths, so in case
you define ``lagrange`` path in some repo, it won't be overwritten.

There is also::

    hg cloneto lagrange
    # Equivalent to 
    #   hg clone . ssh://ssh://johny@lagrange.mekk.net/sources/pymodules/acme
    # but noticeably shorter

(the latter works also for normal paths).

Commands
=====================

Extension mostly works behind the courtains, making standard commands
like ``hg pull``, ``hg push``, and ``hg incoming`` aware of extra
paths. In particular, ``hg paths`` includes generated paths and can be
used to check whether they are correct.

You may also use::

    hg list_path_patterns

to check which patterns you configured.

Finally::

    hg cloneto alias

looks up alias among paths (both pattern-based, and normal) and issues
clone to this path. It is equivalent to ``hg clone . «alias
expansion»``). In case alias is not defined, it fails.



Pattern syntax
=====================

Patterns are defined in ``[path_pattern]`` section of mercurial
configuration file (typically they are kept in ``~/.hgrc``, but feel
free to define them system-wide).

You may have as many patterns as you like. Example::

    [path_pattern]
    lagrange.local = ~/devel/{repo}
    lagrange.remote =  ssh://johny@lagrange.mekk.net/sources/{repo}
    euler.local = ~/devel/{repo}
    euler.remote =  ssh://johny@euler.mekk.net/devel/{repo}/hg
    wrk.local = ~/work/{what}
    wrk.remote =  https://tim@devel-department.local/{what}
    ugly.local = ~/{topic}/sources/{subpath}/repo
    ugly.remote = ssh://hg{topic}@devel.local/{topic}/{subpath}

Every pattern is defined by the pair of keys - ``«alias».local`` and
``«alias».remote``. 

Local part should specify local path of the repository (absolute path,
``~`` and ``~user`` are allowed). Some part(s) of the path should
be replaced with ``{marker}`` (those will be available to use in path
definition). Typically there will be single marker on the end, but
more obscure patterns are possible (as ``ugly`` above illustrates).

Remote part defines appropriate remote address. This is typical
Mercurial remote path, where ``{marker}``'s can be used to copy
parts of local path.

While processing patterns, the extension matches current repository
root path against local part of the pattern, and if it matches,
extracts parts marked with markers and fills remote part with them.

For example, with definitions above, if you happen to issue ``hg paths``
in repository ``~/devel/python/libs/webby``, the extension will:

1. Find that ``lagrange.local`` matches and that ``{repo}`` is
   ``python/libs/webby``.   Filling ``lagrange.remote`` with
   that value generates
   ``ssh://johny@lagrange.mekk.net/sources/python/libs/webby``, so
   finally it will create path alias
   ``lagrange=ssh://johny@lagrange.mekk.net/sources/python/libs/webby``;

2. Similarly  discover that ``euler.local`` matches, and after
   copying ``{repo}`` define path
   ``euler=ssh://johny@euler.mekk.net/devel/python/libs/webby/hg``;

3. Ignore remaining patterns as they do not match.

Local paths are matched to patterns with naive text matching, in
particular ``/`` are treated as any other character. This may change
in the future in case there is a true need.

Development, bug reports, enhancement suggestions
===================================================

Development is tracked on BitBucket, see 
http://bitbucket.org/Mekk/mercurial-path_pattern/

Use BitBucket issue tracker for bug reports and enhancement
suggestions.

Additional notes
================

Information about this extension is also available
on Mercurial Wiki: http://mercurial.selenic.com/wiki/PathPatternExtension

.. _Mercurial: http://mercurial.selenic.com
