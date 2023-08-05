tilecontrol
===========

|Build Status|

Tilecontrol contains utilities for satellite basemap quality control. It
provides a means of validating that the imagery we anticipate to be
rendered did indeed make it to the basemap we intended.

Usage
-----

Tilecontrol is built to be used as a set of command line utilities. It
wraps the following utilities in a ``tlc`` wrapper:

**``parse``** Consumes a JSON spec sheet that defines input metadata and
outputs a set of files to use in the QC process.

**``edges``** Identifies the edge's of a list of ZXY's

**``check``** Verifies that the tiles within a list of ZXY's do not have
400 or nodata errors.

**``checkparse``** Parses the output of ``check`` into a list of tiles.

Additional documentation can be found by appending the ``--help`` flag
to any command.

API Token
^^^^^^^^^

Per https://github.com/mapbox/dg-utils/issues/140, our testing token is:

::

    pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpZnN4a2pvajBjNTJ1ZWx4NDdhOGh5NGMifQ.vdRmqjbSqL1bTrR5ZYmsbg

Installation
^^^^^^^^^^^^

Install ``tilecontrol`` with:

::

    pip install tilecontrol

Spec sheets
^^^^^^^^^^^

::

    {
        sourceid: "dg_vivid_seasia_oceania",
        layerid: "digitalglobe.vivid-seasia-oceania",
        aws_ls_file: "aws_s3_ls_09_16_seasiatest_head200",
        output_dir: "dg_vivid_seasia_oceania",
        reference_zoom: 13,
        mapbox_access_token: "pk.eyJ1Ijoic2FmZXR5cHVwcHkiLCJhIjoiMHdrVHdOWSJ9.13xoMQEVnTEVRuN28QWfLg",
        note: "relative paths will based on the directory of the spec json"
    }

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
