import React from 'react';
import './flashcard.css';

const Flashcard = ({ flashcard, showAnswer, setShowAnswer }) => {
  const toggleCard = () => {
    setShowAnswer(!showAnswer); 
  };

  return (
    <div className="flashcard" 
        onClick={toggleCard}
        style={{
            borderColor: flashcard.borderColor, 
            boxShadow: `0 0 15px ${flashcard.borderColor}`, 
          }}
        >
      {showAnswer ? (
        <div>
          <p>{flashcard.answer}</p>
          <p>{flashcard.disc}</p>
        </div>
      ) : (
        <p>{flashcard.question}</p>
      )}

      <img className="flashCardImg" src={flashcard.imgUrl} alt={flashcard.question} />
    </div>
  );
};

export default Flashcard;