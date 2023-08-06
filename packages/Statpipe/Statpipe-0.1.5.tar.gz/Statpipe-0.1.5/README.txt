Statpipe
=============

Depends on Stata. 

Tested with version 12 through 14 on OS X. 
Should work for Linux/Unix too.

Statpipe is a simple command line utility allowing Stata commands to be piped into
Stata, and the output returned.

For example:

    echo "di 2^2" | statpipe
    . di 2^2
    4

You can also use in interactive mode (although state isn't saved across calculations):

	statpipe
	> Enter a stata expression (e.g. di 2*2):
	di 2*2
	> Cached output re-used
	> . di 2*2
	> 4
	

Or from a Python script you can import and use like so:

	from statpipe import run_stata_code
	print run_stata_code("di 2+2").split("\n")
	> ['. di 2+2', '4', '']



To install, download and:

	cd statpipe
	python setup.py install #you might need to sudo if installing in system python
	
or

	pip install statpipe
