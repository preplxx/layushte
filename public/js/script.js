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
const folderTop = document.getElementById("folder-top");
const hint = document.getElementById("hint");
const closeBtn = document.getElementById("close-folder");

const banner = document.getElementById("banner");
const questionHeading = document.getElementById("question-heading");
const successMessage = document.getElementById("success-message");
const messageWrap = document.getElementById("message");

const yesBtn = document.getElementById("yes-button");
const noBtn = document.getElementById("no-button");
const restartBtn = document.getElementById("restart-btn");

const langPill = document.getElementById("lang-pill");
const langEn = document.getElementById("lang-en");
const langAr = document.getElementById("lang-ar");

// ====== AUDIO ======
const bgm = document.getElementById("bgm");
const aOpen = document.getElementById("sfx-open");
const aYes = document.getElementById("sfx-yes");
const aNo  = document.getElementById("sfx-no");

const musicToggle = document.getElementById("music-toggle");
const sfxToggle   = document.getElementById("sfx-toggle");

let musicOn = false;
let sfxOn = false;

const AUDIO = {
  bgm:  "./public/sounds/bgm.mp3",
  open: "./public/sounds/open.mp3",
  yes:  "./public/sounds/yes.mp3",
  no:   "./public/sounds/no.mp3"
};

bgm.src = AUDIO.bgm;
aOpen.src = AUDIO.open;
aYes.src = AUDIO.yes;
aNo.src  = AUDIO.no;

function playSfx(aud){
  if (!sfxOn || !aud) return;
  try{
    aud.currentTime = 0;
    aud.play();
  }catch{}
}

async function startMusic(){
  if (!musicOn) return;
  try{
    bgm.volume = 0.25;
    await bgm.play();
  }catch{
    // autoplay blocked until user interacts; ignore
  }
}

// ====== FOLDER OPEN/CLOSE ======
function openFolder(){
  folder.classList.add("open");
  if (hint) hint.style.display = "none";
  playSfx(aOpen);
}

function closeFolder(){
  folder.classList.remove("open");
  if (hint) hint.style.display = "block";
  playSfx(aOpen);
}

// open ONLY by clicking the top bar
folderTop.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (!folder.classList.contains("open")) openFolder();
});

// keyboard open
folder.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    if (!folder.classList.contains("open")) openFolder();
  }
});

// close by close button only
closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  closeFolder();
});

// ====== BANNER REFRESH ======
function refreshBanner(){
  const src = banner.src;
  banner.src = "";
  banner.src = src;
}

// ====== YES SCALE ======
function applyYesScale(){
  const cap = window.innerWidth < 520 ? 1.30 : 1.55;
  yesBtn.style.setProperty("--yesScale", Math.min(yesScale, cap));
}

// ====== RESET ======
function resetAll(){
  banner.src = "./public/images/leaaa.gif";
  refreshBanner();

  questionHeading.innerHTML = heading_text[language] || heading_text.english;
  yesBtn.textContent = answers_yes[language] || answers_yes.english;
  noBtn.textContent = answers_no[language]?.[0] || answers_no.english[0];
  successMessage.textContent = success_text[language] || success_text.english;

  i = 1;
  clicks = 0;
  yesScale = 1;
  applyYesScale();

  document.querySelector(".buttons").style.display = "flex";
  messageWrap.style.display = "none";
}

restartBtn.addEventListener("click", () => {
  resetAll();
  pulse();
});

// ====== LANGUAGE ======
function setLanguage(next){
  language = next;

  langEn.classList.toggle("is-active", language === "english");
  langAr.classList.toggle("is-active", language === "arabic");
  langPill.classList.toggle("is-ar", language === "arabic");

  resetAll();
}
langEn.addEventListener("click", () => setLanguage("english"));
langAr.addEventListener("click", () => setLanguage("arabic"));

// ====== SOUND TOGGLES ======
musicToggle.addEventListener("click", async () => {
  musicOn = !musicOn;
  musicToggle.setAttribute("aria-pressed", musicOn ? "true" : "false");
  musicToggle.textContent = musicOn ? "🎵 Music: On" : "🎵 Music: Off";

  if (musicOn) await startMusic();
  else { try{ bgm.pause(); }catch{} }
});

sfxToggle.addEventListener("click", () => {
  sfxOn = !sfxOn;
  sfxToggle.setAttribute("aria-pressed", sfxOn ? "true" : "false");
  sfxToggle.textContent = sfxOn ? "🔊 SFX: On" : "🔇 SFX: Off";
  playSfx(aOpen);
});

// best-effort autoplay (will still require a click on many browsers)
window.addEventListener("load", () => {
  bgm.loop = true;
  bgm.volume = 0.25;
  bgm.play().catch(() => {});
  document.addEventListener("click", () => {
    bgm.play().catch(() => {});
  }, { once:true });
});

// ====== PARTICLES (OPTIMIZED POOL) ======
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

