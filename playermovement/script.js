import { Game } from "./game.js";

const player = document.getElementById("player");

// Define hardcoded dimensions matching your CSS file exactly
const PLAYER_WIDTH = 30;
const PLAYER_HEIGHT = 30;

// Track player variables
const playerObject = {
  x: 0,  
  y: 0,
  vx: 0,
  vy: 0,
};

const speed = Game.player_speed;
const deceleration = Game.deceleration;

// 1. Fixed: Uses explicit fallback constants to avoid the 0px offset loading bug
function centerPlayerOnStartup() {
  playerObject.x = (window.innerWidth / 2) - (PLAYER_WIDTH / 2);
  playerObject.y = (window.innerHeight / 2) - (PLAYER_HEIGHT / 2);

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

  // 2. Camera tracking update using fixed dimensions
  Game.camera_position[0] = playerObject.x - (window.innerWidth / 2) + (PLAYER_WIDTH / 2);
  Game.camera_position[1] = playerObject.y - (window.innerHeight / 2) + (PLAYER_HEIGHT / 2);

  // 3. Fixed: Clamping works correctly now because constants are never 0
  playerObject.x = Math.max(0, Math.min(playerObject.x, window.innerWidth - PLAYER_WIDTH));
  playerObject.y = Math.max(0, Math.min(playerObject.y, window.innerHeight - PLAYER_HEIGHT));
  
  // Apply velocity dampening / friction simulation
  playerObject.vx *= deceleration;
  playerObject.vy *= deceleration;

  // Apply positions directly to the live CSS element tags
  player.style.left = playerObject.x + "px";
  player.style.top = playerObject.y + "px";
}, 20);
