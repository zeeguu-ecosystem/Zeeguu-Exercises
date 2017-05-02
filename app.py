import functools
from flask import Flask, render_template, make_response, request, redirect, g, url_for
import requests
from functools import wraps
from flask import render_template

"""
The default_session is only used for testing purposes
Alternative: 11010001 34563456
"""
DEFAULT_SESSION = '11010001'

app = Flask(__name__)

def with_session(f):
	"""
	Decorator for checking sessionID
	- query string
	- cookie parameter
	- defualt_session for tests
	Example: http://127.0.0.1:5000/?sessionID=11010001
	"""
	@wraps(f)
	def decorated_function(*args, **kwargs):
		print request.args.get
		request.sessionID = None
		if request.args.get('sessionID'):
			print "Session is supplied as a query string"
			request.sessionID = int(request.args['sessionID'])
		elif 'sessionID' in request.cookies:
			print "Session is retrived from cookies"
			request.sessionID = request.cookies.get('sessionID')
		else:
			print "Session is default for testing"
			request.sessionID = DEFAULT_SESSION
		return f(*args, **kwargs)
	return decorated_function

@app.route('/', methods=['GET'])
@with_session
def index():	
	return home_page(request.sessionID)

@app.route('/get-ex/', methods=['GET'])
@with_session
def getex():
	return test_page(request.sessionID)

def home_page(session_id):
	return render_template('index.html', sessionID=session_id)
	
def test_page(session_id):
	return render_template('test.html', sessionID=session_id)
	


@app.route('/ex2')
def getex2():
    return render_template('ex2.html')

	
if __name__ == "__main__":
	app.run(debug=True)
