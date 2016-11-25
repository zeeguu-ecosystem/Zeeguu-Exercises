from flask import Flask, render_template,request
app = Flask(__name__)

@app.route('/send', methods=['GET','POST'])
def send():
	if request.method == 'POST':
		age = request.form['age']
		
		return render_template('age.html',age=age)
		
	return render_template('index.html')
	
def index():
	lst = [31,4,23,24,45,87,76,132,66,77]
	return render_template("index.html",nums = lst)

if __name__ == "__main__":
	app.run()