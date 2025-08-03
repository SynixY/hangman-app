// src/components/GameInput.tsx

import React, { useState } from "react";
import { useGameStore } from "@/app/stores/useGameStore";
import { useShallow } from "zustand/react/shallow";

// A new component for the overlay mask
function TurnMask() {
  return (
    <div className="game-input-mask" style={{ width: "100%", display: "flex" }}>
      <p>WAITING FOR YOUR TURN...</p>
    </div>
  );
}

interface GameInputProps {
  onSendMessage: (message: string) => void;
  onGuess: (guess: string) => void;
}

export default function GameInput({ onSendMessage, onGuess }: GameInputProps) {
  const [inputValue, setInputValue] = useState("");
  const { isMyTurn } = useGameStore(
    useShallow((state) => ({
      isMyTurn:
        state.username.toLowerCase() === state.currentTurnPlayer?.toLowerCase(),
    }))
  );

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
      <div className="game-input-actions" style={{ display: "flex" }}>
        <button className="jsx-1e5748a2310b0bd small" onClick={handleSend}>
          <strong>Chat</strong>
        </button>
        {isMyTurn && (
          <button
            className="jsx-1e5748a2310b0bd small"
            onClick={handleGuess}
            disabled={!inputValue.trim() || !isMyTurn}
          >
            <strong>Guess</strong>
          </button>
        )}
        {!isMyTurn && <TurnMask />}
      </div>
    </div>
  );
}
