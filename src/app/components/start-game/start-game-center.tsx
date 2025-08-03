"use client";
import React, { useState } from "react";
import GameActions from "./game-actions";
import PredefinedGame from "./predefined-game"; // Import new component
import CustomGame from "./custom-game"; // Import new component

export default function StartGameCenter() {
  const [activeTab, setActiveTab] = useState("pre-defined"); // 'pre-defined' or 'custom'

  return (
    <div className="jsx-5f9af3a98e99b444 right">
      <div className="jsx-5f9af3a98e99b444 settings">
        <div className="jsx-5f9af3a98e99b444 tabs">
          <span
            onClick={() => setActiveTab("pre-defined")}
            className={`jsx-5f9af3a98e99b444 ${
              activeTab === "pre-defined" ? "active" : ""
            }`}
          >
            PRE-DEFINED
          </span>
          <span
            onClick={() => setActiveTab("custom")}
            className={`jsx-5f9af3a98e99b444 ${
              activeTab === "custom" ? "active" : ""
            }`}
          >
            CUSTOM
          </span>
        </div>
        <div className="jsx-5f9af3a98e99b444 data">
          {/* Conditionally render the content based on the active tab */}
          {activeTab === "pre-defined" ? <PredefinedGame /> : <CustomGame />}
        </div>
      </div>
      <GameActions />
    </div>
  );
}
