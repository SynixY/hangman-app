"use client";
import React, { useEffect, useRef } from "react";
import ChatMessage from "./chat-message";
import Hangman from "./hangman";
import GameInput from "./GameInput";
import { useGameStore } from "@/app/stores/useGameStore";
import { useShallow } from "zustand/react/shallow";

export default function Scrapbook() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // FIX: Select each piece of state individually to prevent infinite loops.
  const {
    messages,
    username,
    submitGuess,
    sendChatMessage,
    maskedWord,
    attemptsLeft,
    maxAttempts,
  } = useGameStore(
    useShallow((state) => ({
      messages: state.messages,
      username: state.username,
      submitGuess: state.submitGuess,
      sendChatMessage: state.sendChatMessage,
      maskedWord: state.maskedWord,
      attemptsLeft: state.attemptsLeft,
      maxAttempts: state.maxAttempts,
    }))
  );
  // Auto-scroll the chat to the bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="jsx-380c8a0d0db173e2 scrapbook">
      <Hangman
        word={maskedWord}
        mistakes={maxAttempts - attemptsLeft}
        maxMistakes={maxAttempts}
      />

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
              />
            ))}
          </div>
          <div className="jsx-3560981401 scrollBar" />
        </div>
      </div>

      <GameInput onSendMessage={sendChatMessage} onGuess={submitGuess} />
    </div>
  );
}
