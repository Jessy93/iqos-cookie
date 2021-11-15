import lottieWeb from 'https://cdn.skypack.dev/pin/lottie-web@v5.8.1-gbfLvwNWs7S0Tqw223au/mode=imports,min/optimized/lottie-web.js';

let main = document.getElementById('main');
let container = document.getElementById('container');
let state = 'play';

let animation = lottieWeb.loadAnimation({
  container: container,
  path: 'data.json',
  renderer: 'svg',
  loop: false,
  autoplay: false,
  name: "Demo Animation",
});


// animation.animationData.layers[1].nm = 'qqq';
// animation.animationData.layers[1].t.d.k[0].s.t = 'qqq';

// animation.renderer.data.layers[1].nm = "sdgjfhfjs"
// animation.renderer.data.layers[1].t.d.k[0].s.t = "sdgjfhfjs"


// animation.renderer.elements[0].updateDocumentData({t:'new text'}, 0);

animation.goToAndStop(10, true);

container.addEventListener('click', () => {
  main.classList.add('animated');
  if(state === 'play') {
    animation.renderer.elements[1].textProperty.currentData.t = "sdgjfhfjs"
    animation.playSegments([10, 144], true);
    state = 'pause';
  }
});

// Text Random
const textArray = ['1a','2b', '3c', '4e', '5f'];
let phrase = textArray[Math.floor(Math.random()*textArray.length)];