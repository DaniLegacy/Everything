import { Game } from "./game.js";

const player = document.getElementById("player");

// Explicit game layout fallback variables
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

// CRITICAL FIX: Safe values fallback if game.js variables are undefined/0
const speed = Game && Game.player_speed ? Game.player_speed : 2; 
const deceleration = Game && Game.deceleration ? Game.deceleration : 0.9; 

// Initialise and center player inside the game box container
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

// Keyboard key state listeners
const keysPressed = {};

document.addEventListener("keydown", function (event) {
  keysPressed[event.key] = true;
});

document.addEventListener("keyup", function (event) {
  keysPressed[event.key] = false;
});

// Game Frame Loop execution
setInterval(function () {
  // Add input velocity components
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

  // Factor linear movement coordinates
  playerObject.x += playerObject.vx;
  playerObject.y += playerObject.vy;

  // 1. Constraint enforcement clamping
  playerObject.x = Math.max(0, Math.min(playerObject.x, ARENA_WIDTH - PLAYER_WIDTH));
  playerObject.y = Math.max(0, Math.min(playerObject.y, ARENA_HEIGHT - PLAYER_HEIGHT));

  // 2. Camera array variable definitions check
  if (Game && Array.isArray(Game.camera_position)) {
    Game.camera_position[0] = playerObject.x - (ARENA_WIDTH / 2) + (PLAYER_WIDTH / 2);
    Game.camera_position[1] = playerObject.y - (ARENA_HEIGHT / 2) + (PLAYER_HEIGHT / 2);
  }
 
  // Simulate frictional slide deceleration physics
  playerObject.vx *= deceleration;
  playerObject.vy *= deceleration;

  // 3. Render position via explicit absolute properties
  player.style.left = playerObject.x + "px";
  player.style.top = playerObject.y + "px";

    // Apply positions directly to the live CSS element tags
  player.style.left = playerObject.x + "px";
  player.style.top = playerObject.y + "px";

  // ADD THIS: Shift the parent game area container in reverse to create a camera tracking illusion
  const gameArea = document.getElementById("gameArea");
  if (gameArea) {
    gameArea.style.transform = `translate(${-Game.camera_position[0]}px, ${-Game.camera_position[1]}px)`;
  }
}, 20);
