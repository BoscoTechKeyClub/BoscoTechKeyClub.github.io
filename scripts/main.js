let parent = document.getElementById("parent");
var elWidth = 64;
var width = Math.round(window.innerWidth / elWidth) + 2;

var grasses = [
  "../assets/grass01.png",
  "../assets/grass02.png",
  "../assets/grass03.png"
]

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
    this.flip = false
    var bg = grasses[Math.floor(Math.random() * grasses.length)]
    this.el.style.backgroundImage = `url("${bg}")`
    var _self = this;
    function update() {
      _self.x-= 1;
      if (_self.x <= -_self.width) {
        _self.x += _self.number * _self.width;
      }

      _self.el.style.transform = `translateX(${_self.x}px)`;
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
  clear() {
    this.el.parentElement.removeChild(this.el)
  }
}
var segments = [];

for (let i = 0; i < width; i++) {
  segments.push(new segment(elWidth, width, parent, i));
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
  for(let i = 0; i < segments.length; i++) {
    segments[i].clear()
  }
  segments= []
  for (let i = 0; i < width; i++) {
    segments.push(new segment(elWidth, width, parent, i));
  }
}
window.onresize = gen

gen();

let frames = [
  "../assets/tile000.png",
  "../assets/tile001.png",
  "../assets/tile002.png",
  "../assets/tile003.png",
  "../assets/tile004.png",
  "../assets/tile005.png",
  "../assets/tile006.png",
  "../assets/tile007.png",
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
    "../assets/1cloud01.png",
    "../assets/1cloud02.png",
    "../assets/1cloud03.png",
  ],
  2: [
    "../assets/2cloud01.png",
    "../assets/2cloud02.png",
    "../assets/2cloud03.png",
  ],
  3: [
    "../assets/3cloud01.png",
    "../assets/3cloud02.png",
    "../assets/3cloud03.png",
  ]
}

class cloud {
  constructor(speed, z, startPos) {
    this.startPos = (startPos != null) ? (Math.ceil(startPos / 8) * 8) : (Math.ceil(window.innerWidth/ 8) * 8)
    this.speed = speed
    this.width = 512
    this.el = document.createElement("img");
    let src = clouds[z]
    this.el.classList.add("cloud")
    this.el.src = src[Math.floor(Math.random() * src.length)]
    document.getElementById("clouds").appendChild(this.el);
    this.x = this.startPos;
    var _self = this;
    this.el.style.zIndex  = 11 - z

    if(Math.random() > .5) this.el.classList.add("flipHor")

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
    let speeds = [1, 1, 2, 2, 3, 3, 3]
    let speed = speeds[Math.floor(Math.random() * speeds.length)]
    new cloud(1 - ((speed - 1) * .25), speed)
  }
}, 70);

function genStartClouds() {
  var amt = 15
  for (let i = 0; i < amt; i++) {
    let speeds = [1, 1, 2, 2, 3, 3, 3]
    let speed = speeds[Math.floor(Math.random() * speeds.length)]
    new cloud(1 - ((speed - 1) * .25), speed, Math.random() * window.innerWidth)    
  }
}
genStartClouds()


var bee = document.getElementById("bee")
var beeY = 0
var indx = 0
var beeAnimating = true
var particleIndex = 0
var particleStyleIndex = 0
var particleStyles = [1, 1, 0, 0, 0]
var offset = Math.floor(Math.random() * 100)
function animateBee () {


  if(beeAnimating) {
    indx ++ 
    particleIndex += 2
    beeY = (Math.sin((indx + offset)/12) * 10) + (Math.sin((indx + offset)/24) * 7)
    var beeX = (window.innerWidth + 80)  - (indx * 2)
    if(particleIndex ==8) {
      var particleStyle = particleStyles[particleStyleIndex]
      particleStyleIndex ++
      if(particleStyle == 1){
        new beeParticle(beeY + (4*8), beeX + 72)
      }
      if(particleStyleIndex == particleStyles.length) particleStyleIndex -= particleStyles.length
      particleIndex = 0
    }
    if(beeX < -80) {
      indx = 0
      beeAnimating = false
      beeX = (window.innerWidth + 80)
    }
    bee.style.transform = "translate(" + beeX+ "px," + beeY + "px)"
  } else {
    if(Math.random() > 0.998) {Math.floor(Math.random() * 100);beeAnimating= true};
  }
  var raf = requestAnimationFrame(animateBee)
}

animateBee()

var beeParticleContainer = document.getElementById("beeParticles")

class beeParticle {
  constructor (height, x) {
    this.el = document.createElement('div')
    this.el.classList.add("beeParticle")
    this.el.style.left = x + "px"
    this.el.style.top = height + "px"
    beeParticleContainer.appendChild(this.el)
    setTimeout(() => {
      this.el.parentElement.removeChild(this.el)
    }, 1000);
  }
}


var headerDropContent = {
  "Home": false,
  "About": {
    "What is Key Club?": "../about/what_is_key",
    "Officers & Advisors": "../about/officers_and_advisors",
  },
  "Services": {
    "Services": "../services/",
    "DCM's": "../services/dcm",
  },
  "Resources": {
    "Hours": "../resources/hours",
    "Documents": "../resources/documents",
    "Cheers": "../resources/cheers",
  },
  "More": {
    "Gallery": "../gallery",
    "Announcements": "../announcements",
    "Links": "../links",
    "Contact Us": "../contact",
  },
}
var uhb = document.getElementById("underHeaderBanner")

function setupHeader() {
  document.querySelectorAll("[headerWideBtn]").forEach(element => {
    function act (e) {

      if(headerDropContent[e.target.attributes["headerwidebtn"].value]) {
        uhb.innerHTML = ""
        uhb.classList.add("bannerOpen")
        Object.entries(headerDropContent[e.target.attributes["headerwidebtn"].value]).forEach(e => {
          console.log(e)
          uhb.innerHTML += `<a class="headerBtn" href="${e[1]}">${e[0]}</a><dot></dot>`
        })
        uhb.removeChild(uhb.childNodes[uhb.childNodes.length -1])
      }
    }
    function off (e) {
      console.log('b')
      uhb.classList.remove("bannerOpen")
    }
    element.addEventListener("mouseover", act)
    element.addEventListener("mouseout", off)
    element.addEventListener("focus", act)
    element.addEventListener("blur", off)
  });
}

setupHeader()


document.getElementById('loader').classList.add("loader-hidden")