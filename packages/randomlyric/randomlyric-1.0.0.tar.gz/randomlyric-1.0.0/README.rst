randomlyric
===========

Get a random lyric from a random song, and url to the rest of the lyrics

Usage
-----

::

    usage: __main__.py [-h] [--letter LETTER] [--artist-href ARTIST_HREF]
                       [--song-href SONG_HREF]

    optional arguments:
      -h, --help            show this help message and exit
      --letter LETTER       Specify letter instead of allowing random choice
      --artist-href ARTIST_HREF
                            Specifies the artist you want. No preceding slash.
                            Example: m/mutemath.html
      --song-href SONG_HREF
                            Specifies the song you want. No preceding slash.
                            Example: lyrics/mutemath/typical.html

Installation
------------

Via ``pip``:

::

    pip3 install randomlyric

Alternatively:

-  Clone the repository, ``cd randomlyric``
-  Run ``python3 setup.py install`` or ``pip3 install -e``
