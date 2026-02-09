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

  // Lebanese Arabizi
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
let size = 50;
let clicks = 0;

// ===== ELEMENTS =====
const no_button = document.getElementById("no-button");
const yes_button = document.getElementById("yes-button");
const banner = document.getElementById("banner");
const questionHeading = document.getElementById("question-heading");
const successMessage = document.getElementById("success-message");

// ===== HEARTS LAYER =====
function ensureHeartsLayer() {
  if (!document.getElementById("hearts-layer")) {
    const layer = document.createElement("div");
    layer.id = "hearts-layer";
    document.body.appendChild(layer);
  }
}
ensureHeartsLayer();

function spawnHeart() {
  const layer = document.getElementById("hearts-layer");
  if (!layer) return;

  const heart = document.createElement("div");
  heart.className = "heart";

  const left = Math.random() * 100;
  const dur = 4 + Math.random() * 4;      // 4-8s
  const s = 10 + Math.random() * 14;      // 10-24px
  const alpha = 0.35 + Math.random() * 0.35;

  heart.style.left = `${left}vw`;
  heart.style.width = `${s}px`;
  heart.style.height = `${s}px`;
  heart.style.animationDuration = `${dur}s`;
  heart.style.background = `rgba(255, 90, 165, ${alpha})`;

  layer.appendChild(heart);
  setTimeout(() => heart.remove(), dur * 1000);
}

// background hearts
setInterval(spawnHeart, 550);

function burstHearts() {
  for (let k = 0; k < 18; k++) setTimeout(spawnHeart, k * 60);
}

// ===== HELPERS =====
function refreshBanner() {
  const src = banner.src;
  banner.src = "";
  banner.src = src;
}

function setYesBaseSize() {
  // Arabic: a bit bigger
  if (language === "arabic") {
    size = 70;
    yes_button.style.height = "70px";
    yes_button.style.width = "120px";
  } else {
    size = 50;
    yes_button.style.height = "50px";
    yes_button.style.width = "50px";
  }
}

function resetTexts() {
  // heading uses innerHTML to allow gradient span
  questionHeading.innerHTML = heading_text[language] || heading_text.english;

  yes_button.innerHTML = answers_yes[language] || answers_yes.english;
  no_button.innerHTML = answers_no[language]?.[0] || answers_no.english[0];

  successMessage.textContent = success_text[language] || success_text.english;

  i = 1;
  clicks = 0;
  setYesBaseSize();
}

// ===== EVENTS =====
no_button.addEventListener("click", () => {
  // NO gif always
  banner.src = "./public/images/yaalimadad.gif";
  refreshBanner();

  clicks++;

  // grow YES button gradually
  const sizes = [40, 50, 30, 35, 45];
  size += sizes[Math.floor(Math.random() * sizes.length)];
  yes_button.style.height = `${size}px`;
  yes_button.style.width = `${size}px`;

  const total = answers_no[language].length;

  // change NO text
  if (i < total - 1) {
    no_button.innerHTML = answers_no[language][i];
    i++;
  } else {
    alert(answers_no[language][i]);
    resetTexts();
  }
});

yes_button.addEventListener("click", () => {
  // YES gif always
  banner.src = "./public/images/yes.gif";
  refreshBanner();

  burstHearts();

  // hide buttons, show message
  document.getElementsByClassName("buttons")[0].style.display = "none";
  document.getElementsByClassName("message")[0].style.display = "block";
});

function changeLanguage() {
  const selectElement = document.getElementById("language-select");
  const val = selectElement.value;

  // lock to keys we have
  language = (val === "arabic") ? "arabic" : "english";

  // if success already shown, keep it shown
  const buttons = document.getElementsByClassName("buttons")[0];
  const message = document.getElementsByClassName("message")[0];
  const wasSuccess = (message.style.display === "block");

  resetTexts();

  if (wasSuccess) {
    buttons.style.display = "none";
    message.style.display = "block";
  }
}

// ===== INITIAL LOAD =====
resetTexts();
