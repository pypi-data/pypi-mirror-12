PolarBird
---------

Curses based Twitter app allowing to receive tweets in realtime, compose tweets and more.
For communication with Twitter API it is using `Python Twitter Tools`_.

Install
-------

Best way to install PolarBird is create virtual environment by using `virtualenvwrapper`_.
Currently its tested only on Python 3.4 and 3.5.

.. code:: bash

    mkvirtualenv env_name
    workon env_name
    pip install PolarBird

After installation just type ``polarbird`` in your terminal and it will start the app.

Planned features
----------------

Currently its still in alpha development stage, so many features are missing such as reply to tweet or add tweet to favorites. These basic features are number one priority.

Next priority is customization. You will be able to change colors, formats, notification command and others.

Contribution
------------

If you want to help in any way feel free to do so. You can fork it and send a pull request, create an issue to send a bug report or feature request.

.. _Python Twitter Tools: http://mike.verdone.ca/twitter/
.. _virtualenvwrapper: https://pypi.python.org/pypi/virtualenvwrapper
