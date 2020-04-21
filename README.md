An adaptive online language practice platform
=====
[![Build Status](https://travis-ci.org/martinavagyan/zeeguu-exercises.svg?branch=master)](https://travis-ci.org/martinavagyan/zeeguu-exercises)
[![Coverage Status](https://coveralls.io/repos/github/martinavagyan/zeeguu-exercises/badge.svg?branch=master)](https://coveralls.io/github/martinavagyan/zeeguu-exercises?branch=master)
[![Documentation Coverage](https://martinavagyan.github.io/zeeguu-exercises/badge.svg)](https://martinavagyan.github.io/zeeguu-exercises/)

Running locally
------------------------------------

First clone the repository from
<https://github.com/martinavagyan/zeeguu-exercises.git>  
### Front-end
The front end uses Node.js. Referer here for further directions https://nodejs.org/en/download/.
After the installation of Node.js was successful, navigate to the project folder and run: 
```
npm install
npm run build
```
If the installation was successful all the necessary files should be created.
### Back-end
Note: you need to have python 3.6.1 installed, on your machine.
The back end uses *Flask Framework*. The following tutorial shows, how to set up
*virtualenv* and *Flask*:  
<http://flask.pocoo.org/docs/0.12/installation/>  

Note: to install virtual, enviroment on windows run:  

    pip install virtualenv
    
To install the virtual environment for the project, navigate to the folder and run:

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

The application will redirect to Zeeguu login page if the cookie for the session is not set yet. To set a test session in the cookies, go to the browser and run :


