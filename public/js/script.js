// ===== TEXT =====
const answers_no = {
  english: [
    "No",
    "Are you sure?",
    "Are you really sure??",
    "Are you really realy sure???",
    "Think again?",
    "Don't believe in second chances?",
    "Why are you being so cold?",
    "Maybe we can talk about it?",
    "I am not going to ask again!",
    "Ok now this is hurting my feelings!",
    "You are now just being mean!",
    "Why are you doing this to me?",
    "Please give me a chance!",
    "I am begging you to stop!",
    "Ok, Let's just start over.."
  ],
  arabic: [
    "La2!",
    "M2akde...?",
    "M2akdee lea 3anjad hl2???",
    "M2akdeeeee 3anjd 3anjad?!??",
    "Fakre mara tenye please!?",
    "Ma bte2mne bi wala second chance?? walaw?",
    "Le hal2ad dry wli",
    "tab fakre abel pleasee..",
    "ok khls ma bede es2alik",
    "layke walla bbke",
    "tab ma pizza lea..",
    "Le 3am t3amleene hek wtf?",
    "Pleaseee e3tine chance...",
    "lea shwa w ha e3badik",
    "Ok yalla ta3e nballesh mn el awal.."
  ]
};

const answers_yes = {
  english: "yes king",
  arabic: "Na3am papi!"
};

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
const container = document.getElementsByClassName("container")[0];

// ===== Add background blobs + fx layer + shine (only once) =====
(function setupDecor(){
  if (!document.querySelector(".bg-blobs")){
    const b = document.createElement("div");
    b.className = "bg-blobs";
    document.body.appendChild(b);
  }

  if (!document.getElementById("fx-layer")){
    const fx = document.createElement("div");
    fx.id = "fx-layer";
    document.body.appendChild(fx);
  }

  if (!container.querySelector(".shine")){
    const s = document.createElement("div");
    s.className = "shine";
    container.appendChild(s);
  }
})();

const fxLayer = document.getElementById("fx-layer");
const shine = container.querySelector(".shine");

// ===== HELPERS =====
function refreshBanner() {
  const src = banner.src;
  banner.src = "";
  banner.src = src;
}

function applyYesScale() {
  yes_button.style.transform = `scale(${yesScale})`;
}

function resetAllTexts() {
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

  const L = left ?? (Math.random() * 100);
  const D = dur ?? (4 + Math.random() * 5);
  const S = size ?? (12 + Math.random() * 18);

  h.style.left = `${L}vw`;
  h.style.width = `${S}px`;
  h.style.height = `${S}px`;
  h.style.animationDuration = `${D}s`;
  h.style.opacity = `${0.25 + Math.random() * 0.6}`;

  fxLayer.appendChild(h);
  setTimeout(() => h.remove(), D * 1000);
}

function burstHearts() {
  for (let k = 0; k < 44; k++) {
    setTimeout(() => spawnHeart({ left: 28 + Math.random()*44, dur: 2.2 + Math.random()*2.6 }), k * 28);
  }
}

function sparkleBurst() {
  for (let k = 0; k < 34; k++) {
    const s = document.createElement("div");
    s.className = "spark";
    s.style.left = `${40 + Math.random()*20}vw`;
    s.style.bottom = `${18 + Math.random()*16}vh`;
    s.style.animationDuration = `${0.75 + Math.random()*0.95}s`;
    fxLayer.appendChild(s);
    setTimeout(() => s.remove(), 1700);
  }
}

// ambient hearts (cuter)
setInterval(() => spawnHeart(), 280);

// mouse trail (cute)
let lastTrail = 0;
window.addEventListener("mousemove", (e) => {
  const now = performance.now();
  if (now - lastTrail < 18) return; // limit
  lastTrail = now;

  const t = document.createElement("div");
  t.className = "trail";
  t.style.left = `${e.clientX - 5}px`;
  t.style.top  = `${e.clientY - 5}px`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 720);
});

// 3D tilt + shine follows mouse
container.addEventListener("mousemove", (e) => {
  const r = container.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;

  const rx = (0.5 - y) * 8;
  const ry = (x - 0.5) * 10;

  container.style.transform = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  container.style.boxShadow = `0 34px 110px rgba(30,20,40,0.20)`;

  // shine position
  container.style.setProperty("--mx", `${x * 100}%`);
  container.style.setProperty("--my", `${y * 100}%`);
});
container.addEventListener("mouseleave", () => {
  container.style.transform = "";
  container.style.boxShadow = "";
});

// ===== EVENTS =====
no_button.addEventListener("click", () => {
  banner.src = "./public/images/yaalimadad.gif";
  refreshBanner();

  clicks++;

  // grow YES button (still stays big base)
  const bumps = [0.14, 0.12, 0.10, 0.16, 0.11, 0.18];
  yesScale = Math.min(3.7, yesScale + bumps[Math.floor(Math.random() * bumps.length)]);
  applyYesScale();

  // jelly animation
  yes_button.classList.remove("jelly");
  void yes_button.offsetWidth;
  yes_button.classList.add("jelly");

  const total = answers_no[language].length;

  if (i < total - 1) {
    no_button.innerHTML = answers_no[language][i];
    i++;
  } else {
    alert(answers_no[language][i]);
    resetAllTexts();
  }
});

yes_button.addEventListener("click", () => {
  banner.src = "./public/images/yes.gif";
  refreshBanner();

  burstHearts();
  sparkleBurst();

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
  resetAllTexts();

  if (wasSuccess) {
    buttonsWrap.style.display = "none";
    messageWrap.style.display = "block";
  } else {
    buttonsWrap.style.display = "flex";
    messageWrap.style.display = "none";
  }
}

// ===== INIT =====
resetAllTexts();
