"use client";
import React from "react";
import { useGameStore } from "@/app/stores/useGameStore";
import { useShallow } from "zustand/react/shallow";

export default function GameActions() {
  const { matchmake, cancelMatchmaking, isLoading, jwt, errorMessage } =
    useGameStore(
      useShallow((state) => ({
        matchmake: state.matchmake,
        cancelMatchmaking: state.cancelMatchmaking,
        isLoading: state.isLoading,
        jwt: state.jwt,
        errorMessage: state.errorMessage,
      }))
    );

  // If we have a JWT, it means matchmaking has started and we are waiting
  if (jwt) {
    return (
      <span
        className="jsx-5f9af3a98e99b444 actions"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="jsx-b68f9a0b339eaa1 load">
          <p className="jsx-b68f9a0b339eaa1">WAITING FOR MORE PLAYERS...</p>
        </span>
        <button
          onClick={cancelMatchmaking}
          disabled={isLoading}
          className="jsx-7a5051b5ea0cbf35"
          style={{ marginLeft: "20px", height: "50px" }}
        >
          Cancel
        </button>
      </span>
    );
  }

  // Otherwise, show the button to start matchmaking
  return (
    <span className="jsx-5f9af3a98e99b444 actions">
      {" "}
      <button
        onClick={matchmake}
        disabled={isLoading}
        className="jsx-1e5748a2310b0bd small"
      >
        <i className="jsx-bf1d798ec2f16818 playSmall" />{" "}
        <strong className="jsx-d0e8374e17477ac4">
          {isLoading ? "SEARCHING..." : "START MATCHMAKING"}{" "}
        </strong>{" "}
      </button>{" "}
    </span>
  );
}
