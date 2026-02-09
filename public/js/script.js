// ====== TEXT ======
const answers_no = {
  english: [
    "No","Are you sure?","Are you really sure??","Are you really realy sure???",
    "Think again?","Don't believe in second chances?","Why are you being so cold?",
    "Maybe we can talk about it?","I am not going to ask again!",
    "Ok now this is hurting my feelings!","You are now just being mean!",
    "Why are you doing this to me?","Please give me a chance!",
    "I am begging you to stop!","Ok, Let's just start over.."
  ],
  arabic: [
    "La2!","M2akde...?","M2akdee lea 3anjad hl2???","M2akdeeeee 3anjd 3anjad?!??",
    "Fakre mara tenye please!?","Ma bte2mne bi wala second chance?? walaw?",
    "Le hal2ad dry wli","tab fakre abel pleasee..","ok khls ma bede es2alik",
    "layke walla bbke","tab ma pizza lea..","Le 3am t3amleene hek wtf?",
    "Pleaseee e3tine chance...","lea shwa w ha e3badik","Ok yalla ta3e nballesh mn el awal.."
  ]
};

const answers_yes = { english: "yes king", arabic: "Na3am papi!" };

const heading_text = {
  english: 'Will you be my <span class="grad">valentine</span>?',
  arabic: 'bedek tkoune my <span class="grad">valentine</span> ya 3omre?!'
};

const success_text = {
  english: "YAYYYYY ur such a cutie mo- ahem layush! :3",
  arabic: "YAYYYYY YO2BORNE HAL JAMEL ANA :3"
};

// ====== STATE ======
let language = "english";
let i = 1;
let clicks = 0;

// smoother growth, capped so it never overlaps heading
let yesScale = 1;

// ====== ELEMENTS ======
const fx = document.getElementById("fx");
const folder = document.getElementById("folder");
const paper = document.getElementById("paper");
const hint = document.getElementById("hint");

const banner = document.getElementById("banner");
const questionHeading = document.getElementById("question-heading");
const successMessage = document.getElementById("success-message");
const messageWrap = document.getElementById("message");

const yesBtn = document.getElementById("yes-button");
const noBtn = document.getElementById("no-button");

const langPill = document.querySelector(".lang-pill");
const langEn = document.getElementById("lang-en");
const langAr = document.getElementById("lang-ar");

const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

// ====== FOLDER OPEN ======
function openFolder(){
  folder.classList.add("open");
  if (hint) hint.style.display = "none";
}

folder.addEventListener("click", (e) => {
  // don't toggle when clicking buttons/lang
  if (e.target.closest(".buttons") || e.target.closest(".lang")) return;
  openFolder();
});

folder.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openFolder();
  }
});

// ====== BANNER REFRESH ======
function refreshBanner(){
  const src = banner.src;
  banner.src = "";
  banner.src = src;
}

// ====== APPLY YES SCALE WITHOUT LAG ======
function applyYesScale(){
  // cap so it can't overlap your heading area
  const capped = Math.min(yesScale, window.innerWidth < 520 ? 1.35 : 1.55);
  yesBtn.style.setProperty("--yesScale", capped);
}

// ====== RESET TEXTS ======
function resetTexts(){
  questionHeading.innerHTML = heading_text[language] || heading_text.english;
  yesBtn.textContent = answers_yes[language] || answers_yes.english;
  noBtn.textContent = answers_no[language]?.[0] || answers_no.english[0];
  successMessage.textContent = success_text[language] || success_text.english;

  i = 1;
  clicks = 0;
  yesScale = 1;
  applyYesScale();

  // reset message visibility
  messageWrap.style.display = "none";
  document.querySelector(".buttons").style.display = "flex";
}

// ====== PRETTY LANGUAGE TOGGLE ======
function setLanguage(next){
  language = next;

  langEn.classList.toggle("is-active", language === "english");
  langAr.classList.toggle("is-active", language === "arabic");

  langEn.setAttribute("aria-selected", language === "english" ? "true" : "false");
  langAr.setAttribute("aria-selected", language === "arabic" ? "true" : "false");

  langPill.classList.toggle("is-ar", language === "arabic");

  resetTexts();
}

langEn.addEventListener("click", (e) => { e.preventDefault(); setLanguage("english"); });
langAr.addEventListener("click", (e) => { e.preventDefault(); setLanguage("arabic"); });

// Keep compatibility with your older onchange handler (if any)
window.changeLanguage = function(){};

// ====== OPTIMIZED PARTICLES (POOLED) ======
function makeEl(cls){
  const el = document.createElement("div");
  el.className = cls;
  el.style.display = "none";
  fx.appendChild(el);
  return el;
}
function poolCreate(cls, count){
  const a = [];
  for (let k=0;k<count;k++) a.push(makeEl(cls));
  return a;
}

// low count = less lag, still cute
const heartsPool = poolCreate("p-heart", 40);
const sparksPool = poolCreate("p-spark", 34);
const bowsPool   = poolCreate("p-bow", 26);

const active = [];

function spawnFrom(pool, init){
  for (const el of pool){
    if (el.style.display === "none"){
      el.style.display = "block";
      active.push(init(el));
      return;
    }
  }
}
function kill(p){
  p.el.style.display = "none";
  const idx = active.indexOf(p);
  if (idx >= 0) active.splice(idx, 1);
}

