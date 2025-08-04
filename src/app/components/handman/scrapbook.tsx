"use client";
import React, { useEffect, useRef } from "react";
import ChatMessage from "./chat-message";
import Hangman from "./Hangman";
import GameInput from "./GameInput";
import { useGameStore } from "@/app/stores/useGameStore";
import { useShallow } from "zustand/react/shallow";

export default function Scrapbook() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    username,
    submitGuess,
    sendChatMessage,
    maskedWord,
    maxAttempts,
    turnTime,
    turnTimeLeft,
    turnNumber,
    playerMistakes,
    maxPlayerMistakes,
    gameMode,
    currentTurnPlayer,
  } = useGameStore(
    useShallow((state) => ({
      messages: state.messages,
      username: state.username,
      submitGuess: state.submitGuess,
      sendChatMessage: state.sendChatMessage,
      maskedWord: state.maskedWord,
      maxAttempts: state.maxAttempts,
      turnTime: state.turnTime,
      turnTimeLeft: state.turnTimeLeft,
      turnNumber: state.turnNumber,
      playerMistakes: state.playerMistakes,
      maxPlayerMistakes: state.maxPlayerMistakes,
      currentTurnPlayer: state.currentTurnPlayer,
      gameMode: state.gameMode,
    }))
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const mistakes = Object.values(playerMistakes).reduce((a, b) => a + b, 0);
  const currentPlayerMistakes =
    (currentTurnPlayer && playerMistakes[currentTurnPlayer]) || 0;

  return (
    <div
      className="jsx-380c8a0d0db173e2 scrapbook"
      style={{
        flexGrow: 1, // This allows the scrapbook to expand
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}
    >
      <Hangman
        word={maskedWord}
        mistakes={mistakes}
        maxMistakes={maxAttempts}
        turnTime={turnTime}
        turnTimeLeft={turnTimeLeft}
        turnNumber={turnNumber}
        currentPlayerMistakes={currentPlayerMistakes}
        maxPlayerMistakes={maxPlayerMistakes}
      />

      {gameMode !== "solo" && (
        <>
          <h4 className="jsx-8a159d9480957b3c">GAME CHAT</h4>
          <div className="jsx-380c8a0d0db173e2 timeline">
            <div className="jsx-3560981401 scroll">
              <div
                ref={scrollRef}
                className="jsx-3560981401 scrollElements"
                style={{ overflowY: "auto", padding: "10px 0" }}
              >
                {messages.map((msg, index) => (
                  <ChatMessage
                    key={index}
                    external={msg.username !== username}
                    username={msg.username}
                    message={msg.message}
                    isGuess={msg.isGuess}
                    avatarUrl={msg.avatarUrl ?? "/images/avatar/1.png"}
                  />
                ))}
              </div>
              <div className="jsx-3560981401 scrollBar" />
            </div>
          </div>
        </>
      )}

      <GameInput onSendMessage={sendChatMessage} onGuess={submitGuess} />
    </div>
  );
}
