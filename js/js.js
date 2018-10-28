'use strict'
let body = document.querySelector('body');
let photos = document.querySelectorAll('.photo, .photos div');

function photoSize() {
    photos.forEach((item) => {
        if (item.classList.contains('reverse')) {
            item.style.height = Math.round(item.offsetWidth / 0.5625) + 'px';
        } else {
            item.style.height = Math.round(item.offsetWidth / 1.7777) + 'px';
        }
    });
}
photoSize();
window.addEventListener('resize', photoSize);

window.addEventListener('load', () => {
    document.getElementById('uczestnicy').setAttribute('hidden', '');
    document.getElementById('galeria').setAttribute('hidden', '');
    loading.back();
    document.querySelector('body').classList.remove('no-flow');
    lazyLoad.loadingPhoto();
})

function getNodeIndex(node) {
    var index = 0;
    while ((node = node.previousSibling)) {
        if (node.nodeType != 3 || !/^\s*$/.test(node.data)) {
            index++;
        }
    }
    return index;
}
