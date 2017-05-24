#!/bin/env python
import sys
import os

dir = os.path.dirname(os.path.realpath(__file__))

sys.path.append(dir)
 # the trick with appending the current folder to the 
 # sys.path i read from: http://www.jakowicz.com/flask-apache-wsgi/

from app import app as application
application.config['DEBUG']=True
print ("PRACTICE: started the service")
