Seantis Events Portlet
======================

.. image:: https://api.travis-ci.org/seantis/seantis.dir.eventsportlet.png?branch=master
  :target: https://travis-ci.org/seantis/seantis.dir.eventsportlet
  :alt: Build Status

.. image:: https://coveralls.io/repos/seantis/seantis.dir.eventsportlet/badge.png
  :target: https://coveralls.io/r/seantis/seantis.dir.eventsportlet
  :alt: Project Coverage

.. image:: https://img.shields.io/pypi/v/seantis.dir.eventsportlet.svg
  :target: https://pypi.python.org/pypi/seantis.dir.eventsportlet
  :alt: Latest PyPI Release


Portlet for displaying events.

The portlet (seantis.dir.eventsportlet) shows events coming from a directory of
events (seantis.dir.events).

Warning! Using multiple categories together with older calendars might result
in errors on the event calendar. You still might use the new version of the
portlet by assuring, only one category is set.

Dependencies
------------

seantis.dir.eventsportlet relies on Plone 4.3+ with dexterity.


Installation
------------

1. Use Plone 4.3 or newer

::

    extends =
        http://dist.plone.org/release/4.3/versions.cfg

2. Add the module to your instance eggs

::

    [instance]
    eggs +=
        seantis.dir.eventsportlet


3. Ensure that the i18n files are compiled by adding

::

    [instance]
    ...
    environment-vars =
        ...
        zope_i18n_compile_mo_files true


4. Install dexterity and seantis.dir.eventsportlet using portal_quickinstaller


License
-------
seantis.dir.eventsportlet is released under GPL v2
