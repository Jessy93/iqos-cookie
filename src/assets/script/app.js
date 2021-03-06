window.scrollTo(0,1);
// variable main container for animation and state play when animation is playing// Text Random
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
let main = document.getElementById('main');
let container = document.getElementById('container');
let thanks = document.getElementById('thanks');
let btn = document.getElementById('button');
let state = 'play';

let animation = lottie.loadAnimation({
  container: container,
  path: 'data.json',
  renderer: 'svg',
  loop: false,
  autoplay: false,
  name: "Demo Animation",
});

animation.goToAndStop(10, true);

container.addEventListener('click', () => {
  main.classList.add('animated');
  if(state === 'play') {
    animation.playSegments([10, 144], true);
    state = 'pause';
  }
});

let isStartText = false;
let isStartParticle = false;
animation.onEnterFrame = function(e) {
    a = e.currentTime;
  if ( e.currentTime > 40 && !isStartParticle ) {
    isStartParticle = true;
    requestAnimationFrame(loop);
  }
  if ( e.currentTime > 55 && !isStartText ) {
    isStartText = true;
    makerText();
  }
  if (isStartParticle && isStartText) {
    btn.classList.add('visible');
    congrats();
  }
};

function makerText() {
  let rect = container.getBoundingClientRect();
  const div = document.getElementById('message');
  div.classList.add('message_active');
  div.style.top = `${rect.top - 30}px`;
  div.innerHTML = `<div class="secret-text">${text}</div>`;
  container.append(div);
}

function congrats() {
  btn.addEventListener('click', ()=> {
      console.log(1);
    main.classList.add('unvisible');
    thanks.classList.add('visible');
  })
}

const TWO_PI = Math.PI * 2;
const HALF_PI = Math.PI * 0.5;

const colors = [
  '#DE9B58',
  '#F4D09B',
  '#B56335',
  '#D55F2F',
];

// canvas settings
var viewWidth = window.innerWidth,
    viewHeight = window.innerHeight < 1025 ? window.innerHeight : 1025,
    drawingCanvas = document.getElementById("particles"),
    ctx,
    timeStep = (1/60);

let Point = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

let Particle = function(p0, p1, p2, p3) {
    let random_k =  Math.random() * (2)
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;

    this.time = 0;
    this.duration = 3 + Math.random() * 2;
    this.color =  colors[Math.floor(Math.random() * (3))];

    this.w = 8 * random_k;
    this.h = 6 * random_k * .8;

    this.complete = false;
};

Particle.prototype = {
    update:function() {
        this.time = Math.min(this.duration, this.time + timeStep);

        var f = Ease.outCubic(this.time, 0, 1, this.duration);
        var p = cubeBezier(this.p0, this.p1, this.p2, this.p3, f);

        var dx = p.x - this.x;
        var dy = p.y - this.y;

        this.r =  Math.atan2(dy, dx) + HALF_PI;
        this.sy = Math.sin(Math.PI * f * 10);
        this.x = p.x;
        this.y = p.y;

        this.complete = this.time === this.duration;
    },
    draw:function() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.r);
        ctx.scale(1, this.sy);

        ctx.fillStyle = this.color;
        ctx.fillRect(-this.w * 0.5, -this.h * 0.5, this.w, this.h);

        ctx.restore();
    }
};

let Loader = function(x, y) {
    this.x = x;
    this.y = y;

    this.r = 24;
    this._progress = 0;

    this.complete = false;
};

Loader.prototype = {
    reset:function() {
        this._progress = 0;
        this.complete = false;
    },
    set progress(p) {
        this._progress = p < 0 ? 0 : (p > 1 ? 1 : p);

        this.complete = this._progress === 1;
    },
    get progress() {
        return this._progress;
    },
    draw:function() {
        ctx.fillStyle = 'transparent';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, -HALF_PI, TWO_PI * this._progress - HALF_PI);
        ctx.lineTo(this.x, this.y);
        ctx.closePath();
        ctx.fill();
    }
};

let Exploader = function(x, y) {
    this.x = x;
    this.y = y;

    this.startRadius = 24;

    this.time = 0;
    this.duration = 0.4;
    this.progress = 0;

    this.complete = false;
};

Exploader.prototype = {
    reset:function() {
        this.time = 0;
        this.progress = 0;
        this.complete = false;
    },
    update:function() {
        this.time = Math.min(this.duration, this.time + timeStep);
        this.progress = Ease.inBack(this.time, 0, 1, this.duration);

        this.complete = this.time === this.duration;
    },
    draw:function() {
        ctx.fillStyle = 'transparent';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.startRadius * (1 - this.progress), 0, TWO_PI);
        ctx.fill();
    }
};

var particles = [],
    loader,
    exploader,
    phase = 0;

function initDrawingCanvas() {
    drawingCanvas.width = viewWidth;
    drawingCanvas.height = viewHeight;
    ctx = drawingCanvas.getContext('2d');

    createLoader();
    createExploader();
    createParticles();
}

function createLoader() {
    loader = new Loader(viewWidth * 0.5, viewHeight * 0.5);
}

function createExploader() {
    exploader = new Exploader(viewWidth * 0.5, viewHeight * 0.5);
}

function createParticles() {
    for (var i = 0; i < 256; i++) {
        var p0 = new Point(viewWidth * 0.5, viewHeight * 0.5);
        var p1 = new Point(Math.random() * viewWidth, Math.random() * viewHeight);
        var p2 = new Point(Math.random() * viewWidth, Math.random() * viewHeight);
        var p3 = new Point(Math.random() * viewWidth, viewHeight + 64);

        particles.push(new Particle(p0, p1, p2, p3));
    }
}

function update() {
    switch (phase) {
        case 0:
            loader.progress += (1);
            break;
        case 1:
            exploader.update();
            break;
        case 2:
            particles.forEach(function(p) {
                p.update();
            });
            break;
    }
}

function draw() {
    ctx.clearRect(0, 0, viewWidth, viewHeight);
    switch (phase) {
        case 0:
            loader.draw();
            break;
        case 1:
            exploader.draw();
            break;
        case 2:
            particles.forEach(function(p) {
                p.draw();
            });
        break;
    }
}

function loop() {
    update();
    draw();

    if (phase === 0 && loader.complete) {
        phase = 1;
    }
    else if (phase === 1 && exploader.complete) {
        phase = 2;
    }
    else if (phase === 2 ) {

    }

    requestAnimationFrame(loop);
}

window.addEventListener('load', initDrawingCanvas);

// math and stuff

/**
 * easing equations from http://gizma.com/easing/
 * t = current time
 * b = start value
 * c = delta value
 * d = duration
 */
var Ease = {
    inCubic:function (t, b, c, d) {
        t /= d;
        return c*t*t*t + b;
    },
    outCubic:function(t, b, c, d) {
        t /= d;
        t--;
        return c*(t*t*t + 1) + b;
    },
    inOutCubic:function(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    },
    inBack: function (t, b, c, d, s) {
        s = s || 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    }
};

function cubeBezier(p0, c0, c1, p1, t) {
    var p = new Point();
    var nt = (1 - t);

    p.x = nt * nt * nt * p0.x + 3 * nt * nt * t * c0.x + 3 * nt * t * t * c1.x + t * t * t * p1.x;
    p.y = nt * nt * nt * p0.y + 3 * nt * nt * t * c0.y + 3 * nt * t * t * c1.y + t * t * t * p1.y;

    return p;
}