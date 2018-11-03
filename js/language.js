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
                console.log(res);
                newLanguage(res.lang);
            })
            .catch((err) => {
                console.log(err);
            });

        function newLanguage(object) {
            object.forEach((item) => {
                console.log(item);
                let ele = document.querySelector(item.selector);
                console.log(ele);
                item.HTML ? ele.innerHTML = item.HTML : ele.textContent = item.text;
            });
        }
    };
};
