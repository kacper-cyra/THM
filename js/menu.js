'use strict'
let menuShowed = false;
let $menu = document.querySelector(".menu");
let $burger = document.querySelector(".burger");
let $burgerWrapp = document.querySelector(".burger-wrapper");
let position = 0;

function showMenu() {
    position = window.pageYOffset;
    if (menuShowed === false) {
        $burgerWrapp.classList.add(".burger-rotated");
        $menu.style.top = window.scrollY + "px";
        menuShowed = true;
        bodyScrollLock.disableBodyScroll($menu);
        document.querySelector('body').style.overflow = 'hidden';
        document.querySelector(".wing:nth-child(1)").classList.add("upper-wing");
        document.querySelector(".wing:nth-child(2)").classList.add("middle-wing");
        document.querySelector(".wing:nth-child(3)").classList.add("lower-wing");
        $menu.classList.add("m-showed");
    } else {
        $burgerWrapp.classList.remove(".burger-rotated");
        bodyScrollLock.enableBodyScroll($menu);
        document.querySelector('body').style.overflow = 'auto';
        document.querySelector(".wing:nth-child(1)").classList.remove("upper-wing");
        document.querySelector(".wing:nth-child(2)").classList.remove("middle-wing");
        document.querySelector(".wing:nth-child(3)").classList.remove("lower-wing");
        menuShowed = false;
        $menu.classList.remove("m-showed");
    }
}
