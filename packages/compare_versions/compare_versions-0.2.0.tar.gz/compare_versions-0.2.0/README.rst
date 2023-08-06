================
compare_versions
================

.. image:: https://travis-ci.org/lukeyeager/compare-versions.svg?branch=master
    :target: https://travis-ci.org/lukeyeager/compare-versions
    :alt: Build Status

.. image:: https://landscape.io/github/lukeyeager/compare-versions/master/landscape.svg?style=flat
    :target: https://landscape.io/github/lukeyeager/compare-versions/master
    :alt: Code Health

Compare versions using various versioning schemes.

*Example usage:* ::

    $ compare_versions 1.0.0 1.0.0-dev --scheme semver
    1.0.0 > 1.0.0-dev

    $ compare_versions 1.0.0 1.0.0-dev --scheme string
    1.0.0 < 1.0.0-dev
