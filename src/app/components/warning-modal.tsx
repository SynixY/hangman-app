"use client";
import React from "react";
import { useGameStore } from "../stores/useGameStore";

export default function WarningModal() {
  const isWarningModalOpen = false;
  if (!isWarningModalOpen) {
    return <></>;
  }
  return (
    <div className="jsx-2746068652 background fade-enter-done">
      <div className="jsx-2746068652 it content">
        <h2 className="jsx-585ea3472e396a52">Provare?</h2>
        <div className="jsx-72a234951d07662">
          <figure className="jsx-72a234951d07662" />
          <p className="jsx-72a234951d07662">
            Ehi! Il gioco è ancora più divertente quando ci sono almeno 4
            giocatori. Vuoi continuare lo stesso così?
          </p>
        </div>
        <span className="jsx-72a234951d07662">
          <button className="jsx-7a5051b5ea0cbf35 ">Sì</button>
          <button className="jsx-7a5051b5ea0cbf35 ">No</button>
        </span>
      </div>
    </div>
  );
}
