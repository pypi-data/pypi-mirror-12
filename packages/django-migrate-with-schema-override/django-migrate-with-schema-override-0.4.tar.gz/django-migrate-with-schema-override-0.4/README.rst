About
-----

I need some cursor override to prevent migrate from tripping on models with schema definition on 'db_table' such as those used with herokuconnect's salesforce schema.

Installation
------------

The library is hosted on
`PyPi <https://pypi.python.org/pypi/django-migrate-with-schema-override/>`_, so you can
grab it there with::

    pip install django-migrate-with-schema-override

Then add ``cursor_override`` to your ``INSTALLED_APPS``.::

    INSTALLED_APPS = (
        # ...
        'cursor_override',
        # ...
    )

Usage
-----

You need to add this line to your ``settings.py`` to enable the override:

::

    # Set to False to allow writes
    CURSOR_OVERRIDE = True

Credits
-----

Credit goes to 'http://github.com/streeter/django-db-readonly' where I've patterned the repository for I could not find any tutorials on how to override django's utils.py

Thanks to you Chris Streeter!


License
-------

Uses the `MIT <http://opensource.org/licenses/MIT>`_ license.
