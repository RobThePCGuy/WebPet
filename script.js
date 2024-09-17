// Constants for buttons
const sleepBtn = document.querySelector("#action-sleep");
const feedBtn = document.querySelector("#action-feed");
const playBtn = document.querySelector("#action-play");
const startBtn = document.querySelector("#action-menu-start-game");
const settingsBtn = document.querySelector("#action-menu-settings");
const settingsBackBtn = document.querySelector("#action-settings-back");
const difHardBtn = document.querySelector("#action-settings-difficulty-hard");
const difNormalBtn = document.querySelector(
  "#action-settings-difficulty-normal"
);
const difEasyBtn = document.querySelector("#action-settings-difficulty-easy");
const nightModeOffBtn = document.querySelector("#nightmode-off");
const nightModeOnBtn = document.querySelector("#nightmode-on");

// Constants for the new buttons
const saveBtn = document.querySelector("#action-save");
const loadBtn = document.querySelector("#action-load");

// Constants for main bar
const sleepHp = document.querySelector("#sleep-hp");
const hungerHp = document.querySelector("#hunger-hp");
const playHp = document.querySelector("#play-hp");
const scoreBar = document.querySelector("#score");

// Constants for body
const effectLeft = document.querySelector("#effect-left");
const effectRight = document.querySelector("#effect-right");
const handLeft = document.querySelector("#hand-left");
const handRight = document.querySelector("#hand-right");
const eyeLeft = document.querySelector("#eye-left");
const eyeRight = document.querySelector("#eye-right");
const mouth = document.querySelector("#mouth");

// Game settings
const maxSleep = 300;
const maxHunger = 300;
const maxPlay = 300;

// Game speed
let day = 20;

var coreUpdate;
var webpetName;

// New object
function WebPet() {
  this.sleep = maxSleep;
  this.hunger = maxHunger;
  this.play = maxPlay;
  this.sleepNotified = false;
  this.hungerNotified = false;
  this.playNotified = false;
  this.originalAppearance = {}; // We'll set this later
}

// Abilities
WebPet.prototype.actionSleep = function () {
  this.sleep += 40 / (day * 2);
};

WebPet.prototype.actionEat = function () {
  this.hunger += 120 / (day * 2);
};

WebPet.prototype.actionPlay = function () {
  this.play += 80 / (day * 2);
};

WebPet.prototype.tick = function () {
  this.sleep--;
  this.hunger -= 3;
  this.play -= 2;
};

let tmgch = new WebPet();
let sleepHpCount;
let hungerHpCount;
let playHpCount;
let score = 0;

// Controllers
sleepBtn.addEventListener("click", function () {
  tmgch.actionSleep();
});

feedBtn.addEventListener("click", function () {
  tmgch.actionEat();
});

playBtn.addEventListener("click", function () {
  tmgch.actionPlay();
});

startBtn.addEventListener("click", function () {
  startGame();
});

settingsBtn.addEventListener("click", function () {
  settingsMenu();
});

difHardBtn.addEventListener("click", function () {
  day = 5;
  document.querySelector("#difSet").innerHTML = "Hard";
});

difNormalBtn.addEventListener("click", function () {
  day = 20;
  document.querySelector("#difSet").innerHTML = "Normal";
});

difEasyBtn.addEventListener("click", function () {
  day = 40;
  document.querySelector("#difSet").innerHTML = "Easy";
});

settingsBackBtn.addEventListener("click", function () {
  MainMenu();
});

nightModeOffBtn.addEventListener("click", function () {
  nightModeOff();
});

nightModeOnBtn.addEventListener("click", function () {
  nightModeOn();
});

// Event listeners for Save and Load buttons
saveBtn.addEventListener("click", function () {
  saveGameNotification();
});

loadBtn.addEventListener("click", function () {
  loadGameNotification();
});

