import lottieWeb from 'https://cdn.skypack.dev/pin/lottie-web@v5.8.1-gbfLvwNWs7S0Tqw223au/mode=imports,min/optimized/lottie-web.js';

// Text Random
const textArray = [
  'Не стоит тратить время и силы на мелочи, нужно думать о главном.',
  'Стремитесь к успеху и выглядите так, словно вы его уже достигли.',
  'Нужно делать то, что ты должен делать. И пусть все будет так, как будет.',
  'Пусть тебя не страшит неумение. Делая с желанием – научишься.',
  'Тупиковых ситуаций не бывает – выход есть всегда',
  'Ваш путь верен, продолжайте его столь же настойчиво.',
  'Перемены уже на пороге!',
  'Не забывайте о здоровье, оно – основа всего.',
  'Настоящий результат не может быть слишком быстрым.',
  'Звезды к вам благосклонны.',
  'Оставьте эмоции и положитесь на разум.',
  'Прилагайте максимум усилий и вы получите желаемое. '
];
let text = textArray[Math.floor(Math.random()*textArray.length)];

// variable main container for animation and state play when animation is playing
let main = document.getElementById('main');
let container = document.getElementById('container');
let state = 'play';

let animation = lottieWeb.loadAnimation({ // Animation configuration
  container: container,
  path: 'data.json',
  renderer: 'svg',
  loop: false,
  autoplay: false,
  name: "Demo Animation",
});

animation.goToAndStop(10, true); // start animation and pause her in state 10

container.addEventListener('click', () => {
  

  main.classList.add('animated');
  if(state === 'play') {
    animation.playSegments([10, 144], true);
    makerText();
    state = 'pause';
  }
});



// make a menu down of text
  function makerText() {
    let rect = container.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);

    const div = document.createElement("div");
    div.innerHTML = `
      <div class="secret-text"
        style=" position: fixed;
          top: ${rect.top - 10}px;
          left: ${rect.left}px;
          opacity: ${1};
          max-width: fit-content;
      ">${text}</div>
    `;
    setTimeout(() => {container.append(div)}, 2000);
  }