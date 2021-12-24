let parent = document.getElementById("parent");
var elWidth = 64;
var width = Math.round(window.innerWidth / elWidth) + 2;

class segment {
  constructor(width, number, parent, index) {
    this.width = width;
    this.number = number;
    this.parent = parent;
    this.x = index * this.width;
    this.el = document.createElement("div");
    this.el.classList.add("image");
    this.el.style.width = this.width + "px";
    this.el.style.transform = `translateX(${this.x}px`;
    this.parent.appendChild(this.el);
    var _self = this;
    function update() {
      _self.x--;
      if (_self.x <= -_self.width) {
        _self.x += _self.number * _self.width;
      }

      _self.el.style.transform = `translateX(${_self.x}px`;
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
}

for (let i = 0; i < width; i++) {
  new segment(elWidth, width, parent, i);
}

var cnv = document.getElementById("a");
var ctx = cnv.getContext("2d");
var pixelSize = 8;

function gen() {
  cnv.width = window.innerWidth / pixelSize + 1;
  var h = 16
  cnv.height = h;
  cnv.style.height = h * pixelSize + "px"
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  ctx.fillStyle = "#171738ff";
  for (let i = 0; i < cnv.height; i++) {
    var chance = i / cnv.height;
    for (let s = 0; s < cnv.width; s++) {
      var random = Math.random();
      if (random < chance) ctx.fillRect(s, i, 1, 1);
    }
  }
}
window.onresize = gen

gen();

let frames = [
  "./assets/tile000.png",
  "./assets/tile001.png",
  "./assets/tile002.png",
  "./assets/tile003.png",
  "./assets/tile004.png",
  "./assets/tile005.png",
  "./assets/tile006.png",
  "./assets/tile007.png",
]
let frame = 0
function animateCharacter() {
  var char = document.getElementById('character')
  char.src = frames[frame]
  frame++
  if (frame == frames.length) frame -= frames.length
}

setInterval(() => {
  animateCharacter()
}, 100);

let clouds = {
  1: [
    "./assets/1cloud01.png"
  ],
  2: [
    "./assets/2cloud01.png"
  ],
  3: [
    "./assets/3cloud01.png"
  ]
}

class cloud {
  constructor(speed, z) {
    this.speed = speed
    this.width = 512
    this.el = document.createElement("img");
    let src = clouds[z]
    this.el.classList.add("cloud")
    this.el.src = src[Math.floor(Math.random() * src.length)]
    document.getElementById("clouds").appendChild(this.el);
    this.x = window.innerWidth;
    var _self = this;
    this.el.style.zIndex  = 11 - z

    function update() {
      _self.x -= _self.speed;
      if (_self.x <= -_self.width) {
        _self.el.parentElement.removeChild(_self.el)
      } else {
        requestAnimationFrame(update);
      }

      _self.el.style.transform = `translateX(${_self.x}px`;
    }
    var raf = requestAnimationFrame(update);
  }
}

setInterval(() => {
  if(Math.random() > .95) {
    let speeds = [1, 2, 2, 3, 3, 3]
    let speed = speeds[Math.floor(Math.random() * speeds.length)]
    new cloud(1 - ((speed - 1) * .25), speed)
  }
}, 100);