// NightMode toggle
function nightModeOn() {
  document.querySelector("body").classList.add("nightmode-on");
  document.querySelector("#nightmode").innerHTML = "on";
}

function nightModeOff() {
  document.querySelector("body").classList.remove("nightmode-on");
  document.querySelector("#nightmode").innerHTML = "off";
}

// Togglers for screens
document.querySelector(".game-screen").classList.add("hide");
document.querySelector(".menu-screen-settings").classList.add("hide");

function MainMenu() {
  document.querySelector(".menu-screen-settings").classList.add("hide");
  document.querySelector(".main-menu-screen").classList.remove("hide");
}

function settingsMenu() {
  document.querySelector(".main-menu-screen").classList.add("hide");
  document.querySelector(".menu-screen-settings").classList.remove("hide");
}

// Save and Load functions
function saveGame() {
  var gameState = {
    sleep: tmgch.sleep,
    hunger: tmgch.hunger,
    play: tmgch.play,
    score: score,
    day: day,
    name: webpetName,
    eyeLeft: eyeLeft.innerHTML,
    eyeRight: eyeRight.innerHTML,
    mouth: mouth.innerHTML,
    handLeft: handLeft.innerHTML,
    handRight: handRight.innerHTML,
    effectLeft: effectLeft.innerHTML,
    effectRight: effectRight.innerHTML,
    originalAppearance: tmgch.originalAppearance,
    sleepNotified: tmgch.sleepNotified,
    hungerNotified: tmgch.hungerNotified,
    playNotified: tmgch.playNotified
  };
  localStorage.setItem("webpetGameState", JSON.stringify(gameState));
}

function loadSavedGame() {
  var gameState = JSON.parse(localStorage.getItem("webpetGameState"));

  // Reinitialize the WebPet object
  tmgch = new WebPet();

  // Restore WebPet stats
  tmgch.sleep = gameState.sleep;
  tmgch.hunger = gameState.hunger;
  tmgch.play = gameState.play;
  tmgch.sleepNotified = gameState.sleepNotified;
  tmgch.hungerNotified = gameState.hungerNotified;
  tmgch.playNotified = gameState.playNotified;
  tmgch.originalAppearance = gameState.originalAppearance;

  score = gameState.score;
  day = gameState.day;
  webpetName = gameState.name;
  document.querySelector("#name").innerHTML = webpetName;

  // Restore the creature's appearance
  eyeLeft.innerHTML = gameState.eyeLeft;
  eyeRight.innerHTML = gameState.eyeRight;
  mouth.innerHTML = gameState.mouth;
  handLeft.innerHTML = gameState.handLeft;
  handRight.innerHTML = gameState.handRight;
  effectLeft.innerHTML = gameState.effectLeft;
  effectRight.innerHTML = gameState.effectRight;

  // Clear any existing intervals
  clearInterval(coreUpdate);

  // Start the game loop
  core();
  coreUpdate = setInterval(core, 100 * day);

  // Switch to the game screen if not already there
  document.querySelector(".game-screen").classList.remove("hide");
  document.querySelector(".main-menu-screen").classList.add("hide");
}

// Notification functions
function saveGameNotification() {
  saveGame();
  showNotification("Game saved successfully!");
}

function loadGameNotification() {
  var savedGameState = localStorage.getItem("webpetGameState");
  if (savedGameState) {
    var loadGame = confirm("Do you want to load the saved game?");
    if (loadGame) {
      loadSavedGame();
      showNotification("Game loaded successfully!");
    }
  } else {
    alert("No saved game found.");
  }
}

// Show notification
function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.innerText = message;
  notification.classList.add("show");

  // Hide after 3 seconds
  setTimeout(function () {
    notification.classList.remove("show");
  }, 3000);
}

