//let step = 0;
//let steps = [];
//let $siteWrapper = document.querySelector(".site-wrapper");
//let $body = document.querySelector("body");
//let sections = document.querySelectorAll("section");
//let moving = false;
//let positionVer = 5;
//let windowWidth = window.outerWidth;
////document.addEventListener("scroll", scrolling);
//document.addEventListener("wheel", scrolling);
//
//$siteWrapper.style.transform = "translateX(0)"
//
//function scrolling(e) {
//    let scrollValue = window.pageYOffset || document.documentElement.scrollTop;
//    e.preventDefault();
//
//    if (moving == true) {
//        return 0;
//    } else if (moving == false) {
//        moving = true;
//        let direction;
//        if (e.deltaY > 0) direction = 1;
//        else direction = -1;
//        step + direction < 0 ? step = 0 : step += direction;
//        console.log(step);
//        $siteWrapper.style.transform = steps[step];
//
//        setTimeout(() => {
//            moving = false;
//        }, 500)
//    }
//    positionVer = scrollValue;
//}
//
//function setup() {
//    console.log("resize");
//    windowWidth = window.outerWidth;
//    steps[0] = "translateX(0px)";
//    steps[1] = "translateX(" + -windowWidth + "px)";
//    steps[2] = "translateX(" + (-windowWidth * 2) + "px)";
//    steps[3] = "translateX(" + (-windowWidth * 3) + "px)";
//}
//setup()
//
//window.addEventListener("resize", setup);
