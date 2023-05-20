window.addEventListener('scroll', reveal);

function reveal(){
  var reveals = document.querySelectorAll('.hidden');

  for(var i = 0; i < reveals.length; i++){

    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 150;

    if(revealTop < windowHeight - revealPoint){
      reveals[i].classList.add('reveal');
    }
  }
}

let greetings = ["Hi", "Hola", "Olá", "Bonjour", "Salut", "Ciao"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type(){

    if(count === greetings.length){
        count = 0;
    }
    currentText = greetings[count];
    letter = currentText.slice(0, ++index);

    document.querySelector("#greeting").innerHTML = letter + "<span id='cursor'></span>";
    if(letter.length === currentText.length){
        setTimeout(function(){
            count++;
            index = 0;
            setTimeout(type, 500);
        }, 3000);
    } else {
        setTimeout(type, 100);
    }
}());


