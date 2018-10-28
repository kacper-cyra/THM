'use strict'
let loading = {
    object: document.querySelector('.loading'),
    slowest: document.querySelector('.loading div:nth-child(7)'),
    status: 'left',
    start: () => {
        loading.object.classList.add('onTop');
        loading.object.classList.add('loading-animation');
    },
    finish: () => {
        loading.object.classList.add('loading-finish');
        loading.slowest.addEventListener('transitionend', hide);

        function hide() {
            loading.object.classList.remove('onTop');
            loading.slowest.removeEventListener('transitionend', hide);
        }
    },
    reverseFinish: () => {
        loading.object.classList.add('onTop');
        loading.object.classList.remove('loading-finish');
    },
    back: () => {
        loading.object.classList.remove('loading-animation');

        function hide() {
            loading.object.classList.remove('onTop');
            loading.slowest.removeEventListener('transitionend', hide);
        }
    },
    setHeight: () => {
        loading.object.style.top = navigation.pages[navigation.active].scroll + 'px';
    },
    setLeft: () => {
        let items = document.querySelectorAll('.loading .delay');
        loading.status = 'left';
        items.forEach((item) => {
            item.classList.remove('delay');
        });
        loading.object.classList.remove('loading-animation');
        loading.object.classList.remove('loading-finish');
        setTimeout(() => {
            items.forEach((item) => {
                item.classList.add('delay');
            });
        }, 50);
    },
    setRight: () => {
        let items = document.querySelectorAll('.loading .delay');
        loading.status = 'right';
        items.forEach((item) => {
            item.classList.remove('delay');
        });
        loading.object.classList.add('loading-animation');
        loading.object.classList.add('loading-finish');
        setTimeout(() => {
            items.forEach((item) => {
                item.classList.add('delay');
            });
        }, 50);
    }
};

document.addEventListener('scroll', (e) => {
    navigation.pages[navigation.active].scroll = window.pageYOffset;
});
let navigation = {
    active: 'index',
    pages: {
        index: {
            name: 'index',
            scroll: 0,
            item: document.getElementById('index'),
            page: 1
        },
        galeria: {
            name: 'galeria',
            scroll: 0,
            item: document.getElementById('galeria'),
            page: 2
        },
        uczestnicy: {
            name: 'uczestnicy',
            scroll: 0,
            item: document.getElementById('uczestnicy'),
            page: 2
        }

    },
    //Animacja z lewej do prawej
    animateTo: (target) => {
        loading.status == 'left' ? 0 : loading.setLeft();
        loading.setHeight();
        loading.object.style.zIndex = '30';
        //Dodaje blokade scrolla
        loading.start();
        bodyScrollLock.disableBodyScroll(loading.object);
        loading.slowest.addEventListener('transitionend', load);

        function load() {
            //Usuwam scrollblocka
            bodyScrollLock.enableBodyScroll(loading.object);
            loading.slowest.removeEventListener('transitionend', load);
            navigation.pages[navigation.active].item.setAttribute('hidden', '');
            document.getElementById(target.name).removeAttribute('hidden');
            navigation.active = target.name;
            window.scrollTo(0, 0);
            loading.object.style.top = '0px';
            bodyScrollLock.disableBodyScroll(loading.object);
            setTimeout(() => {
                //Dodaje blokowanie scrolla
                loading.finish();
                loading.slowest.addEventListener('transitionend', unload);
            }, 550);
        };

        function unload() {
            //Usuwam scrollblocka
            bodyScrollLock.enableBodyScroll(loading.object);
            loading.object.style.zIndex = '-1';
            loading.slowest.removeEventListener('transitionend', unload);
        };
        loading.status = 'right';
    },
    //Animacja z prawej do lewej
    animateBackwards: (target) => {
        bodyScrollLock.disableBodyScroll(loading.object);
        let offset = window.pageYOffset;
        loading.setHeight();
        document.addEventListener('scroll', prevent);
        loading.status == 'right' ? 0 : loading.setRight();
        loading.object.style.zIndex = '30';
        loading.reverseFinish();
        loading.slowest.addEventListener('transitionend', load);
        setTimeout(() => {
            document.removeEventListener('scroll', prevent);
        }, 100)

        function prevent(e) {
            e.preventDefault();
            window.scrollTo(0, offset);
        };

        function load() {
            bodyScrollLock.enableBodyScroll(loading.object);
            loading.slowest.removeEventListener('transitionend', load);
            navigation.pages[navigation.active].item.setAttribute('hidden', '');
            document.getElementById(target.name).removeAttribute('hidden');
            navigation.active = target.name;
            loading.setHeight();
            window.scrollTo(0, navigation.pages[navigation.active].scroll);
            bodyScrollLock.disableBodyScroll(loading.object);
            setTimeout(() => {
                loading.back();
                loading.slowest.addEventListener('transitionend', unload);
            }, 550);
        };

        function unload() {
            bodyScrollLock.enableBodyScroll(loading.object);
            loading.object.style.zIndex = '-1';
            loading.slowest.removeEventListener('transitionend', unload);
        };
        loading.status = 'left';
    }
}

window.onpopstate = (e) => {
    //  console.log(e.state);
    //Jeśli przekierowanie bez animacji przejścia
    e.preventDefault();
    if (e.state.nav === false) {
        if (e.state.name === 'galeria') {
            galeria.zoomOut();
        } else return 0;
    } else if (e.state.page < navigation.pages[navigation.active].page) {
        e.preventDefault();
        console.log(navigation.pages[navigation.active]);
        navigation.animateBackwards(e.state);
    } else {
        navigation.animateTo(e.state);
    }
};



document.addEventListener('click', (e) => {
    let ele = e.target;
    if (ele.tagName == 'A') {
        let page = e.target.getAttribute('page');
        if (page !== 'same') return 0;
        else {
            e.preventDefault()
            let target = e.target.getAttribute('href');
            // console.log(target);
            target = navigation.pages[target];
            history.pushState({
                nav: true,
                page: target.state,
                name: target.name
            }, '', target.name);
            navigation.animateTo(target);
        }
    };
})

history.replaceState({
    page: 1,
    nav: true,
    name: 'index'
}, 'page 1', 'index.html');
