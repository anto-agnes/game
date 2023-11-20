import React, { useState } from 'react';
import './App.css';

function App() {
  const [secretNumber, setSecretNumber] = useState(generateRandomNumber());
  const [userGuess, setUserGuess] = useState('');
  const [result, setResult] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 50) + 1;
  }

  function getHint() {
    const hints = [secretNumber];

    while (hints.length < 5) {
      const hint = Math.floor(Math.random() * 50) + 1;
      if (!hints.includes(hint)) {
        hints.push(hint);
      }
    }

    return hints.sort((a, b) => a - b).join(', ');
  }

  function resetGame() {
    setSecretNumber(generateRandomNumber());
    setUserGuess('');
    setResult('');
    setAttempts(0);
    setGameOver(false);
  }

  function checkGuess() {
    const guess = parseInt(userGuess, 10);

    if (isNaN(guess) || guess < 1 || guess > 50) {
      setResult('Please enter a valid number between 1 and 50.');
      return;
    }

    setAttempts(attempts + 1);

    if (guess === secretNumber) {
      setResult(`Congratulations! You guessed the correct number in ${attempts} attempts!`);
      setGameOver(true);
    } else {
      if (attempts < 5) {
        const hints = getHint();
        setResult(
          `Sorry, that was incorrect. The correct number is not ${guess}. Here are some hints: ${hints}. Try again!`
        );
      } else {
        setResult('Game Over! You have reached the maximum number of attempts. The correct number was ' + secretNumber + '.');
        setGameOver(true);
      }
    }
  }

  function showInstructionsModal() {
    setShowInstructions(true);
  }

  function closeInstructionsModal() {
    setShowInstructions(false);
  }

  return (
    <div className="App">
      <h1>Guess the Number Game</h1>
      {gameOver ? (
        <>
          <p>{result}</p>
          <button onClick={resetGame}>Start Again</button>
        </>
      ) : (
        <>
          <p>Guess a number between 1 and 50:</p>
          <input
            type="number"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            min="1"
            max="50"
          />
          <button onClick={checkGuess}>Submit Guess</button>
          <p id="result">{result}</p>
        </>
      )}
      <button onClick={showInstructionsModal}>How to Play</button>
      {showInstructions && (
        <div className="instructions-modal">
          <h2>How to Play</h2>
          <p>
            Guess the correct number between 1 and 50. You have a maximum of 5 attempts.
            The game will provide hints after each incorrect guess. Good luck!
          </p>
          <button onClick={closeInstructionsModal}>OK</button>
        </div>
      )}
    </div>
  );
}

export default App;
