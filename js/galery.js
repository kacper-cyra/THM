  'use strict'
  let galeria = {
      item: document.getElementById('galeria'),
      displayCon: document.querySelector('#galeria .display-container'),
      category: document.querySelector('.category'),
      display: document.querySelector('#galeria .display'),
      active: {},
      scroll: 0,
      zoomIn: (ele) => {
          //Kopiowanie elementu do display
          /* let clone = ele.cloneNode(true);
           clone.classList.add('bg');
           clone.style.padding = '0px';
           galeria.scroll = window.pageYOffset;
           galeria.displayCon.style.left = ele.offsetLeft + 'px';
           galeria.displayCon.style.top = ele.offsetTop + 'px';
           galeria.displayCon.style.width = ele.offsetWidth + 'px';
           galeria.displayCon.style.height = ele.offsetHeight + 'px';

           galeria.display.append(clone);
           galeria.displayCon.classList.add('zoom-in');
           galeria.displayCon.style.left = '0';
           galeria.displayCon.style.top = window.pageYOffset + 'px';
           galeria.displayCon.style.width = '';
           galeria.displayCon.style.height = '';
           setTimeout(() => {
               galeria.displayCon.style.top = '0px';
               galeria.category.style.height = '0px'
           }, 900);
           history.replaceState({
               nav: false,
               name: 'galeria'
           }, 'page 1', 'galeria');
           history.pushState({
               page: 2,
               nav: false,
               page: 'galeria',
           }, '', 'galeria/' + ele.getAttribute('class'));*/
          //Powiększanie zdjęcia
          ele.classList.remove('plate');
          ele.classList.add('aaa');

          ele.style.top = window.pageYOffset + 'px';
      },
      zoomOut: () => {
          // console.log(galeria.scroll);
          galeria.category.style.height = '';
          galeria.displayCon.style.left = galeria.active.offsetLeft + 'px';
          galeria.displayCon.style.top = galeria.active.offsetTop + 'px';
          galeria.displayCon.style.width = galeria.active.offsetWidth + 'px';
          galeria.displayCon.style.height = galeria.active.offsetHeight + 'px';
          setTimeout(() => {
              //animacja scrolla do pozycji okna w której było
              //problem z brakiem synchronizacji z chowającym się oknem
              //window.scrollTo(0, (galeria.active.offsetTop - ((window.innerHeight / 2) - (galeria.active.offsetHeight / 2))));
          }, 1);
          setTimeout(() => {
              while (galeria.display.firstChild && galeria.display.removeChild(galeria.display.firstChild));
              galeria.displayCon.classList.remove('zoom-in');
              galeria.displayCon.style.width = '';
              galeria.displayCon.style.height = '';
          }, 820);


      }
  }
  let cache = {};

  let plates = document.querySelectorAll('#galeria .plate');
  plates.forEach((item) => {
      item.getAttribute('size') === 'x2' ? item.style.height = (item.offsetWidth / 2) + 'px' : 0;
      item.getAttribute('size') === 'y2' ? item.style.height = (item.offsetWidth * 2) + 'px' : 0;
      item.getAttribute('size') ? 0 : item.style.height = item.offsetWidth + 'px';
  });

  galeria.item.addEventListener('click', (e) => {
      let ele = e.target;
      if (ele.parentNode.classList.contains('album')) {
          galeria.active = ele;
          galeria.zoomIn(ele);
      }
  })





  /*gallery.addEventListener('click', (e) => {
      e.preventDefault();
      let ele = e.target;

      if (ele.classList.contains('zdj')) {
          //--------------------------------
          //PRZYGOTOWANIE SRC
          //--------------------------------
          let atr = ele.getAttribute('src');
          let target = atr.slice(0, 8);
          atr = target.replace('src/img/', '');
          atr = target + modal.size + '/' + atr;
          console.log(atr);
          gallery.querySelector('.active.zdj').classList.remove('active');
          ele.classList.add('active');


          //Jeśli zdjęcie jest już w cache
          if (cache.hasOwnProperty(target)) {
              // I się nie wczytuje
              if (cache[target].isLoading === false) {
                  //Wyświetl zdjęcie w displayu; załadowane z cache
                  modal.display.append(cache[target]);
                  modal.current = target;
              }
          } else {
              modal.current = target;
              cache[target] = {
                  img: 'img',
                  isLoading: 'true'
              };
              modal.fetch(target);
          }
          //------------------------------
      } else return 0;
  });
  */
  //----------------------------
  //------Zamykanie modalu------
  //----------------------------  
  /*  document.getElementById('galleryModal').addEventListener('click', (e) => {
        let ele = e.target;
        if (ele.getAttribute('id') == "galleryModal" || ele.classList.contain('close')) {
            modal.close();
        }
    });
    //----------------------------
    //------Wielkość Ekranu-------
    //----------------------------    
    window.addEventListener('resize', () => {
        window.innerWidth < 1000 ? modal.size = 'medium' : modal.size = 'large';
    })
  */

  /*let modal = {
       item: document.getElementById('galleryModal'),
       display: document.getElementById('display'),
       container: document.getElementById('container'),
       current: '',
       size: 'large',
       open: () => {
           modal.item.classList.add('open')
       },
       close: () => {
           modal.item.classList.remove('open')
       },
       remove: () => {
           let children = modal.container.children;
           children.forEach((item) => {
               item.remove()
           });
       },
       fetch: (target) => {
           let url = target
           let options = {
               method: 'GET',
               mode: 'cors',
               cache: 'default'
           }
           fetch(url, options)
               .then((res) => res.blob())
               .then((img) => {
                   let ele = document.createElement('div');
                   ele.append(img);

                   modal.current = target;
                   cache[target] = {
                       img: ele, // node element
                       isLoading: false
                   };

               })
               .catch((error) => {})

           //   modal.open();  Przenieść do promise w fetchu	
       }
   }*/
