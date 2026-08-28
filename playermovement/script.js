const player = document.getElementById("player");

let playerX = 50;
let playerY = 50;
const speed = 5;

const keysPressed = {};

document.addEventListener("keydown", function (event) {
  keysPressed[event.key] = true;
});

document.addEventListener("keyup", function (event) {
  keysPressed[event.key] = false;
});

setInterval(function () {
  if (keysPressed["ArrowRight"] || keysPressed["d"]) {
    playerX += speed;
  }
  if (keysPressed["ArrowLeft"] || keysPressed["a"]) {
    playerX -= speed;
  }
  if (keysPressed["ArrowUp"] || keysPressed["w"]) {
    playerY -= speed;
  }
  if (keysPressed["ArrowDown"] || keysPressed["s"]) {
    playerY += speed;
  }

  player.style.left = playerX + "px";
  player.style.top = playerY + "px";
}, 20);