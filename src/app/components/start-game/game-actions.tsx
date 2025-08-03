"use client";
import React from "react";
import { useGameStore } from "@/app/stores/useGameStore";
import { useShallow } from "zustand/react/shallow";

export default function GameActions() {
  const { startMatchmaking, cancelMatchmaking, isLoading } = useGameStore(
    useShallow((state) => ({
      // Use the correct action name from the store
      startMatchmaking: state.startMatchmaking,
      cancelMatchmaking: state.cancelMatchmaking,
      isLoading: state.isLoading,
    }))
  );

  // If we are searching for a match, show the "Cancel" button.
  if (isLoading) {
    return (
      <span
        className="jsx-5f9af3a98e99b444 actions"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <span className="jsx-b68f9a0b339eaa1 load">
          <p className="jsx-b68f9a0b339eaa1">SEARCHING FOR GAME...</p>
        </span>
        <button
          onClick={cancelMatchmaking}
          className="jsx-7a5051b5ea0cbf35"
          style={{ marginTop: "15px", height: "50px", width: "150px" }}
        >
          CANCEL
        </button>
      </span>
    );
  }

  // Otherwise, show the button to start matchmaking.
  return (
    <span className="jsx-5f9af3a98e99b444 actions">
      <button onClick={startMatchmaking} className="jsx-1e5748a2310b0bd small">
        <i className="jsx-bf1d798ec2f16818 playSmall" />
        <strong className="jsx-d0e8374e17477ac4">FIND GAME</strong>
      </button>
    </span>
  );
}
