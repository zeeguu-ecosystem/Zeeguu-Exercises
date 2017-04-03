from flask import Flask, render_template, make_response, request, redirect, g, url_for
import requests
import functools
from functools import wraps
from flask import render_template

app = Flask(__name__)

def with_session(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        request.sessionID = None
       	if request.args.get('sessionID'):
			print "section 1"
			request.sessionID = int(request.args['sessionID'])
        elif 'sessionID' in request.cookies:
			print "section 2"
			request.sessionID = request.cookies.get('sessionID')
        else:
			print "section 3"
			request.sessionID = '11010001'
        return f(*args, **kwargs)
    return decorated_function

@app.route('/', methods=['GET'])
@with_session
def index():	
	print request.args
	print request.cookies
	print request.sessionID	
	return home_page(request.sessionID)

	
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
