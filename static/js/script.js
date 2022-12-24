var path = window.location.pathname;
var page = path.split("/").pop();

function flipCard(element) {
  element.classList.toggle("flipped");
}

function setColors() {
  let cards = document.getElementsByClassName("card-color");
  for (let card of cards) {
    let frontCard = card.querySelector(".front");
    let backCard = card.querySelector(".back");
    let backCopy = card.querySelector(".back-copy");
    frontCard.style.background = card.getAttribute("card-color");
    backCard.style.background = card.getAttribute("card-color");
    backCopy.style.background = card.getAttribute("card-color");
  }
}

function clampBackText(){
  let cards = document.getElementsByClassName("card-color");
  for (let card of cards) {
    let backText = card.querySelector(".card-color-text");
    $clamp(backText, {clamp: 5, useNativeClamp: false});
    // $clamp(paragraph, {clamp: 1, useNativeClamp: false, animate: true});
  }
}

function darkenCards(){
  let dark = document.getElementsByClassName("Dark")[0];
  dark.addEventListener('click', () => {
    let cards = document.getElementsByClassName("card-color");
    for (let card of cards) {
      let {hue,saturation,luminance} = getHSL(card);

      let frontCard = card.querySelector(".front");

      frontCard.style.backgroundColor = `hsl(${hue},${saturation}%,${22}%)`;
    }
  })
}
function lightenCards(){
  let light = document.getElementsByClassName("Light")[0];
  light.addEventListener('click', () => {
    let cards = document.getElementsByClassName("card-color");
    for (let card of cards) {

      let {hue,saturation,luminance} = getHSL(card);

      let frontCard = card.querySelector(".front");
      frontCard.style.backgroundColor = `hsl(${hue},${saturation}%,${74}%)`;
    }
  })
}
function pastelizeCards(){ // low saturation for pastels
  let pastel = document.getElementsByClassName("Pastel")[0];
  pastel.addEventListener('click', () => {
    let cards = document.getElementsByClassName("card-color");
    for (let card of cards) {

      let {hue,saturation,luminance} = getHSL(card);
      saturation = getRandomInt(35, 68);
      let frontCard = card.querySelector(".front");
      frontCard.style.backgroundColor = `hsl(${hue},${saturation}%,${65}%)`;
    }
  })
}
function warmCards(){ // low saturation for pastels
  let warm = document.getElementsByClassName("Warm")[0];
  warm.addEventListener('click', () => {
    let cards = document.getElementsByClassName("card-color");
    for (let card of cards) {
      let {hue,saturation,luminance} = getHSL(card);

      if(hue <= 270 && hue >=90){
        // hue = (hue + 180)%360; // symétrie par rapport au centre
        hue = (270+(270-hue))%360; // symétrie par rapport à l'axe horizontal
      }

      let frontCard = card.querySelector(".front");
      frontCard.style.backgroundColor = `hsl(${hue},${saturation}%,${luminance}%)`;
    }
  })
}
function coldCards(){ // low saturation for pastels
  let cold = document.getElementsByClassName("Warm")[0];
  cold.addEventListener('click', () => {
    let cards = document.getElementsByClassName("card-color");
    for (let card of cards) {
      let {hue,saturation,luminance} = getHSL(card);

      if(hue <= 270 && hue >=90){
        // A FAIRE CE N'EST PAS FAIT
        hue = (270+(270-hue))%360; // symétrie par rapport à l'axe horizontal
      }

      let frontCard = card.querySelector(".front");
      frontCard.style.backgroundColor = `hsl(${hue},${saturation}%,${luminance}%)`;
    }
  })
}

function getHSL(card){
  let hexCode = card.getAttribute("card-color"); // donne l'hexadécimal de la carte

  let {r,g,b} = hexToRGB(hexCode);

  let {hue,saturation,luminance} = RGBToHSL(r,g,b);
  return {hue,saturation,luminance};
}
function hexToRGB(hexCode){
  let hexNumbers = hexCode.slice(1);
  let r = parseInt(hexNumbers.slice(0,2),16);
  let g = parseInt(hexNumbers.slice(2,4),16);
  let b = parseInt(hexNumbers.slice(4,6),16);

  return {r, g, b};
}

function RGBToHSL(r,g,b){
  r = r/255; g = g/255; b = b/255;
  let minVal = Math.min(r, g, b);
  let maxVal = Math.max(r,g,b);

  // Find the luminance
  let luminance = ((minVal + maxVal)/2)*100;

  // Find the saturation
  /*
  If Luminance is less or equal to 0.5, then Saturation = (max-min)/(max+min)
  If Luminance is bigger then 0.5. then Saturation = ( max-min)/(2.0-max-min)
   */
  let saturation;
  if(luminance <= 0.5){  saturation = (maxVal - minVal) / (maxVal + minVal)}
  else                {  saturation = (maxVal - minVal) / (2 - maxVal - minVal)}
  saturation *= 100;
  // Now we need the Hue (on 360°)
  /*
  If Red is max, then Hue = (G-B)/(max-min)
  If Green is max, then Hue = 2.0 + (B-R)/(max-min)
  If Blue is max, then Hue = 4.0 + (R-G)/(max-min)
   */
  let hue;
  if (maxVal == r)          {  hue =     (g-b) / (maxVal - minVal);}
  else if (maxVal == g)     {  hue = 2 + (b-r) / (maxVal - minVal);}
  else /*if (maxVal == b)*/ {  hue = 4 + (r-g) / (maxVal - minVal);}

  hue = hue*60;

  if (hue<0) { hue += 360;}


  return {hue,saturation,luminance};

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
  retryButton.addEventListener('click', ()=>{
    window.location.reload();
  })
  darkenCards();
  lightenCards();
  pastelizeCards();
  warmCards();
  coldCards();
}

