NounHound
=========

Description
-----------

Extract noun and noun phrases from any given text.

Install
-------

.. code:: bash

 pip install noun_hound

Usage
-----

.. code:: python

  >>> from noun_hound import NounHound
  >>> noun_hound = NounHound()
  >>> noun_hound.process('''Long time Pythoneer Tim Peters succinctly channels the BDFL's
  ... guiding principles for Python's design into 20 aphorisms, only 19
  ... of which have been written down.''')
      {u'noun_phrases': [u'Long time Pythoneer Tim Peters',
        u"Python's design",
        u"BDFL's",
        u'guiding principles',
        u'20 aphorisms',
        u'channels'],
      u'nouns': [u'Pythoneer',
        u"Python's",
        u'Peters',
        u"BDFL's",
        u'Tim',
        u'principles',
        u'aphorisms',
        u'channels',
        u'design',
        u'time']}

Copyright
---------

Copyright (C) 2015 David Lettier.

License
-------

For license information, see `Apache License Version 2.0`_.

.. _Apache License Version 2.0: https://www.apache.org/licenses/LICENSE-2.0


