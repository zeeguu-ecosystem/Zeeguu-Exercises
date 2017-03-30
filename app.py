from flask import Flask, render_template,request
import requests

app = Flask(__name__)


from flask import render_template

@app.route('/')
def index():
    return render_template('index.html')
	
@app.route('/get-ex')
def getex():
    return render_template('test.html')

@app.route('/ex2')
def getex2():
    return render_template('ex2.html')

	
if __name__ == "__main__":
	app.run(debug=True)