// Adjust appearance based on stats
function adjustAppearance() {
  // Hunger affects the mouth
  if (hungerHpCount < 20) {
    mouth.innerHTML = "_";
  } else if (hungerHpCount < 40) {
    mouth.innerHTML = "o";
  } else if (hungerHpCount < 60) {
    mouth.innerHTML = "O";
  } else if (hungerHpCount < 80) {
    mouth.innerHTML = "-";
  } else {
    // Revert to original mouth
    mouth.innerHTML = tmgch.originalAppearance.mouth;
  }

  // Sleep affects the eyes
  if (sleepHpCount < 20) {
    eyeLeft.innerHTML = "×";
    eyeRight.innerHTML = "×";
  } else if (sleepHpCount < 40) {
    eyeLeft.innerHTML = "◡";
    eyeRight.innerHTML = "◡";
  } else if (sleepHpCount < 60) {
    eyeLeft.innerHTML = "`";
    eyeRight.innerHTML = "`";
  } else if (sleepHpCount < 80) {
    eyeLeft.innerHTML = "・";
    eyeRight.innerHTML = "・";
  } else {
    // Revert to original eyes
    eyeLeft.innerHTML = tmgch.originalAppearance.eyeLeft;
    eyeRight.innerHTML = tmgch.originalAppearance.eyeRight;
  }

  // Play affects the hands and effects
  if (playHpCount < 20) {
    handLeft.innerHTML = "╭";
    handRight.innerHTML = "╮";
    effectLeft.innerHTML = "";
    effectRight.innerHTML = "";
  } else if (playHpCount < 40) {
    handLeft.innerHTML = "";
    handRight.innerHTML = "";
    effectLeft.innerHTML = "";
    effectRight.innerHTML = "*";
  } else if (playHpCount < 60) {
    handLeft.innerHTML = "╮";
    handRight.innerHTML = "╭";
    effectLeft.innerHTML = "";
    effectRight.innerHTML = "";
  } else if (playHpCount < 80) {
    handLeft.innerHTML = "╮";
    handRight.innerHTML = "╭";
    effectLeft.innerHTML = "✧";
    effectRight.innerHTML = "✧";
  } else {
    // Revert to original hands and effects
    handLeft.innerHTML = tmgch.originalAppearance.handLeft;
    handRight.innerHTML = tmgch.originalAppearance.handRight;
    effectLeft.innerHTML = tmgch.originalAppearance.effectLeft;
    effectRight.innerHTML = tmgch.originalAppearance.effectRight;
  }
}

function startGame() {
  document.querySelector(".game-screen").classList.remove("hide");
  document.querySelector(".main-menu-screen").classList.add("hide");

  // Check for saved game
  var savedGameState = localStorage.getItem("webpetGameState");
  if (savedGameState) {
    var loadGame = confirm("A saved game was found. Do you want to load it?");
    if (loadGame) {
      loadSavedGame();
      return;
    } else {
      // Clear saved game
      localStorage.removeItem("webpetGameState");
    }
  }

  // WebPet's name
  webpetName = prompt("Please, enter a name for your WebPet:", "");
  if (webpetName == null || webpetName.trim() == "") {
    webpetName = "WebPet";
  }
  document.querySelector("#name").innerHTML = webpetName;

  // Reset WebPet stats
  tmgch = new WebPet();
  score = 0;

  // Arrays of possible appearance values
  var possibleEyes = ["＾", "・", "●", "◡", "×", "T_T", "´", "`"];
  var possibleMouths = ["▿", "_", "O", "o", "-", "0", ".", "v", "w"];
  var possibleHands = ["◝", "◜", "╭", "╮", "/", "\\", " "];
  var possibleEffects = ["°˖✧", "˖✧", "✧˖", "✧", "*", "", " "];

  // Randomly assign appearance values
  eyeLeft.innerHTML =
    possibleEyes[Math.floor(Math.random() * possibleEyes.length)];
  eyeRight.innerHTML =
    possibleEyes[Math.floor(Math.random() * possibleEyes.length)];
  mouth.innerHTML =
    possibleMouths[Math.floor(Math.random() * possibleMouths.length)];
  handLeft.innerHTML =
    possibleHands[Math.floor(Math.random() * possibleHands.length)];
  handRight.innerHTML =
    possibleHands[Math.floor(Math.random() * possibleHands.length)];
  effectLeft.innerHTML =
    possibleEffects[Math.floor(Math.random() * possibleEffects.length)];
  effectRight.innerHTML =
    possibleEffects[Math.floor(Math.random() * possibleEffects.length)];

  // Store original appearance
  tmgch.originalAppearance = {
    eyeLeft: eyeLeft.innerHTML,
    eyeRight: eyeRight.innerHTML,
    mouth: mouth.innerHTML,
    handLeft: handLeft.innerHTML,
    handRight: handRight.innerHTML,
    effectLeft: effectLeft.innerHTML,
    effectRight: effectRight.innerHTML
  };

  // Clear any existing intervals
  clearInterval(coreUpdate);

  // Start game
  core();
  coreUpdate = setInterval(core, 100 * day);
}

