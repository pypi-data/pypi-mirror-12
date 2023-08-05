plut
====

(port lookup table)

If you're simultaneously developing multiple web apps on localhost,
which happens increasingly often in the age of microservices, it's
annoying to remember which app is on which port. So plut does it for
you.

To install, run `pip install plut`, then run: ::

  echo source ~/.plutrc >> ~/.bashrc

Usage
-----

The point of plut is to remember what app is running where. The basic
mechanism used by plut is to map names to ports.
 
To get the port corresponding to a name, run: ::

  import plut

  port = plut.port('myservice') # returns an int

plut saves this inside ``~/.plutrc`` (which you told your bashrc to
source from earlier). The next time you run ``plut.port``, it'll check
if a port already exists and if so, give you that instead.
 
You can also do this from the command-line: ::

  plut            # lists all services
  plut rm <name>  # remove a service
  plut <name>     # get the port of a service
