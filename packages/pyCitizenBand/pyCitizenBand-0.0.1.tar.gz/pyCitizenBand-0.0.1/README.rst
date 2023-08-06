.. image:: https://img.shields.io/pypi/v/pyCitizenBand.svg
   :target: https://pypi.python.org/pypi/pyCitizenBand/
.. image:: https://img.shields.io/pypi/pyversions/pyCitizenBand.svg
   :target: https://pypi.python.org/pypi/pyCitizenBand/
.. image:: https://img.shields.io/pypi/wheel/pyCitizenBand.svg
   :target: https://pypi.python.org/pypi/pyCitizenBand/
.. image:: https://img.shields.io/pypi/l/pyCitizenBand.svg
   :target: https://pypi.python.org/pypi/pyCitizenBand/
.. image:: https://img.shields.io/pypi/status/pyCitizenBand.svg
   :target: https://pypi.python.org/pypi/pyCitizenBand/
.. image:: https://img.shields.io/pypi/dm/pyCitizenBand.svg
   :target: https://pypi.python.org/pypi/pyCitizenBand/
.. image:: https://requires.io/github/scls19fr/pyCitizenBand/requirements.svg?branch=master
   :target: https://requires.io/github/scls19fr/pyCitizenBand/requirements/?branch=master
.. image:: https://landscape.io/github/scls19fr/pyCitizenBand/master/landscape.svg?style=flat
   :target: https://landscape.io/github/scls19fr/pyCitizenBand/master
.. image:: https://www.codacy.com/project/badge/??
   :target: https://www.codacy.com/app/s-celles/pyCitizenBand
.. image:: https://travis-ci.org/scls19fr/pyCitizenBand.svg
   :target: https://travis-ci.org/scls19fr/pyCitizenBand


pyCitizenBand
=============

A tool for Citizen Band (CB)

Usage
-----

Run IPython
~~~~~~~~~~~

IPython is also called Jupyter.

It's available at http://ipython.org/

::

    $ ipython

Import ``CitizenBand``
~~~~~~~~~~~~~~~~~~~~~~

::

    In [1]: from pyCitizenBand import CitizenBand

Instantiate ``CitizenBand``
~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    In [2]: cb = CitizenBand()

Display frequencies
~~~~~~~~~~~~~~~~~~~

::

    In [3]: cb.frequencies
            -2      -1       0       1       2
    1   26.065  26.515  26.965  27.415  27.865
    2   26.075  26.525  26.975  27.425  27.875
    3   26.085  26.535  26.985  27.435  27.885
    4   26.105  26.555  27.005  27.455  27.905
    5   26.115  26.565  27.015  27.465  27.915
    6   26.125  26.575  27.025  27.475  27.925
    7   26.135  26.585  27.035  27.485  27.935
    8   26.155  26.605  27.055  27.505  27.955
    9   26.165  26.615  27.065  27.515  27.965
    10  26.175  26.625  27.075  27.525  27.975
    11  26.185  26.635  27.085  27.535  27.985
    12  26.205  26.655  27.105  27.555     NaN
    13  26.215  26.665  27.115  27.565     NaN
    14  26.225  26.675  27.125  27.575     NaN
    15  26.235  26.685  27.135  27.585     NaN
    16  26.255  26.705  27.155  27.605     NaN
    17  26.265  26.715  27.165  27.615     NaN
    18  26.275  26.725  27.175  27.625     NaN
    19  26.285  26.735  27.185  27.635     NaN
    20  26.305  26.755  27.205  27.655     NaN
    21  26.315  26.765  27.215  27.665     NaN
    22  26.325  26.775  27.225  27.675     NaN
    23  26.355  26.805  27.255  27.705     NaN
    24  26.335  26.785  27.235  27.685     NaN
    25  26.345  26.795  27.245  27.695     NaN
    26  26.365  26.815  27.265  27.715     NaN
    27  26.375  26.825  27.275  27.725     NaN
    28  26.385  26.835  27.285  27.735     NaN
    29  26.395  26.845  27.295  27.745     NaN
    30  26.405  26.855  27.305  27.755     NaN
    31  26.415  26.865  27.315  27.765     NaN
    32  26.425  26.875  27.325  27.775     NaN
    33  26.435  26.885  27.335  27.785     NaN
    34  26.445  26.895  27.345  27.795     NaN
    35  26.455  26.905  27.355  27.805     NaN
    36  26.465  26.915  27.365  27.815     NaN
    37  26.475  26.925  27.375  27.825     NaN
    38  26.485  26.935  27.385  27.835     NaN
    39  26.495  26.945  27.395  27.845     NaN
    40  26.505  26.955  27.405  27.855     NaN

Convert channel to frequency
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    In [5]: cb.frequency(19)
    Out[5]: Decimal('27.185')

    In [6]: cb.frequency(19, 1)
    Out[6]: Decimal('27.635')

Convert frequency to channel
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    In [7]: cb.channel(26.735)
    Out[7]: (19, -1, Decimal('0.000'))

Install
-------

::

    $ pip install pyCitizenBand


A scientific distribution of Python such as Anaconda Python is highly
suggested.

https://www.continuum.io/downloads

Development
-----------

You can help to develop this library.

Issues
~~~~~~

You can submit issues using
https://github.com/scls19fr/pyCitizenBand/issues

Clone
~~~~~

You can clone repository to try to fix issues yourself using:

::

    $ git clone https://github.com/scls19fr/pyCitizenBand.git

Run unit tests
~~~~~~~~~~~~~~

Run all unit tests

::

    $ nosetests -s -v --with-doctest


Install development version
~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    $ python setup.py install

or

::

    $ sudo pip install git+https://github.com/scls19fr/pyCitizenBand.git

Collaborating
~~~~~~~~~~~~~

-  Fork repository
-  Create a branch which fix a given issue
-  Submit pull requests

https://help.github.com/categories/collaborating/
