from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
	return render_template('home.html')

@app.route('/palette')  
def palette():
	colors = ["A new farm close to a little pound","#0000", "#FF800", "#56284", "#56FFF", "#00FFF"]
	return render_template('palette.html',len = len(colors), colors=colors)