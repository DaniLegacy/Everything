const player = document.getElementById("player");

const playerObject = {
  x: 50,  
  y: 50,
  vx: 0,
  vy: 0,
};

let playerX = 50;
let playerY = 50;
const speed = 2;

const keysPressed = {};

document.addEventListener("keydown", function (event) {
  keysPressed[event.key] = true;
});

document.addEventListener("keyup", function (event) {
  keysPressed[event.key] = false;
});

setInterval(function () {
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

  playerObject.x += playerObject.vx;
  playerObject.y += playerObject.vy;

  playerObject.vx *= 0.9;
  playerObject.vy *= 0.9;

  player.style.left = playerObject.x + "px";
  player.style.top = playerObject.y + "px";
}, 20);