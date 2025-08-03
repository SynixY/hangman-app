import React from "react";

interface HangmanProps {
  word: string;
  mistakes: number; // Overall incorrect guesses for the word
  maxMistakes: number;
  turnTime: number;
  turnTimeLeft: number;
  turnNumber: number;
  currentPlayerMistakes: number;
  maxPlayerMistakes: number;
}

export default function Hangman({
  word,
  mistakes,
  maxMistakes = 6,
  turnTime,
  turnTimeLeft,
  turnNumber,
  currentPlayerMistakes,
  maxPlayerMistakes,
}: HangmanProps) {
  const timerProgress = turnTime > 0 ? (turnTimeLeft / turnTime) * 100 : 0;
  const hangmanImageIndex = Math.min(mistakes, maxMistakes); // Ensure we don't exceed the number of images

  return (
    <div className="hangman-container">
      <div className="hangman-timer-bar-container">
        <div
          className="hangman-timer-bar"
          style={{
            width: `${timerProgress}%`,
            transition: "width 1s linear",
          }}
        />
      </div>
      <div className="hangman-visual">
        <img
          src={`/images/hangman/${hangmanImageIndex}.png`}
          alt={`${mistakes} mistakes`}
          className="hangman-image"
        />
        <div className="hangman-counters">
          <span>Turn: {turnNumber}</span>
          <span>
            Mistakes: {`${currentPlayerMistakes} / ${maxPlayerMistakes}`}
          </span>
        </div>
      </div>
      <div className="hangman-word">
        {word.split("").map((letter, index) => (
          <span key={index} className="hangman-word-letter">
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
    </div>
  );
}
