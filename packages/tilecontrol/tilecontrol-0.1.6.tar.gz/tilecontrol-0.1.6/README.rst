tilecontrol
===========

|Build Status| |PyPI|

Tilecontrol contains utilities for Satellite basemap quality control. We
use it catch Nodata and HTTP errors in our tilesets.

Installation
------------

::

    pip install tilecontrol

Requirements
------------

A scene cache
^^^^^^^^^^^^^

An update-to-date list of the contents of ``s3://mapbox-pxm/scenes`` is
required to run accurate QC work. Generating that list can be be quite
time consuming, on the order of multiple hours.

Alternatively, use an existing cache.

::

    $ aws s3 ls mapbox/playground/satellite-qc/scene_caches/
    2015-11-03 10:13:21 2864329827 2015-10-11.log
    2015-10-27 10:33:36 4712506108 2015-10-26.log
    2015-11-04 11:51:02 6533519570 2015-11-04.log

An API Token
^^^^^^^^^^^^

Your own token should be sufficient for public datasets. For private
mosaics (like DG), we use the token at
https://github.com/mapbox/dg-utils/issues/140.

Command Line Interface
----------------------

::

    $ tlc
    Usage: tlc [OPTIONS] COMMAND [ARGS]...

      Utilities for Satellite basemap quality control

    Options:
      --help  Show this message and exit.

    Commands:
      check                  Catch HTTP and Nodata errors.
      edges                  Finds the edges of a set of tiles.
      init                   Bootstrap the QC process.
      parse_checker_results  Legacy - Parse `checker` output.

``init``
^^^^^^^^

``tlc init`` bootstraps the QC process. With the exception of the *s3
scene cache*, it creates the files upon which the remainder of the QC
process operates on.

It takes the following arguments: - ``source_id`` of the mosaic as found
in `pxm-sources <https://github.com/mapbox/pxm-sources>`__. -
``layer_id`` of the mosaic, such as ``mapbox.satellite-test``. -
``cache`` refers to the ``s3 scene list``, and is expected to be a local
file. - ``destination`` refers to where you'd like the output files to
be stored.

``tlc init`` takes an important option, ``--token``, which let's you
specify the ``$MapboxAccessToken`` you'd like to use for the query. Your
personal key may work well for public tilesets, but private tilesets
will often require use of a special key. For example, DG QC work
requires use of the token found at
https://github.com/mapbox/dg-utils/issues/140.

For example:

::

    tlc init dg_vivid_latam_caribbean digitalglobe.vivid-latam-caribbean 2015-10-11.log output --token $token

Would yield the following files:

::

    dg_vivid_latam_caribbean_awsparse_outputs.json
    dg_vivid_latam_caribbean_edges_2015_11_09
    dg_vivid_latam_caribbean_geojsons_2015_11_09
    dg_vivid_latam_caribbean_sourceimgGeojsons_2015_11_09
    dg_vivid_latam_caribbean_sourceimgnames_2015_11_09
    dg_vivid_latam_caribbean_zxy_2015_11_09

``edges``
^^^^^^^^^

``tlc edges`` is typically called as a part of the ``init`` subcommand.
For a mosaic of any shape, it will identify those tiles which exist on
the periphery of the mosaic.

-  Input is a list of ZXY's
-  Output is a list of ZXY's

``check``
^^^^^^^^^

``tlc check`` performs the QC process, which consists of checking for
HTTP or Nodata errors for the URL's we expect to exist.

It takes the following arguments: - ``layer_id`` of the mosaic, such as
``mapbox.satellite-test``. - ``inzxy`` a list of ZXY's to check. -
``edges`` a list of the ZXY's of the edges of the mosaic. - ``geojsons``
a list of the filename's we expect to find in the *scene cache*.

Additionally, it takes a ``--token`` option as described for
``tlc init``.

For example:

::

    tlc check dg_vivid_eastern_europe dg_vivid_eastern_europe_zxy_2015_10_27 dg_vivid_eastern_europe_edges_2015_10_27 dg_vivid_eastern_europe_geojsons_2015_10_27 --token $token

Would yield the following files:

::

    dg_vivid_eastern_europe_missing_and_nodata_zxy
    dg_vivid_eastern_europe_missing_and_nodata_sourceimgs

Contributing
------------

To develop against ``tilecontrol``:

::

    git clone git@github.com:mapbox/tilecontrol.git
    cd tilecontrol
    pip install -e ".[test]"

Tests can be run with ``py.test``

.. |Build Status| image:: https://magnum.travis-ci.com/mapbox/tilecontrol.svg?token=5hEJ9x9Ljj2yfkNFpMu5&branch=master
   :target: https://magnum.travis-ci.com/mapbox/tilecontrol
.. |PyPI| image:: https://img.shields.io/pypi/v/tilecontrol.svg
   :target: https://pypi.python.org/pypi/tilecontrol
