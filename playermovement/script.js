import { Game } from "./game.js";

const player = document.getElementById("player");

// Define game constants from your CSS bounds
const ARENA_WIDTH = 500;
const ARENA_HEIGHT = 400;
const PLAYER_WIDTH = 30;
const PLAYER_HEIGHT = 30;

// Track player properties
const playerObject = {
  x: 0,  
  y: 0,
  vx: 0,
  vy: 0,
};

const speed = Game.player_speed;
const deceleration = Game.deceleration;

// 1. FIXED: Center the player within the 500x400 #gameArea container
function centerPlayerOnStartup() {
  playerObject.x = (ARENA_WIDTH / 2) - (PLAYER_WIDTH / 2);
  playerObject.y = (ARENA_HEIGHT / 2) - (PLAYER_HEIGHT / 2);

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

  // 2. FIXED: Keep camera center calculation aligned with your arena box dimensions
  Game.camera_position[0] = playerObject.x - (ARENA_WIDTH / 2) + (PLAYER_WIDTH / 2);
  Game.camera_position[1] = playerObject.y - (ARENA_HEIGHT / 2) + (PLAYER_HEIGHT / 2);

  // 3. FIXED: Clamp the player precisely inside the 500x400 game boundaries
  playerObject.x = Math.max(0, Math.min(playerObject.x, ARENA_WIDTH - PLAYER_WIDTH));
  playerObject.y = Math.max(0, Math.min(playerObject.y, ARENA_HEIGHT - PLAYER_HEIGHT));
  
  // Apply velocity dampening / friction simulation
  playerObject.vx *= deceleration;
  playerObject.vy *= deceleration;

  // Apply positions directly to the live CSS element tags
  player.style.left = playerObject.x + "px";
  player.style.top = playerObject.y + "px";
}, 20);
