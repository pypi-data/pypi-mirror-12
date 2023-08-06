
Paragraph 1, no literal syntax

    >>> indented_doctest_block()
    None

Paragraph 2, no literal syntax

>>> unindented_doctest_block()
None

Paragraph 3, no literal syntax

    def foo():
        return None

Paragraph 4, expanded literal syntax

::

    def foo():
        return None

Paragraph 5, partially minimized literal syntax ::

    def foo():
        return None

Paragraph 6, fully minimized literal syntax::

    def foo():
        return None

Paragraph 7, code block, no language

.. code::

    def foo():
        return None

Paragraph 8, code block, language=python

.. code:: python

    def foo():
        return None

Paragraph 9, Sphinx doctest block

