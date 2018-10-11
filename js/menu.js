'use strict'
let menuShowed = false;
let $menu = document.querySelector(".menu");
let $burger = document.querySelector(".burger");
let $burgerWrapp = document.querySelector(".burger-wrapper");
let position = 0;

document.querySelector(".burger").addEventListener("click", showMenu)

function showMenu() {
    position = window.pageYOffset;
    if (menuShowed === false) {
        $burgerWrapp.classList.add(".burger-rotated");
        $menu.style.top = window.scrollY + "px";
        menuShowed = true;
        document.addEventListener("scroll", blocked);
        document.querySelector('body').style.overflow = 'hidden';
        document.querySelector(".wing:nth-child(1)").classList.add("upper-wing");
        document.querySelector(".wing:nth-child(2)").classList.add("middle-wing");
        document.querySelector(".wing:nth-child(3)").classList.add("lower-wing");
        $menu.classList.add("m-showed");
    } else {
        $burgerWrapp.classList.remove(".burger-rotated");
        document.removeEventListener("scroll", blocked);
        document.querySelector('body').style.overflow = 'auto';
        document.querySelector(".wing:nth-child(1)").classList.remove("upper-wing");
        document.querySelector(".wing:nth-child(2)").classList.remove("middle-wing");
        document.querySelector(".wing:nth-child(3)").classList.remove("lower-wing");
        menuShowed = false;
        $menu.classList.remove("m-showed");
    }
}

function blocked(e) {
    e.preventDefault();
    window.scrollTo(0, position);
}

//let words = [];
//let $menuBtns = document.querySelectorAll(".bt-back");
//let wordsCount = () => {
//    $menuBtns.forEach((item, ind) => {
//        words[ind] = item.textContent;
//    })
//}
//wordsCount();
//window.addEventListener("resize", menuSetup);
//
//function menuSetup() {
//    let style = window.getComputedStyle(document.querySelector("body"), null).getPropertyValue('font-size');
//    let fontSize = parseFloat(style);
//    $menuBtns.forEach((item, ind) => {
//        let itemWidth = words[ind].length * fontSize * 3;
//        itemWidth = itemWidth - itemWidth * 0.45;
//        item.style.maxWidth = itemWidth + "px";
//    })
//
//}
//
//menuSetup();