// Main game loop
function core() {
  sleepHpCount = ((tmgch.sleep / maxSleep) * 100).toFixed(2);
  hungerHpCount = ((tmgch.hunger / maxHunger) * 100).toFixed(2);
  playHpCount = ((tmgch.play / maxPlay) * 100).toFixed(2);

  // Update scores
  score++;
  scoreBar.innerHTML = score;

  // Death condition
  if (playHpCount <= 0 || sleepHpCount <= 0 || hungerHpCount <= 0) {
    playHpCount = 0;
    sleepHpCount = 0;
    hungerHpCount = 0;
    clearInterval(coreUpdate);
    alert("Your score: " + score + "\n ╭(×_×)╮");

    // Clear the saved game
    localStorage.removeItem("webpetGameState");

    // Return to main menu
    document.querySelector(".game-screen").classList.add("hide");
    document.querySelector(".main-menu-screen").classList.remove("hide");

    // Reset WebPet object
    tmgch = new WebPet();
    return;
  }

  // Limit max stats
  if (tmgch.sleep > maxSleep * 1.2) {
    tmgch.sleep = maxSleep * 1.2;
  }

  if (tmgch.hunger > maxHunger * 1.2) {
    tmgch.hunger = maxHunger * 1.2;
  }

  if (tmgch.play > maxPlay * 1.2) {
    tmgch.play = maxPlay * 1.2;
  }

  // Limit display stats to 100%
  if (sleepHpCount > 100) {
    sleepHpCount = 100;
  }
  if (hungerHpCount > 100) {
    hungerHpCount = 100;
  }
  if (playHpCount > 100) {
    playHpCount = 100;
  }

  // Show HP on screen
  sleepHp.innerHTML = sleepHpCount;
  hungerHp.innerHTML = hungerHpCount;
  playHp.innerHTML = playHpCount;

  // Remove HP every tick
  tmgch.tick();

  // Adjust appearance based on stats
  adjustAppearance();

  // Check for low stats and notify
  if (sleepHpCount < 20 && !tmgch.sleepNotified) {
    showNotification("Your WebPet is very sleepy!");
    tmgch.sleepNotified = true; // Prevent repeated notifications
  }
  if (hungerHpCount < 20 && !tmgch.hungerNotified) {
    showNotification("Your WebPet is very hungry!");
    tmgch.hungerNotified = true;
  }
  if (playHpCount < 20 && !tmgch.playNotified) {
    showNotification("Your WebPet needs to play!");
    tmgch.playNotified = true;
  }

  // Reset notifications when stats are improved
  if (sleepHpCount >= 20) {
    tmgch.sleepNotified = false;
  }
  if (hungerHpCount >= 20) {
    tmgch.hungerNotified = false;
  }
  if (playHpCount >= 20) {
    tmgch.playNotified = false;
  }

  // Save the game state
  saveGame();
}
