"use client";
import React, { useState } from "react";
import { useGameStore } from "@/app/stores/useGameStore";
import { useShallow } from "zustand/react/shallow";
import Time from "./countdown-timer";
import useIsMobile from "../hooks/useIsMobile";
import PlayerItem from "./player-item";

const truncateAddress = (address: string | null) => {
  if (!address) return "";
  return `${address.substring(0, 8)}...${address.substring(
    address.length - 8
  )}`;
};

export default function PaymentModal() {
  const [copied, setCopied] = useState(false);
  const isMobile = useIsMobile(800);

  const {
    isPaymentModalOpen,
    paymentTimeout,
    currentUserPeelWallet,
    entryFee,
    username,
    players,
    paymentStartTime,
    availableGameModes,
    gameMode,
    difficulty,
  } = useGameStore(
    useShallow((state) => ({
      isPaymentModalOpen: state.isPaymentModalOpen,
      paymentTimeout: state.paymentTimeout,
      entryFee: state.entryFee,
      currentUserPeelWallet: state.currentUserPeelWallet,
      players: state.players,
      username: state.username,
      paymentStartTime: state.paymentStartTime,
      availableGameModes: state.availableGameModes,
      gameMode: state.gameMode,
      difficulty: state.difficulty,
    }))
  );

  const currentGameModeDetails = availableGameModes.find(
    (m) => m.mode === gameMode && m.difficulty === difficulty
  );

  const handleCopy = () => {
    if (currentUserPeelWallet) {
      navigator.clipboard.writeText(currentUserPeelWallet).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  if (!isPaymentModalOpen) {
    return null;
  }

  const renderDesktopLayout = () => (
    <>
      <div style={{ position: "absolute", top: "15px", right: "30px" }}>
        {paymentTimeout > 0 && (
          <Time totalDuration={paymentTimeout} startTime={paymentStartTime} />
        )}
      </div>
      <h2
        className="jsx-585ea3472e396a52"
        style={{ color: "#301a6b", marginBottom: "1.5rem" }}
      >
        PAYMENT REQUIRED
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "350px 1fr",
          gap: "2rem",
          width: "100%",
          flex: 1,
          alignItems: "start",
        }}
      >
        {/* Column 1: Players List */}
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <h3
            style={{
              fontFamily: '"Black", sans-serif',
              color: "#301a6b",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            PLAYERS
          </h3>
          <div
            className="users"
            style={{
              maxHeight: "350px",
              overflowY: "auto",
              backgroundColor: "rgba(38, 28, 92, 0.05)",
              borderRadius: "10px",
              padding: "5px",
            }}
          >
            {players.map((player) => (
              <PlayerItem
                key={player.username}
                username={player.username}
                avatarUrl={player.avatarUrl}
                viewMode={"full"}
                isOwner={player.username === username}
                statusText={player.has_paid ? "Paid ✔" : "Waiting..."}
                backgroundColor={player.has_paid ? "#d4f5e5" : "#f0f0f5"}
              />
            ))}
          </div>
        </div>
        {/* Column 2: Game Details & Payment Info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.5rem",
            paddingTop: "2.5rem",
          }}
        >
          {currentGameModeDetails && (
            <div
              style={{
                backgroundColor: "#f3f4f6",
                borderRadius: "12px",
                padding: "1rem",
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={currentGameModeDetails.imageUrl}
                alt={currentGameModeDetails.name}
                style={{ width: "120px", height: "auto", margin: "0 auto" }}
              />
              <h4
                style={{
                  color: "#301a6b",
                  fontFamily: '"Black", sans-serif',
                  margin: "0.5rem 0",
                }}
              >
                {currentGameModeDetails.name}
              </h4>
              <p
                style={{
                  color: "#444",
                  fontSize: "12px",
                  fontFamily: "Bold, sans-serif",
                }}
              >
                {currentGameModeDetails.description}
              </p>
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <p
              className="jsx-72a234951d07662"
              style={{ fontFamily: '"Bold", sans-serif', color: "#444" }}
            >
              Send exactly <strong>{entryFee} SOL</strong> to this address:
            </p>
            <div
              style={{
                backgroundColor: "#e9e8f2",
                borderRadius: "8px",
                padding: "10px",
                margin: "10px auto",
                width: "100%",
                maxWidth: "400px",
                border: "2px solid #aca7c6",
                wordBreak: "break-all",
              }}
            >
              <p style={{ fontFamily: "monospace", color: "#301a6b" }}>
                {truncateAddress(currentUserPeelWallet) ?? "Loading address..."}
              </p>
            </div>
            <div>
              <button
                onClick={handleCopy}
                disabled={!currentUserPeelWallet || copied}
                className="jsx-7a5051b5ea0cbf35 big"
              >
                {copied ? "COPIED ✔" : "COPY ADDRESS"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderMobileLayout = () => (
    <>
      <div style={{ position: "absolute", top: "15px", right: "20px" }}>
        {paymentTimeout > 0 && (
          <Time totalDuration={paymentTimeout} startTime={paymentStartTime} />
        )}
      </div>

      <h2
        className="jsx-585ea3472e396a52"
        style={{ color: "white", flexShrink: 0 }}
      >
        PAYMENT REQUIRED
      </h2>

      <div style={{ width: "100%", padding: "0 1rem", flexShrink: 0 }}>
        <h3
          style={{
            fontFamily: '"Black", sans-serif',
            color: "#5cffb6",
            textAlign: "center",
            textShadow: "2px 2px 0px rgb(23, 5, 87)",
          }}
        >
          PLAYERS
        </h3>
        <div
          className="users"
          style={{ maxHeight: "120px", overflowY: "auto" }}
        >
          {players.map((player) => (
            <PlayerItem
              key={player.username}
              username={player.username}
              avatarUrl={player.avatarUrl}
              viewMode="compact"
              isOwner={player.username === username}
              statusIndicatorColor={player.has_paid ? "#22c55e" : "#ef4444"}
            />
          ))}
        </div>
      </div>

      {currentGameModeDetails && (
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "1rem",
            margin: "0 1rem",
            textAlign: "center",
            boxShadow: "0 0 15px rgba(255,255,255,0.3)",
            flexShrink: 0,
          }}
        >
          <img
            src={currentGameModeDetails.imageUrl}
            alt={currentGameModeDetails.name}
            style={{ width: "120px", height: "auto", margin: "0 auto" }}
          />
          <h4
            style={{
              color: "#301a6b",
              fontFamily: '"Black", sans-serif',
              margin: "0.5rem 0",
            }}
          >
            {currentGameModeDetails.name}
          </h4>
          <p
            style={{
              color: "#444",
              fontSize: "12px",
              fontFamily: "Bold, sans-serif",
            }}
          >
            {currentGameModeDetails.description}
          </p>
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        <p
          className="jsx-72a234951d07662"
          style={{ fontFamily: '"Bold", sans-serif', color: "white" }}
        >
          Send exactly <strong>{entryFee} SOL</strong> to this address:
        </p>
        <div
          style={{
            backgroundColor: "#e9e8f2",
            borderRadius: "8px",
            padding: "10px",
            margin: "10px auto",
            width: "100%",
            maxWidth: "400px",
            border: "2px solid #aca7c6",
            wordBreak: "break-all",
          }}
        >
          <p style={{ fontFamily: "monospace", color: "#301a6b" }}>
            {truncateAddress(currentUserPeelWallet) ?? "Loading address..."}
          </p>
        </div>
        <div>
          <button
            onClick={handleCopy}
            disabled={!currentUserPeelWallet || copied}
            className="jsx-7a5051b5ea0cbf35 big"
          >
            {copied ? "COPIED ✔" : "COPY ADDRESS"}
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div
      className="jsx-2835833729 background fade-enter-done"
      style={{ zIndex: 100 }}
    >
      <div
        className="jsx-2835833729 content"
        style={{
          width: isMobile ? "100%" : "850px", // Made desktop wider
          height: isMobile ? "100%" : "auto",
          maxHeight: "90vh",
          borderRadius: isMobile ? "0" : "12px",
          transform: "scale(1.0)",
          display: "flex",
          flexDirection: "column",
          justifyContent: isMobile ? "space-around" : "flex-start",
          padding: isMobile ? "0" : "25px 30px",
        }}
      >
        {isMobile ? renderMobileLayout() : renderDesktopLayout()}
      </div>
    </div>
  );
}
