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
  english: "YAYYYYY ur such a cutie mo- ahem layush! :3",
  arabic: "YAYYYYY YO2BORNE HAL JAMEL ANA :3"
};

// ===== STATE =====
let language = "english";
let i = 1;
let clicks = 0;
let yesScale = 1;
let opened = false;

// ===== ELEMENTS =====
const folder = document.getElementById("folder");
const hint = document.getElementById("hint");
const no_button = document.getElementById("no-button");
const yes_button = document.getElementById("yes-button");
const banner = document.getElementById("banner");
const questionHeading = document.getElementById("question-heading");
const successMessage = document.getElementById("success-message");
const buttonsWrap = document.getElementsByClassName("buttons")[0];
const messageWrap = document.getElementsByClassName("message")[0];

const fx = document.getElementById("fx");

// ===== Folder open only when pressed =====
folder.addEventListener("click", (e) => {
  // don't open when clicking buttons/select
  if (e.target.closest(".buttons") || e.target.closest(".language-selector")) return;
  if (opened) return;
  opened = true;
  folder.classList.add("open");
  if (hint) hint.style.display = "none";
});

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

// ===== Ambient hearts (cute) =====
function spawnHeartFloat() {
  const h = document.createElement("div");
  h.className = "heart-float";
  const left = Math.random() * 100;
  const dur = 3.5 + Math.random() * 4.5;
  const size = 12 + Math.random() * 18;
  h.style.left = `${left}vw`;
  h.style.width = `${size}px`;
  h.style.height = `${size}px`;
  h.style.animationDuration = `${dur}s`;
  h.style.opacity = `${0.25 + Math.random() * 0.65}`;
  fx.appendChild(h);
  setTimeout(() => h.remove(), dur * 1000);
}
setInterval(spawnHeartFloat, 260);

// ===== YES overload =====
function sparkleBurst(count = 80) {
  for (let k = 0; k < count; k++) {
    const s = document.createElement("div");
    s.className = "spark";
    s.style.left = `${35 + Math.random() * 30}vw`;
    s.style.bottom = `${10 + Math.random() * 25}vh`;
    s.style.animationDuration = `${0.7 + Math.random() * 1.0}s`;
    fx.appendChild(s);
    setTimeout(() => s.remove(), 1800);
  }
}

function heartExplosion(count = 110) {
  for (let k = 0; k < count; k++) {
    setTimeout(() => {
      const h = document.createElement("div");
      h.className = "heart-float";
      h.style.left = `${25 + Math.random() * 50}vw`;
      h.style.bottom = `-30px`;
      h.style.width = `${16 + Math.random() * 22}px`;
      h.style.height = h.style.width;
      h.style.animationDuration = `${2.2 + Math.random() * 2.6}s`;
      h.style.opacity = `${0.35 + Math.random() * 0.55}`;
      fx.appendChild(h);
      setTimeout(() => h.remove(), 5200);
    }, k * 14);
  }
}

function confettiCannon(count = 260) {
  const colors = ["#ff2f97","#ff8bd4","#ffd1e8","#ffffff","#ff4b6b","#ffb3c8","#aee7ff"];
  for (let i = 0; i < count; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    const x = 10 + Math.random() * 80;
    const dur = 1.6 + Math.random() * 1.6;
    const w = 6 + Math.random() * 10;
    const h = 10 + Math.random() * 14;

    c.style.left = `${x}vw`;
    c.style.top = `-20px`;
    c.style.width = `${w}px`;
    c.style.height = `${h}px`;
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDuration = `${dur}s`;
    c.style.transform = `rotate(${Math.random() * 360}deg)`;

    fx.appendChild(c);
    setTimeout(() => c.remove(), 2600);
  }
}

function screenPulseAndShake() {
  const p = document.createElement("div");
  p.className = "pulse";
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 1400);

  document.body.classList.add("shake");
  setTimeout(() => document.body.classList.remove("shake"), 650);
}

// fireworks style bursts
function fireworkBursts(times = 6) {
  let t = 0;
  const interval = setInterval(() => {
    sparkleBurst(60);
    t++;
    if (t >= times) clearInterval(interval);
  }, 220);
}

// ===== EVENTS =====
no_button.addEventListener("click", () => {
  banner.src = "./public/images/yaalimadad.gif";
  refreshBanner();

  clicks++;

  // grow YES button
  const bumps = [0.14,0.12,0.10,0.16,0.18,0.11,0.15];
  yesScale = Math.min(4.2, yesScale + bumps[Math.floor(Math.random() * bumps.length)]);
  applyYesScale();

  // jelly pulse
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

  // OVERLOAD
  screenPulseAndShake();
  confettiCannon(320);
  sparkleBurst(120);
  fireworkBursts(7);
  heartExplosion(140);

  // also rain hearts fast for 2 seconds
  const rain = setInterval(() => spawnHeartFloat(), 60);
  setTimeout(() => clearInterval(rain), 2000);

  buttonsWrap.style.display = "none";
  messageWrap.style.display = "block";
  messageWrap.classList.remove("pop");
  void messageWrap.offsetWidth;
  messageWrap.classList.add("pop");
});

function changeLanguage() {
  const select = document.getElementById("language-select");
  language = (select.value === "arabic") ? "arabic" : "english";

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

// init
resetTexts();
