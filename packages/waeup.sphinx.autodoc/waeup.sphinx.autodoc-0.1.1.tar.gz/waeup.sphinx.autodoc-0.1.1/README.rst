waeup.sphinx.autodoc
********************

|bdg-build|  | `sources <https://github.com/WAeUP/waeup.sphinx.autodoc>`_ | `issues <https://github.com/WAeUP/waeup.sphinx.autodoc/issues>`_

.. |bdg-build| image:: https://travis-ci.org/WAeUP/waeup.sphinx.autodoc.svg?branch=master
    :target: https://travis-ci.org/WAeUP/waeup.sphinx.autodoc
    :alt: Build Status

`waeup.sphinx.autodoc` is a Sphinx_ extension for autodocumenting
components/classes specific to Zope3_ and Grok_.

This project is in early state. Use with care.

Features available yet:

- When autodocumenting, ignore components with a dot in their
  name. This can greatly reduce the number of `AttributeErrors` you
  get (and you cannot tackle otherwise) when using Sphinx_ with
  Grok_ projects.

- New ``grokindexes`` autodocumenter documents `grok.Indexes` declarations.


.. contents::


Install
=======

This Python package can be installed via pip_::

  $ pip install waeup.sphinx.autodoc

Normally you will install `waeup.sphinx.autodoc` with your Zope3_ or
Grok_ project. It must be installed in a way, so that Sphinx_ can find
the package. The way depends on your project. For most projects it
will be sufficient to add `waeup.sphinx.autodoc` in the
`install_requires` dict of your ``setup.py``.

Usage
=====

Once installed, you can activate the package in the ``conf.py`` of
your local Sphinx_ sources::

  # conf.py
  #
  # ...
  #
  # Add any Sphinx extension module names here, as strings. They can be
  # extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
  # ones.
  extensions = [
      'sphinx.ext.autodoc',
      'waeup.sphinx.autodoc',
      # ...
  ]
  #
  # ...
  #

Please note, that you also have to activate `sphinx.ext.autodoc`,
which comes with Sphinx_ automatically.

`waeup.sphinx.autodoc` provides a new config var and new directives.

``ignore_dot_named_members``
----------------------------

This config value can be set in the `conf.py` of your project::

  # conf.py
  # ...
  ignore_dot_named_members = True
  # ...

Set to True by default. Avoids sphinx choking on member names with
dots in.

If set to `True`, we skip all member that have a dot in name,
i.e. members like `grokcore.component.directive`. Member names like
these are extensively used for instance by `grok`.

For `Sphinx` this is a problem, as it assumes that dots in names
denote member objects of a parent object. Lots of `AttributeErrors`
are the result.


``grokindexes``
---------------

This directive renders a `grok.Indexes` instance. As `grok.Indexes` is
normally an instance of some class and not a class, also any
`grok.Indexes` 'class' will not be recognized as class by stock
Sphinx_.

With `waeup.sphinx.autodoc` you can describe a `grok.Indexes` instance
in your code with the new `grokindexes` directive::

   .. grokindexes:: mymod.MyCatalog

        Description of MyCatalog

Autoscanning `grok.Indexes` instances is also possible. For that you
can use the `autogrokindexes`::

   .. autogrokindexes:: mymod.MyCatalog

Of course, in this case `mymod.MyCatalog` must be importable during
Sphinx_ run.


Developer Install
=================

For people that want to hack the `waeup.sphinx.autodoc` package
itself.

Developers can fork a clone from github::

  $ git clone https://github.com/WAeUP/waeup.sphinx.autodoc.git

We recommend to create and activate a virtualenv_ first::

  $ cd waeup.sphinx.autodoc
  $ virtualenv -p /usr/bin/python2.7 py27
  $ source py27/bin/activate
  (py27) $

We support Python versions 2.6, 2.7.

Now you can create the devel environment::

  (py27) $ python setup.py dev

This will fetch test packages (py.test_) and other packages needed to
run tests. As we need `grok` and other packages depending of lots of
other packages, unfortunately a *lot* of packages will be downloaded
and installed.

If download aborts, please keep calm and carry on by retrying.

Running Tests
-------------

After finishing this, you should be able to run tests::

  (py27) $ py.test

If you have different Python versions installed, you can use tox_ for
running tests against these::

  (py27) $ pip install tox  # only once
  (py27) $ tox

Should run tests in all officially supported Python versions.

::

  (py27) $ tox -e py26

will run tests with a special Python version (here: Python 2.6).


License
=======

This Python package is licensed under the GPL v3+.

Copyright (C) 2015 Uli Fouquet and WAeUP Germany.


.. _pip: https://pip.pypa.io/
.. _`Sphinx`: http://sphinx-doc.org/
.. _`Zope3`: http://www.zope.org/
.. _`Grok`: http://grok.zope.org/
.. _virtualenv: https://virtualenv.pypa.io/
.. _py.test: https://pytest.org/
.. _tox: https://tox.testrun.org/
