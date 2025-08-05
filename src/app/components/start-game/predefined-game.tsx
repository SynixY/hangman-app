"use client";
import React, { useEffect } from "react";
import { useGameStore } from "@/app/stores/useGameStore";
import { useShallow } from "zustand/react/shallow";

const gameModes = [];
export default function PredefinedGame() {
  const {
    difficulty,
    gameMode,
    setDifficulty,
    setGameMode,
    availableGameModes,
    fetchGameModes,
  } = useGameStore(
    useShallow((state) => ({
      difficulty: state.difficulty,
      gameMode: state.gameMode,
      setDifficulty: state.setDifficulty,
      setGameMode: state.setGameMode,
      availableGameModes: state.availableGameModes,
      fetchGameModes: state.fetchGameModes,
    }))
  );

  useEffect(() => {
    fetchGameModes();
  }, [fetchGameModes]);

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
            {availableGameModes.map((modeInfo) => (
              <div
                key={modeInfo.id}
                onClick={() => handleSelect(modeInfo.mode, modeInfo.difficulty)}
                className={`jsx-d3664381b88289ba jsx-1668173960 game ${
                  gameMode === modeInfo.mode &&
                  difficulty === modeInfo.difficulty
                    ? "checked"
                    : ""
                }`}
              >
                <figure
                  className="jsx-d3664381b88289ba jsx-1668173960"
                  style={{ backgroundImage: `url(${modeInfo.imageUrl})` }}
                />
                <section className="jsx-d3664381b88289ba jsx-1668173960 description">
                  <h4 className="jsx-d3664381b88289ba jsx-1668173960">
                    {modeInfo.name}
                  </h4>
                  <p className="jsx-d3664381b88289ba jsx-1668173960">
                    {modeInfo.description}
                  </p>
                </section>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
