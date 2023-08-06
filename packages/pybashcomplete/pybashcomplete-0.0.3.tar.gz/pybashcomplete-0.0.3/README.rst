pybashcomplete
==============

Bash completion utility for python scripts

Installation
------------

Preferably, with sudo pip since it installs to /etc/bash_completion.d/pybashcomplete::

    $ sudo pip install pybashcomplete

Or for the latest, run from the project root directory::

    $ sudo python setup.py install

After install, you will have to source the file manually::

    $ . /etc/bash_completion.d/pybashcomplete

Usage
-----

Simply run a python script and use tab completion::

    $ python test.py --deb[TAB]
    $ python test.py --debug

    $ python test.py --d[TAB][TAB]
    --debug --demo
    $ python test.py --d


Release Notes
-------------

:0.0.1:
    Project created
