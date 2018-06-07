let $bckImg = document.querySelector(".back-img");

$bckImg.addEventListener("mousemove", movableImg);

function movableImg(e) {
    let x = e.clientX || e.pageX;
    let w = window.innerWidth;
    let l = $bckImg.offsetWidth;
    let p = (l - w) / w;
    $bckImg.style.transform = "translateX(" + (-x * p) + "px)";
}
