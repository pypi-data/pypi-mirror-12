Pyuploadcare-wtforms
=======================

.. image:: https://img.shields.io/pypi/v/pyuploadcare-wtforms.svg
    :target: https://pypi.python.org/pypi/pyuploadcare-wtforms
    :alt: Latest PyPI version

.. image:: https://travis-ci.org/uploadcare/pyuploadcare-wtforms.svg?branch=master
    :target: https://travis-ci.org/uploadcare/pyuploadcare-wtforms
    :alt: Build status


Installation
------------

.. code:: bash

    $ pip install pyuploadcare-wtforms

Usage
-----

Package provides several fields for ``WTForms`` which made integration with Uploadcare little more easily:

* ``FileWidget``
* ``FileField``
* ``ImageField`` - you can set manual cropping for uploaded images
* ``FileGroupField``

In common case for usage you need:

* Use one of these fields in your form like this:

.. code:: python

    # your_app/forms.py

    from wtforms import Form
    from pyuploadcare_wtforms import ImageField

    class YourSuperForm(Form):
        image = ImageField(manual_crop='200x200')
        ...

* Set up keys:

.. code:: python

    # your_project_config.py
    from pyuploadcare import conf

    conf.pub_key = 'demopublickey'
    conf.secret = 'demoprivatekey'


* Put script to `your templates <https://uploadcare.com/quick_start/>`_:

.. code:: html

    <script src="https://ucarecdn.com/widget/2.5.5/uploadcare/uploadcare.full.min.js" charset="utf-8"></script>

Look at `that simplest example <https://github.com/uploadcare/pyuploadcare-wtforms/tree/master/example>`_ for getting quick start. You can easily install it locally by:

.. code:: bash

    $ make run_example

Contributing
------------

1. Fork the ``pyuploadcare-wtforms`` repo on GitHub.
2. Clone your fork locally:

.. code:: bash

    $ git clone git@github.com:your_name_here/pyuploadcare-wtforms.git

3. Install your local copy into a virtualenv. Assuming you have ``virtualenvwrapper`` installed, this is how you set up your fork for local development:

.. code:: bash

    $ mkvirtualenv pyuploadcare-wtforms
    $ cd pyuploadcare-wtforms/
    $ python setup.py develop

4. Create a branch for local development:

.. code:: bash

    $ git checkout -b name-of-your-bugfix-or-feature

   Now you can make your changes locally.

5. When you're done making changes, check that your changes pass the tests, including testing other Python versions with tox:

.. code:: bash

    $ pip install tox
    $ tox

6. Commit your changes and push your branch to GitHub:

.. code:: bash

    $ git add .
    $ git commit -m "Your detailed description of your changes."
    $ git push origin name-of-your-bugfix-or-feature

7. Submit a pull request through the GitHub website.
