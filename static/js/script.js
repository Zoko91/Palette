var path = window.location.pathname;
var page = path.split("/").pop();

function flipCard(element) {
  element.classList.toggle("flipped");
}

function setColors() {
  var cards = document.getElementsByClassName("card-color");
  for (let card of cards) {
    var frontCard = card.querySelector(".front");
    var backCard = card.querySelector(".back");
    var backCopy = card.querySelector(".back-copy");
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


if (page == "palette" || page == "history") {
  setColors();
  clampBackText();
  let retryButton = document.getElementsByClassName("Retry")[0];
  retryButton.addEventListener('click', ()=>{
    window.location.reload();
  })
}

