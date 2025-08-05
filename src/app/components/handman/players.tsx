"use client";
import { useGameStore } from "@/app/stores/useGameStore";
import { useShallow } from "zustand/react/shallow";
import PlayerItem from "../player-item"; // Adjust path if necessary

export default function Players() {
  const { players, currentUser, currentTurnPlayer } = useGameStore(
    useShallow((state) => ({
      players: state.players,
      currentUser: state.username,
      currentTurnPlayer: state.currentTurnPlayer,
    }))
  );

  return (
    <div className="jsx-27c6a713a0669d29 players">
      <h4 className="jsx-8a159d9480957b3c">PLAYERS</h4>
      <div className="jsx-27c6a713a0669d29 list">
        <div className="jsx-3560981401 scroll">
          <div className="jsx-3560981401 scrollElements">
            {players.map((player) => (
              <PlayerItem
                key={player.username}
                username={player.username}
                isOwner={currentUser === player.username}
                avatarUrl={player.avatarUrl}
                isCurrentTurn={
                  player.username.toLowerCase() ==
                  currentTurnPlayer?.toLowerCase()
                }
              />
            ))}
          </div>
          <div className="jsx-3560981401 scrollBar">
            <div className="jsx-3560981401 scrollTrack" style={{ top: 4 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
