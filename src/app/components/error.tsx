"use client";
import React from "react";
import { useGameStore } from "@/app/stores/useGameStore";
import { useShallow } from "zustand/react/shallow";

export default function ErrorModal() {
  const { errorMessage, clearErrorMessage, resetGame } = useGameStore(
    useShallow((state) => ({
      errorMessage: state.errorMessage,
      clearErrorMessage: state.clearErrorMessage,
      resetGame: state.resetGame,
    }))
  );

  const handleClose = () => {
    clearErrorMessage();
  };

  return (
    <div
      className="jsx-2746068652 background fade-enter-done"
      style={{ zIndex: 999 }}
    >
      <div className="jsx-2746068652 it content">
        <h2 className="jsx-585ea3472e396a52">ERROR</h2>
        <div className="jsx-72a234951d07662">
          <figure className="jsx-72a234951d07662" />
          <p className="jsx-72a234951d07662">{errorMessage}</p>
        </div>
        <span className="jsx-72a234951d07662">
          <button onClick={handleClose} className="jsx-7a5051b5ea0cbf35 big">
            OK
          </button>
        </span>
      </div>
    </div>
  );
}
