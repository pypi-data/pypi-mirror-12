===============================
 Creole converter for Holocron
===============================

|pypi-version| |pypi-license| |travis-ci|

Creole_ is a lightweight markup language, aimed at being a common markup
language for wikis, enabling and simplifying the transfer of content
between different wiki engines.

**holocron-creole** is a Creole markup converter for Holocron_, an extendable
static blog generator powered by the Force


Installation
------------

Holocron uses entry-points based extension discovery mechanism, and that
means it's enough to use ``pip`` to install creole converter:

.. code:: bash

    $ [sudo] pip install holocron-creole


Usage
-----

Usage experience is similar to Markdown or reStructuredText builtin
converters.

#. Ensure that ``creole`` extension is enabled in your ``_config.yml``:

   .. code:: yaml

       ext:
         enabled:
            - markdown
            - restructuredtext
            - creole                # inserted line
            - index
            - feed
            - sitemap
            - tags

#. Create posts and/or pages with ``.creole`` extension. Similar to
   builtin converters, a meta information header could be places
   on the top of ``*.creole`` files.

   .. code:: text

       ---
       tags: [jedi, thoughts, any-custom-tag]
       ---

       = Jedis in Real World =

       Jedi is ...

#. Creole converter supports code syntax highlighting feature. It
   could be turned on/off by editing the following option:

   .. code:: yaml

       ext:
          creole:
             syntax_highlight: true

   When it's turned on, the ``<<code>>`` macros is available for using.
   Example:

   .. code:: text

       <<code ext=".py">>
           def add(x, y):
               return x + y
       <</code>>


Why GPL?
--------

Despite the fact Holocron is distributed under BSD license,
**holocron-creole** is licensed under GPLv3. The reason is that the project
depends on python-creole_ library, and it's distributed under GPLv3. That
means we have no choice but to use GPL.


Links
-----

* Holocron: http://holocron.readthedocs.org
* Source: https://github.com/ikalnitsky/holocron-creole
* Bugs: https://github.com/ikalnitsky/holocron-creole/issues


.. Links
.. _Holocron: http://holocron.readthedocs.org
.. _Creole: https://en.wikipedia.org/wiki/Creole_(markup)
.. _python-creole: https://pypi.python.org/pypi/python-creole/

.. Badges
.. |pypi-version| image:: https://img.shields.io/pypi/v/holocron-creole.svg
   :target: https://pypi.python.org/pypi/holocron-creole
.. |pypi-license| image:: https://img.shields.io/pypi/l/holocron-creole.svg
   :target: https://pypi.python.org/pypi/holocron-creole
.. |travis-ci| image:: https://travis-ci.org/ikalnitsky/holocron-creole.svg?branch=master
   :target: https://travis-ci.org/ikalnitsky/holocron-creole
