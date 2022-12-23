from flask import *
import json
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'dc71333b4e6fa696b1d85a0c9325cb6937b9f7701242030b'

@app.route("/")
def index():
	current_page = "home"
	return render_template('home.html', current_page = current_page)

@app.route('/palette', methods=['GET', 'POST'])  
def palette():
	if request.method == 'POST':
		prompt = request.form['prompt']
		if not prompt:
			flash('Prompt is required!')
			res = make_response(redirect(url_for('index')))
		else:
			colors = [prompt]
			colors.append(getPalette())
			palettes, expire_date = setCookies()
			palettes.append(colors)
			res = make_response(render_template('palette.html', colors=colors, prompt=request.form['prompt']))
			res.set_cookie('palettes', json.dumps(palettes, indent=2), expires=expire_date)
	else :
		res = make_response(redirect(url_for('index')))
	return res

@app.route('/history')  
def history():
	palettes = []
	if 'palettes' in request.cookies:
		palettes = json.loads(request.cookies.get('palettes'))
	return render_template('history.html',palettes=palettes[1:])

@app.route("/about")
def about():
	current_page = "about"
	return render_template('about.html', current_page = current_page)
	
@app.route("/contact")
def contact():
	current_page = "contact"
	return render_template('contact.html', current_page = current_page)

def getPalette():
	return [[' #FFC0CB', ' Pink', ' Joy', ' A feeling of happiness and excitement'],
	[' #F5F5DC', ' Beige', ' Calm', ' A feeling of peace and relaxation'],
	[' #FFFACD', ' Lemon Chiffon', ' Playfulness', ' A feeling of fun and amusement'],
	[' #ADD8E6', ' Light Blue', ' Creativity', ' A feeling of imagination and inventiveness'],
	[' #E0FFFF', ' Light Cyan', ' Freedom', ' A feeling of liberation and independence']]

def setCookies():
	palettes = []
	if 'palettes' in request.cookies:
		palettes = json.loads(request.cookies.get('palettes'))
		expire_date = datetime.datetime.strptime(palettes[0], "%m/%d/%Y").date()
		if len(palettes[1:]) == 3 :
			palettes.pop(1)
	else:
		expire_date = datetime.datetime.now()
		expire_date = expire_date + datetime.timedelta(days=30)
		palettes.append(expire_date.strftime("%m/%d/%Y"))

	return palettes, expire_date

"""

cookies format =
	[ 'date',
	['An old farm close to a little pound', 
	[[' #FFC0CB', ' Pink', ' Joy', ' A feeling of happiness and excitement'], 
	[' #F5F5DC', ' Beige', ' Calm', ' A feeling of peace and relaxation'], 
	[' #FFFACD', ' Lemon Chiffon', ' Playfulness', ' A feeling of fun and amusement'], 
	[' #ADD8E6', ' Light Blue', ' Creativity', ' A feeling of imagination and inventiveness'], 
	[' #E0FFFF', ' Light Cyan', ' Freedom', ' A feeling of liberation and independence']]],
	
	['The desert of Sahara', 
	[[' #007a7a', ' Pink', ' Joy', ' A feeling of happiness and excitement'], 
	[' #f1d153', ' Beige', ' Calm', ' A feeling of peace and relaxation'], 
	[' #8d0703', ' Lemon Chiffon', ' Playfulness', ' A feeling of fun and amusement'], 
	[' #00ae00', ' Light Blue', ' Creativity', ' A feeling of imagination and inventiveness'], 
	[' #efaa06', ' Light Cyan', ' Freedom', ' A feeling of liberation and independence']]],

	['The moon', 
	[' #1e3cab', ' Pink', ' Joy', ' A feeling of happiness and excitement'], 
	[' #0c2b36', ' Beige', ' Calm', ' A feeling of peace and relaxation'], 
	[' #dcdaee', ' Lemon Chiffon', ' Playfulness', ' A feeling of fun and amusement'], 
	[' #b69264', ' Light Blue', ' Creativity', ' A feeling of imagination and inventiveness'], 
	[' #5d0056', ' Light Cyan', ' Freedom', ' A feeling of liberation and independence']],

	]

colorsFormat = ['general prompt', [' #FFC0CB', ' Pink', ' Joy', ' A feeling of happiness and excitement'], +\
	[' #F5F5DC', ' Beige', ' Calm', ' A feeling of peace and relaxation'], +\
	[' #FFFACD', ' Lemon Chiffon', ' Playfulness', ' A feeling of fun and amusement'],  +\
	[' #ADD8E6', ' Light Blue', ' Creativity', ' A feeling of imagination and inventiveness'],  +\
	[' #E0FFFF', ' Light Cyan', ' Freedom', ' A feeling of liberation and independence']]
"""
