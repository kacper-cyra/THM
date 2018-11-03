  'use strict'
  let galeria = {
      item: document.getElementById('galeria'),
      displayCon: document.querySelector('#galeria .display-container'),
      bg: 0,
      plate: 0,
      display: document.querySelector('#galeria .display'),
      scroll: 0,
      zoomIn: (ele) => {
          //Kopiowanie elementu do display
          galeria.bg = ele.cloneNode(true);
          galeria.plate = ele;
          galeria.bg.classList.add('bg');
          galeria.bg.classList.remove('plate');
          ele.getAttribute('vertical') === '' ? galeria.bg.setAttribute('vertical', '') : 0;
          //Ustawienia display-containera
          galeria.scroll = window.pageYOffset;
          galeria.displayCon.style.left = ele.offsetLeft + 'px';
          galeria.displayCon.style.top = ele.offsetTop + 'px';
          galeria.displayCon.classList.add('zoom-in');
          galeria.displayCon.style.left = '0';
          galeria.displayCon.style.top = window.pageYOffset + 'px';
          //Przygotowanie diva
          galeria.display.append(galeria.bg);
          galeria.bg.style.top = (ele.offsetTop - galeria.displayCon.offsetTop) + 'px';
          galeria.bg.style.width = ele.offsetWidth + 'px';
          galeria.bg.style.left = ele.offsetLeft + 'px';
          galeria.bg.style.transition = 'all 1s ease-in-out';
          setTimeout(() => {
              galeria.bg.style.height = '';
              galeria.bg.style.width = '';
              galeria.bg.style.left = '0px';
              galeria.bg.style.top = '0px';
          }, 1)
          //Wyłączenie scrolla
          bodyScrollLock.disableBodyScroll(galeria.displayCon);
          setTimeout(() => {
              body.style.width = '100vw';
          }, 900)
          //Operacje na historii
          history.replaceState({
              nav: false,
              name: 'galeria'
          }, '', 'galeria');
          history.pushState({
              page: 2,
              nav: false,
              page: 'galeria',
          }, '', ele.getAttribute('text'));
          //Ujawnienie menu po zakończeniu animacji
          galeria.bg.addEventListener('transitionend', end);

          function end() {
              galeria.bg.querySelector('.side-bar').classList.add('show');
              galeria.bg.addEventListener('transitionend', end);
              galeria.bg.backgroundColor = 'white';
              galeria.bg.style.transition = '';
          }
      },
      zoomOut: () => {
          galeria.bg.backgroundColor = 'transparent';
          galeria.plate.style.backgroundImage = galeria.bg.style.backgroundImage;
          galeria.plate.style.backgroundPosition = '50% 50%';
          galeria.bg.getAttribute('vertical') === '' ? galeria.plate.setAttribute('vertical', '') : galeria.plate.removeAttribute('vertical');
          galeria.bg.querySelector('.side-bar').classList.remove('show');
          galeria.bg.querySelector('.side-bar').style.display = 'none';
          galeria.bg.querySelector('.next').style.opacity = '0';
          //UStawienie docelowe diva
          galeria.bg.style.transition = 'all 1s ease-in-out';
          galeria.bg.style.top = (galeria.plate.offsetTop - galeria.displayCon.offsetTop) + 'px';
          galeria.bg.style.height = galeria.plate.offsetHeight + 'px';
          //odblokowanie scrolla
          bodyScrollLock.enableBodyScroll(galeria.displayCon);
          body.style.width = '';
          galeria.bg.style.width = galeria.plate.offsetWidth + 'px';
          galeria.bg.style.left = galeria.plate.offsetLeft + 'px';
          setTimeout(() => {
              //Usuwanie zawartości
              while (galeria.display.firstChild && galeria.display.removeChild(galeria.display.firstChild));
              galeria.displayCon.classList.remove('zoom-in');
              galeria.displayCon.style.width = '';
              galeria.displayCon.style.height = '';
          }, 1020);
      }
  }

  let plates = document.querySelectorAll('#galeria .plate');

  function setGallery() {
      plates.forEach((item) => {
          item.getAttribute('size') === 'x2' ? item.style.height = (item.offsetWidth / 2) + 'px' : 0;
          item.getAttribute('size') === 'y2' ? item.style.height = (item.offsetWidth * 2) + 'px' : 0;
          item.getAttribute('size') ? 0 : item.style.height = item.offsetWidth + 'px';
      });
  }
  setGallery();
  window.addEventListener('resize', setGallery);

  galeria.item.addEventListener('click', (e) => {
      let ele = e.target;
      if (ele.parentNode.classList.contains('album')) {
          galeria.active = ele;
          galeria.zoomIn(ele);
      } else if (ele.getAttribute('photo')) {
          changePhoto(ele);
      }
  })


  //--------------------  
  //Obsługa menu
  //--------------------
  function changePhoto(ele) {
      let style = ele.currentStyle || window.getComputedStyle(ele, false);
      let url = style.backgroundImage.slice(4, -1).replace(/"/g, "");
      let $next = galeria.bg.querySelector('.next');
      let vertical;
      if (ele.getAttribute('vertical') === '') {
          vertical = true;
          $next.setAttribute('vertical', '');
          $next.style.backgroundColor = 'white';
      } else {
          $next.removeAttribute('vertical');
      }

      $next.style.backgroundImage = 'url(' + url + ')';
      $next.style.opacity = '1';

      $next.addEventListener('transitionend', end);

      function end() {
          galeria.bg.style.backgroundImage = 'url(' + url + ')';
          if (vertical) {
              galeria.bg.setAttribute('vertical', '');
              $next.style.backgroundColor = '';
          } else {
              galeria.bg.removeAttribute('vertical');
          }
          $next.style.backgroundImage = '';
          $next.style.opacity = '0';
          $next.removeEventListener('transitionend', end);
      }
  }

  //----------------------
  //Lazy Load
  //----------------------
  let lazyLoad = {
      loading: ['drezno', 0],
      priority: false,
      albums: ['drezno', 'horch', 'volk', 'berlin', 'zajecia', 'zwickau'],
      drezno: (() => {
          return galeria.item.querySelectorAll('.drezno [photo]')
      })(),
      horch: (() => {
          return galeria.item.querySelectorAll('.horch [photo]')
      })(),
      volk: (() => {
          return galeria.item.querySelectorAll('.volk [photo]')
      })(),
      berlin: (() => {
          return galeria.item.querySelectorAll('.berlin [photo]')
      })(),
      zajecia: (() => {
          return galeria.item.querySelectorAll('.zajecia [photo]')
      })(),
      zwickau: (() => {
          return galeria.item.querySelectorAll('.zwickau [photo]')
      })(),
      loadingPhoto: () => {
          //------------------------------
          //Dodać sprawdzenie priorytetu
          //-------------------------------
          //Ładowanie po koleji
          //Sprawdza, czy element istnieje
          if (lazyLoad[lazyLoad.loading[0]][lazyLoad.loading[1]]) {
              let ele = lazyLoad[lazyLoad.loading[0]][lazyLoad.loading[1]];
              //Sprawdza, czy zdjęcie nie jest załadowane
              if (ele.style.backgroundImage === '') {
                  let load = document.createElement('img');
                  let src = '/img/' + lazyLoad.loading[0] + '/' + lazyLoad.loading[0] + (lazyLoad.loading[1] + 1) + '.jpg';
                  //console.log(src);
                  load.addEventListener('load', loadedPhoto);
                  load.setAttribute('src', src);

                  //Władowanie zdjęcia      
                  function loadedPhoto() {
                      ele.style.backgroundImage = 'url(' + src + ')';
                      load.removeEventListener('load', lazyLoad.loadedPhoto);
                      lazyLoad.loading[1]++;
                      load = '';
                      lazyLoad.loadingPhoto();
                  }

              } else if (ele.style.backgroundImage != '') {
                  //Jesłi zdjęcie ma już załadowany background
                  lazyLoad.loading[1]++;
                  lazyLoad.loadingPhoto();
              };
          } else {
              //Jeśli komórki nie ma
              //Przejście do kolejnej kategorji
              let phrase = lazyLoad.loading[0];
              let ind = lazyLoad.albums.indexOf(phrase);
              lazyLoad.loading = [lazyLoad.albums[(ind + 1)], 0];
              if (lazyLoad.loading[0]) {
                  lazyLoad.loadingPhoto();
              }
          };
      },
  }
