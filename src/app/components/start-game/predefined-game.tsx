"use client";
import React from "react";
import { useGameStore } from "@/app/stores/useGameStore";
import { useShallow } from "zustand/react/shallow";

const gameModes = [];
export default function PredefinedGame() {
  const { difficulty, gameMode, setDifficulty, setGameMode } = useGameStore(
    useShallow((state) => ({
      difficulty: state.difficulty,
      gameMode: state.gameMode,
      setDifficulty: state.setDifficulty,
      setGameMode: state.setGameMode,
    }))
  );

  const handleSelect = (
    mode: "solo" | "multiplayer",
    diff: "easy" | "hard"
  ) => {
    setGameMode(mode);
    setDifficulty(diff);
  };

  return (
    <div className="jsx-791c7794eb01176a style">
      <div className="jsx-2980934243 scroll over top">
        <div className="jsx-2980934243 scrollElements">
          <div className="jsx-791c7794eb01176a list">
            {/* SOLO MODE OPTION */}
            <div
              onClick={() => handleSelect("solo", "easy")}
              className={`jsx-d3664381b88289ba jsx-1668173960 game ${
                gameMode === "solo" ? "checked" : ""
              }`}
            >
              <figure className="jsx-d3664381b88289ba jsx-1668173960 ic_freestyle" />
              <section className="jsx-d3664381b88289ba jsx-1668173960 description">
                <h4 className="jsx-d3664381b88289ba jsx-1668173960">
                  SOLO MODE
                </h4>
                <p className="jsx-d3664381b88289ba jsx-1668173960">
                  Practice by yourself. This mode is free to play.
                </p>
              </section>
            </div>
            {/* EASY MULTIPLAYER */}
            <div
              onClick={() => handleSelect("multiplayer", "easy")}
              className={`jsx-d3664381b88289ba jsx-1668173960 game ${
                gameMode === "multiplayer" && difficulty === "easy"
                  ? "checked"
                  : ""
              }`}
            >
              <figure className="jsx-d3664381b88289ba jsx-1668173960 ic_freestyle" />
              <section className="jsx-d3664381b88289ba jsx-1668173960 description">
                <h4 className="jsx-d3664381b88289ba jsx-1668173960">
                  MULTIPLAYER (EASY)
                </h4>
                <p className="jsx-d3664381b88289ba jsx-1668173960">
                  The classic Hangman experience. Wager required.
                </p>
              </section>
            </div>
            {/* HARD MULTIPLAYER */}
            <div
              onClick={() => handleSelect("multiplayer", "hard")}
              className={`jsx-d3664381b88289ba jsx-206874726 game ${
                gameMode === "multiplayer" && difficulty === "hard"
                  ? "checked"
                  : ""
              }`}
            >
              <figure className="jsx-d3664381b88289ba jsx-206874726 ic_knockoff" />
              <section className="jsx-d3664381b88289ba jsx-206874726 description">
                <h4 className="jsx-d3664381b88289ba jsx-206874726">
                  MULTIPLAYER (HARD)
                </h4>
                <p className="jsx-d3664381b88289ba jsx-206874726">
                  A tougher challenge for seasoned players. Higher wager.
                </p>
              </section>
            </div>
          </div>
        </div>
        <div className="jsx-2980934243 scrollBar">
          <div
            className="jsx-2980934243 scrollTrack"
            style={{ top: 4, height: 164 }}
          />
        </div>
      </div>
    </div>
  );
}
