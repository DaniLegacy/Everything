// 1. Setup DOM elements and variables
const playerElem = document.getElementById("player");
const enemyElem = document.getElementById("enemy");
const scoreDisplay = document.getElementById("scoreBoard");

let score = 0;
let enemySpeed = 4;

// Bounding Box objects
const player = { x: 180, y: 440, width: 40, height: 40 };
const enemy = { x: 180, y: 0, width: 30, height: 30 };

// 2. Track arrow keys
let keysPressed = {};

document.addEventListener("keydown", function (event) {
  keysPressed[event.key] = true;
});

document.addEventListener("keyup", function (event) {
  keysPressed[event.key] = false;
});

// 3. Helper Functions
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

// Set initial enemy position
resetEnemy();

// 4. Game Loop
const gameLoop = setInterval(function () {
  // Move player left/right
  if (keysPressed["ArrowLeft"] && player.x > 0) player.x -= 6;
  if (keysPressed["ArrowRight"] && player.x < 360) player.x += 6;

  // Move falling enemy down
  enemy.y += enemySpeed;

  // Check if enemy passed the bottom (player successfully dodged)
  if (enemy.y > 500) {
    score += 1;
    scoreDisplay.textContent = "Score: " + score;
    resetEnemy();
    
    // Slightly increase falling speed over time
    if (score % 5 === 0) {
      enemySpeed += 1;
    }
  }

  // Update positions on screen
  playerElem.style.left = player.x + "px";
  playerElem.style.top = player.y + "px";
  enemyElem.style.top = enemy.y + "px";

  // Check hit collision
  if (isColliding(player, enemy)) {
    clearInterval(gameLoop);
    scoreDisplay.textContent = "GAME OVER! Final Score: " + score;
    playerElem.style.backgroundColor = "gray";
  }
}, 20);