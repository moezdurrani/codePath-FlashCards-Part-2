import './App.css';
import React, { useState } from 'react';
import Flashcard from './card/Flashcard'; // Ensure the correct path
import GuessInput from './GuessInput';

const App = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // Tracks the index of the current card
  const [showAnswer, setShowAnswer] = useState(false); // Tracks if the answer is shown
  const [userGuess, setUserGuess] = useState(''); // Tracks the user's guess
  const [feedback, setFeedback] = useState(''); // Stores feedback message
  const [currentStreak, setCurrentStreak] = useState(0); // Tracks the current correct streak
  const [longestStreak, setLongestStreak] = useState(0); // Tracks the longest streak

  const flashcards = [
    { question: "What Vehicle is this?", answer: "Honda Accord", disc: "1.5L turbocharged engine, approx. 480 miles range", imgUrl: "https://vehicle-images.dealerinspire.com/f66f-11000922/1HGCY2F78RA094210/13007617c641b79a7e1898a64de936b9.png", borderColor: "#FFC300" },
    { question: "What Vehicle is this?", answer: "Chevrolet Corvette", disc: "6.2L V8 engine, approx. 400 miles range", imgUrl: "https://di-uploads-pod5.dealerinspire.com/mccluskeychevy/uploads/2023/04/2023-Chevy-Corvette-1LT-Model-Left.jpg", borderColor: "#33FF57" },
    { question: "What Vehicle is this?", answer: "Polaris Slingshot R", disc: "2.0L inline-4 engine, approx. 200 miles range", imgUrl: "https://cdn.dealerspike.com/imglib/v1/800x600/imglib/trimsdb/21862041-0-132658681.jpg", borderColor: "#5733FF" },
    { question: "What Vehicle is this?", answer: "Tesla Model X", disc: "Electric motor, approx. 348 miles range", imgUrl: "https://platform.cstatic-images.com/xxlarge/in/v2/stock_photos/909cd004-1eb1-46a3-b3d5-f7eca4175d23/a4e9535e-20e5-4838-a1ff-790f651a37b8.png", borderColor: "#FF33A1" },
    { question: "What Vehicle is this?", answer: "Honda CB200X", disc: "184.4cc engine, approx. 300 miles range", imgUrl: "https://cdn.motor1.com/images/mgl/28J2B/s1/4x3/the-honda-cb200x-is-ready-to-embark-on-adventures-big-and-small.webp", borderColor: "#33FFF9" },
    { question: "What Vehicle is this?", answer: "Mustang Mach-E", disc: "Electric motor, approx. 300 miles range", imgUrl: "https://di-uploads-pod39.dealerinspire.com/towncountryfordoflou/uploads/2022/01/2022-Ford-Mustang-Mach-E-Select-Turned-Left.jpg", borderColor: "#FFC300" },
    { question: "What Vehicle is this?", answer: "Vespa GTS 300", disc: "278cc engine, approx. 150 miles range", imgUrl: "https://images.piaggio.com/vespa/vehicles/nvh2000u04/nvh2r7uu04/nvh2r7uu04-01-m.png", borderColor: "#DAF7A6" },
    { question: "What Vehicle is this?", answer: "Chrysler Pacifica", disc: "3.6L V6 engine, approx. 500 miles range", imgUrl: "https://platform.cstatic-images.com/xxlarge/in/v2/stock_photos/72abf56b-f3ac-426c-9a85-5406910651ec/34a9eee1-add3-4780-af01-cdc1ee87f25f.png", borderColor: "#FF5733" },
    { question: "What Vehicle is this?", answer: "Mazda MX-5 Miata", disc: "2.0L inline-4 engine, approx. 350 miles range", imgUrl: "https://di-uploads-pod38.dealerinspire.com/theautobarnmazdaofevanston/uploads/2023/12/2024-Mazda-MX-5-Miata-Club-model-trim.png", borderColor: "#33FFBD" },
    { question: "What Vehicle is this?", answer: "Ford Mustang", disc: "5.0L V8 engine, approx. 400 miles range", imgUrl: "https://www.ford.co.th/content/dam/Ford/website-assets/ap/th/nameplate/mustang/overview/colorizer/Rapid-Red/Rapid_Red.jpg.dam.full.high.jpg/1602088614775.jpg", borderColor: "#FF5733" }
  ];

  // Shuffle function using Fisher-Yates algorithm
  const shuffleFlashcards = () => {
    const shuffled = [...flashcards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    setFlashcards(shuffled);
    setCurrentCardIndex(0); // Reset to the first card after shuffle
    setShowAnswer(false); // Hide the answer after shuffle
    setUserGuess(''); // Reset user input
    setFeedback('');   // Clear feedback
  };

  // Function to move to the next card
  const nextCard = () => {
    setCurrentCardIndex((currentCardIndex + 1) % flashcards.length);
    setShowAnswer(false);  // Reset to show the question for the next card
    setUserGuess(''); // Reset user guess input
    setFeedback('');   // Reset feedback message
  };

  // Function to move to the previous card
  const prevCard = () => {
    setCurrentCardIndex((currentCardIndex - 1 + flashcards.length) % flashcards.length);
    setShowAnswer(false);  // Reset to show the question for the previous card
    setUserGuess(''); // Reset user guess input
    setFeedback('');   // Reset feedback message
  };

  const checkAnswer = () => {
    const correctAnswer = flashcards[currentCardIndex].answer.toLowerCase();
    if (userGuess.toLowerCase() === correctAnswer) {
      setFeedback('Correct!');
      setCurrentStreak(currentStreak + 1); // Increase the current streak

      // Update longest streak if current streak exceeds longest
      if (currentStreak + 1 > longestStreak) {
        setLongestStreak(currentStreak + 1);
      }
    } else {
      setFeedback('Incorrect, try again.');
      setCurrentStreak(0); // Reset current streak if the answer is incorrect
    }
  };

  return (
    <div className="App">
      <h1>The Ultimate Car Showroom!</h1>
      <h4>How good you know your vehicles? Test your knowledge here!</h4>
      <h4>Number of Cards: {flashcards.length}</h4>

      {/* Display Streaks */}
      <div className="streak-info">
        <p>Current Streak: {currentStreak}</p>
        <p>Longest Streak: {longestStreak}</p>
      </div>

      <Flashcard 
        flashcard={flashcards[currentCardIndex]} 
        showAnswer={showAnswer} 
        setShowAnswer={setShowAnswer} 
      />

      {/* GuessInput Component: Handles the input for guessing the answer */}
      {!showAnswer && (
        <GuessInput
          userGuess={userGuess}
          setUserGuess={setUserGuess}
          checkAnswer={checkAnswer}
        />
      )}

      {feedback && (
        <p className={`feedback ${feedback === 'Correct!' ? 'correct' : 'incorrect'}`}>
          {feedback}
        </p>
      )}
      
      <div className="buttons">
      <button className="shuffle-button purple-button" onClick={shuffleFlashcards}>
          Shuffle Cards
        </button>
        <button className="prev-button" onClick={prevCard}>
          &#8592;
        </button>
        <button className="next-button" onClick={nextCard}>
          &#8594;
        </button>
      </div>
    

      {/* Shuffle Button */}
        <div className="shuffle-container">
        
      </div>

  </div>
  );
};

export default App;