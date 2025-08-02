"use client";
import React, { useEffect } from "react";
import PlayersList from "./players-list";
import GameSettings from "./game-settings";
import { useGameStore } from "@/app/stores/useGameStore";
import { useShallow } from "zustand/react/shallow";
import useIsMobile from "@/app/hooks/useIsMobile";

export default function StartGame() {
  const isMobile = useIsMobile();
  const { setView, jwt, cancelMatchmaking } = useGameStore(
    useShallow((state) => ({
      setView: state.setView,
      jwt: state.jwt,
      cancelMatchmaking: state.cancelMatchmaking,
    }))
  );

  const handleBackClick = async () => {
    if (jwt) {
      // If we are in a room, we must cancel the matchmaking first
      await cancelMatchmaking();
    }
    // Then, go back to the home screen
    setView("home");
  };

  return (
    <>
      {/*<div className="jsx-b6582d438744e10b side">
        <div id="garticphone-com_160x600" className="jsx-b6582d438744e10b" />
      </div>*/}
      <div id="content" className="jsx-c2cb53106fc23b05 jsx-3140246774">
        <div
          className="jsx-c2cb53106fc23b05 jsx-3140246774 screen fade-enter-done"
          style={{ transform: "scale(1.0)" }}
        >
          <div className="jsx-5f9af3a98e99b444 lobby">
            {!isMobile && (
              <>
                <div
                  className="jsx-edb3820d2b555758 back"
                  onClick={handleBackClick}
                >
                  <strong className="jsx-edb3820d2b555758">BACK</strong>
                </div>
                <figure className="jsx-c943d1a75f1e99b4" />
              </>
            )}
            <div className="jsx-5f9af3a98e99b444 center">
              <PlayersList />
              <div style={{ marginTop: "15px" }}></div>
              <GameSettings />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
