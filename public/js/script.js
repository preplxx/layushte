// ===== TEXT =====
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
  english: "YAYYYYY ur such a cutie mo- ahem layush!",
  arabic: "YAYYYYY YO2BORNE HAL JAMEL ANA"
};

// ===== STATE =====
let language = "english";
let i = 1;
let clicks = 0;
let yesScale = 1;

// ===== ELEMENTS =====
const no_button = document.getElementById("no-button");
const yes_button = document.getElementById("yes-button");
const banner = document.getElementById("banner");
const questionHeading = document.getElementById("question-heading");
const successMessage = document.getElementById("success-message");
const buttonsWrap = document.getElementsByClassName("buttons")[0];
const messageWrap = document.getElementsByClassName("message")[0];
const folder = document.getElementById("folder");

// ===== FX LAYER =====
let fx = document.getElementById("fx-layer");
if (!fx) {
  fx = document.createElement("div");
  fx.id = "fx-layer";
  document.body.appendChild(fx);
}

// ===== FOLDER OPEN =====
folder.addEventListener("click", (e) => {
  // don't re-close if clicking inside buttons etc
  if (e.target.closest(".buttons") || e.target.closest(".language-selector")) return;
  folder.classList.add("open");
});

// auto open after a short cute delay
setTimeout(() => folder.classList.add("open"), 450);

// ===== HELPERS =====
function refreshBanner() {
  const src = banner.src;
  banner.src = "";
  banner.src = src;
}

function applyYesScale() {
  yes_button.style.transform = `scale(${yesScale})`;
}

function resetTexts() {
  questionHeading.innerHTML = heading_text[language] || heading_text.english;
  yes_button.innerHTML = answers_yes[language] || answers_yes.english;
  no_button.innerHTML = answers_no[language]?.[0] || answers_no.english[0];
  successMessage.textContent = success_text[language] || success_text.english;

  i = 1;
  clicks = 0;
  yesScale = 1;
  applyYesScale();

  document.body.classList.toggle("lang-ar", language === "arabic");
}

// ===== PARTICLES =====
function spawnHeart({left, dur, size} = {}) {
  const h = document.createElement("div");
  h.className = "heart";
  h.style.left = `${left ?? (Math.random() * 100)}vw`;
  const D = dur ?? (3.5 + Math.random() * 4.5);
  const S = size ?? (12 + Math.random() * 18);
  h.style.width = `${S}px`;
  h.style.height = `${S}px`;
  h.style.animationDuration = `${D}s`;
  h.style.opacity = `${0.25 + Math.random() * 0.65}`;
  fx.appendChild(h);
  setTimeout(() => h.remove(), D * 1000);
}

function sparkleBurst(count = 40) {
  for (let k = 0; k < count; k++) {
    const s = document.createElement("div");
    s.className = "spark";
    s.style.left = `${35 + Math.random() * 30}vw`;
    s.style.bottom = `${12 + Math.random() * 22}vh`;
    s.style.animationDuration = `${0.7 + Math.random() * 1.0}s`;
    fx.appendChild(s);
    setTimeout(() => s.remove(), 1700);
  }
}

function heartBurst(count = 60) {
  for (let k = 0; k < count; k++) {
    setTimeout(() => spawnHeart({ left: 25 + Math.random()*50, dur: 2.2 + Math.random()*2.6 }), k * 18);
  }
}

/* confetti */
function confettiOverload(count = 220) {
  for (let i = 0; i < count; i++) {
    const c = document.createElement("div");
    c.className = "spark";
    c.style.width = `${4 + Math.random() * 10}px`;
    c.style.height = `${4 + Math.random() * 10}px`;
    c.style.borderRadius = `${Math.random() > 0.5 ? 999 : 2}px`;
    c.style.left = `${Math.random() * 100}vw`;
    c.style.bottom = `${70 + Math.random() * 10}vh`;
    c.style.animationDuration = `${0.9 + Math.random() * 1.6}s`;
    fx.appendChild(c);
    setTimeout(() => c.remove(), 2400);
  }
}

