Yola API Python Client
======================

Usage
-----

.. code:: python

    # settings file

    from yolapy.configuration import configure

    configure(
        auth=('username', 'password'),
        url='https://wl.qa.yola.net/',
    )

    # application code

    from yolapy.models import User as YolaUser

    yola_user = YolaUser(
        email='test@example.com',
        name='Jane',
        surname='Doe',
        partner_id='WL_YOLA',
        preferences={'name': 'value'})
    yola_user.save()

See http://yolapy.readthedocs.org/ for available methods with
documentation.

Development
-----------

To run the tests::

    $ nosetests

To lint your code automatically when you make changes::

    $ cp tube.py.sample tube.py
    $ stir

Documentation
-------------

Changes to the public interface should be documented. See the `docs` directory.

Pushes to the `master` branch build at http://yolapy.readthedocs.org/en/latest/
automatically.

You can test your doc changes locally with::

    $ cd docs
    $ make html
    $ open _build/html/index.html
