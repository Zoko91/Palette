function flipCard(element) {
  element.classList.toggle("flipped");
}

function setColors() {
  var cards = document.getElementsByClassName("card");
  for (let card of cards) {
    console.log(card.getAttribute("card-color"));
    card.style.background = card.getAttribute("card-color");
  }
}

var path = window.location.pathname;
var page = path.split("/").pop();
if (page == "palette" || page == "history") {
  setColors();
}
