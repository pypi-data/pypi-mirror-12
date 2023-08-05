nodata
======

.. figure:: https://cloud.githubusercontent.com/assets/5084513/9670961/4f04da04-5244-11e5-93e5-86b69694f82f.jpg
   :alt: miles-davis7

   miles-davis7

Usage
-----

Nodata blobbing
~~~~~~~~~~~~~~~

::

    nodata blob [OPTIONS] SRC_PATH DST_PATH

    Options:
      -b, --bidx TEXT                         Bands to blob [default = all]
      -m, --max-search-distance INTEGER       Maximum blobbing radius [default = 4]
      -n, --nibblemask                        Nibble blobbed nodata areas [default=False]
      -c, --compress [JPEG|LZW|DEFLATE|None]  Output compression type ('JPEG', 'LZW', 'DEFLATE')
                                              [default = input type]
      -d, --mask-threshold INTEGER            Alpha pixel threshold upon which to regard
                                              data as masked (ie, for lossy you'd want an
                                              aggressive threshold of 0) [default=None]
      -a, --alphafy                           If a RGB raster is found, blob + add alpha
                                              band where nodata is
      -w, --workers                           Number of workers for multiprocessing [default=4]                                      
      --help                                  Show this message and exit.
