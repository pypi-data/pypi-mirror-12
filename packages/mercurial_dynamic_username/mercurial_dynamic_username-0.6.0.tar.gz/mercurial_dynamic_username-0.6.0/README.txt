.. -*- mode: rst -*-

====================================
Mercurial Dynamic Username
====================================

Use different commit username per directory tree.

With this extension you may commit as ``John Smith
<john.smith@serious.com>`` in trees below ``~/work``, and as ``Johny
<fastjohny@fantasy.net>`` in code lying in ``~/hobby`` - and set this
rule once, in ``~/.hgrc``.

Example
=====================

Install the extension (``pip install mercurial_dynamic_username`` or 
just download ``dynamic_username.py``).

Write in your ``~/.hgrc``::

    [extensions]
    dynamic_username =

    [dynamic_username]
    work.location = ~/work
    work.username = John Smith <john.smith@serious.com>
    hobby.location = ~/hobby ~/blogging
    hobby.username = Johny <fastjohny@fantasy.net>

and just commit. In any repository lying below ``~/work`` you will commit as
``John Smith``, in repos below ``~/hobby`` as ``Johny``, elsewhere default
setting (``username`` from ``[ui]``) will be used.

Configuration syntax
=====================

All settings are defined in ``[dynamic_username]`` section, and have
the following form::

    «somelabel».location = «list of directory names»
    «somelabel».username = «username used there»

Labels are used only to join those two settings in pairs.

Directory names specified in ``location`` are space or colon separated
(using standard Mercurial ways of parsing lists in the
config). Repository match the rule if it lies within directory tree(s)
specified here. Tildas (``~/..`` and ``~john/...``) are expanded.

Usernames have the same syntax as standard ``username``.

Specifying location without username asks extension to revert to standard
username, for example::

    [ui]
    username = Jake <jake@loose.net>

    [dynamic_username]
    work.location = ~/work
    work.username = John Smith <john.smith@serious.com>
    open.location = ~/work/open-source

will commit as ``John Smith`` in ``~/work/libs/veryimportant``, but
will revert to default ``Jake`` in ``~/work/open-source/libshared``.

Match priority
==================================================

If more than one location matches repository, longest one is used
(like in the ``open-source`` example above). *Longest* is selected
using actual canonical path after tilda expansion (``~/work/sth`` is
longer than ``/home/littlejohny/work``).

Dynamic usernames currently always win against ``[ui]``-section
``username``, even if the latter is defined in per-repository
``.hg/hgrc``. I would gladly give priority to the latter, but I have
no idea how to detect that without re-parsing configuration.

Testing configuration effects
==================================================

You can test effects by callling::

    hg showconfig ui.username

(results should vary depending on the repository).

History
==================================================

None yet.

Development, bug reports, enhancement suggestions
===================================================

Development is tracked on BitBucket, see 
http://bitbucket.org/Mekk/mercurial-dynamic_username/

Use BitBucket issue tracker for bug reports and enhancement
suggestions.

Additional notes
================

Information about this extension is also available
on Mercurial Wiki: http://mercurial.selenic.com/wiki/DynamicUsernameExtension

.. _Mercurial: http://mercurial.selenic.com
