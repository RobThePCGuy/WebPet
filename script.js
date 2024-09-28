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
const randomizeBtn = document.querySelector("#action-randomize");

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

let wpet = new WebPet();
let sleepHpCount;
let hungerHpCount;
let playHpCount;
let score = 0;

// WebPet constructor
function WebPet() {
  this.sleep = maxSleep;
  this.hunger = maxHunger;
  this.play = maxPlay;
  this.sleepNotified = false;
  this.hungerNotified = false;
  this.playNotified = false;
  this.originalAppearance = {};
}

// Abilities
WebPet.prototype.actionSleep = function () {
  this.sleep += 50;
  this.play -= 20;
  this.hunger -= 30;
  this.normalizeStats();
};

WebPet.prototype.actionEat = function () {
  this.hunger += 50;
  this.sleep -= 20;
  this.play -= 30;
  this.normalizeStats();
};

WebPet.prototype.actionPlay = function () {
  this.play += 50;
  this.sleep -= 20;
  this.hunger -= 30;
  this.normalizeStats();
};

WebPet.prototype.normalizeStats = function () {
  // Ensure stats do not exceed maximum values
  if (this.sleep > maxSleep) this.sleep = maxSleep;
  if (this.hunger > maxHunger) this.hunger = maxHunger;
  if (this.play > maxPlay) this.play = maxPlay;

  // Ensure stats do not fall below zero
  if (this.sleep < 0) this.sleep = 0;
  if (this.hunger < 0) this.hunger = 0;
  if (this.play < 0) this.play = 0;
};

WebPet.prototype.tick = function () {
  this.sleep -= 1;
  this.hunger -= 2;
  this.play -= 1;

  // Ensure stats do not fall below zero
  if (this.sleep < 0) this.sleep = 0;
  if (this.hunger < 0) this.hunger = 0;
  if (this.play < 0) this.play = 0;
};

// Event listeners
sleepBtn.addEventListener("click", function () {
  wpet.actionSleep();
});

feedBtn.addEventListener("click", function () {
  wpet.actionEat();
});

