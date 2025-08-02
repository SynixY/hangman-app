import React from "react";

interface HangmanProps {
  word: string; // e.g., "G_TT_"
  mistakes: number; // e.g., 2
  maxMistakes: number; // e.g., 6
}

export default function Hangman({
  word,
  mistakes,
  maxMistakes = 6,
}: HangmanProps) {
  return (
    <div className="hangman-container">
      <div className="hangman-visual">
        {/* A simple representation of the hanging safe */}
        <span className="hangman-lives">
          {maxMistakes - mistakes} LIVES LEFT
        </span>
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
