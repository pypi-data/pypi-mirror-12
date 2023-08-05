tilecontrol
===========

|Build Status|

*Utilities for Satellite basemap quality control.*

Installation
------------

Install ``tilecontrol`` with:

::

    pip install tilecontrol

Tilecontrol requires a ``json`` spec sheet as input. For example:

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

Additionally, you'll need a recent dump of the all the ``scenetif``'s
available at ``aws s3 ls s3://mapbox-pxm/scenes/``.

Once those exist:

::

    awslsparser --sourcespec outputs/vivid-oceania-spec_test.json

Development
-----------

To develop against ``tilecontrol``:

::

    git clone git@github.com:mapbox/tilecontrol.git
    cd tilecontrol
    pip install -e ".[test]"

**Tests** can be with with ``py.test``

.. |Build Status| image:: https://magnum.travis-ci.com/mapbox/tilecontrol.svg?token=5hEJ9x9Ljj2yfkNFpMu5&branch=master
   :target: https://magnum.travis-ci.com/mapbox/tilecontrol
