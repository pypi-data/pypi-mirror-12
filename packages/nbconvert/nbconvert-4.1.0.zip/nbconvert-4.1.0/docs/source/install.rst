Installing nbconvert
====================

.. seealso::

   `Installing Jupyter <http://jupyter.readthedocs.org/en/latest/install.html>`__
     Nbconvert is part of the Jupyter ecosystem.

Nbconvert is packaged for both pip and conda, so you can install it with::

    pip install nbconvert
    # OR
    conda install nbconvert

If you're new to Python, we recommend installing `Anaconda <http://continuum.io/downloads#py34>`__,
a Python distribution which includes nbconvert and the other Jupyter components.

Pandoc
------

For converting markdown to formats other than HTML, nbconvert uses Pandoc_
(1.12.1 or later).

To install pandoc on Linux, you can generally use your package manager::

    sudo apt-get install pandoc

On other platforms, you can get pandoc from
`their website <http://johnmacfarlane.net/pandoc/installing.html>`_.
