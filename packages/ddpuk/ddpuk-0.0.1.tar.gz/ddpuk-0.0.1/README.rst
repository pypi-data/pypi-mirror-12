DDPy - data.parliament.uk for Humans
====================================

Utilities to interact with the data.parliament.uk APIs

ddpuk_download
--------------

Download data from http://lda.data.parliament.uk ::

  usage: ddpuk_download [-h] [--format {csv,json,rdf,text,ttl,xml}]
                        [--size SIZE] [--page-from PAGE_FROM]
                        [--page-to PAGE_TO] [--datadir DATADIR]
                        dataset

  Download data from http://lda.data.parliament.uk

  positional arguments:
    dataset               dataset to download

  optional arguments:
    -h, --help            show this help message and exit
    --format {csv,json,rdf,text,ttl,xml}
                          format (default: json)
    --size SIZE           batch size (default: 500)
    --page-from PAGE_FROM
                          first page (default: 0)
    --page-to PAGE_TO     last page (default: 125)
    --datadir DATADIR     target directory (default: data)

Built by `Florian Rathgeber`_ at `Accountability Hack 2015`_.

.. _Florian Rathgeber: https://twitter.com/frathgeber
.. _Accountability Hack 2015: http://accountabilityhack.org
