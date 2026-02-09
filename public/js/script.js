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

let language = "english"; // default language

const no_button = document.getElementById("no-button");
const yes_button = document.getElementById("yes-button");

let i = 1;
let size = 50;
let clicks = 0;

no_button.addEventListener("click", () => {
  const banner = document.getElementById("banner");

  // NO gif always
  banner.src = "./public/images/yaalimadad.gif";
  refreshBanner();

  clicks++;

  // grow YES button
  const sizes = [40, 50, 30, 35, 45];
  size += sizes[Math.floor(Math.random() * sizes.length)];
  yes_button.style.height = `${size}px`;
  yes_button.style.width = `${size}px`;

  const total = answers_no[language].length;

  // change NO button text
  if (i < total - 1) {
    no_button.innerHTML = answers_no[language][i];
    i++;
  } else {
    alert(answers_no[language][i]);

    i = 1;
    clicks = 0;
    no_button.innerHTML = answers_no[language][0];

    yes_button.innerHTML = answers_yes[language];
    yes_button.style.height = "50px";
    yes_button.style.width = "50px";
    size = 50;
  }
});

yes_button.addEventListener("click", () => {
  const banner = document.getElementById("banner");

  // YES gif always
  banner.src = "./public/images/yes.gif";
  refreshBanner();

  // hide buttons
  document.getElementsByClassName("buttons")[0].style.display = "none";

  // show message
  document.getElementsByClassName("message")[0].style.display = "block";
});

function refreshBanner() {
  const banner = document.getElementById("banner");
  const src = banner.src;
  banner.src = "";
  banner.src = src;
}

function changeLanguage() {
  const selectElement = document.getElementById("language-select");
  language = selectElement.value; // english or arabic

  // update heading
  const questionHeading = document.getElementById("question-heading");
  if (language === "arabic") {
    questionHeading.textContent = "bedek tkoune my valentine ya 3omre?!";
  } else {
    questionHeading.textContent = "Will you be my valentine?!!";
  }

  // update buttons text
  yes_button.innerHTML = answers_yes[language];
  no_button.innerHTML = answers_no[language][0];

  // update success message
  const successMessage = document.getElementById("success-message");
  if (language === "arabic") {
    successMessage.textContent = "YAYYYYY YO2BORNE HAL JAMEL ANA";
  } else {
    successMessage.textContent = "YAYYYYY ur such a cutie mo- ahem layush!";
  }

  // reset everything so it works correctly
  i = 1;
  clicks = 0;
  size = 50;
  yes_button.style.height = "60px";
  yes_button.style.width = "60px";
}
yes_button.innerHTML = answers_yes[language];
no_button.innerHTML = answers_no[language][0];
