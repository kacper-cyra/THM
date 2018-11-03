'use strict'

let carusel = {
    active: 0,
    week: document.querySelectorAll('#uczestnicy .week h4'),
    options: document.querySelectorAll('#uczestnicy .options div'),
    pictures: document.querySelectorAll('#uczestnicy .pictures div'),
    text: document.querySelectorAll('#uczestnicy .text p'),
    condition: 0,
    animation: (move, set) => {
        let last = carusel.active;
        let items = document.querySelectorAll('#uczestnicy .show');
        items.forEach((item) => {
            setTimeout(() => {
                item.classList.add('animate');
                item.classList.remove('show');
                item.addEventListener('transitionend', removeClass);
            }, item.parentElement.getAttribute('deley'))

        })
        if (move) carusel.active += move;
        else {
            carusel.active = set;
        };

        function removeClass(e) {
            let ele = e.target;
            ele.classList.remove('animate');
            ele.removeEventListener('transitionend', removeClass);
            setElement(ele);
        }

        function setElement(ele) {
            let parent = ele.parentElement;
            ele = parent.children[carusel.active];
            ele.classList.add('animate');
            setTimeout(() => {
                ele.classList.add('show');
            }, 1)

            ele.addEventListener('teansitionend', end);
        }

        function end(e) {
            let ele = e.target;
            ele.classList.remove('animate');
            ele.removeEventListener('transitionend', end);
        }
    }
}

document.getElementById('uczestnicy').addEventListener('click', (e) => {
    let ele = e.target;
    if (ele.parentNode.classList.contains('options')) {
        let n = getNodeIndex(ele);
        document.querySelector('#uczestnicy .active').classList.remove('active');
        ele.classList.add('active');
        carusel.animation(0, n);
    };
});
