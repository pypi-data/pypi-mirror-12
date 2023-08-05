|jarvy| *Dave Bowman (inside EVA pod) trying to convince HAL to open the
pod bay doors in “2001: A Space Odyssey” (1968).*

::

    Dave: Hello, HAL. Do you read me, HAL?
    HAL: Affirmative, Dave. I read you.
    Dave: Open the pod bay doors, HAL.
    HAL: I'm sorry, Dave. I'm afraid I can't do that.

Although there has been several attempts in making the machines
intelligent, the early prototypes were still dumb. Until 2015. Then came
Jarvy.

Jarvy : Python Intelligent Assistant for Humans
===============================================

|Travis| |PyPIv| |PyPImd|

Jarvy, aims to help humans by trying to understand them and figuring out
best ways to respond to them. Jarvy is named after Tony Stark’s
artificially intelligent assistant in the Iron Man series. However, the
inspiration is not restricted to the Iron Man series, but extends to a
huge line of books, movies and projects which led to this dream. A dream
of living with artificial intelligence.

By design Jarvy does not aim harm, but this is software. Who knows, what
could go wrong. I will make it straight. I accept no liability, if one
day Jarvy or alike overthrow humans and rule the world.

Why?
----

The goal is to have **a lot of fun**, and see where this goes. I want
Jarvy to be **fully** customizable and extensible.

How?
----

::

    > import jarvy
    > j = jarvy.start()

Usage
-----

::

    > Jarvy
    > Yes sir
    > who is the director of ex machina?
    > Ex Machina is a 2015 British science fiction thriller film written
      and directed by Alex Garland, marking his directorial debut.
    > who wrote iliad?
    > Homer is best known as the author of the Iliad and the Odyssey.
    > Good bye jarvy
	> Good night sir

Installation
------------

::

    $ pip install jarvy

Contribution
------------

There are several ways to improve Jarvy. If you have **any**
suggestions, please let me know. Or better, fork the repository, play
with Jarvy and contribute by just sending a pull request.

I **accept** pull requests.

Roadmap
-------

Jarvy is written in Python. There is also a `web interface`_ in the
making. I want Jarvy to be simple and beautiful. `simple is better than complex and beautiful is better than ugly`_.

Ideas
-----

- Add Wolfram alpha as endpoint
- Add scoring, maybe give weights for sources?
- Add ranking to select the best response.
- Unit tests would be nice.
- Jarvy should be able learn.
- Continuous Integration would be nice.

.. _web interface: https://github.com/jarvy/face
.. _simple is better than complex and beautiful is better than ugly: https://www.python.org/dev/peps/pep-0020/

.. |jarvy| image:: https://dl.dropboxusercontent.com/u/16169065/hal9000.jpg
.. |Travis| image:: https://travis-ci.org/jarvy/jarvy.svg?branch=master
   :target: https://github.com/jarvy/jarvy
.. |PyPIv| image:: https://img.shields.io/pypi/v/jarvy.svg
   :target: https://pypi.python.org/pypi/jarvy
.. |PyPImd| image:: https://img.shields.io/pypi/dm/jarvy.svg
   :target: https://pypi.python.org/pypi/jarvy