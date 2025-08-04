"use client";
import React from "react";
import { useGameStore } from "@/app/stores/useGameStore";
import { useShallow } from "zustand/shallow";
import PlayerItem from "../player-item"; // Adjust path if necessary
import useIsMobile from "../../hooks/useIsMobile";

export default function PlayersList() {
  const { serverPlayers, currentUser, avatarUrl } = useGameStore(
    useShallow((state) => ({
      serverPlayers: state.players,
      currentUser: state.username,
      avatarUrl: state.avatarUrl,
    }))
  );
  const maxPlayers = 4;

  const displayPlayers: {
    username: string;
    isOwner: boolean;
    avatarUrl?: string;
  }[] = [];

  if (currentUser) {
    const currentUserData = serverPlayers.find(
      (p) => p.username === currentUser
    );
    displayPlayers.push({
      username: currentUser,
      isOwner: true,
      avatarUrl: avatarUrl,
    });
  }

  serverPlayers.forEach((player) => {
    if (player.username !== currentUser) {
      displayPlayers.push({ ...player, isOwner: false });
    }
  });

  const numEmptySlots = Math.max(0, maxPlayers - displayPlayers.length);

  return (
    <div className="jsx-5f9af3a98e99b444 left">
      {/* This dropdown is now always visible */}
      <span className="jsx-5f9af3a98e99b444">
        <label className="jsx-833d62ffcae7f9f select">
          <select className="jsx-833d62ffcae7f9f" defaultValue={maxPlayers}>
            <option value="4" className="jsx-833d62ffcae7f9f">
              4 PLAYERS
            </option>
            <option value="8" className="jsx-833d62ffcae7f9f">
              8 PLAYERS
            </option>
          </select>
        </label>
      </span>
      <div className="jsx-5f9af3a98e99b444 users">
        <div className="jsx-6c5c34bf46e1a27 players">
          {/* Always use the 'scroll' class and include the scrollbar */}
          <div className="jsx-2980934243 scroll">
            <div className="jsx-2980934243 scrollElements">
              {displayPlayers.map((player) => (
                <PlayerItem
                  key={player.username}
                  username={player.username}
                  isOwner={player.isOwner}
                  avatarUrl={player.avatarUrl}
                />
              ))}
              {Array.from({ length: numEmptySlots }).map((_, i) => (
                <PlayerItem key={`empty-${i}`} isEmpty={true} />
              ))}
            </div>
            <div className="jsx-2980934243 scrollBar">
              <div
                className="jsx-2980934243 scrollTrack"
                style={{ top: "4px" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
