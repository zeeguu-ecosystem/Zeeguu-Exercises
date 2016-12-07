from flask import Flask, render_template,request
import requests

app = Flask(__name__)


from flask import render_template

@app.route('/')
def index():
    return render_template('index.html')
	
@app.route('/get-ex')
def test():
    return app.send_static_file('template/simple.html')

	
if __name__ == "__main__":
	app.run(debug=True)