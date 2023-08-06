==========
Html utils
==========

.. image:: https://travis-ci.org/zenwalker/python-htmlutils.svg
   :target: https://travis-ci.org/zenwalker/python-htmlutils
   :alt: Build Status


Usage
=====

tags.tag(content: str, **attrs) -> str
--------------------------------------

Render HTML tags as ``tags.h1('hello', _class='heading')``.

htmlutils.parse_attrs(attrs: str) -> dict
-----------------------------------------

Parse a string like ``class="input" type="text" required`` into ``dict``.

htmlutils.render_attrs(attrs: dict) -> str
------------------------------------------

Render ``dict`` to string like ``class="input" type="text" required``.


Running tests
=============

::

    $ python -m unittest tests/test_html.py
