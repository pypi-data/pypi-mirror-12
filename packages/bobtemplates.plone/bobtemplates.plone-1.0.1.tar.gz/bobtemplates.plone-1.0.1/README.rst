Introduction
============

.. image:: https://secure.travis-ci.org/plone/bobtemplates.plone.png?branch=master
    :target: http://travis-ci.org/plone/bobtemplates.plone

.. image:: https://coveralls.io/repos/plone/bobtemplates.plone/badge.svg?branch=master&service=github
    :target: https://coveralls.io/github/plone/bobtemplates.plone?branch=master
    :alt: Coveralls

.. image:: https://img.shields.io/pypi/dm/bobtemplates.plone.svg
    :target: https://pypi.python.org/pypi/bobtemplates.plone/
    :alt: Downloads

.. image:: https://img.shields.io/pypi/v/bobtemplates.plone.svg
    :target: https://pypi.python.org/pypi/bobtemplates.plone/
    :alt: Latest Version

.. image:: https://img.shields.io/pypi/status/bobtemplates.plone.svg
    :target: https://pypi.python.org/pypi/bobtemplates.plone/
    :alt: Egg Status

.. image:: https://img.shields.io/pypi/l/bobtemplates.plone.svg
    :target: https://pypi.python.org/pypi/bobtemplates.plone/
    :alt: License

``bobtemplates.plone`` provides a `mr.bob`_ template to generate packages for Plone projects.

To create a package like ``collective.myaddon``::

    $ pip install bobtemplates.plone
    $ mrbob -O collective.myaddon bobtemplates:plone_addon

You can also create a package with nested namespace::

    $ mrbob -O collective.foo.myaddon bobtemplates:plone_addon


Options
=======

On creating a package you can choose from the following options. The default value is in [square brackets]:

Package Type? [Basic]
    Options are Basic, Dexterity and Theme.

Author's name
    Should be something like 'John Smith'.

Author's email
    Should be something like 'john@plone.org'.

Author's github username
    Should be something like 'john'.

Package description [An add-on for Plone]
    One-liner describing what this package does. Should be something like 'Plone add-on that ...'.

Plone version [4.3.7]
    Which Plone version would you like to use?


Features
========

Package created with ``bobtemplates.plone`` use the current best-practices when creating an addon.

Buildout
    The package is contained in a buildout that allows you to build Plone with the new package installed for testing-purposes.

Tests
    The package comes with a test setup and some `tests <http://docs.plone.org/external/plone.app.testing/docs/source/index.html>`_ for installing the package. It also contains a `robot-test <http://docs.plone.org/external/plone.app.robotframework/docs/source/index.html>`_ that tests logging in. The buildout also contains a config to allow testing the package on `travis <http://travis-ci.org/>`_ that sends `notifications <http://about.travis-ci.org/docs/user/notifications>`_ by email to the package autor.

Profile
    The package contains a `Generic Setup Profile <http://docs.plone.org/develop/addons/components/genericsetup.html>`_ that installs a browserlayer. For Plone 5 it also contains a uninstall-profile.

Locales
    The package registers a directory for locales.

Template-Overrides
    The package registers the folder ``browser/overrides`` as a directory where you can drop template-overrides using `z3c.jbot <https://pypi.python.org/pypi/z3c.jbot>`_.

Setuphandler
    The package contains a `setuphandlers.py <http://docs.plone.org/develop/addons/components/genericsetup.html?highlight=setuphandler#custom-installer-code-setuphandlers-py>`_ where you can add code that is executed on installing the package. For Plone 5 there is also a method in `setuphandler.py` that is run on uninstalling.

The package-types `Dexterity` and `Theme` add the following to `Basic`:

Dexterity
    Adds a simple content-type (you get asked about its name) in ``profiles/default/types/`` with a python-schema in ``interfaces.py``.

Theme
    Adds a simple bootstrap-based Diazo theme in the folder ``theme/`` and registers it in ``profiles/default/theme.xml``


Compatibility
=============

Addons created with ``bobtemplates.plone`` are tested to work in Plone 4.3.x and Plone 5.
They should also work with older versions but that was not tested.
It should work on Linux, Mac and Windows.


Installation
============

Use in a buildout
-----------------

::

    [buildout]
    parts += mrbob

    [mrbob]
    recipe = zc.recipe.egg
    eggs =
        mr.bob
        bobtemplates.plone


This creates a mrbob-executeable in your bin-directory.
Call it from the ``src``-directory of your Plone project like this.::

    $ ../bin/mrbob -O collective.foo bobtemplates:plone_addon


Installation in a virtualenv
----------------------------

You can also install ``bobtemplates.plone`` in a virtualenv.::

    $ pip install bobtemplates.plone

With ``pip 6.0`` or newer ``mr.bob`` will automatically be installed as a dependency. If you still use a older version of pip you need install ``mr.bob`` before ``bobtemplates.plone``.::

    $ pip install mr.bob

Now you can use it like this::

    $ mrbob -O collective.foo bobtemplates:plone_addon

See `mr.bob`_ documentation for further information.

.. _`mr.bob`: http://mrbob.readthedocs.org/en/latest/
