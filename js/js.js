let photos = document.querySelectorAll('.photo');
photos.forEach((item) => {
    item.style.height = Math.round(item.offsetWidth / 1.777) + 'px';
})
