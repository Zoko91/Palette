let swup = new Swup();


// run once
init();


// this event runs for every page view after initial load
swup.on('contentReplaced', () => {
    let activeNavBtn = document.querySelector('.active');
    activeNavBtn.classList.remove('active');
    init();
});


function init() {
    const path = window.location.pathname;
    let page = path.split("/").pop();
    function flipCard(element) {
        element.classList.toggle("flipped");
    }

    let buttons = document.getElementsByClassName("btnp");
    let cards = document.getElementsByClassName("card-color");
    let r = document.querySelector(':root');

    function setColors() {
        
        for (let card of cards) {
            let frontCard = card.querySelector(".front");
            let backCard = card.querySelector(".back");
            let backCopy = card.querySelector(".back-copy");
            frontCard.style.background = card.getAttribute("card-color");
            backCard.style.background = card.getAttribute("card-color");
            backCopy.style.background = card.getAttribute("card-color");
        }
    }

    function changeColors(card, hue, saturation, lightness) {
        let frontCard = card.querySelector(".front");
        let backCard = card.querySelector(".back");
        let backCopy = card.querySelector(".back-copy");
        let backColor = card.querySelector(".back-color");

        frontCard.style.backgroundColor = `hsl(${hue},${saturation}%,${lightness}%)`;
        backCard.style.backgroundColor = `hsl(${hue},${saturation}%,${lightness}%)`;
        backCopy.style.backgroundColor = `hsl(${hue},${saturation}%,${lightness}%)`;
        let rgb = frontCard.style.backgroundColor.replace("rgb(", '').replace(')', '').replace(' ', '').replace(' ', '').split(',');
        backColor.innerText = RGBToHex(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]));
    }

    function clampBackText() {
        
        for (let card of cards) {
            let backText = card.querySelector(".card-color-text");
            $clamp(backText, { clamp: 6, useNativeClamp: false });
            // $clamp(paragraph, {clamp: 1, useNativeClamp: false, animate: true});
        }
    }

    function colorButtonClick(button) {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("selectedButton");
        }
        let bgColor = getComputedStyle(button).backgroundColor.toString();
        let color = getComputedStyle(button).color.toString();


        r.style.setProperty('--btn-bg-color', bgColor);
        r.style.setProperty("--btn-color", color);

        button.classList.add("selectedButton");
    }

    function colorButtonUnclick(button){
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("selectedButton");
        }
        
            for (let card of cards) {
                let { hue, saturation, luminance } = getHSL(card);


                changeColors(card, hue, saturation, luminance);
            }


    }

    function darkenCards() {
        let dark = document.getElementsByClassName("Dark")[0];
        dark.addEventListener('click', () => {
            
            for (let card of cards) {
                let { hue, saturation, luminance } = getHSL(card);

                luminance = 22;

                changeColors(card, hue, saturation, luminance);
            }
            if(!dark.classList.contains("selectedButton")){
                colorButtonClick(dark);
            }
            else{
                colorButtonUnclick(dark);
            }
            

        })
    }

    function lightenCards() {
        let light = document.getElementsByClassName("Light")[0];
        light.addEventListener('click', () => {
            
            for (let card of cards) {

                let { hue, saturation, luminance } = getHSL(card);

                luminance = 74;

                changeColors(card, hue, saturation, luminance);
            }
            if(!light.classList.contains("selectedButton")){
                colorButtonClick(light);
            }
            else{
                colorButtonUnclick(light);
            }
        })
    }

    function pastelizeCards() { // low saturation for pastels
        let pastel = document.getElementsByClassName("Pastel")[0];
        pastel.addEventListener('click', () => {
            
            for (let card of cards) {
                let { hue, saturation, luminance } = getHSL(card);

                saturation = getRandomInt(35, 68);
                luminance = 74;

                changeColors(card, hue, saturation, luminance);

            }
            if(!pastel.classList.contains("selectedButton")){
                colorButtonClick(pastel);
            }
            else{
                colorButtonUnclick(pastel);
            }
        })
    }

    function warmCards() { // low saturation for pastels
        let warm = document.getElementsByClassName("Warm")[0];
        warm.addEventListener('click', () => {
            
            for (let card of cards) {
                let { hue, saturation, luminance } = getHSL(card);

                if (hue <= 270 && hue >= 90) {
                    // hue = (hue + 180)%360; // symétrie par rapport au centre
                    hue = (270 + (270 - hue)) % 360; // symétrie par rapport à l'axe horizontal
                }
                changeColors(card, hue, saturation, luminance);
            }
            if(!warm.classList.contains("selectedButton")){
                colorButtonClick(warm);
            }
            else{
                colorButtonUnclick(warm);
            }
        })
    }

    function coldCards() {
        let cold = document.getElementsByClassName("Cold")[0];

        cold.addEventListener('click', () => {
            
            for (let card of cards) {
                let { hue, saturation, luminance } = getHSL(card);

                if (hue >= 270) {
                    // A FAIRE CE N'EST PAS FAIT
                    hue = (270 - Math.abs(270 - hue)) % 360; // symétrie par rapport à l'axe horizontal
                }
                else if (hue <= 90) {
                    hue = (90 + Math.abs(90 - hue)) % 360; // symétrie par rapport à l'axe horizontal
                }

                changeColors(card, hue, saturation, luminance);


            }
            if(!cold.classList.contains("selectedButton")){
                colorButtonClick(cold);
            }
            else{
                colorButtonUnclick(cold);
            }
        })
    }

    function getHSL(card) {
        let hexCode = card.getAttribute("card-color"); // donne l'hexadécimal de la carte

        let { r, g, b } = hexToRGB(hexCode);

        let { hue, saturation, luminance } = RGBToHSL(r, g, b);
        return { hue, saturation, luminance };
    }

    function hexToRGB(hexCode) {
        let hexNumbers = hexCode.slice(1);
        let r = parseInt(hexNumbers.slice(0, 2), 16);
        let g = parseInt(hexNumbers.slice(2, 4), 16);
        let b = parseInt(hexNumbers.slice(4, 6), 16);

        return { r, g, b };
    }

    function RGBToHex(r, g, b) {
        r = r.toString(16);
        if (r.length == 1) { r = '0' + r }
        g = g.toString(16);
        if (g.length == 1) { g = '0' + g }
        b = b.toString(16);
        if (b.length == 1) { b = '0' + b }

        let hexCode = "#" + r.toString(16) + g.toString(16) + b.toString(16);

        return hexCode.toUpperCase();
    }

    function RGBToHSL(r, g, b) {
        r = r / 255;
        g = g / 255;
        b = b / 255;
        let minVal = Math.min(r, g, b);
        let maxVal = Math.max(r, g, b);

        // Find the luminance
        let luminance = ((minVal + maxVal) / 2) * 100;

        // Find the saturation
        /*
        If Luminance is less or equal to 0.5, then Saturation = (max-min)/(max+min)
        If Luminance is bigger then 0.5. then Saturation = ( max-min)/(2.0-max-min)
         */
        let saturation;
        if (luminance <= 0.5) {
            saturation = (maxVal - minVal) / (maxVal + minVal)
        } else {
            saturation = (maxVal - minVal) / (2 - maxVal - minVal)
        }
        saturation *= 100;
        // Now we need the Hue (on 360°)
        /*
        If Red is max, then Hue = (G-B)/(max-min)
        If Green is max, then Hue = 2.0 + (B-R)/(max-min)
        If Blue is max, then Hue = 4.0 + (R-G)/(max-min)
         */
        let hue;
        if (maxVal == r) {
            hue = (g - b) / (maxVal - minVal);
        } else if (maxVal == g) {
            hue = 2 + (b - r) / (maxVal - minVal);
        } else /*if (maxVal == b)*/ {
            hue = 4 + (r - g) / (maxVal - minVal);
        }

        hue = hue * 60;

        if (hue < 0) {
            hue += 360;
        }
        return { hue, saturation, luminance };

    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    if (page == "palette" || page == "history") {
        setColors();
        clampBackText();
        let retryButton = document.getElementsByClassName("Retry")[0];
        retryButton.addEventListener('click', () => {
            window.location.reload();
        })
        darkenCards();
        lightenCards();
        pastelizeCards();
        warmCards();
        coldCards();
        // window.addEventListener('load',
        //     function() {
        //         setTimeout(()=>{
        //             const loader = document.getElementById('loader-wrapper');
        //             loader.classList.add('fade-out');
        //             setTimeout(()=>{
        //                 loader.classList.remove('display');
        //             },2000)
        //         },1000)
        //     }, false);
    }

    if (page != "palette" && page != "history") {
        if (page == '') {
            page = "main";

            // Titre colors qui change de couleurs
            let colors = document.querySelector('.text-colors');
            sweep(colors, 'color', '#a8f', '#a8f', { direction: -1, duration: 100000 });

            loop(colors);
        }
        let currentPage = document.getElementById(`${page}`);
        currentPage.classList.add("active");
    }

    function loop(colors) {
        sweep(colors, ['color'], '#df2f20', '#da255a', {
            callback: loop,
            direction: 1,
            duration: 20000,
            space: 'HSL'
        });
    }


    // let color_dictionary = ['#F00', '#0F0', '#00F'];
    // let input = document.getElementById("input");
    // let i = 0;
    // let stringArray = '';
    // input.addEventListener("keypress", () => {
    //     // console.log(input.value.slice(-1));
    //     stringArray = input.value.split();
    //     stringArray.forEach(element => {
    //         input.value.innerText += `<span style="color:red">${element}</span>`;
    //     });
    //     input.style.caretColor = color_dictionary[i % 3];
    //     i++;
    // });

    for (let card of cards) {
        var backCopy = card.querySelector(".back-copy");

        //console.log(backColor.innerHTML);

        backCopy.addEventListener("click", (e) => {
            card.classList.toggle("flipped");
            var backColor = card.querySelector(".back-color").innerText;
            var backCopyConfirm = card.querySelector(".back-copy-confirm");

            if (navigator.clipboard) {
                navigator.clipboard.writeText(backColor).then(() => {
                    // alert('Copied to clipboard')
                    backCopyConfirm.style.background = card.getAttribute("card-color");
                    backCopyConfirm.classList.add("fade-in");
                    backCopyConfirm.style.display = "block";
                    setTimeout(() => {
                        backCopyConfirm.classList.replace("fade-in", "fade-out");
                        setTimeout(() => {
                            backCopyConfirm.style.display = "none";
                            backCopyConfirm.classList.remove("fade-out");
                        }, 2000);
                    }, 2000)
                    return;
                })
            } else {
                alert('Browser Not compatible with copy');
            }
        });

        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });
    }

    window.addEventListener('load',
        function () {
            const loader = document.getElementById('loader-wrapper');

            loader.classList.remove('display');
        }, false);

}

function displayLoader() {
    console.log("displayLoader");
    let loader = document.getElementById('loader-wrapper');
    loader.classList.add("display");
}

