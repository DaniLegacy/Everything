const playerScoreElem = document.getElementById("playerScore");
const compScoreElem = document.getElementById("compScore");
const resultDisplay = document.getElementById("result");
const choiceButtons = document.querySelectorAll(".choice-btn");
const resetBtn = document.getElementById("resetBtn");

let playerScore = 0;
let compScore = 0;
const choices = ["Rock", "Paper", "Scissors"];

function playRound(playerSelection) {
  // Generate random computer choice
  const randomIndex = Math.floor(Math.random() * 3);
  const compSelection = choices[randomIndex];

  if (playerSelection === compSelection) {
    resultDisplay.textContent = `It's a tie! Both chose ${playerSelection}.`;
  } else if (
    (playerSelection === "Rock" && compSelection === "Scissors") ||
    (playerSelection === "Paper" && compSelection === "Rock") ||
    (playerSelection === "Scissors" && compSelection === "Paper")
  ) {
    playerScore++;
    playerScoreElem.textContent = playerScore;
    resultDisplay.textContent = `You win this round! ${playerSelection} beats ${compSelection}.`;
  } else {
    compScore++;
    compScoreElem.textContent = compScore;
    resultDisplay.textContent = `Computer wins this round! ${compSelection} beats ${playerSelection}.`;
  }

  checkWinner();
}

function checkWinner() {
  if (playerScore === 5 || compScore === 5) {
    if (playerScore === 5) {
      resultDisplay.textContent = "GAME OVER: You won the match.";
    } else {
      resultDisplay.textContent = "GAME OVER: Computer won the match.";
    }

    // Disable choice buttons
    choiceButtons.forEach(button => button.disabled = true);
  }
}

choiceButtons.forEach(button => {
  button.addEventListener("click", function () {
    playRound(this.value);
  });
});

resetBtn.addEventListener("click", function () {
  playerScore = 0;
  compScore = 0;
  playerScoreElem.textContent = "0";
  compScoreElem.textContent = "0";
  resultDisplay.textContent = "First to 5 points wins. Please pick your move.";
  choiceButtons.forEach(button => button.disabled = false);
});