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
