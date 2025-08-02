import React, { useState } from "react";

interface GameInputProps {
  onSendMessage: (message: string) => void;
  onGuess: (guess: string) => void;
}

export default function GameInput({ onSendMessage, onGuess }: GameInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleGuess = () => {
    if (inputValue.trim()) {
      onGuess(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Prioritize guessing if it's a valid guess format (single letter or long word)
      if (inputValue.length === 1 || inputValue.length > 2) {
        handleGuess();
      } else {
        handleSend();
      }
    }
  };

  return (
    <div className="game-input-container">
      <input
        type="text"
        className="jsx-239914617526db95 game-input-field"
        placeholder="Type a message or guess..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        maxLength={30}
      />
      <div className="game-input-actions">
        <button
          className="jsx-1e5748a2310b0bd small"
          onClick={handleSend}
          disabled={!inputValue.trim()}
        >
          <strong>Send</strong>
        </button>
        <button
          className="jsx-1e5748a2310b0bd small"
          onClick={handleGuess}
          disabled={!inputValue.trim()}
        >
          <strong>Guess</strong>
        </button>
      </div>
    </div>
  );
}
