Usage
=====

How to run the code on local machine
------------------------------------

At first clone the repository from
<https://github.com/martinavagyan/zeeguu-exercises.git>  
In order to run the code on the local machine, we need to install the
following dependencies: Python Virtual environment, *F**l**a**s**k*,
*G**u**n**i**c**o**r**n*, *R**e**q**u**e**s**t**s*.  
  
The following tutorial shows how to install
*v**i**r**t**u**a**l**e**n**v* and *F**l**a**s**k*:  
<http://flask.pocoo.org/docs/0.12/installation/>  
  
After installing virtual environment in the project folder, activate it
using:

    venv/Scripts/activate

***Make sure the environment is activated before proceeding with the
instructions***  
  
To install *g**u**n**i**c**o**r**n* use the following command:

    pip install gunicorn

More details here:  
<http://docs.gunicorn.org/en/stable/install.html>  
  
To install the *r**e**q**u**e**s**t**s* package simply do:

    pip install requests

   
Afterwards, you need to (re)generate the requirements file:

    pip freeze > requirements.txt 

And then save it:

    pip install -r requirements.txt

   
A batch file (*b**a**t**c**h**f**i**l**e*.*b**a**t*) is provided to
easily activate the virtual environment and start the local host, given
that all the previous installations are successfully completed.

Heroku Deployment
-----------------

The code is already deployed on the *H**e**r**o**k**u* server[1]. The
deployment is done through Github.  
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
