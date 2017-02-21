from flask import Flask, render_template,request
import requests

app = Flask(__name__)


from flask import render_template

@app.route('/')
def index():
    print "test!"
    return render_template('index.html')
	
@app.route('/get-ex')
def getex():
    return app.send_static_file('template/index.html')

@app.route('/ex2')
def getex2():
    return render_template('ex2.html')

	
if __name__ == "__main__":
	app.run(debug=True)
