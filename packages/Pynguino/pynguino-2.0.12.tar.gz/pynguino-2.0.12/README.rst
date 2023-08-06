
.. _Read the docs...: http://pynguino.readthedocs.org/en/latest/

============
Pynguino 2.0
============
Python for Pinguino.

-----
About
-----

**Pynguino 2.0** is a Python package for easy interface between `Pinguino <http://pinguino.cc/>`_ and python.

-----------------------------
Installation and Dependencies
-----------------------------

You can get **Pynguino 2.0** from `PyPI <http://pypi.python.org/pypi/Pynguino>`_ through the command::

    pip install pynguino

**Pynguino 2.0** only work in Python2, so, in some systems you must execute::

    pip2 install pynguino

**Pynguino 2.0** is often fixing bugs and adding new features, so it is recommended to keep the updated package::

    pip2 install pynguino --upgrade


-----------
USB Example
-----------
Downloading `this code (usb_8bit.pde) <http://bitbucket.org/YeisonEng/pynguino-2.0/raw/tip/pinguino/USB/usb_8bit.pde>`_ on Pinguino::

    #!/usr/bin/env python
    #-*- coding: utf-8 -*-

    from pynguino import PynguinoUSB
    pinguino = PynguinoUSB(vboot="v2")

    pinguino.pinMode(6, "OUTPUT")

    for i in range(10):
        pinguino.digitalWrite(6, "HIGH")
        pinguino.delay(100)
        pinguino.digitalWrite(6, "LOW")
        pinguino.delay(200)

    pinguino.pinMode(0, "INPUT")
    print("pin 06 digialRead: " + pinguino.digitalRead(0))

    pinguino.pinMode(13, "INPUT")
    print("pin 13 analogRead: " + pinguino.analogRead(13))

-----------
CDC Example
-----------
Downloading `this code (cdc_8bit.pd) <http://bitbucket.org/YeisonEng/pynguino-2.0/raw/tip/pinguino/CDC/cdc_8bit.pde>`_ on Pinguino::

    #!/usr/bin/env python
    #-*- coding: utf-8 -*-

    from pynguino import PynguinoCDC
    pinguino = PynguinoCDC(port=0, baudrate=9600)

    pinguino.pinMode(6, "OUTPUT")

    for i in range(10):
        pinguino.digitalWrite(6, "HIGH")
        pinguino.delay(100)
        pinguino.digitalWrite(6, "LOW")
        pinguino.delay(200)

    pinguino.pinMode(0, "INPUT")
    print("pin 06 digialRead: " + pinguino.digitalRead(6))

    pinguino.pinMode(13, "INPUT")
    print("pin 13 analogRead: " + pinguino.analogRead(13))





`Read the docs...`_