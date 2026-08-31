const ARENA_WIDTH = 500;
const ARENA_HEIGHT = 400;
const PLAYER_SIZE = 30;
const MAX_SPEED = 6;
const SPEED = 2.5;
const DECELERATION = 0.85;

let gameActive = false;

// Define player initial state (Spawn near top right)
const p1 = {
    element: document.getElementById("player1"),
    x: ARENA_WIDTH - 50,
    y: 20,
    vx: 0,
    vy: 0
};

const p2 = {
    element: document.getElementById("player2"),
    x: ARENA_WIDTH - 50,
    y: 60,
    vx: 0,
    vy: 0
};

// Define Obstacles [x, y, width, height]
const obstaclesData = [
    { x: 100, y: 0, w: 20, h: 280 },
    { x: 220, y: 120, w: 20, h: 280 },
    { x: 340, y: 0, w: 20, h: 260 }
];

// Finish Zone properties (Bottom-Left)
const finishZone = { x: 0, y: ARENA_HEIGHT - 60, w: 60, h: 60 };

const gameArea = document.getElementById("gameArea");
const countdownElement = document.getElementById("countdown");

// Spawn Obstacles in DOM
const obstacleElements = obstaclesData.map(data => {
    const wall = document.createElement("div");
    wall.className = "obstacle";
    wall.style.left = data.x + "px";
    wall.style.top = data.y + "px";
    wall.style.width = data.w + "px";
    wall.style.height = data.h + "px";
    gameArea.appendChild(wall);
    return data;
});

// Controls handler
const keysPressed = {};
document.addEventListener("keydown", (e) => { keysPressed[e.key.toLowerCase()] = true; });
document.addEventListener("keyup", (e) => { keysPressed[e.key.toLowerCase()] = false; });

// AABB Collision Detection Helper
function checkCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.w &&
        rect1.x + PLAYER_SIZE > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + PLAYER_SIZE > rect2.y
    );
}

// Countdown Logic (3... 2... 1... GO!)
function startCountdown() {
    let count = 3;
    countdownElement.innerText = count;

    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownElement.innerText = count;
        } else if (count === 0) {
            countdownElement.innerText = "GO!";
            gameActive = true;
        } else {
            countdownElement.innerText = "";
            clearInterval(interval);
        }
    }, 1000);
}

// Move Player Physics & Collision Resolution
function updatePlayer(player, upKey, downKey, leftKey, rightKey) {
    if (!gameActive) return;

    // Inputs
    if (keysPressed[leftKey]) player.vx -= SPEED;
    if (keysPressed[rightKey]) player.vx += SPEED;
    if (keysPressed[upKey]) player.vy -= SPEED;
    if (keysPressed[downKey]) player.vy += SPEED;

    // Clamp speed
    const currentSpeed = Math.sqrt(player.vx * player.vx + player.vy * player.vy);
    if (currentSpeed > MAX_SPEED) {
        player.vx = (player.vx / currentSpeed) * MAX_SPEED;
        player.vy = (player.vy / currentSpeed) * MAX_SPEED;
    }

    // Try Horizontal Movement
    const oldX = player.x;
    player.x += player.vx;
    player.x = Math.max(0, Math.min(player.x, ARENA_WIDTH - PLAYER_SIZE));
    
    // Check horizontal obstacle collisions
    for (let wall of obstacleElements) {
        if (checkCollision(player, wall)) {
            player.x = oldX; // Revert move
            player.vx = 0;
            break;
        }
    }

    // Try Vertical Movement
    const oldY = player.y;
    player.y += player.vy;
    player.y = Math.max(0, Math.min(player.y, ARENA_HEIGHT - PLAYER_SIZE));

    // Check vertical obstacle collisions
    for (let wall of obstacleElements) {
        if (checkCollision(player, wall)) {
            player.y = oldY; // Revert move
            player.vy = 0;
            break;
        }
    }

    // Deceleration
    player.vx *= DECELERATION;
    player.vy *= DECELERATION;

    // Render positions
    player.element.style.left = player.x + "px";
    player.element.style.top = player.y + "px";
}

// Check Win Condition
function checkWin(player, name) {
    if (!gameActive) return;

    if (checkCollision(player, finishZone)) {
        gameActive = false;
        countdownElement.innerText = `${name} Wins!`;
    }
}

// Game Loop
setInterval(() => {
    // Player 1 uses WASD
    updatePlayer(p1, "w", "s", "a", "d");
    // Player 2 uses Arrow Keys
    updatePlayer(p2, "arrowup", "arrowdown", "arrowleft", "arrowright");

    // Check Win
    checkWin(p1, "Player 1 (Purple)");
    checkWin(p2, "Player 2 (Orange)");
}, 1000 / 60);

// Run countdown on start
startCountdown();