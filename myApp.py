from flask import *
import json
import datetime
import openai

app = Flask(__name__)
app.config['SECRET_KEY'] = 'dc71333b4e6fa696b1d85a0c9325cb6937b9f7701242030b'


@app.route("/")
def index():
    current_page = "home"
    return render_template('home.html', current_page=current_page)


@app.route('/palette', methods=['GET', 'POST'])
def palette():
    current_page = "Your palette"
    if request.method == 'POST':
        prompt = request.form['prompt']
        if not prompt:
            flash('Prompt is required!')
            res = make_response(redirect(url_for('index')))
        else:
            colors = [prompt, getpalette(prompt)]

            L = get_luminance(colors[1])  # TEST ICI
            contrasts = find_contrasts(L)

            colors.append(contrasts)

            palettes, expire_date = setCookies()
            palettes.append(colors)
            res = make_response(render_template('palette.html', colors=colors, prompt=prompt, current_page = current_page ))  # ENLEVER LUMI SI MARCHE PAS
            res.set_cookie('palettes', json.dumps(palettes, indent=2), expires=expire_date)
    else:
        res = make_response(redirect(url_for('index')))
    return res


@app.route('/history')
def history():
    palettes = []
    if 'palettes' in request.cookies:
        palettes = json.loads(request.cookies.get('palettes'))
    return render_template('history.html', palettes=palettes[1:])


@app.route("/about")
def about():
    current_page = "about"
    return render_template('about.html', current_page=current_page)


@app.route("/contact")
def contact():
    current_page = "contact"
    return render_template('contact.html', current_page=current_page)


def getpalette(prompt_text):
    # input_text is the one given to openAi
    input_text = 'Elaborate a palette of 5 colors based on the sentiment analysis of this prompt: ' + prompt_text + ' Write the answer as followed: "hexadecimal value$Name of the color$One sentiment the color is based on$Detailed and contextualized description of the sentiment."'
    # connection to the openAI API using Joseph's credentials
    openai.api_key = "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"
    response = openai.Completion.create(model="text-davinci-003",
                                        prompt=input_text,
                                        temperature=0.2,
                                        max_tokens=500)  # we define a maximum of 0.01$ per input

    # If response is null then modify the code to return NotFound or problem....

    # collecting the answer and selecting the important informations out of it
    vals = response["choices"][0]["text"].split('.')
    colors = []
    if len(vals) == 6 or vals[-1] == '':
        vals.pop()
    for i in range(5):
        # colors is a list of 5 list of 1. color 2. color name 3. sentiment 4. sentiment analysis
        colors.append(vals[i].split('$'))
    for inner in colors:
        for i in range(len(inner)):
            inner[i] = inner[i].replace('\n', '')
    return colors


def setCookies():
    palettes = []
    if 'palettes' in request.cookies:
        palettes = json.loads(request.cookies.get('palettes'))
        expire_date = datetime.datetime.strptime(palettes[0], "%m/%d/%Y").date()
        if len(palettes[1:]) == 3:
            palettes.pop(1)
    else:
        expire_date = datetime.datetime.now()
        expire_date = expire_date + datetime.timedelta(days=30)
        palettes.append(expire_date.strftime("%m/%d/%Y"))

    return palettes, expire_date


def rgbtorange01(color):
    """R, G or B value put to range 0-1"""
    return color / 255


def get_luminance(colors):
    L = []
    for color in colors:
        r_s_rgb, g_s_rgb, b_s_rgb = hex_to_rgb(color[0])
        r_s_rgb, g_s_rgb, b_s_rgb = rgbtorange01(r_s_rgb), rgbtorange01(g_s_rgb), rgbtorange01(b_s_rgb)

        # if RsRGB <= 0.03928 then R = RsRGB/12.92 else R = ((RsRGB+0.055)/1.055) ^ 2.4
        # if GsRGB <= 0.03928 then G = GsRGB/12.92 else G = ((GsRGB+0.055)/1.055) ^ 2.4
        # if BsRGB <= 0.03928 then B = BsRGB/12.92 else B = ((BsRGB+0.055)/1.055) ^ 2.4

        if r_s_rgb <= 0.3928:
            R = r_s_rgb / 12.92
            G = ((g_s_rgb + 0.055) / 1.055) ** 2.4
            B = ((b_s_rgb + 0.055) / 1.055) ** 2.4
        elif g_s_rgb <= 0.03928:
            R = ((r_s_rgb + 0.055) / 1.055) ** 2.4
            G = g_s_rgb / 12.92
            B = ((b_s_rgb + 0.055) / 1.055) ** 2.4
        elif b_s_rgb <= 0.03928:
            R = ((r_s_rgb + 0.055) / 1.055) ** 2.4
            G = ((g_s_rgb + 0.055) / 1.055) ** 2.4
            B = b_s_rgb / 12.92
        else:
            R = ((r_s_rgb + 0.055) / 1.055) ** 2.4
            G = ((g_s_rgb + 0.055) / 1.055) ** 2.4
            B = ((b_s_rgb + 0.055) / 1.055) ** 2.4

        L.append(0.2126 * R + 0.7152 * G + 0.0722 * B)
    return L


def find_contrasts(luminance_array):
    contrasts = []
    for luminance in luminance_array:
        if luminance <= 0.18:
            contrasts.append('#fff')
        else:
            contrasts.append('#000')
    return contrasts


def hex_to_rgb(value):
    value = value.lstrip(' #')
    lv = len(value)
    return tuple(int(value[i:i + lv // 3], 16) for i in range(0, lv, lv // 3))


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
