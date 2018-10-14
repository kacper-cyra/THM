'use strict'
let movement = {
    active: true,
    event: () => {
        document.addEventListener('scroll', (e) => {
            // movement.active == true ? movement.move() : 0
            movement.move();
        })
    },
    speed: [-10, -15, -30, 30, 15, 10, 5, 3, 2],
    select: () => {
        let select = document.querySelectorAll('.movable');
        let segregate = {};
        select.forEach((item) => {
            let parent = item.closest('main').getAttribute('id');
            if (segregate[parent]) {
                segregate[parent].push(item);
            } else segregate[parent] = [item];
        });
        return segregate;
    },
    move: () => {
        if (movement.items[navigation.active]) {
            movement.items[navigation.active].forEach((item) => {
                let itemOffset = window.pageYOffset - (item.closest('section').offsetTop);

                if (itemOffset + window.innerHeight + 150 > 0 && itemOffset < window.innerHeight + 150) {
                    item.style.transform = 'translate3d(0,' + (itemOffset + window.innerHeight) / movement.speed[item.getAttribute('speed') - 1] + 'px,0)';
                };
            })
        }
    },
    setup: () => {
        if (window.outerWidth > 560) {
            movement.active = true;
        } else movement.active = false;
    }

}
movement.items = movement.select();
movement.event();
movement.setup();

document.addEventListener('resize', movement.setup);
