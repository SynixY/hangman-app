"use client";
import React from "react";
import { useGameStore } from "@/app/stores/useGameStore";

export default function PredefinedGame() {
  const { difficulty, setDifficulty } = useGameStore();

  return (
    <div className="jsx-791c7794eb01176a style">
      <div className="jsx-2980934243 scroll over top">
        <div className="jsx-2980934243 scrollElements">
          <div className="jsx-791c7794eb01176a list">
            <div
              onClick={() => setDifficulty("easy")}
              className={`jsx-d3664381b88289ba jsx-1668173960 game ${
                difficulty === "easy" ? "checked" : ""
              }`}
            >
              <button className="jsx-d3664381b88289ba jsx-1668173960 editSettings" />
              <figure className="jsx-d3664381b88289ba jsx-1668173960 ic_freestyle" />
              <section className="jsx-d3664381b88289ba jsx-1668173960 description">
                <h4 className="jsx-d3664381b88289ba jsx-1668173960">EASY</h4>
                <p className="jsx-d3664381b88289ba jsx-1668173960">
                  The classic Hangman experience. Costs 0.01 SOL to play.
                </p>
              </section>
            </div>
            <div
              onClick={() => setDifficulty("hard")}
              className={`jsx-d3664381b88289ba jsx-206874726 game ${
                difficulty === "hard" ? "checked" : ""
              }`}
            >
              <button className="jsx-d3664381b88289ba jsx-206874726 editSettings" />
              <figure className="jsx-d3664381b88289ba jsx-206874726 ic_knockoff" />
              <section className="jsx-d3664381b88289ba jsx-206874726 description">
                <h4 className="jsx-d3664381b88289ba jsx-206874726">HARD</h4>
                <p className="jsx-d3664381b88289ba jsx-206874726">
                  A tougher challenge for seasoned players. Costs 0.1 SOL to
                  play.
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