playBtn.addEventListener("click", function () {
  wpet.actionPlay();
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

// Event listener for the Randomize button
randomizeBtn.addEventListener("click", function () {
  randomizeCreature();
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
    sleep: wpet.sleep,
    hunger: wpet.hunger,
    play: wpet.play,
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
    originalAppearance: wpet.originalAppearance,
    sleepNotified: wpet.sleepNotified,
    hungerNotified: wpet.hungerNotified,
    playNotified: wpet.playNotified,
    // Save styles
    styles: {
      handLeft: handLeft.style.cssText,
      handRight: handRight.style.cssText,
      eyeLeft: eyeLeft.style.cssText,
      eyeRight: eyeRight.style.cssText,
      mouth: mouth.style.cssText
    },
    // Save classes
    classes: {
      handLeft: handLeft.className,
      handRight: handRight.className,
      eyeLeft: eyeLeft.className,
      eyeRight: eyeRight.className,
      mouth: mouth.className
    }
  };
  localStorage.setItem("webpetGameState", JSON.stringify(gameState));
}

function loadSavedGame() {
  var gameState = JSON.parse(localStorage.getItem("webpetGameState"));

  // Reinitialize the WebPet object
  wpet = new WebPet();

  // Restore WebPet stats
  wpet.sleep = gameState.sleep;
  wpet.hunger = gameState.hunger;
  wpet.play = gameState.play;
  wpet.sleepNotified = gameState.sleepNotified;
  wpet.hungerNotified = gameState.hungerNotified;
  wpet.playNotified = gameState.playNotified;
  wpet.originalAppearance = gameState.originalAppearance;

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

  // Restore styles
  handLeft.style.cssText = gameState.styles.handLeft;
  handRight.style.cssText = gameState.styles.handRight;
  eyeLeft.style.cssText = gameState.styles.eyeLeft;
  eyeRight.style.cssText = gameState.styles.eyeRight;
  mouth.style.cssText = gameState.styles.mouth;

  // Restore classes
  handLeft.className = gameState.classes.handLeft;
  handRight.className = gameState.classes.handRight;
  eyeLeft.className = gameState.classes.eyeLeft;
  eyeRight.className = gameState.classes.eyeRight;
  mouth.className = gameState.classes.mouth;

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
    mouth.innerHTML = wpet.originalAppearance.mouth;
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
    eyeLeft.innerHTML = wpet.originalAppearance.eyeLeft;
    eyeRight.innerHTML = wpet.originalAppearance.eyeRight;
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
    handLeft.innerHTML = wpet.originalAppearance.handLeft;
    handRight.innerHTML = wpet.originalAppearance.handRight;
    effectLeft.innerHTML = wpet.originalAppearance.effectLeft;
    effectRight.innerHTML = wpet.originalAppearance.effectRight;
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
  wpet = new WebPet();
  score = 0;

  // Check if the name is a rare pet key
  if (rarePets[webpetName]) {
    // Load the rare pet appearance
    const appearanceData = rarePets[webpetName];
    applyAppearanceData(appearanceData);
    showNotification("You've unlocked a rare pet!");
  } else {
    // Randomly assign appearance values
    var possibleEyes = ["＾", "・", "●", "◡", "×", "T_T", "´", "`"];
    var possibleMouths = ["▿", "_", "O", "o", "-", "0", ".", "v", "w"];
    var possibleHands = ["◝", "◜", "╭", "╮", "/", "\\", " "];
    var possibleEffects = ["°˖✧", "˖✧", "✧˖", "✧", "*", "", " "];

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
    wpet.originalAppearance = {
      eyeLeft: eyeLeft.innerHTML,
      eyeRight: eyeRight.innerHTML,
      mouth: mouth.innerHTML,
      handLeft: handLeft.innerHTML,
      handRight: handRight.innerHTML,
      effectLeft: effectLeft.innerHTML,
      effectRight: effectRight.innerHTML
    };

    // Randomize creature's styles
    randomizeCreature();
  }

  // Clear any existing intervals
  clearInterval(coreUpdate);

  // Start game
  core();
  coreUpdate = setInterval(core, 100 * day);
}

// Main game loop
function core() {
  sleepHpCount = ((wpet.sleep / maxSleep) * 100).toFixed(2);
  hungerHpCount = ((wpet.hunger / maxHunger) * 100).toFixed(2);
  playHpCount = ((wpet.play / maxPlay) * 100).toFixed(2);

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
    wpet = new WebPet();
    return;
  }

  // Limit max stats
  if (wpet.sleep > maxSleep * 1.2) {
    wpet.sleep = maxSleep * 1.2;
  }

  if (wpet.hunger > maxHunger * 1.2) {
    wpet.hunger = maxHunger * 1.2;
  }

  if (wpet.play > maxPlay * 1.2) {
    wpet.play = maxPlay * 1.2;
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
  wpet.tick();

  // Adjust appearance based on stats
  adjustAppearance();

  // Check for low stats and notify
  if (sleepHpCount < 20 && !wpet.sleepNotified) {
    showNotification("Your WebPet is very sleepy!");
    wpet.sleepNotified = true;
  }
  if (hungerHpCount < 20 && !wpet.hungerNotified) {
    showNotification("Your WebPet is very hungry!");
    wpet.hungerNotified = true;
  }
  if (playHpCount < 20 && !wpet.playNotified) {
    showNotification("Your WebPet needs to play!");
    wpet.playNotified = true;
  }

  // Reset notifications when stats are improved
  if (sleepHpCount >= 20) {
    wpet.sleepNotified = false;
  }
  if (hungerHpCount >= 20) {
    wpet.hungerNotified = false;
  }
  if (playHpCount >= 20) {
    wpet.playNotified = false;
  }

  // Save the game state
  saveGame();
}

// Randomize creature's styles
function randomizeCreature() {
  // Get all body parts
  const bodyParts = {
    handLeft: handLeft,
    handRight: handRight,
    eyeLeft: eyeLeft,
    eyeRight: eyeRight,
    mouth: mouth
  };

  // Function to get random size within limits
  function getRandomSize(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2) + "em";
  }

  // Function to get random color within limits
  function getRandomColor() {
    const letters = "3456789ABCDEF"; // Avoid very light colors
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }

  // Function to get random position (offset) within limits
  function getRandomPosition(maxOffset) {
    return (Math.random() * maxOffset - maxOffset / 2).toFixed(2) + "px";
  }

  // Apply random styles to each body part
  for (const part in bodyParts) {
    const bodyPart = bodyParts[part];

    if (bodyPart) {
      // Randomize size (between 0.8em and 1.5em)
      const randomSize = getRandomSize(0.8, 1.5);
      bodyPart.style.fontSize = randomSize;

      // Randomize color
      bodyPart.style.color = getRandomColor();

      // Randomize position (shift by up to 10px in any direction)
      bodyPart.style.position = "relative";
      bodyPart.style.top = getRandomPosition(10);
      bodyPart.style.left = getRandomPosition(10);

      // Randomly decide to add animation
      if (Math.random() > 0.5) {
        bodyPart.classList.add("animate");
      } else {
        bodyPart.classList.remove("animate");
      }
    }
  }
}

// Define rare keys and their corresponding appearances
const rarePets = {
  "LABRACHU_KEY": {
    eyeLeft: "⚡",
    eyeRight: "⚡",
    mouth: "ω",
    handLeft: "ʕ",
    handRight: "ʔ",
    effectLeft: "🔬",
    effectRight: "⚗️",
    styles: {
      handLeft: "font-size: 1.2em; color: #6A0DAD;",
      handRight: "font-size: 1.2em; color: #6A0DAD;",
      eyeLeft: "font-size: 1.0em; color: #FFD700;",
      eyeRight: "font-size: 1.0em; color: #FFD700;",
      mouth: "font-size: 1.0em; color: #FF4500;"
    },
    classes: {
      handLeft: "animate",
      handRight: "animate",
      eyeLeft: "animate",
      eyeRight: "animate",
      mouth: "animate"
    }
  },
  "PHOENIX_KEY": {
    eyeLeft: "🔥",
    eyeRight: "🔥",
    mouth: "Δ",
    handLeft: "λ",
    handRight: "λ",
    effectLeft: "✨",
    effectRight: "✨",
    styles: {
      handLeft: "font-size: 1.1em; color: #FF4500;",
      handRight: "font-size: 1.1em; color: #FF4500;",
      eyeLeft: "font-size: 1.0em; color: #FF8C00;",
      eyeRight: "font-size: 1.0em; color: #FF8C00;",
      mouth: "font-size: 1.0em; color: #FFD700;"
    },
    classes: {
      handLeft: "",
      handRight: "",
      eyeLeft: "animate",
      eyeRight: "animate",
      mouth: ""
    }
  }
  // Add more rare pets as needed
};

// Helper function to apply appearance data
function applyAppearanceData(appearanceData) {
  // Restore appearance
  eyeLeft.innerHTML = appearanceData.eyeLeft;
  eyeRight.innerHTML = appearanceData.eyeRight;
  mouth.innerHTML = appearanceData.mouth;
  handLeft.innerHTML = appearanceData.handLeft;
  handRight.innerHTML = appearanceData.handRight;
  effectLeft.innerHTML = appearanceData.effectLeft;
  effectRight.innerHTML = appearanceData.effectRight;

  // Restore styles
  handLeft.style.cssText = appearanceData.styles.handLeft;
  handRight.style.cssText = appearanceData.styles.handRight;
  eyeLeft.style.cssText = appearanceData.styles.eyeLeft;
  eyeRight.style.cssText = appearanceData.styles.eyeRight;
  mouth.style.cssText = appearanceData.styles.mouth;

  // Restore classes
  handLeft.className = appearanceData.classes.handLeft;
  handRight.className = appearanceData.classes.handRight;
  eyeLeft.className = appearanceData.classes.eyeLeft;
  eyeRight.className = appearanceData.classes.eyeRight;
  mouth.className = appearanceData.classes.mouth;

  // Update the original appearance
  wpet.originalAppearance = {
    eyeLeft: appearanceData.eyeLeft,
    eyeRight: appearanceData.eyeRight,
    mouth: appearanceData.mouth,
    handLeft: appearanceData.handLeft,
    handRight: appearanceData.handRight,
    effectLeft: appearanceData.effectLeft,
    effectRight: appearanceData.effectRight
  };
}
