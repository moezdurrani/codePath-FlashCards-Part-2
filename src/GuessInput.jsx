import React from 'react';
import './GuessInput.css';

const GuessInput = ({ userGuess, setUserGuess, checkAnswer }) => {
  return (
    <div className="guess-input">
      <input
        type="text"
        value={userGuess}
        onChange={(e) => setUserGuess(e.target.value)}
        placeholder="Guess the answer here..."
      />
      <button onClick={checkAnswer}>Submit Guess</button>
    </div>
  );
};

export default GuessInput;