function tick(){
  const dt = 1/60;

  for (let n=active.length-1; n>=0; n--){
    const p = active[n];

    p.life += dt;
    if (p.life >= p.maxLife){
      kill(p);
      continue;
    }

    p.vy += (p.grav || 0) * dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.rot += p.vr * dt;

    const t = p.life / p.maxLife;
    const a = p.fade ? (1 - t) : 1;

    p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`;
    p.el.style.opacity = a.toFixed(3);
  }

  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

// ambient cute float (hearts + bows + sparkles)
function ambient(){
  if (reducedMotion) return;

  const w = window.innerWidth;
  const startX = Math.random() * w;

  const pick = Math.random();
  if (pick < 0.55){
    spawnFrom(heartsPool, (el) => {
      const size = 10 + Math.random()*10;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.background = `rgba(255,47,151,${0.22 + Math.random()*0.22})`;
      return {
        el,
        x: startX,
        y: window.innerHeight + 18,
        vx: -10 + Math.random()*20,
        vy: -60 - Math.random()*70,
        rot: Math.random()*360,
        vr: -60 + Math.random()*120,
        grav: -8,
        life: 0,
        maxLife: 6 + Math.random()*3,
        fade: true
      };
    });
  } else if (pick < 0.80){
    spawnFrom(bowsPool, (el) => {
      el.style.background = `rgba(255,47,151,${0.18 + Math.random()*0.18})`;
      return {
        el,
        x: startX,
        y: window.innerHeight + 18,
        vx: -12 + Math.random()*24,
        vy: -55 - Math.random()*55,
        rot: -20 + Math.random()*40,
        vr: -30 + Math.random()*60,
        grav: -6,
        life: 0,
        maxLife: 5 + Math.random()*2.5,
        fade: true
      };
    });
  } else {
    spawnFrom(sparksPool, (el) => {
      return {
        el,
        x: startX,
        y: window.innerHeight + 18,
        vx: -8 + Math.random()*16,
        vy: -70 - Math.random()*80,
        rot: 0,
        vr: 0,
        grav: -10,
        life: 0,
        maxLife: 3.6 + Math.random()*2.0,
        fade: true
      };
    });
  }
}

if (!reducedMotion){
  // slower spawn = less lag
  setInterval(ambient, 320);
}

// ====== YES BIG SHOW (longer but optimized) ======
function pulse(){
  const p = document.createElement("div");
  p.className = "pulse";
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 1100);
}

function burstWave(){
  if (reducedMotion) return;

  // modest wave count (smooth)
  for (let k=0;k<14;k++){
    spawnFrom(heartsPool, (el) => {
      const size = 12 + Math.random()*14;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.background = `rgba(255,47,151,${0.35 + Math.random()*0.35})`;

      const x = window.innerWidth*0.5 + (-140 + Math.random()*280);
      const y = window.innerHeight*0.55 + (-60 + Math.random()*120);

      return {
        el,
        x,y,
        vx: -120 + Math.random()*240,
        vy: -240 - Math.random()*220,
        rot: Math.random()*360,
        vr: -120 + Math.random()*240,
        grav: 520,
        life: 0,
        maxLife: 1.8 + Math.random()*0.9,
        fade: true
      };
    });
  }

  for (let k=0;k<10;k++){
    spawnFrom(sparksPool, (el) => {
      const x = window.innerWidth*0.5 + (-180 + Math.random()*360);
      const y = window.innerHeight*0.55 + (-60 + Math.random()*120);
      return {
        el,
        x,y,
        vx: -160 + Math.random()*320,
        vy: -220 - Math.random()*220,
        rot: 0,
        vr: 0,
        grav: 680,
        life: 0,
        maxLife: 1.1 + Math.random()*0.7,
        fade: true
      };
    });
  }

  for (let k=0;k<8;k++){
    spawnFrom(bowsPool, (el) => {
      el.style.background = `rgba(255,47,151,${0.22 + Math.random()*0.20})`;
      const x = window.innerWidth*0.5 + (-160 + Math.random()*320);
      const y = window.innerHeight*0.55 + (-60 + Math.random()*120);
      return {
        el,
        x,y,
        vx: -110 + Math.random()*220,
        vy: -200 - Math.random()*180,
        rot: -20 + Math.random()*40,
        vr: -80 + Math.random()*160,
        grav: 520,
        life: 0,
        maxLife: 2.0 + Math.random()*0.8,
        fade: true
      };
    });
  }
}

function yesShow(){
  pulse();
  burstWave();

  if (reducedMotion) return;

  // longer “overload” without lag
  const times = [180, 420, 700, 1050, 1450, 1900, 2400, 3000];
  times.forEach(t => setTimeout(burstWave, t));
}

// ====== BUTTON LOGIC ======
noBtn.addEventListener("click", (e) => {
  e.preventDefault();

  banner.src = "./public/images/yaalimadad.gif";
  refreshBanner();

  clicks++;

  // smooth scale up (no weird animation)
  const bump = 0.06 + Math.random()*0.05;
  yesScale = Math.min(yesScale + bump, 1.8);
  applyYesScale();

  const total = answers_no[language].length;
  if (i < total - 1) {
    noBtn.textContent = answers_no[language][i];
    i++;
  } else {
    alert(answers_no[language][i]);
    resetTexts();
  }
});

yesBtn.addEventListener("click", (e) => {
  e.preventDefault();

  banner.src = "./public/images/yes.gif";
  refreshBanner();

  yesShow();

  document.querySelector(".buttons").style.display = "none";
  messageWrap.style.display = "block";
  messageWrap.classList.remove("pop");
  void messageWrap.offsetWidth;
  messageWrap.classList.add("pop");
});

// init
setLanguage("english");
applyYesScale();
