let getSidebar = document.querySelector('nav');
let getToggle = document.querySelectorAll('.toggle');
let main = document.querySelector('.main');

getToggle.forEach((toggle, i) => {
    toggle.addEventListener('click', function () {
        getSidebar.classList.toggle('active');
        if (window.matchMedia("(max-width: 768px)").matches) {
            // If media query matches
            main.style.marginLeft = getSidebar.classList.contains('active') ? '0px' : '0px';
        } else {
            main.style.marginLeft = getSidebar.classList.contains('active') ? '300px' : '60px';
        }
    });
});
