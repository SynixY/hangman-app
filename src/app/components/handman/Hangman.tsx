import React from "react";

interface HangmanProps {
  word: string;
  mistakes: number;
  maxMistakes: number;
  turnTime: number;
  turnTimeLeft: number;
  turnNumber: number;
  currentPlayerMistakes: number;
  maxPlayerMistakes: number;
}

const HANGMAN_PARTS = [
  "log1",
  "log2",
  "log3",
  "log4",
  "log5",
  "log6",
  "log7",
  "log8",
  "log9",
  "log10",
  "log11",
  "rope1",
  "rope2",
  "rope3",
  "man1",
  "man2",
  "man3",
  "man4",
  "man5",
  "man6",
  "man7",
  "man8",
  "extra1",
  "extra2",
  "extra3",
];
const TOTAL_PARTS = HANGMAN_PARTS.length;

export default function Hangman({
  word,
  mistakes,
  maxMistakes,
  turnTime,
  turnTimeLeft,
  turnNumber,
  currentPlayerMistakes,
  maxPlayerMistakes,
}: HangmanProps) {
  const timerProgress = turnTime > 0 ? (turnTimeLeft / turnTime) * 100 : 0;
  const partsToShowCount =
    maxMistakes > 0 ? Math.floor((mistakes / maxMistakes) * TOTAL_PARTS) : 0;
  const visibleParts = HANGMAN_PARTS.slice(0, partsToShowCount);

  return (
    <div
      className="hangman-container"
      style={{
        flexGrow: 1, // Allows this whole component to grow vertically
        display: "flex",
        flexDirection: "column",
        minHeight: 0, // Prevents flexbox overflow issues
      }}
    >
      <div className="hangman-timer-bar-container">
        <div
          className="hangman-timer-bar"
          style={{
            width: `${timerProgress}%`,
            transition: "width 1s linear",
          }}
        />
      </div>
      <div
        className="hangman-visual"
        style={{
          flexGrow: 1, // Allows the visual area to grow
          position: "relative",
          width: "100%",
          minHeight: 0,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            // FIX: This enforces a 1:1 aspect ratio for the container
            aspectRatio: "1 / 1",
            margin: "auto", // Center the square container
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        >
          {visibleParts.map((partName) => (
            <img
              key={partName}
              src={`/images/hangman/${partName}.png`}
              alt={partName}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                // FIX: This ensures the image scales without stretching
                objectFit: "contain",
              }}
            />
          ))}
        </div>
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
