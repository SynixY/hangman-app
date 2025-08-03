"use client";
import React from "react";
import { useGameStore } from "@/app/stores/useGameStore"; // Adjust path to your store
import MiniTutorialSteps from "./mini-tutorial-steps";

export default function HomeCenter() {
  // Get the necessary state and actions from the store.
  // We only need username, setUsername, and setView.
  const {
    username,
    setUsername,
    setView,
    errorMessage,
    setErrorMessage,
    avatarUrl,
  } = useGameStore();

  const handleGoToLobby = (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    // Validate that the username is not empty
    if (!username.trim()) {
      // If it's empty, set an error message in the store and stop.
      setErrorMessage("Please enter a username before starting.");
      return;
    }
    // If the username is valid, change the view to 'lobby'.
    setView("lobby");
  };

  return (
    <div className="jsx-d0e8374e17477ac4 center">
      {/* The form's onSubmit now calls the correct handler */}
      <form onSubmit={handleGoToLobby} className="jsx-d0e8374e17477ac4 user">
        <div className="jsx-d0e8374e17477ac4 content_tabs">
          <div className="jsx-d0e8374e17477ac4 tabs">
            <span className="jsx-d0e8374e17477ac4 active">ANONYMOUS</span>
            {/* The 'AUTENTICATO' span from the original is removed as requested */}
          </div>
          <div className="jsx-d0e8374e17477ac4 data">
            <section className="jsx-d0e8374e17477ac4">
              <div className="jsx-263140084 avatar">
                <span
                  className="jsx-263140084"
                  style={{ backgroundImage: `url(${avatarUrl})` }}
                />
                <button type="button" className="jsx-263140084" />
              </div>
              <span className="jsx-d0e8374e17477ac4">
                <h4 className="jsx-d0e8374e17477ac4">
                  CHOOSE A CHARACTER AND A NICKNAME
                </h4>
                <input
                  type="text"
                  placeholder="YourCoolNickname"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  maxLength={20}
                  className="jsx-239914617526db95"
                />
              </span>
            </section>
            {/* The ad link is removed as requested */}
          </div>
        </div>
        <div className="jsx-d0e8374e17477ac4 action">
          {/* Display error message if the user tries to proceed with an empty name */}
          {errorMessage && (
            <p
              style={{
                color: "#ff8a8a",
                paddingBottom: "10px",
                textAlign: "center",
              }}
            >
              {errorMessage}
            </p>
          )}
          <button type="submit" className="jsx-1e5748a2310b0bd small">
            <i className="jsx-bf1d798ec2f16818 playSmall" />{" "}
            <strong className="jsx-d0e8374e17477ac4">START</strong>
          </button>
        </div>
      </form>
      {/* The MiniTutorialSteps component is removed as requested */}
      <MiniTutorialSteps />
    </div>
  );
}
