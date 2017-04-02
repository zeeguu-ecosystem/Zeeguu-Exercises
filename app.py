from flask import Flask, render_template, make_response, request, redirect, url_for
import requests
import functools
from flask import render_template

app = Flask(__name__)




def with_session(view):
    """
    Decorator checks whether a session is available either in
     - as a cookie
     - as a GET or POST parameter
    If it is, it sets the sessionID field on the request object
    which can be used within the decorated functions.
    In case of no session, user is redirected to login form.
    """

    @functools.wraps(view)
    def wrapped_view(*args, **kwargs):

        request.sessionID = None

        if request.args.get('sessionID', None):
            request.sessionID = int(request.args['sessionID'])
        elif 'sessionID' in request.cookies:
            request.sessionID = request.cookies.get('sessionID')
        elif request.form.get('sessionID', None):
            request.sessionID = '11010001'
        else:
            flask.abort(401)

        return view(*args, **kwargs)

	return wrapped_view

@app.route('/practice', methods=['GET'])
@with_session
def index():	
	return home_page(request.sessionID)

	#http://127.0.0.1:5000/11010001

def home_page(session_id):
    return render_template('index.html', sessionID=session_id)
	
@app.route('/get-ex')
def getex():
    return render_template('test.html')

@app.route('/ex2')
def getex2():
    return render_template('ex2.html')

	
if __name__ == "__main__":
	app.run(debug=True)
