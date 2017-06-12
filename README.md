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
Note: you need to have python 3.6.1 installed in your machine.
  
The following tutorial shows how to install
*virtualenv* and *Flask*:  
<http://flask.pocoo.org/docs/0.12/installation/>  

Note: to install virtual enviroment in windows type:  

    pip install virtualenv
    
To install the virtual enviroment for the project, navigate to the folder and type:
virtualenv < name of the folder>
  
After installing virtual environment in the project folder, activate it
using:

    venv/Scripts/activate

***Make sure the environment is activated before proceeding with the
instructions***  
 
 Install all dependencies from requriments.txt
 
 pip install -r requirements.txt


Afterwards, you need to (re)generate the requirements file:

    pip freeze > requirements.txt 

And then save it:

    

   
A batch file (*batchfile*.*bat*) is provided to
easily activate the virtual environment and start the local host, given
that all the previous installations are successfully completed.

Heroku Deployment
-----------------

The project is deployed on the *Heroku* server[1]. The
deployment is connectedto Github repository: https://github.com/martinavagyan/zeeguu-exercises
The link to our app:  
[zeeguu.herokuapp.com]  
The repository connected to heroku is:  
<https://github.com/martinavagyan/practice-as-a-service>  
In order to contribute to the project you can fork the repository,
connect it to heroku to have your own running version.  
How to deploy a Phyton app on Heroku:  
<https://devcenter.heroku.com/articles/getting-started-with-python#introduction>  

[1] https://www.heroku.com/

  [zeeguu.herokuapp.com]: zeeguu.herokuapp.com
