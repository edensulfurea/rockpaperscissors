function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getHumanChoice() {
  // Chiedo finché non inserisci un input valido o annulli
  while (true) {
    const input = prompt("Enter your choice: rock, paper, or scissors");
    if (input === null) return null; // utente ha annullato
    const choice = input.trim().toLowerCase();
    if (choice === 'rock' || choice === 'paper' || choice === 'scissors') {
      return choice;
    }
    alert("Invalid choice. Please type: rock, paper, or scissors.");
  }
}

function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
      return "It's a tie!";
    } else if (
      (humanChoice === 'rock' && computerChoice === 'scissors') ||
      (humanChoice === 'paper' && computerChoice === 'rock') ||
      (humanChoice === 'scissors' && computerChoice === 'paper')
    ) {
      humanScore++;
      return `You win! ${humanChoice} beats ${computerChoice}.`;
    } else {
      computerScore++;
      return `You lose! ${computerChoice} beats ${humanChoice}.`;
    }
  }

  // 5 round
  for (let i = 1; i <= 5; i++) {
    const humanChoice = getHumanChoice();
    if (humanChoice === null) {
      console.log("Game canceled.");
      return;
    }
    const computerChoice = getComputerChoice();
    const result = playRound(humanChoice, computerChoice);

    console.log(`Round ${i}:`);
    console.log(`You: ${humanChoice} | Computer: ${computerChoice}`);
    console.log(result);
    console.log(`Score → You: ${humanScore} | Computer: ${computerScore}`);
    console.log('------------------------');
  }

  // Risultato finale
  if (humanScore > computerScore) {
    console.log(`Final: You win the game! (${humanScore} - ${computerScore})`);
  } else if (humanScore < computerScore) {
    console.log(`Final: You lose the game! (${humanScore} - ${computerScore})`);
  } else {
    console.log(`Final: It's a draw! (${humanScore} - ${computerScore})`);
  }
}

// Esegui una partita da 5 round
playGame();
