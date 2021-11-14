console.log(0);
import lottieWeb from 'https://cdn.skypack.dev/lottie-web';

let container = document.getElementById('container');
let svg = document.getElementById('svg');
let state = 'play';

let animation = lottieWeb.loadAnimation({
  container: svg,
  path: 'data.json',
  renderer: 'svg',
  loop: false,
  autoplay: false,
  name: "Demo Animation",
  // animationData: text_demo_data,
});

animation.goToAndStop(0, true);

container.addEventListener('click', () => {
  container.classList.add('animated');
  if(state === 'play') {
   animation.playSegments([0, 10], true);
    state = 'pause';
    console.log(1);
  } else {
    animation.playSegments([0, 0], true);
    state = 'play';
    console.log(2);
  }
});

// Text Random
const textArray = ['1a','2b', '3c', '4e', '5f'];
let phrase = textArray[Math.floor(Math.random()*textArray.length)];
console.log(phrase);
text_demo_data.layers[0].t.d.k[0].s.t = phrase;