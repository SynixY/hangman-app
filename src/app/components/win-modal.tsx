"use client";
import React from "react";
import { useGameStore } from "@/app/stores/useGameStore";
import { useShallow } from "zustand/react/shallow";

function RewardStatus({
  status,
  signature,
}: {
  status: "pending" | "sent" | null;
  signature: string | null;
}) {
  if (status === "pending") {
    return (
      <p className="win-modal-reward-status pending">Awaiting Reward...</p>
    );
  }
  if (status === "sent" && signature) {
    return (
      <a
        href={`https://solscan.io/tx/${signature}?cluster=devnet`}
        target="_blank"
        rel="noopener noreferrer"
        className="win-modal-reward-status sent"
      >
        Reward Sent ✔ (View Transaction)
      </a>
    );
  }
  return null;
}

export default function WinModal() {
  const {
    resetGame,
    winner,
    currentUser,
    entryFee,
    secretWord,
    rewardStatus,
    resetGameState,
    rewardTxSignature,
  } = useGameStore(
    useShallow((state) => ({
      resetGame: state.resetGame,
      winner: state.winner,
      currentUser: state.username,
      entryFee: state.entryFee,
      secretWord: state.secretWord,
      rewardStatus: state.rewardStatus,
      rewardTxSignature: state.rewardTxSignature,
      resetGameState: state.resetGameState,
    }))
  );

  const isWinner = winner?.username === currentUser;
  const modalState = isWinner ? "winner" : "loser";
  const titleText = isWinner ? "VICTORY" : "DEFEAT";
  const isButtonDisabled = isWinner && rewardStatus === "pending";

  const animatedTitle = titleText.split("").map((letter, index) => (
    <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>
      {letter}
    </span>
  ));

  return (
    <div className="modal-background" style={{ zIndex: 300 }}>
      <div className={`win-modal-container ${modalState}`}>
        <div className="sparkle-bg"></div>
        <div className="light-beams">
          <div className="beam"></div>
          <div className="beam"></div>
          <div className="beam"></div>
        </div>

        <h2 className={`win-modal-title ${modalState}-title`}>
          {animatedTitle}
        </h2>

        <p className="win-modal-subtitle">
          {isWinner
            ? "Congratulations, Gambler!"
            : `The word was: "${secretWord.toUpperCase()}"`}
        </p>

        <div className="win-modal-reward-banner">
          <div className={`win-modal-amount ${modalState}-amount`}>
            {isWinner ? "+25,000 $HANG" : `-${entryFee} SOL`}
          </div>
        </div>

        {isWinner && (
          <RewardStatus status={rewardStatus} signature={rewardTxSignature} />
        )}

        <button
          onClick={resetGame}
          className="jsx-7a5051b5ea0cbf35 win-modal-button"
          disabled={isButtonDisabled}
          style={{ zIndex: 10, position: "relative" }} // z-index fix
        >
          {isButtonDisabled ? "PROCESSING..." : "CONTINUE"}
        </button>
      </div>
    </div>
  );
}
