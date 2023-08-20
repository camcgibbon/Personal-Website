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

let greetings = ["Hi", "Hola", "Olá", "Bonjour", "Howdy🤠", "Salut", "Ciao", "안녕", "Čau", "Hoi", "Привет", "Hello", "你好", "Bok", "Hallo", "Selam", "今日は", "أهلاً"];
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

let tech = ["HTML", "JavaScript", "MySQL", "Python", "Flask", "Bootstrap", "JQuery", "SQLAlchemy"];
let count2 = 0;
let index2 = 0;
let currentText2 = "";
let letter2 = "";

(function type(){

    if(count2 === tech.length){
        count2 = 0;
    }
    currentText2 = tech[count2];
    letter2 = currentText2.slice(0, ++index2);

    document.querySelector("#tech").innerHTML = letter2 + "<span id='cursor'></span>";
    if(letter2.length === currentText2.length){
        setTimeout(function(){
            count2++;
            index2 = 0;
            setTimeout(type, 500);
        }, 3000);
    } else {
        setTimeout(type, 100);
    }
}());


let lastScrollTop = 0;
window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop){
        // Downscroll, hide header
        document.querySelector("header").style.top = "-50px";
    } else {
       // Upscroll, show header
       document.querySelector("header").style.top = "0";
    }
    lastScrollTop = scrollTop;
});
