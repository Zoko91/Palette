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

var path = window.location.pathname;
var page = path.split("/").pop();
if (page == "palette" || page == "history") {
  setColors();
}
