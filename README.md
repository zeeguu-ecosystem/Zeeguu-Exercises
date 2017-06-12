An adaptive online language practice platform
=====
[![Build Status](https://travis-ci.org/martinavagyan/zeeguu-exercises.svg?branch=master)](https://travis-ci.org/martinavagyan/zeeguu-exercises)
[![Coverage Status](https://coveralls.io/repos/github/martinavagyan/zeeguu-exercises/badge.svg?branch=master)](https://coveralls.io/github/martinavagyan/zeeguu-exercises?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/martinavagyan/zeeguu-exercises.svg)](https://gemnasium.com/github.com/martinavagyan/zeeguu-exercises)
[![NSP Status](https://nodesecurity.io/orgs/martinavagyan/projects/69db0b36-c5a2-4f40-bafd-79775a774854/badge)](https://nodesecurity.io/orgs/martinavagyan/projects/69db0b36-c5a2-4f40-bafd-79775a774854)
[![Documentation Coverage](https://martinavagyan.github.io/zeeguu-exercises/badge.svg)](https://martinavagyan.github.io/zeeguu-exercises/)
=====

How to run the code on local machine
------------------------------------

At first clone the repository from
<https://github.com/martinavagyan/zeeguu-exercises.git>  
Note: you need to have python 3.6.1 installed, on your machine.
The back end uses *Flask Framework*. The following tutorial shows, how to set up
*virtualenv* and *Flask*:  
<http://flask.pocoo.org/docs/0.12/installation/>  

Note: to install virtual, enviroment on windows type:  

    pip install virtualenv
    
To install the virtual environment for the project, navigate to the folder and type:

    virtualenv < name of the folder>
  
After installing virtual environment on the project folder, activate it
using:

    venv/Scripts/activate

**Make sure the environment is activated before proceeding with the
instructions.**
 
 Install all dependencies from requriments.txt
 
     pip install -r requirements.txt

In case you add new dependencies, do not forget to update the requirements.txt file

    pip freeze > requirements.txt    

   
A batch file (*batchfile*.*bat*) is provided to
easily activate the virtual environment and start the localhost, given that all the previous installations are successfully completed.

    http://127.0.0.1:5000/ 

The application will redirect to that to Zeeguu login page if the cookie for the session is not set. To set the cokkie for session run :

    http://127.0.0.1:5000/debug
This will set a test cookie for local debuging.

Heroku Deployment
-----------------

The project is deployed on the *Heroku* server[1]. The
deployment is connected to Github repository: https://github.com/martinavagyan/zeeguu-exercises
The link to deplyed app:  [zeeguu.herokuapp.com]  
[1] https://www.heroku.com/

  [zeeguu.herokuapp.com]: zeeguu.herokuapp.com
