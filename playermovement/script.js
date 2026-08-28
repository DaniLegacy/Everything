import { Game } from "./game.js";

const player = document.getElementById("player");

// Track player variables
const playerObject = {
  x: 0,  
  y: 0,
  vx: 0,
  vy: 0,
};

const speed = Game.player_speed;
const deceleration = Game.deceleration;

// 1. Calculate the initial screen center safely once the DOM loads
function centerPlayerOnStartup() {
  playerObject.x = (window.innerWidth / 2) - (player.offsetWidth / 2);
  playerObject.y = (window.innerHeight / 2) - (player.offsetHeight / 2);

  // Instantly apply coordinates to prevent a visual jumping bug
  player.style.left = playerObject.x + "px";
  player.style.top = playerObject.y + "px";
}

if (document.readyState === "complete") {
  centerPlayerOnStartup();
} else {
  window.addEventListener("load", centerPlayerOnStartup);
}

// Keyboard input management
const keysPressed = {};

document.addEventListener("keydown", function (event) {
  keysPressed[event.key] = true;
});

document.addEventListener("keyup", function (event) {
  keysPressed[event.key] = false;
});

// Game Frame Loop (Runs at roughly 50 FPS)
setInterval(function () {
  // Input velocity additions
  if (keysPressed["ArrowRight"] || keysPressed["d"]) {
    playerObject.vx += speed;
  }
  if (keysPressed["ArrowLeft"] || keysPressed["a"]) {
    playerObject.vx -= speed;
  }
  if (keysPressed["ArrowUp"] || keysPressed["w"]) {
    playerObject.vy -= speed;
  }
  if (keysPressed["ArrowDown"] || keysPressed["s"]) {
    playerObject.vy += speed;
  }

  // Update physical coordinates via current velocity
  playerObject.x += playerObject.vx;
  playerObject.y += playerObject.vy;

  // 2. FIXED: Keeps the array intact using indexes [0] and [1]
  // Calculates the camera target by factoring in the screen dimensions and player sizes
  Game.camera_position[0] = playerObject.x - (window.innerWidth / 2) + (player.offsetWidth / 2);
  Game.camera_position[1] = playerObject.y - (window.innerHeight / 2) + (player.offsetHeight / 2);

  // 3. FIXED: Bound constraints lock the player within the window frame accurately 
  playerObject.x = Math.max(0, Math.min(playerObject.x, window.innerWidth - player.offsetWidth));
  playerObject.y = Math.max(0, Math.min(playerObject.y, window.innerHeight - player.offsetHeight));
  
  // Apply velocity dampening / friction simulation
  playerObject.vx *= deceleration;
  playerObject.vy *= deceleration;

  // Apply positions directly to the live CSS element tags
  player.style.left = playerObject.x + "px";
  player.style.top = playerObject.y + "px";
}, 20);
