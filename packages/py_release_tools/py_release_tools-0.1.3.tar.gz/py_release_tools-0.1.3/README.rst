======================
Python Releasing Tools
======================

This code is licensed under the MIT license.

This is a suite of tools that are useful for releasing Python code for public
or private use. There are setuptools extensions to validate various conventions
and to perform release activities.

Installation and Usage
======================
This package is generally not installed directly but instead listed in the
``setup_requires`` option of the setuptools ``setup`` function. For example::

    from setuptools import setup

    setup(
        name="my_clever_package",
        version="1.0.0",
        setup_requires=[
            "py_release_tools",
        ]
    )

Commands are exported as distuils commands and should be automatically
available provided the package is installed. The tool provides the commands
documented below and are generally run by defining a ``release`` `alias
<http://pythonhosted.org/setuptools/setuptools.html#alias-define-shortcuts-for-commonly-used-commands>`_
in the project's ``setup.cfg`` file. The author's typical project ``setup.cfg``
contains these aliases::

    [aliases]
    validate = cover_tests pep8
    release = validate increment_semver git_push sdist upload
    release_major = validate increment_semver -M git_push sdist upload
    release_minor = validate increment_semver -m git_push sdist upload

Commands
========
increment_semver
----------------
This command will update the ``setup.py`` file version number following the
rules of `Semantic Versioning (semver) <http://semver.org>`_. This command will
re-write and commit the project's ``setup.py`` file. It assumes that the
version line is formatted as such, with some amount of leading whitespace::

    version="1.20.1"

It will rewrite all lines that look like this in the file.

The version format is::

    MAJOR.MINOR.PATCH

For more information check out the semver docs.

Version generation increments a version component by one. By default a patch
version is generated. Passing the ``-m`` or ``--minor`` flags to the command
will increment the minor version and set the patch version to zero. Passing
``-M`` or ``--major`` will increment the major version and set both the minor
and patch versions to zero.

This command will also create a tag in the git repository of format
``release-{semver}``.

git_push
--------
This command runs a ``git push`` command to push the ``master`` branch to the
remote ``origin``. The command will also push tags. If your git repository
doesn't use these naming conventions the command will fail.

cover_tests
-----------
This command will setup python
`coverage <https://pypi.python.org/pypi/coverage>`_ monitoring and invoke the
setuptools ``test`` target. Coverage data will be written to ``.coverage`` in
the same directory as the ``setup.py`` file.

This command will also generate a Cobertura coverage report as ``coverage.xml``
and an HTML report in the ``htmlcov`` folder.

Failure of the tests will cause a failure of the build so it is suitable to use
this command as a replacement for the builtin ``test`` command. This command
also suppresses the system exit that the builtin ``test`` command generates so
other commands can be chained after this one.

pep8
----
This command will run a `PEP8 <https://www.python.org/dev/peps/pep-0008/>`_
code style validation on all Python files in the project, including the
setup.py file.

Contributing
============
If you would like to contribute to Pydora please visit the project's
`GitHub page <https://github.com/mcrute/py_release_tools>`_ and open a pull
request with your changes. To have the best experience contributing, please:

* Don't break backwards compatibility of public interfaces
* Write tests for your new feature/bug fix
* Ensure that existing tests pass
* Update the readme/docstrings, if necessary
* Follow the coding style of the current code-base
* Ensure that your code is PEP8 compliant
* Validate that your changes work with Python 2.7+ and 3.x

All code is reviewed before acceptance and changes may be requested to better
follow the conventions of the existing API.

he build system runs ``python setup.py validate`` on all supported Python
versions. You can, and should, run this on your pull request before submitting.
