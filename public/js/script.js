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
let yesScale = 1;

// ====== ELEMENTS ======
const fx = document.getElementById("fx");
const folder = document.getElementById("folder");
const hint = document.getElementById("hint");

const banner = document.getElementById("banner");
const questionHeading = document.getElementById("question-heading");
const successMessage = document.getElementById("success-message");
const messageWrap = document.getElementById("message");

const yesBtn = document.getElementById("yes-button");
const noBtn = document.getElementById("no-button");

const langPill = document.getElementById("lang-pill");
const langEn = document.getElementById("lang-en");
const langAr = document.getElementById("lang-ar");

// Force effects ON (so they never "disappear")
const reducedMotion = false;

// ====== OPEN FOLDER ======
function openFolder(){
  folder.classList.add("open");
  if (hint) hint.style.display = "none";
}

folder.addEventListener("click", (e) => {
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

// ====== YES SCALE (smooth, capped) ======
function applyYesScale(){
  const cap = window.innerWidth < 520 ? 1.30 : 1.55;
  yesBtn.style.setProperty("--yesScale", Math.min(yesScale, cap));
}

// ====== RESET UI ======
function resetTexts(){
  questionHeading.innerHTML = heading_text[language] || heading_text.english;
  yesBtn.textContent = answers_yes[language] || answers_yes.english;
  noBtn.textContent = answers_no[language]?.[0] || answers_no.english[0];
  successMessage.textContent = success_text[language] || success_text.english;

  i = 1;
  clicks = 0;
  yesScale = 1;
  applyYesScale();

  messageWrap.style.display = "none";
  document.querySelector(".buttons").style.display = "flex";
}

// ====== LANGUAGE TOGGLE ======
function setLanguage(next){
  language = next;

  langEn.classList.toggle("is-active", language === "english");
  langAr.classList.toggle("is-active", language === "arabic");
  langPill.classList.toggle("is-ar", language === "arabic");

  resetTexts();
}

langEn.addEventListener("click", () => setLanguage("english"));
langAr.addEventListener("click", () => setLanguage("arabic"));

// ====== OPTIMIZED PARTICLES (POOL) ======
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

// more effects (still optimized)
const heartsPool = poolCreate("p-heart", 70);
const sparksPool = poolCreate("p-spark", 55);
const bowsPool   = poolCreate("p-bow", 40);

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
    const a = 1 - t;

    p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`;
    p.el.style.opacity = a.toFixed(3);
  }

  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

// ====== AMBIENT EFFECTS (MORE) ======
function ambient(){
  if (reducedMotion) return;

  const w = window.innerWidth;
  const startX = Math.random() * w;
  const pick = Math.random();

  if (pick < 0.55){
    spawnFrom(heartsPool, (el) => {
      const size = 10 + Math.random()*12;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.background = `rgba(255,47,151,${0.20 + Math.random()*0.28})`;

      return {
        el,
        x: startX,
        y: window.innerHeight + 20,
        vx: -10 + Math.random()*20,
        vy: -70 - Math.random()*90,
        rot: Math.random()*360,
        vr: -70 + Math.random()*140,
        grav: -10,
        life: 0,
        maxLife: 6 + Math.random()*3
      };
    });
  } else if (pick < 0.82){
    spawnFrom(bowsPool, (el) => {
      el.style.background = `rgba(255,47,151,${0.16 + Math.random()*0.22})`;
      return {
        el,
        x: startX,
        y: window.innerHeight + 20,
        vx: -14 + Math.random()*28,
        vy: -60 - Math.random()*70,
        rot: -20 + Math.random()*40,
        vr: -35 + Math.random()*70,
        grav: -8,
        life: 0,
        maxLife: 5 + Math.random()*3
      };
    });
  } else {
    spawnFrom(sparksPool, (el) => {
      return {
        el,
        x: startX,
        y: window.innerHeight + 20,
        vx: -8 + Math.random()*16,
        vy: -95 - Math.random()*110,
        rot: 0,
        vr: 0,
        grav: -12,
        life: 0,
        maxLife: 4 + Math.random()*2.5
      };
    });
  }
}

// MORE ambient, but still smooth
setInterval(ambient, 140);
setInterval(() => { if (Math.random() < 0.7) ambient(); }, 110);

// ====== YES CELEBRATION ======
function pulse(){
  const p = document.createElement("div");
  p.className = "pulse";
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 1100);
}

function burst(centerX, centerY, power=1){
  // hearts
  for (let k=0;k<18*power;k++){
    spawnFrom(heartsPool, (el) => {
      const size = 12 + Math.random()*16;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.background = `rgba(255,47,151,${0.35 + Math.random()*0.35})`;

      return {
        el,
        x: centerX + (-120 + Math.random()*240),
        y: centerY + (-60 + Math.random()*120),
        vx: (-160 + Math.random()*320) * 0.9,
        vy: (-260 - Math.random()*260) * 0.9,
        rot: Math.random()*360,
        vr: -140 + Math.random()*280,
        grav: 720,
        life: 0,
        maxLife: 1.9 + Math.random()*1.0
      };
    });
  }

  // sparkles
  for (let k=0;k<14*power;k++){
    spawnFrom(sparksPool, (el) => {
      return {
        el,
        x: centerX + (-170 + Math.random()*340),
        y: centerY + (-80 + Math.random()*160),
        vx: (-210 + Math.random()*420) * 0.85,
        vy: (-240 - Math.random()*260) * 0.85,
        rot: 0,
        vr: 0,
        grav: 840,
        life: 0,
        maxLife: 1.1 + Math.random()*0.9
      };
    });
  }

  // bows
  for (let k=0;k<10*power;k++){
    spawnFrom(bowsPool, (el) => {
      el.style.background = `rgba(255,47,151,${0.22 + Math.random()*0.22})`;
      return {
        el,
        x: centerX + (-160 + Math.random()*320),
        y: centerY + (-80 + Math.random()*160),
        vx: (-170 + Math.random()*340) * 0.75,
        vy: (-220 - Math.random()*220) * 0.75,
        rot: -20 + Math.random()*40,
        vr: -90 + Math.random()*180,
        grav: 680,
        life: 0,
        maxLife: 2.1 + Math.random()*1.0
      };
    });
  }
}

function yesShow(){
  pulse();

  const cx = window.innerWidth * 0.5;
  const cy = window.innerHeight * 0.55;

  // longer sequence
  burst(cx, cy, 1);
  setTimeout(() => burst(cx, cy, 1), 220);
  setTimeout(() => burst(cx, cy, 1), 520);
  setTimeout(() => burst(cx, cy, 1), 900);
  setTimeout(() => burst(cx, cy, 1), 1400);
  setTimeout(() => burst(cx, cy, 1), 2000);
  setTimeout(() => burst(cx, cy, 1), 2700);
  setTimeout(() => burst(cx, cy, 1), 3500);
}

// ====== BUTTON LOGIC ======
noBtn.addEventListener("click", (e) => {
  e.preventDefault();

  banner.src = "./public/images/yaalimadad.gif";
  refreshBanner();

  clicks++;

  // smooth scale up, no lag
  yesScale += 0.08;
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