// ambient hearts
setInterval(() => spawnHeart(), 260);

// ===== FIXED MOUSE TRAIL (smooth) =====
let mx = 0, my = 0, last = 0;
window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });

function trailTick(t) {
  if (t - last > 18) { // ~55fps
    last = t;
    const dot = document.createElement("div");
    dot.className = "trail";
    dot.style.left = `${mx - 5}px`;
    dot.style.top  = `${my - 5}px`;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 700);
  }
  requestAnimationFrame(trailTick);
}
requestAnimationFrame(trailTick);

// ===== SCREEN FLASH + SHAKE =====
function screenFlash() {
  const f = document.createElement("div");
  f.style.position = "fixed";
  f.style.inset = "0";
  f.style.zIndex = "9999";
  f.style.pointerEvents = "none";
  f.style.background = "radial-gradient(circle at 50% 40%, rgba(255,255,255,.85), rgba(255,47,151,.15), transparent 65%)";
  f.style.animation = "flash 1.1s ease-out forwards";
  document.body.appendChild(f);

  const style = document.createElement("style");
  style.textContent = `
    @keyframes flash{
      0%{ opacity:0; transform: scale(1); }
      15%{ opacity:1; }
      100%{ opacity:0; transform: scale(1.05); }
    }
    @keyframes shake{
      0%{ transform: translate(0,0); }
      20%{ transform: translate(-6px, 4px); }
      40%{ transform: translate(7px, -5px); }
      60%{ transform: translate(-6px, -4px); }
      80%{ transform: translate(6px, 4px); }
      100%{ transform: translate(0,0); }
    }
  `;
  document.head.appendChild(style);

  document.body.style.animation = "shake .7s ease";
  setTimeout(() => { document.body.style.animation = ""; }, 700);

  setTimeout(() => { f.remove(); style.remove(); }, 1200);
}

// ===== EVENTS =====
no_button.addEventListener("click", () => {
  banner.src = "./public/images/yaalimadad.gif";
  refreshBanner();

  clicks++;

  // grow YES (but keep it cute)
  const bumps = [0.14,0.12,0.10,0.16,0.18,0.11,0.15];
  yesScale = Math.min(4.0, yesScale + bumps[Math.floor(Math.random() * bumps.length)]);
  applyYesScale();

  yes_button.classList.remove("jelly");
  void yes_button.offsetWidth;
  yes_button.classList.add("jelly");

  const total = answers_no[language].length;

  if (i < total - 1) {
    no_button.innerHTML = answers_no[language][i];
    i++;
  } else {
    alert(answers_no[language][i]);
    resetTexts();
  }
});

yes_button.addEventListener("click", () => {
  banner.src = "./public/images/yes.gif";
  refreshBanner();

  // OVERLOAD EVERYTHING
  screenFlash();
  confettiOverload(260);
  sparkleBurst(70);
  heartBurst(80);

  // extra: rain hearts for a bit
  const rain = setInterval(() => spawnHeart({ size: 18 + Math.random()*18, dur: 2.4 + Math.random()*2.2 }), 80);
  setTimeout(() => clearInterval(rain), 2000);

  buttonsWrap.style.display = "none";
  messageWrap.style.display = "block";
  messageWrap.classList.remove("pop");
  void messageWrap.offsetWidth;
  messageWrap.classList.add("pop");
});

function changeLanguage() {
  const selectElement = document.getElementById("language-select");
  language = (selectElement.value === "arabic") ? "arabic" : "english";

  const wasSuccess = (messageWrap.style.display === "block");
  resetTexts();

  if (wasSuccess) {
    buttonsWrap.style.display = "none";
    messageWrap.style.display = "block";
  } else {
    buttonsWrap.style.display = "flex";
    messageWrap.style.display = "none";
  }
}

// ===== INIT =====
resetTexts();
