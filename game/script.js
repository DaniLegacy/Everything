const playerElem = document.getElementById("player");
const enemyElem = document.getElementById("enemy");
const scoreDisplay = document.getElementById("scoreBoard");

let score = 0;
let enemySpeed = 4;

const player = { x: 180, y: 440, width: 40, height: 40 };
const enemy = { x: 180, y: 0, width: 30, height: 30 };

let keysPressed = {};

document.addEventListener("keydown", function (event) {
  keysPressed[event.key] = true;
});

document.addEventListener("keyup", function (event) {
  keysPressed[event.key] = false;
});

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function resetEnemy() {
  enemy.y = -30;
  enemy.x = randomBetween(0, 370);
  enemyElem.style.left = enemy.x + "px";
}

resetEnemy();

const gameLoop = setInterval(function () {
  // Move player left/right
  if (keysPressed["ArrowLeft"] && player.x > 0) player.x -= 6;
  if (keysPressed["ArrowRight"] && player.x < 360) player.x += 6;

  enemy.y += enemySpeed;

  if (enemy.y > 500) {
    score += 1;
    scoreDisplay.textContent = "Score: " + score;
    resetEnemy();
    
    if (score % 5 === 0) {
      enemySpeed += 1;
    }
  }

  playerElem.style.left = player.x + "px";
  playerElem.style.top = player.y + "px";
  enemyElem.style.top = enemy.y + "px";

  if (isColliding(player, enemy)) {
    clearInterval(gameLoop);
    scoreDisplay.textContent = "Game Over. Final Score: " + score;
    playerElem.style.backgroundColor = "gray";
  }
}, 20);