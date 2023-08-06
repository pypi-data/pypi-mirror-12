***************************************************************
CodeDeployMonitor, a simple monitoring tool for AWS CodeDeploy
***************************************************************



CodeDeployMonitor is a little tool that can create new deployments for **AWS CodeDeploy**,
and monitor them for successful completion. It also has a *monitor-only* mode, in case you create
deployments via another tool (`aws-cli`_, for example).

CodeDeployMonitor use the `boto3`_ library.

** This program is currently in pre-alpha state, so be aware of bugs.**

============
Installation
============

CodeDeployMonitor can easily be installed with `pip`_:

.. code-block:: bash

    # Make sure we have an up-to-date version of pip and setuptools:
    $ pip install --upgrade pip setuptools

    $ pip install codedeploy-monitor


=====
Usage
=====

CodeDeployMonitor tries to mimic the `aws-cli`_ command-line parameters as close as possible. Both deployments from S3 and GitHub are supported.

To create and monitor a new deployment:

.. code-block:: bash

    $ codedeploy_monitor create-deployment --application-name my-app --deployment-group my-group  --s3-location bucket=my-bucket,key=releases/myapp.tgz,bundleType=tgz


To monitor an existing deployment:

.. code-block:: bash

    $ codedeploy_monitor monitor-deployment d-xxxxxxxxx


Use the following commands to see a list of all command-line options:

.. code-block:: bash

    $ codedeploy_monitor create-deployment --help

.. code-block:: bash

    $ codedeploy_monitor monitor-deployment --help


=======
License
=======

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License version 3 as published by
the Free Software Foundation.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.


.. _pip: http://www.pip-installer.org/en/latest/index.html
.. _aws-cli: http://github.com/aws/aws-cli
.. _boto3: http://github.com/boto/boto3