blueberrywsn
------------
blueberrywsn is an application developed during an undergraduate
project for the Distributed Systems course of the Federal
Technological University of Paraná. It can be used to create a server
and clients to establish a Bluetooth network that monitors the light
sensors of each client.

Implementation
--------------
The implementation of the server and client of blueberrywsn is based
on the RFCOMM `examples`_ of the Bluetooth Python extension module
`PyBluez`_, which is also a dependency of this application.

Installation
------------
First, make sure to install *PyBluez's* dependencies::

    sudo apt-get install python-dev libbluetooth-dev

Finally, blueberrywsn can be installed with `pip`_::

    sudo pip install blueberrywsn

Usage
-----
Start the device as a server with::

    blueberrywsn server

Start the device as a client with::

    blueberrywsn client

Press ``enter`` or ``ctrl + c`` to stop.

Authors
-------
The authors who worked on the project are:

- Felipe Dau
- Felipe S. Ruffo
- Gabriel Rubino
- Gustavo D. de Oliveira
- José A. P. Contó
- Luis R. G. Margarido
- Rayara dos Santos Fragoso
- Renata C. Soares
- Tamires Priscila da Costa
- Vitor G. Takahashi

Developers
----------
The authors who developed this application are:

- `felipedau`_
- `feruffo`_
- `gabrielrubinobr`_
- `GuDiasOliveira`_

.. _`examples`: https://github.com/karulis/pybluez/tree/master/examples/simple
.. _`GuDiasOliveira`: https://github.com/GuDiasOliveira
.. _`felipedau`: https://github.com/felipedau
.. _`feruffo`: https://github.com/feruffo
.. _`gabrielrubinobr`: https://github.com/gabrielrubinobr
.. _`pip`: https://pypi.python.org/pypi/pip
.. _`pybluez`: https://github.com/karulis/pybluez
