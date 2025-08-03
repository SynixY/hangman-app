"use client";
import React, { useEffect, useState } from "react";
import { useGameStore } from "@/app/stores/useGameStore"; // Adjust path to your store
import MiniTutorialSteps from "./mini-tutorial-steps";
import { useShallow } from "zustand/shallow";

export default function HomeCenter() {
  // Use local state for the input field

  const { login, errorMessage, isLoading, avatarUrl, globalUsername } =
    useGameStore(
      useShallow((state) => ({
        login: state.login,
        errorMessage: state.errorMessage,
        isLoading: state.isLoading,
        avatarUrl: state.avatarUrl,
        globalUsername: state.username,
      }))
    );

  // Use local state for the input field to avoid writing to storage on every key press
  const [localUsername, setLocalUsername] = useState(globalUsername);

  // FIX: This effect syncs the input field with the stored username when the page loads.
  useEffect(() => {
    setLocalUsername(globalUsername);
  }, [globalUsername]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(localUsername);
  };

  return (
    <div className="jsx-d0e8374e17477ac4 center">
      {/* The form's onSubmit now calls the correct handler */}
      <form onSubmit={handleLogin} className="jsx-d0e8374e17477ac4 user">
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
                  value={localUsername}
                  onChange={(e) => setLocalUsername(e.target.value)}
                  maxLength={20}
                  className="jsx-239914617526db95"
                />
              </span>
            </section>
            {/* The ad link is removed as requested */}
          </div>
        </div>
        <div className="jsx-d0e8374e17477ac4 action">
          <button
            type="submit"
            className="jsx-1e5748a2310b0bd small"
            disabled={isLoading}
          >
            {isLoading ? (
              <strong className="jsx-d0e8374e17477ac4">CONNECTING...</strong>
            ) : (
              <>
                <i className="jsx-bf1d798ec2f16818 playSmall" />{" "}
                <strong className="jsx-d0e8374e17477ac4">START</strong>
              </>
            )}
          </button>
        </div>
      </form>
      {/* The MiniTutorialSteps component is removed as requested */}
      <MiniTutorialSteps />
    </div>
  );
}
