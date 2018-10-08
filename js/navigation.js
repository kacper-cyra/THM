let loading = {
    object: document.querySelector('.loading'),
    slowest: document.querySelector('.loading div:nth-child(7)'),
    status: 'left',
    start: () => {
        loading.object.classList.add('loading-animation');
        document.addEventListener("scroll", blocked);
    },
    finish: () => {
        loading.object.classList.add('loading-finish');
        document.removeEventListener("scroll", blocked);
    },
    reverseFinish: () => {
        loading.object.classList.remove('loading-finish');
        document.addEventListener("scroll", blocked);
    },
    back: () => {
        loading.object.classList.remove('loading-animation');
        document.removeEventListener("scroll", blocked);
    },
    setHeight: () => {
        loading.object.style.top = navigation.pages[navigation.active].scroll + 'px';
        console.log(navigation.pages[navigation.active].scroll + 'px');
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
let l = document.querySelector('.loading div');
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
    animateTo: (target) => {
        position = window.pageYOffset;
        loading.status == 'left' ? 0 : loading.setLeft();
        loading.setHeight();
        loading.object.style.zIndex = '30';
        loading.start();
        loading.slowest.addEventListener('transitionend', load);

        function load() {
            document.removeEventListener("scroll", blocked);
            loading.slowest.removeEventListener('transitionend', load);
            navigation.pages[navigation.active].item.setAttribute('hidden', '');
            navigation.active = target.name;
            window.scrollTo(0, 0);
            loading.object.style.top = '0px';
            document.getElementById(target.name).removeAttribute('hidden');
            setTimeout(() => {
                document.addEventListener("scroll", blocked);
                loading.finish();
                loading.slowest.addEventListener('transitionend', unload);
            }, 450);
        };

        function unload() {
            document.removeEventListener("scroll", blocked);
            loading.object.style.zIndex = '-1';
            loading.slowest.removeEventListener('transitionend', unload);
        };
        loading.status = 'right';
    },
    animateBackwards: (target) => {
        position = window.pageYOffset;
        loading.status == 'right' ? 0 : loading.setRight();
        loading.object.style.zIndex = '30';
        loading.setHeight();
        loading.reverseFinish();
        loading.slowest.addEventListener('transitionend', load);

        function load() {
            document.removeEventListener("scroll", blocked);
            document.getElementById(target.name).removeAttribute('hidden');
            navigation.pages[navigation.active].item.setAttribute('hidden', '');
            loading.slowest.removeEventListener('transitionend', load);
            navigation.active = target.name;
            loading.setHeight();
            window.scrollTo(0, navigation.pages[navigation.active].scroll);
            setTimeout(() => {
                document.addEventListener("scroll", blocked);
                loading.back();
                loading.slowest.addEventListener('transitionend', unload);
            }, 450);
        };

        function unload() {
            document.removeEventListener("scroll", blocked);
            loading.object.style.zIndex = '-1';
            loading.slowest.removeEventListener('transitionend', unload);
        };
        loading.status = 'left';
    }
}

window.onpopstate = (e) => {
    console.log(e.state);
    if (e.state.page < navigation.pages[navigation.active].page) {
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
            console.log(target);
            target = navigation.pages[target];
            history.pushState({
                page: target.state,
                name: target.name
            }, '', target.name);
            navigation.animateTo(target);
        }
    };
})

history.replaceState({
    page: 1,
    name: 'index'
}, 'page 1', 'index.html');
