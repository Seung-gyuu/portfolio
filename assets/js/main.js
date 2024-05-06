// menu show Y hidden
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

startImageTransition();

// menu show 
// validate if const exists
if(navToggle){
    navToggle.addEventListener('click', ()=>{
        navMenu.classList.add('show-menu')
    })
}

// menu hidden
// validate if const exist
if(navClose){
    navClose.addEventListener('click', ()=>{
        navMenu.classList.remove('show-menu')
    })
}

// remove memu mobile
const navLink = document.querySelectorAll('.nav__link')
function linkAction(){
    // const navMenu = document.getElementById('nav-menu')
    // when clicking on each nav__link, remove the show-menu
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


// accordion skills
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i=0;i<skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el)=>{
    el.addEventListener('click', toggleSkills)
})

// qualification tabs
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click', ()=>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tab.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/*==================== SERVICES MODAL ====================*/


/*==================== PORTFOLIO SWIPER  ====================*/
let swiper = new Swiper(".portfolio__container", {
    cssMode: true,
    loop: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    mousewheel: true,
    keyboard: true,
  });

/*==================== image transition ====================*/

function startImageTransition() {
    const images = document.getElementsByClassName("images");
    const svg = document.querySelector(".home_blob");
    let curIndex = 0;

    setInterval(changeImage, 5000);

    function changeImage() {
        const curImage = images[curIndex];
        const nextIndex = (curIndex + 1) % images.length;
        const nextImage = images[nextIndex];
        svg.classList.add('transitioning');

        // Change SVG fill color based on the next image
        if (nextImage.classList.contains('home_blob-img')) {
            svg.style.fill = '#ffc107'; 
        } else if (nextImage.classList.contains('home_blob-img2')) {
            svg.style.fill = 'hsl(230, 69%, 65%)'; 
        }

        // Fade out the current image
        curImage.style.opacity = 0;
        curImage.style.transition = 'opacity 2s ease-in-out';

        setTimeout(() => {
            nextImage.style.opacity = 1;
            nextImage.style.transition = 'opacity 2s ease-in-out';

            // Remove transitioning class after transition ends
            setTimeout(() => {
                svg.classList.remove('transitioning');
            }, 1000); // Duration of the transition

        }, 500); 

        curIndex = nextIndex;
    }
}



/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__nmenu a[href*='+ sectionId + ']').classList.remove('active-link')
        }
    })
}

window.addEventListener('scroll',scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 

function scrollUp(){
    const scrollUp = document.getElementById('scroll-up')
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME ====================*/ 
const themebutton = document.getElementById('theme-btn')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon =localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark'
: 'light'
const getCurrentIcon = () => themebutton.classList.contains(iconTheme) ? 'uil-moon'
: 'uil-sun'

if(selectedTheme){
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themebutton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

themebutton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themebutton.classList.toggle(iconTheme)

    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})