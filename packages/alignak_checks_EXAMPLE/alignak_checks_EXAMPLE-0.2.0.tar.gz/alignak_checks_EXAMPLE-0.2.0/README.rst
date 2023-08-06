Alignak checks package example
==================================

This project is an example and a how-to build a checks pack for Alignak monitoring framework.


Packaging
----------------------------------------

Repositories
~~~~~~~~~~~~~~~~~~~~~~~

All Alignak packs are stored in their own repository in the `Alignak monitoring contrib`_ Github organization.


Design and principles
~~~~~~~~~~~~~~~~~~~~~~~

Each pack aims to provide all necessary elements in the Alignak configuration to monitor hosts and/or services.
Each pack include the checks commands definitions, services templates, hosts templates, ...
It is even possible to include the monitoring plugins that will be run by Alignak to check an host/service.

Usually, the packs are only made of configuration files using the most common monitoring plugins available from the Nagios community.

The pack files are to be made available in the monitoring objects configuration directory and provide configuration utilities for the end-user:

* hosts templates: the host "use" the pack features
* services templates: the service "use" the pack features
* ...

The proposed structure to build a pack:

* all the checks packs are named as ``alignak_checks_EXAMPLE``
* the ``EXAMPLE`` repository is named as ``alignak-checks-EXAMPLE``
* the ``EXAMPLE`` repository includes the following files:
  * README.rst
  * LICENCE (optional)
  * AUTHORS (optional)
  * MANIFEST.in
  * setup.py

* the ``EXAMPLE`` repository includes an ``alignak_checks_EXAMPLE`` directory containing the pack configuration files
* the files in ``alignak_checks_EXAMPLE`` directory will be copied to the Alignak configuration
* the files in ``alignak_checks_EXAMPLE/plugins`` directory will be copied to the Alignak plugins directory
* the files in ``alignak_checks_EXAMPLE/etc`` directory will be copied to the Alignak etc directory

You are allowed to declare variables in the packs files. Thos variables will be valued after pack installation.
 All the files which name end with ``.parse`` will be parsed after installation to update their content to the Alignak installation paths.
The searched patterns are:

* $ETC: will be replaced with the Alignak configuration files path (*/etc/alignak*)
* $VAR: will be replaced with the Alignak lib files path (*/var/lib/alignak*)
* $RUN: will be replaced with the Alignak run files path (*/var/run/alignak*)
* $BIN: will be replaced with the Alignak log files path (*/usr/bin*)
* $LOG: will be replaced with the Alignak log files path (*/var/log/alignak*)
* $ALIGNAKUSER: will be replaced with the Alignak user account name (*alignak*)
* $ALIGNAKGROUP: will be replaced with the Alignak group name (*alignak*)

**Note**: the replacement is based on Python Template strings. As of it, $ETC is the simplest form and may be replaced with ${ETC} if necessary.




Repository example
~~~~~~~~~~~~~~~~~~~~~~~

::
   README.rst
   LICENCE
   AUTHORS
   MANIFEST.in
   setup.py
   alignak_checks_EXAMPLE/
      etc/
         test.cfg
      plugins/
         sub/
            plugin.conf
         plugin.py
      templates.cfg
      services.cfg
      commands.cfg

The content of the directory ``alignak_checks_EXAMPLE`` (including sub directories and except *etc* and *plugins*) will be copied to */var/lib/alignak/libexec*.

The content of the directory ``alignak_checks_EXAMPLE/plugins`` (including sub directories) will be copied to */var/lib/alignak/libexec*.

The content of the directory ``alignak_checks_EXAMPLE/etc`` (including sub directories) will be copied to */etc/alignak*.


Building
~~~~~~~~~~~~~~~~~~~~~~~

To build a new package EXAMPLE2:

* create a new ``alignak-checks-EXAMPLE2`` repository which is a copy of this repository

  * rename the ``alignak_checks_EXAMPLE`` directory to ``alignak_checks_EXAMPLE2``

* update the ``MANIFEST.in`` file

  * search and replace ``EXAMPLE`` with ``EXAMPLE2`` in the ``MANIFEST.in`` file

* update the ``README.rst`` file

  * remove this section **Packaging**
  * search and replace ``EXAMPLE`` with ``EXAMPLE2``
  * complete the **Documentation** chapter

* update the ``alignak_checks_EXAMPLE2/__init.py__`` file with all the package information

  * ``__checks_type__`` will be used to complete the keywords in PyPI and as the sub-directory to store the pack's files
  * the file docstring will be used as the package description in PyPI

* update the ``setup.py`` file

  * search and replace ``EXAMPLE`` with ``EXAMPLE2``
  * ``setup.py`` should not be modified for most of the packs ... if necessary, do it with much care!

And that's it!

Then, to build and make your package available to the community, you must use the standard Python setuptools:

* run ``setup.py register`` to register the new package near PyPI
* run ``setup.py sdist`` to build the package
* run ``setup.py develop`` to make the package installed locally (development mode)
* run ``setup.py develop --uninstall`` to remove the development mode
* run ``setup.py install --dry-run`` to test the package installation (checks which and where the files are installed)

When your package is ready and functional:

* run ``setup.py sdist upload`` to upload the package to PyPI repository <https://pypi.python.org/pypi>_

**Note**: every time you upload a package to PyPI you will need to change the package version in the ``alignak_checks_EXAMPLE2/__init.py__`` file.

Installation
----------------------------------------

The pack configuration files are to be copied to the monitoring objects configuration directory. The most suitable location is the *arbiter_cfg/objects/packs/* directory in the main alignak configuration directory.

**Note**: The main Alignak configuration directory is usually */usr/local/etc/alignak* or */etc/alignak* but it may depend upon your system and/or your installation.

The pack plugins (if any ...) are to be copied to the executable libraries directories.

**Note**: The Alignak librairies directory is usually */usr/local/libexec/alignak* or */var/lib/alignak* but it may depend upon your system and/or your installation.

From PyPI
~~~~~~~~~~~~~~~~~~~~~~~
To install the package from PyPI:
::
   pip install alignak-checks-EXAMPLE


From source files
~~~~~~~~~~~~~~~~~~~~~~~
To install the package from the source files:
::
   git clone https://github.com/Alignak-monitoring/alignak-checks-EXAMPLE
   cd alignak-checks-EXAMPLE
   mkdir /usr/local/etc/alignak/arbiter_cfg/objects/packs/EXAMPLE
   # Copy configuration files
   cp -R alignak_checks_EXAMPLE/*.cfg /usr/local/etc/alignak/arbiter_cfg/objects/packs/EXAMPLE
   # Copy plugin files
   cp -R alignak_checks_EXAMPLE/plugins/*.py /usr/local/libexec/alignak


Documentation
----------------------------------------

To be completed


Bugs, issues and contributing
----------------------------------------

Contributions to this project are welcome and encouraged ... issues in the project repository are the common way to raise an information.

License
----------------------------------------

Alignak Pack EXAMPLE is available under the `GPL version 3 license`_.

.. _GPL version 3 license: http://opensource.org/licenses/GPL-3.0
.. _Alignak monitoring contrib: https://github.com/Alignak-monitoring-contrib