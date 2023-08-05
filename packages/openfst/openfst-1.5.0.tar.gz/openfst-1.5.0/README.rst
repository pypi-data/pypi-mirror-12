Python interface to OpenFST
===========================

This package provides a Python extension module ``fst`` which exposes
the `OpenFst <http://www.openfst.org/>`__
`script-level <http://www.openfst.org/twiki/bin/view/FST/FstAdvancedUsage#FstScript>`__
interface. Like the script-level interface, it supports arbitrary arcs
and weights.

For more information, see the extension's
`tutorial <http://python.openfst.org>`__.

News
----

-  1.5.0 (2015-07-01): Initial release.

Troubleshooting
---------------

This module requires that you have installed OpenFst 1.5.0, which can be
obtained from the `official download
page <http://openfst.org/twiki/bin/view/FST/FstDownload>`__. It is also
possible to install it by passing the ``--enable-python`` flag to the
``configure`` script and then running ``make install``. This package is
just another way to install the module.

This module may clash with the (unaffiliated) Python package called
`pyfst <http://pyfst.github.io>`__, as it also defines a module called
``fst``. To avoid this clash, either uninstall pyfst, or keep the two
packages in separate `virtual
environments <http://docs.python-guide.org/en/latest/dev/virtualenvs/>`__.

Obtaining source code
---------------------

This extension was generated using Cython. For human-readable source
code, download OpenFst from the `official download
page <http://openfst.org/twiki/bin/view/FST/FstDownload>`__ and navigate
to the ``src/extensions/python`` directory.

License
-------

This extension is part of `OpenFst <http://www.openfst.org/>`__, which
is made available under the `Apache
License <http://www.apache.org/licenses/LICENSE-2.0>`__. For more
information, see ``LICENSE``.
