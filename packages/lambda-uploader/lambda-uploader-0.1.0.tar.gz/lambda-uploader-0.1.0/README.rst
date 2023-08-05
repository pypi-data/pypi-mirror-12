lambda-uploader
===============

Provides a quick command line utility for packaging and publishing
Python AWS Lambda functions. This is a work in progress and pull
requests are always welcome.

Installation
~~~~~~~~~~~~

The latest release of lambda-uploader can be installed via pip:

::

    pip install lambda-uploader

An alternative install method would be manually installing it leveraging
``setup.py``:

::

    git clone https://github.com/rackerlabs/lambda-uploader
    cd lambda-uploader
    python setup.py install

Configuration File
~~~~~~~~~~~~~~~~~~

The lambda uploader expects a directory with, at a minimum, your lambda
function and a lambda.json file. It is not necessary to set requirements
in your config file since the lambda uploader will also check for and
use a requirements.txt file.

Example lambda.json file:

.. code:: json

    {
      "name": "myFunction",
      "description": "It does things",
      "region": "us-east-1",
      "handler": "function.lambda_handler",
      "role": "arn:aws:iam::00000000000:role/lambda_basic_execution",
      "requirements": ["pygithub"],
      "timeout": 30,
      "memory": 512
    }

Command Line Usage
~~~~~~~~~~~~~~~~~~

To package and upload simply run the command from within your lambda
directory or with the directory as an option.

.. code:: shell

    lambda-uploader ./myfunc

If you would prefer to upload another way you can tell the uploader to
ignore the upload. This will create a package and leave it in the
project directory.

.. code:: shell

    lambda-uploader --no-upload ./myfunc
