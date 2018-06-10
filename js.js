let $bckImg = document.querySelector(".back-img");
let x;
let p;
let eventType;

$bckImg.addEventListener("mousedown", (e) => {
    eventType = "mouse";
    movableImg(e);
});

$bckImg.addEventListener("touchstart", (e) => {
    eventType = "touch";
    movableImg(e)
});

$bckImg.style.transform = "translateX(" + parseInt(-$bckImg.offsetWidth / 2 + window.innerWidth / 2) + "px)";

function movableImg(e) {
    console.log("działa");
    e.preventDefault();
    x = e.clientX || e.pageX || parseInt(e.touches[0].pageX);
    p = $bckImg.style.transform;
    if (eventType == "mouse") {
        $bckImg.addEventListener("mousemove", moveImg);
    } else $bckImg.addEventListener("touchmove", moveImg)
}

function moveImg(e) {
    e.preventDefault();
    let x2 = e.clientX || e.pageX || parseInt(e.touches[0].pageX);
    console.log(x2);
    let dif = x - x2;
    let minus = p.match("-");
    minus == null ? minus = "" : minus = minus;
    let f = p.match(/[0-9]/gi);
    f = f.join("");
    let final = Number(minus + f) - Number(dif);
    $bckImg.style.transform = "translateX(" + (final) + "px)";
    if (eventType == "mouse") {
        document.addEventListener("mouseup", moveEnd);
    } else document.addEventListener("touchend", moveEnd);
}

function moveEnd(e) {
    console.log("działa");
    e.preventDefault();
    if (eventType == "mouse") {
        $bckImg.removeEventListener("mouseup", moveEnd);
        $bckImg.removeEventListener("mousemove", moveImg);
    } else {
        $bckImg.removeEventListener("touchend", moveEnd);
        $bckImg.removeEventListener("touchmove", moveImg);
    }
    let minus = $bckImg.style.transform.match("-");
    minus == null ? minus = "" : minus = minus;
    let transform = $bckImg.style.transform.match(/[0-9]/gi).join("");
    transform = minus + transform;
    if (Number(transform) > 0) {
        $bckImg.animate([
            {
                transform: 'translateX(' + transform + 'px)'
            },
            {
                transform: 'translateX(0px)'
            }
        ], {
            duration: 300,
            easing: "ease-in-out"
        });
        $bckImg.style.transform = "translateX(0px)"
    }
    if (Number(-transform) > $bckImg.offsetWidth - window.innerWidth) {
        $bckImg.animate([
            {
                transform: 'translateX(' + transform + 'px)'
            },
            {
                transform: "translateX(" + (-$bckImg.offsetWidth + window.innerWidth) + "px)"
            }
        ], {
            duration: 300,
            easing: "ease-in-out"
        });
        $bckImg.style.transform = "translateX(" + (-$bckImg.offsetWidth + window.innerWidth) + "px)";
    }
}
