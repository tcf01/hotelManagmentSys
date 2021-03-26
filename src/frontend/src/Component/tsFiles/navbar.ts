import $ from 'jquery';

export {}

// window.onload = () => {
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbarWrapper');
    const navbarText = $('.button .text');
    if (navbar && window.scrollY > 0) {
        navbar.setAttribute('style', "background-color: white");
        navbarText.attr('style', 'color: #00539CFF')
    } else if (navbar && window.scrollY === 0) {
        navbar.removeAttribute('style');
        navbarText.removeAttr('style');
    }
})
// };