// ambient floaters (lightweight)
function ambient(){
  const w = window.innerWidth;
  const startX = Math.random() * w;
  const pick = Math.random();

  if (pick < 0.55){
    spawnFrom(heartsPool, (el) => {
      const size = 10 + Math.random()*12;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.background = `rgba(255,47,151,${0.18 + Math.random()*0.28})`;
      return {
        el, x:startX, y:window.innerHeight+20,
        vx:-10+Math.random()*20, vy:-70-Math.random()*90,
        rot:Math.random()*360, vr:-70+Math.random()*140,
        grav:-10, life:0, maxLife:6+Math.random()*3
      };
    });
  } else if (pick < 0.82){
    spawnFrom(bowsPool, (el) => {
      el.style.background = `rgba(255,47,151,${0.14 + Math.random()*0.22})`;
      return {
        el, x:startX, y:window.innerHeight+20,
        vx:-14+Math.random()*28, vy:-60-Math.random()*70,
        rot:-20+Math.random()*40, vr:-35+Math.random()*70,
        grav:-8, life:0, maxLife:5+Math.random()*3
      };
    });
  } else {
    spawnFrom(sparksPool, (el) => ({
      el, x:startX, y:window.innerHeight+20,
      vx:-8+Math.random()*16, vy:-95-Math.random()*110,
      rot:0, vr:0, grav:-12, life:0, maxLife:4+Math.random()*2.5
    }));
  }
}
setInterval(ambient, 160);

// mouse trail (throttled + only when open)
let lastTrail = 0;
window.addEventListener("pointermove", (e) => {
  const now = performance.now();
  if (now - lastTrail < 55) return;
  lastTrail = now;

  if (!folder.classList.contains("open")) return;

  spawnFrom(heartsPool, (el) => {
    const size = 10 + Math.random()*10;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.background = `rgba(255,47,151,${0.18 + Math.random()*0.25})`;
    return {
      el,
      x: e.clientX + (-8 + Math.random()*16),
      y: e.clientY + (-8 + Math.random()*16),
      vx: -30 + Math.random()*60,
      vy: -120 - Math.random()*80,
      rot: Math.random()*360,
      vr: -120 + Math.random()*240,
      grav: 520,
      life: 0,
      maxLife: 1.0 + Math.random()*0.7
    };
  });
}, { passive:true });

// ====== YES CELEBRATION ======
function pulse(){
  const p = document.createElement("div");
  p.className = "pulse";
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 1200);
}

function burst(cx, cy, power=1){
  for (let k=0;k<18*power;k++){
    spawnFrom(heartsPool, (el) => {
      const size = 12 + Math.random()*16;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.background = `rgba(255,47,151,${0.32 + Math.random()*0.40})`;
      return {
        el,
        x: cx + (-120 + Math.random()*240),
        y: cy + (-60 + Math.random()*120),
        vx: (-160 + Math.random()*320) * 0.85,
        vy: (-260 - Math.random()*260) * 0.85,
        rot: Math.random()*360,
        vr: -140 + Math.random()*280,
        grav: 720,
        life: 0,
        maxLife: 2.0 + Math.random()*1.1
      };
    });
  }

  for (let k=0;k<14*power;k++){
    spawnFrom(sparksPool, (el) => ({
      el,
      x: cx + (-170 + Math.random()*340),
      y: cy + (-80 + Math.random()*160),
      vx: (-210 + Math.random()*420) * 0.8,
      vy: (-240 - Math.random()*260) * 0.8,
      rot: 0, vr: 0, grav: 860, life: 0, maxLife: 1.1 + Math.random()*0.9
    }));
  }

  for (let k=0;k<10*power;k++){
    spawnFrom(bowsPool, (el) => {
      el.style.background = `rgba(255,47,151,${0.18 + Math.random()*0.24})`;
      return {
        el,
        x: cx + (-160 + Math.random()*320),
        y: cy + (-80 + Math.random()*160),
        vx: (-170 + Math.random()*340) * 0.7,
        vy: (-220 - Math.random()*220) * 0.7,
        rot: -20 + Math.random()*40,
        vr: -90 + Math.random()*180,
        grav: 680,
        life: 0,
        maxLife: 2.2 + Math.random()*1.1
      };
    });
  }
}

function yesShow(){
  pulse();
  const cx = window.innerWidth * 0.5;
  const cy = window.innerHeight * 0.55;

  burst(cx, cy, 1);
  setTimeout(() => burst(cx, cy, 1), 250);
  setTimeout(() => burst(cx, cy, 1), 650);
  setTimeout(() => burst(cx, cy, 1), 1100);
  setTimeout(() => burst(cx, cy, 1), 1600);
  setTimeout(() => burst(cx, cy, 1), 2300);
  setTimeout(() => burst(cx, cy, 1), 3200);
}

// ====== BUTTON LOGIC ======
function setBanner(path){
  banner.src = path;
  refreshBanner();
}

noBtn.addEventListener("click", (e) => {
  e.preventDefault();

  setBanner("./public/images/yaalimadad.gif");
  playSfx(aNo);

  clicks++;
  yesScale += 0.085; // smooth grow
  applyYesScale();

  const total = answers_no[language].length;
  if (i < total - 1) {
    noBtn.textContent = answers_no[language][i];
    i++;
  } else {
    alert(answers_no[language][i]);
    resetAll();
  }
});

yesBtn.addEventListener("click", (e) => {
  e.preventDefault();

  setBanner("./public/images/yes.gif");
  playSfx(aYes);

  // allow music start after user interaction if enabled
  startMusic();

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
resetAll();

