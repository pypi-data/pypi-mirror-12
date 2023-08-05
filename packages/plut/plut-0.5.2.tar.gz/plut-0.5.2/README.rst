plut
====

When you're building several web apps simultaneously (an increasingly
common situation with microservices) it's annoying to try and remember
which app is on which port. plut (port lookup table) does it for you.

Installation
------------

Run ::

  pip install plut

Usage
-----

plut maps names to ports. You supply a name and get back the port it's mapped
to.

Imagine you have a web app with two microservices responsible for
authentication and the user dashboard. Each of these services needs to know
what port to bind to when it starts up, and what port the other is on, so they
can talk. In this case, you might code-name these services ``auth``
and ``dashboard`` respectively.  Inside the authentication service, you'd say: ::

  import plut

  port = plut.port('userauth')

  run_webserver(port=port)

Now imagine the authentication service exposes an API. Inside the dashboard
service you could say: ::

  import plut

  base_url = 'http://localhost:%d/api/v1' % plut.port('userauth')
  # use requests or something to send requests to base_url

Functions
*********

 * **``plut.port(name)``** returns the port that ``name`` maps to.
   The same port will be returned for each ``name``, user-wide.

 * **``plut.services()``** returns a dict mapping names to ports.

Command-Line
************

 * **``plut``** shows all names and ports.

 * **``plut <name>``** shows the port of a name. This prints out a single
   integer, so you can use its output as a command-line argument for another
   program.

 * **``plut rm <name>``** removes a port. (There's no programmatic API for this
   at the moment. Should I add it? I'm a bit lazy.)

Notes
-----

plut saves everything to ``~/.plutfile``. If you delete this you'll
lose (or voluntarily reset) your mappings.
