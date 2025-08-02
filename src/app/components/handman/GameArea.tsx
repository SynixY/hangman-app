import React from "react";
import Hangman from "./Hangman";
import Scrapbook from "./scrapbook"; // We assume scrapbook contains the chat
import GameInput from "./GameInput";

export default function GameArea() {
  const handleSendMessage = (message: string) => {
    console.log("Chat Message Sent:", message);
    // TODO: Add your API call for sending a chat message
  };

  const handleGuess = (guess: string) => {
    if (guess.length === 1) {
      console.log("Letter Guessed:", guess);
      // TODO: Add your API call for guessing a letter
    } else {
      console.log("Word Guessed:", guess);
      // TODO: Add your API call for guessing a word
    }
  };

  return (
    <div className="game-area-container">
      <Hangman word="G__T_ _BR__C_" mistakes={2} />
      <Scrapbook />
      <GameInput onSendMessage={handleSendMessage} onGuess={handleGuess} />
    </div>
  );
}
