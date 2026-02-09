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
let yesScale = 1; // we scale instead of changing width/height

// ===== ELEMENTS =====
const no_button = document.getElementById("no-button");
const yes_button = document.getElementById("yes-button");
const banner = document.getElementById("banner");
const questionHeading = document.getElementById("question-heading");
const successMessage = document.getElementById("success-message");
const buttonsWrap = document.getElementsByClassName("buttons")[0];
const messageWrap = document.getElementsByClassName("message")[0];

// ===== HEARTS LAYER =====
function ensureHeartsLayer() {
  if (!document.getElementById("hearts-layer")) {
    const layer = document.createElement("div");
    layer.id = "hearts-layer";
    document.body.appendChild(layer);
  }
}
ensureHeartsLayer();

function spawnHeart(opts = {}) {
  const layer = document.getElementById("hearts-layer");
  if (!layer) return;

  const heart = document.createElement("div");
  heart.className = "heart";

  const left = opts.left ?? (Math.random() * 100);
  const dur = opts.dur ?? (4 + Math.random() * 5); // 4-9s
  const s = opts.size ?? (10 + Math.random() * 16); // 10-26px
  const alpha = 0.30 + Math.random() * 0.45;

  heart.style.left = `${left}vw`;
  heart.style.width = `${s}px`;
  heart.style.height = `${s}px`;
  heart.style.animationDuration = `${dur}s`;
  heart.style.opacity = `${alpha}`;

  layer.appendChild(heart);
  setTimeout(() => heart.remove(), dur * 1000);
}

// ambient hearts
setInterval(() => spawnHeart(), 420);

function burstHearts() {
  // quick burst near center
  for (let k = 0; k < 26; k++) {
    setTimeout(() => spawnHeart({ left: 35 + Math.random() * 30, dur: 3 + Math.random() * 3 }), k * 40);
  }
}

// sparkles burst
function sparkleBurst() {
  const layer = document.getElementById("hearts-layer");
  if (!layer) return;
  for (let k = 0; k < 18; k++) {
    const s = document.createElement("div");
    s.className = "spark";
    s.style.left = `${45 + Math.random() * 10}vw`;
    s.style.bottom = `${18 + Math.random() * 12}vh`;
    s.style.animationDuration = `${0.9 + Math.random() * 0.8}s`;
    layer.appendChild(s);
    setTimeout(() => s.remove(), 1800);
  }
}

// ===== HELPERS =====
function refreshBanner() {
  const src = banner.src;
  banner.src = "";
  banner.src = src;
}

function applyYesScale() {
  yes_button.style.transform = `scale(${yesScale})`;
}

function resetYesScale() {
  yesScale = 1;
  applyYesScale();
}

function resetTexts() {
  questionHeading.innerHTML = heading_text[language] || heading_text.english;

  yes_button.innerHTML = answers_yes[language] || answers_yes.english;
  no_button.innerHTML = answers_no[language]?.[0] || answers_no.english[0];

  successMessage.textContent = success_text[language] || success_text.english;

  i = 1;
  clicks = 0;
  resetYesScale();

  // Arabic: slightly bigger base via CSS class
  document.body.classList.toggle("lang-ar", language === "arabic");
}

// ===== EVENTS =====
no_button.addEventListener("click", () => {
  // NO gif
  banner.src = "./public/images/yaalimadad.gif";
  refreshBanner();

  clicks++;

  // grow YES button using scale (doesn't break layout)
  const bumps = [0.10, 0.12, 0.08, 0.14, 0.11];
  yesScale = Math.min(3.2, yesScale + bumps[Math.floor(Math.random() * bumps.length)]);
  applyYesScale();
  yes_button.classList.remove("bounce");
  void yes_button.offsetWidth; // reflow to replay animation
  yes_button.classList.add("bounce");

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
  // YES gif
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
  const val = selectElement.value;

  language = (val === "arabic") ? "arabic" : "english";

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

// ===== INITIAL LOAD =====
resetTexts();
