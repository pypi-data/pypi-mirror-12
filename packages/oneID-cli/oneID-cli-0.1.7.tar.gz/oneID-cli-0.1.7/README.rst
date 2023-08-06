oneID CLI
=========

Install oneID Command Line Interface

.. code-block:: console

    pip install oneid-cli


Configure your computer (requires your oneID UID & Secret Key)

.. code-block:: console

    oneid-cli configure --project <project-uid>


Provision a new IoT Device

.. code-block:: console

    oneid-cli provision --type device --name "My IoT Device" --project <project-uid>



Provision a new Server

.. code-block::

    oneid-cli provision --type server --name "My Server" --project <project-uid>


To send messages between devices and servers, use `oneID-connect`
Available `<http://oneid-connect.readthedocs.org/en/latest/>`_