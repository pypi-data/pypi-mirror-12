Misaka
======

.. image:: https://secure.travis-ci.org/FSX/misaka.png?branch=master

The Python binding for Sundown_, a markdown parsing library.

Documentation can be found at: http://misaka.61924.nl/

.. _Sundown: https://github.com/vmg/sundown


Installation
------------

Cython is only needed to compile .pyx file.

With pip::

    pip install douban.misaka

Or manually::

    python setup.py install


Example
-------

Very simple example::

    from douban.misaka import Markdown, HtmlRenderer

    rndr = HtmlRenderer()
    md = Markdown(rndr)

    print md.render('some text')

Or::

    import douban.misaka as m
    print m.html('some other text')
