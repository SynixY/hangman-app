"use client";
import React from "react";
import { useGameStore } from "@/app/stores/useGameStore";
import { useShallow } from "zustand/shallow";
export default function PlayersList() {
  const { serverPlayers, currentUser } = useGameStore(
    useShallow((state) => ({
      serverPlayers: state.players,
      currentUser: state.username,
    }))
  );
  const maxPlayers = 4; // This could come from the store later

  // The list of players to display on screen.
  const displayPlayers: { username: string; isOwner: boolean }[] = [];
  // 1. Add the current user to the list first, if they exist.
  if (currentUser) {
    displayPlayers.push({ username: currentUser, isOwner: true });
  }

  // 2. Add other players from the server, making sure not to add the current user again.
  serverPlayers.forEach((player) => {
    if (player.username !== currentUser) {
      displayPlayers.push({ username: player.username, isOwner: false });
    }
  });

  return (
    <div className="jsx-5f9af3a98e99b444 left">
      <h4 className="jsx-8a159d9480957b3c">
        PLAYERS {displayPlayers.length}/{maxPlayers}
      </h4>
      <div className="jsx-5f9af3a98e99b444 users">
        <div className="jsx-6c5c34bf46e1a27 players">
          <div className="jsx-2980934243 scroll over top">
            <div className="jsx-2980934243 scrollElements">
              {/* Render the constructed list of players */}
              {displayPlayers.map((player) => (
                <div
                  key={player.username}
                  className="jsx-e5240cdf0a94de60 jsx-7347205 user"
                >
                  <div className="jsx-3239482990 avatar">
                    <span className="jsx-3239482990" />
                    <i className="jsx-3239482990" />
                  </div>
                  <span className="jsx-e5240cdf0a94de60 jsx-7347205">
                    <p className="jsx-e5240cdf0a94de60 jsx-7347205 nick">
                      {player.username}
                    </p>
                  </span>
                  {/* Show owner icon for the current player */}
                  {player.isOwner && (
                    <figure className="jsx-e5240cdf0a94de60 jsx-7347205 owner" />
                  )}
                </div>
              ))}
              {/* 3. Fill remaining slots with empty placeholders */}
              {Array.from({ length: maxPlayers - displayPlayers.length }).map(
                (_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="jsx-e5240cdf0a94de60 jsx-7347205 user empty"
                  >
                    <div className="jsx-e5240cdf0a94de60 jsx-7347205 avatar" />
                    <span className="jsx-e5240cdf0a94de60 jsx-7347205">
                      <p className="jsx-e5240cdf0a94de60 jsx-7347205">EMPTY</p>
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
