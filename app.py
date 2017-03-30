from flask import Flask, render_template, make_response, request
import requests

app = Flask(__name__)


from flask import render_template

@app.route('/', methods=['GET', 'POST'])
def index():
	if 'sessionID' in request.cookies:
		sessionID = request.cookies.get('sessionID')
		return home_page(sessionID)
	else: 
		if request.method == 'POST':
			sessionID = request.form['sessionID']			
			#response = make_response(home_page(sessionID))
			#response.set_cookie('sessionID', sessionID)
			#return response;
		else:
			sessionID = '11010001'
			
		return home_page(sessionID)

		#http://127.0.0.1:5000/api/exercises/11010001
@app.route('/api/exercises/<int:session_id>', methods=['GET'])
def get_task(session_id):
    sessionID = session_id
    if sessionID == 0:
        abort(404)
    return home_page(sessionID)
		
def home_page(sessionID):
    return render_template('index.html', sessionID=sessionID)
	
@app.route('/get-ex')
def getex():
    return render_template('test.html')

@app.route('/ex2')
def getex2():
    return render_template('ex2.html')

	
if __name__ == "__main__":
	app.run(debug=True)
