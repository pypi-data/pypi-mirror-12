UFinance(UNIST Finance)
========

Finance Tool


Installing
----------

.. code-block:: python

    pip install ufinance

Usage
-----

.. code-block:: python

    import ufinance.history as uh
    uh.google()

.. code-block:: python

    import ufinance.history as uh
    uh.google(code="KOSDAQ:KOSDAQ",
        start=datetime.datetime(2015, 1, 1),
        end=datetime.datetime(2015, 1, 20),
        urlview=0)
