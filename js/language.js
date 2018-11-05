'use strict'

document.querySelector('.lang').addEventListener('click', changeLanguage);

function changeLanguage(e) {
    let ele = e.target;
    if (ele.classList.contains('new-lang')) {
        let options = {
            method: "POST",
            credentials: "same-origin",
            mode: "same-origin",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: '',
        };
        let url = 'js/' + ele.getAttribute('lang') + '.json';
        fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    throw response
                }
                return response.json()
            })
            .then((res) => {
                newLanguage(res.lang);
            })
            .catch((err) => {
                console.log(err);
            });

        function newLanguage(object) {
            loading.status === 'left' ? 0 : loading.setLeft();
            loading.setHeight();
            loading.start();
            bodyScrollLock.disableBodyScroll(loading.object);
            loading.slowest.addEventListener('transitionend', change);

            function change() {
                object.forEach((item) => {
                    let ele = document.querySelector(item.selector);
                    item.HTML ? ele.innerHTML = item.HTML : ele.textContent = item.text;
                });
                loading.slowest.removeEventListener('transitionend', change);
                loading.finish();
                loading.slowest.addEventListener('transitionend', finish);
            };

            function finish() {
                bodyScrollLock.enableBodyScroll(loading.object);
                loading.setLeft();
                loading.slowest.removeEventListener('transitionend', finish)
            }
        }
    };
};
