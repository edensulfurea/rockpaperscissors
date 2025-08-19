//STATO DEL GIOCO
let humanScore = 0;
let computerScore = 0;
const WIN_SCORE = 5;

//FUNZIONI ORIGINALI ADATTATE
function getComputerChoice(){
    const choices= ['rock', 'paper', 'scissors'];
    const randomIndex= Math.floor(Math.random()*choices.length);
    return choices[randomIndex];
}
// Ora playRound NON fa loop e NON legge input: riceve le scelte e ritorna l'esito
function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return { result: 'draw', message: "It's a tie!" };
  } else if (
    (humanChoice === 'rock' && computerChoice === 'scissors') ||
    (humanChoice === 'paper' && computerChoice === 'rock') ||
    (humanChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return { result: 'human', message: `You win! ${humanChoice} beats ${computerChoice}.` };
  } else {
    return { result: 'computer', message: `You lose! ${computerChoice} beats ${humanChoice}.` };
  }
}
// --- Riferimenti DOM (assicurati di avere questi elementi in HTML) ---
const buttons = document.querySelectorAll('button[data-choice]');
const roundDiv = document.getElementById('round');   // <div id="round"></div>
const scoreDiv = document.getElementById('score');   // <div id="score"></div>
const winnerDiv = document.getElementById('winner'); // <div id="winner"></div>
const resetBtn = document.getElementById('reset');   // <button id="reset">Reset</button>

// --- Helpers UI ---
function updateScoreUI() {
  scoreDiv.textContent = `You: ${humanScore} | Computer: ${computerScore}`;
}

function endIfWinner() {
  if (humanScore >= WIN_SCORE || computerScore >= WIN_SCORE) {
    const msg = humanScore > computerScore ? 'You won the game! 🏆' : 'Computer won the game. 💻';
    winnerDiv.textContent = msg;
    buttons.forEach(b => b.disabled = true);
    resetBtn.style.display = 'inline-block';
    return true;
  }
  return false;
}

// --- Eventi sui bottoni scelta ---
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const humanChoice = btn.dataset.choice;     // 'rock' | 'paper' | 'scissors'
    const computerChoice = getComputerChoice();

    const outcome = playRound(humanChoice, computerChoice);

    if (outcome.result === 'human') humanScore++;
    if (outcome.result === 'computer') computerScore++;

    roundDiv.textContent = `You: ${humanChoice} | Computer: ${computerChoice} → ${outcome.message}`;
    updateScoreUI();
    endIfWinner();
  });
});

// --- Reset ---
resetBtn.addEventListener('click', () => {
  humanScore = 0;
  computerScore = 0;
  roundDiv.textContent = 'Make your move…';
  winnerDiv.textContent = '';
  updateScoreUI();
  buttons.forEach(b => b.disabled = false);
  resetBtn.style.display = 'none';
});

// --- Init UI ---
roundDiv.textContent = 'Make your move…';
updateScoreUI();
resetBtn.style.display = 'none';