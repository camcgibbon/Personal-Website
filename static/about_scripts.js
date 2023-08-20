window.addEventListener('load', function () {
    fetch('/spotify')
        .then(response => response.json())
        .then(data => {
            var trackList = document.getElementById('spotify-top-tracks');
            trackList.innerHTML = '';
            data.items.forEach(item => {
                var listItem = document.createElement('li');

                var imageElement = document.createElement('img');
                imageElement.src = item.album.images[0].url;
                imageElement.classList.add('album-image');
                listItem.appendChild(imageElement);

                var textDiv = document.createElement('div');
                
                var songTitle = document.createElement('h4');
                songTitle.textContent = item.name;
                songTitle.classList.add('song-title');
                textDiv.appendChild(songTitle);
                
                var artistName = document.createElement('p');
                artistName.textContent = `${item.artists.map(artist => artist.name).join(', ')}`;
                artistName.classList.add('artist-name');
                textDiv.appendChild(artistName);

                listItem.appendChild(textDiv);

                trackList.appendChild(listItem);
            });
        });
});

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