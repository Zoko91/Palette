from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
	current_page = "home"
	return render_template('home.html', current_page = current_page)

@app.route('/palette')  
def palette():
	colors = ["A new farm close to a little pound","#0000", "#FF800", "#56284", "#56FFF", "#00FFF"]
	return render_template('palette.html',len = len(colors), colors=colors)

@app.route("/about")
def about():
	current_page = "about"
	return render_template('about.html', current_page = current_page)
	
@app.route("/contact")
def contact():
	current_page = "contact"
	return render_template('contact.html', current_page = current_page)
