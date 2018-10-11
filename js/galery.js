  'use strict'
  let cache = {};
  let gallery = document.getElementById('gallery');
  let minatures = document.querySelectorAll('#gallery .zdj');

  let modal = {
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
            isLoading: 'false'
          };

        })
        .catch((error) => {})

      //   modal.open();  Przenieść do promise w fetchu	
    }
  }

  gallery.addEventListener('click', (e) => {
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
  //----------------------------
  //------Zamykanie modalu------
  //----------------------------  
  document.getElementById('galleryModal').addEventListener('click', (e) => {
    let ele = e.target;
    if (ele.getAttribute('id') == "galleryModal" || ele.classList.contain('close')) {
      modal.close();
    }
  });
  //----------------------------
  //------Wielkość Ekranu-------
  //----------------------------    
window.addEventListener('resize', ()=>{
    window.innerWidth < 1000 ? modal.size = 'medium' : modal.size = 'large';
})
