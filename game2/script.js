const playerElem = document.getElementById("player");
const enemyElem = document.getElementById("enemy");
const scoreDisplay = document.getElementById("scoreBoard");
const livesDisplay = document.getElementById("livesBoard");
const highScoreDisplay = document.getElementById("highScoreBoard");
const restartBtn = document.getElementById("restartBtn");

let score = 0;
let highScore = 0;
let lives = 3;             // Mod 1
let enemySpeed = 4;
let gameLoop = null;

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

function updateGame() {
  // Movement logic
  if (keysPressed["ArrowLeft"] && player.x > 0) player.x -= 6;
  if (keysPressed["ArrowRight"] && player.x < 360) player.x += 6;

  enemy.y += enemySpeed;

  if (enemy.y > 500) {
    score += 1;
    scoreDisplay.textContent = "Score: " + score;
    
    // Mod 3
    if (score > highScore) {
      highScore = score;
      highScoreDisplay.textContent = "High Score: " + highScore;
    }

    resetEnemy();
    
    if (score % 5 === 0) {
      enemySpeed += 1;
    }
  }

  playerElem.style.left = player.x + "px";
  playerElem.style.top = player.y + "px";
  enemyElem.style.top = enemy.y + "px";

  if (isColliding(player, enemy)) {
    // Mod 1
    lives -= 1;
    livesDisplay.textContent = "Lives: " + lives;
    resetEnemy();

    if (lives <= 0) {
      clearInterval(gameLoop);
      scoreDisplay.textContent = "GAME OVER!";
      playerElem.style.backgroundColor = "gray";
      
      // Mod 2
      restartBtn.style.display = "block";
    }
  }
}

function startGame() {
  // Reset session values
  score = 0;
  lives = 3;
  enemySpeed = 4;
  player.x = 180;

  scoreDisplay.textContent = "Score: 0";
  livesDisplay.textContent = "Lives: 3";
  playerElem.style.backgroundColor = "#2ecc71";
  restartBtn.style.display = "none";

  resetEnemy();
  
  if (gameLoop) clearInterval(gameLoop);
  gameLoop = setInterval(updateGame, 20);
}

// Mod 2
restartBtn.addEventListener("click", startGame);

startGame();