"use client";
import { useGameStore } from "@/app/stores/useGameStore";
import { useShallow } from "zustand/react/shallow";

export default function Players() {
  const { players, currentUser } = useGameStore(
    useShallow((state) => ({
      players: state.players,
      currentUser: state.username,
    }))
  );

  return (
    <div className="jsx-27c6a713a0669d29 players">
      <h4 className="jsx-8a159d9480957b3c">GAMBLERS</h4>
      <div className="jsx-27c6a713a0669d29 list">
        <div className="jsx-3560981401 scroll">
          <div className="jsx-3560981401 scrollElements">
            {players.map((player) => (
              <div
                key={player.username}
                className="jsx-e5240cdf0a94de60 jsx-7347205 user show"
              >
                <div className="jsx-4181276377 avatar">
                  <span className="jsx-4181276377" />
                  {/* We can add logic later for different icons */}
                  {/* <i className="jsx-4181276377" /> */}
                </div>
                <span className="jsx-e5240cdf0a94de60 jsx-7347205">
                  <p className="jsx-e5240cdf0a94de60 jsx-7347205 nick">
                    {player.username}
                  </p>
                </span>
                {/* Show owner icon for the current player */}
                {currentUser === player.username && (
                  <figure className="jsx-e5240cdf0a94de60 jsx-7347205 owner" />
                )}
              </div>
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
