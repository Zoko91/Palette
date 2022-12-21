from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
	current_page = "home"
	return render_template('home.html', current_page = current_page)

@app.route('/palette')  
def palette():
	colors = ["An old farm close to a little pound","#eea23f", "#9365c1", "#6ac941", "#e95dcf", "#438ccc"]
	return render_template('palette.html', colors=colors)

@app.route('/history')  
def history():
	colors = [["An old farm close to a little pound","#eea23f", "#9365c1", "#6ac941", "#e95dcf", "#438ccc"],
	["The desert of Sahara","#007a7a", "#f1d153", "#8d0703", "#00ae00", "#efaa06"],
	["The moon","#1e3cab", "#0c2b36", "#dcdaee", "#b69264", "#5d0056"]]
	return render_template('history.html',colors=colors)

@app.route("/about")
def about():
	current_page = "about"
	return render_template('about.html', current_page = current_page)
	
@app.route("/contact")
def contact():
	current_page = "contact"
	return render_template('contact.html', current_page = current_page)
