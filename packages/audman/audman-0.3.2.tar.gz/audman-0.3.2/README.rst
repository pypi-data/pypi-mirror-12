Info
------------
Audman

A simple wsgi web page to control a running audacious media player process.

Audman uses the standard python wsgi module to mount a web app,
using mako templates, and 
IPC over dbus to access a runnning audacious process

Manual
------------

1. Install virtualenv

    $ virtualenv --system-site-package audman && source audman/bin/activate

3. Install this package

    (audman)$ pip install audman

4. Run audman

    (audman)$ runaudman
    Audman: Audacious Audio Player Control listening on http://192.168.H.HHH:8051
5. Use audman
   browse to http://192.168.H.HHH:8051, replacing 192.168.H.HHH with the actual
   ip address printed on the console by the runaudman command.

Notes
------------

* alternate system install by wheel
  ./setup.py bdist_wheel
  sudo pip install --no-index -v -v -v dist/audman-0.2.1-py2.py3-none-any.whl
  runaudman

* adhoc source installation
./setup.py sdist
cp dist/audman-0.2.0.tar.gz ~
cd ~
tar ztvf audman-0.2.0.tar.gz 
cd audman
./audws.py

* quick setup and test
./setup.py bdist_wheel
PYTHONPATH=dist/audman-0.2.1-py2.7.whl python -m audman.audws

* options
"runaudman -e" or "runaudman --enque" => default to enqueing rather than playing
"runaudman -p <port>" or "runaudman --port=<port>" => listen on specified port
"runaudman -l" or "runaudman --playlists_locked" => no playlist select options

* todo
- get the browsers to cache images files (even on meta refresh)
-? mute button
    <button type="button" id="mute">Mute</button>
- apache fcgi integration; other wsgi adapters (dbus permissions)?
-? async controls ala ajax
-? tracklist scroll bars; reacting in real-time vie ajax?

* issues
- switching to view a second playlist in the audacious gui causes  
audacious<=3.5 to report the wrong current track
- can other playlist be scrolled through without making them active?

** playlist selection
- could we list the names other playlists without making them active?
- could we list the names of tracks (or the complete "playlist-display") 
in playlists without making them active?

Note that the icons are from
https://github.com/google/material-design-icons
a much appreciated resource.
