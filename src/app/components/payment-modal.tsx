"use client";
import React, { useState } from "react";
import { useGameStore } from "@/app/stores/useGameStore";
import { useShallow } from "zustand/react/shallow";
import Time from "./countdown-timer"; // Using the new Time component
import useIsMobile from "../hooks/useIsMobile";
import PlayerItem from "./player-item";

// A utility function to shorten the wallet address
const truncateAddress = (address: string | null) => {
  if (!address) return "";
  return `${address.substring(0, 8)}...${address.substring(
    address.length - 8
  )}`;
};

export default function PaymentModal() {
  const [copied, setCopied] = useState(false);
  const isMobile = useIsMobile();
  const {
    isPaymentModalOpen,
    setPaymentModalOpen,
    paymentTimeout,
    currentUserPeelWallet,
    entryFee,
    players,
  } = useGameStore(
    useShallow((state) => ({
      isPaymentModalOpen: state.isPaymentModalOpen,
      setPaymentModalOpen: state.setPaymentModalOpen,
      paymentTimeout: state.paymentTimeout,
      entryFee: state.entryFee,
      currentUserPeelWallet: state.currentUserPeelWallet,
      players: state.players,
    }))
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

  const paidPlayersCount = players.filter((p) => p.has_paid).length;
  const totalPlayers = players.length;

  const playerStyleBase = {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "10px",
    margin: "5px 0",
    width: "100%",
  };

  const waitingStyle = {
    ...playerStyleBase,
    backgroundColor: "#f0f0f5", // A more subtle light gray
  };

  const paidStyle = {
    ...playerStyleBase,
    backgroundColor: "#d4f5e5",
  };

  return (
    <div
      className="jsx-2835833729 background fade-enter-done"
      style={{ zIndex: 100 }}
    >
      <div
        className="jsx-2835833729 content"
        style={{
          width: isMobile ? "100%" : "650px",
          height: isMobile ? "100%" : "auto",
          borderRadius: isMobile ? "0" : "12px",
          transform: "scale(1.0)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Timer positioned at the top right */}
        <div style={{ position: "absolute", top: "15px", right: "50px" }}>
          {paymentTimeout > 0 && <Time initialSeconds={paymentTimeout} />}
        </div>

        <h2 className="jsx-585ea3472e396a52">
          PAYMENT REQUIRED
          <i className="jsx-ff9a91141b223811">
            <span className="jsx-3e55f1c85815f7f6 tooltip">
              Make sure to send the exact amount
            </span>
          </i>
        </h2>

        <div className="jsx-5f9af3a98e99b444 users">
          <div className="jsx-6c5c34bf46e1a27 players">
            {/* Always use the 'scroll' class and include the scrollbar */}
            <div className="jsx-2980934243 scroll">
              <div className="jsx-2980934243 scrollElements">
                {players.map((player) => {
                  const isPaid = player.has_paid;
                  return (
                    <PlayerItem
                      key={player.username}
                      username={player.username}
                      avatarUrl={player.avatarUrl}
                      viewMode={isMobile ? "compact" : "full"}
                      backgroundColor={
                        !isMobile ? (isPaid ? "#d4f5e5" : "#f0f0f5") : undefined
                      }
                      statusText={
                        !isMobile
                          ? isPaid
                            ? "Paid ✔"
                            : "Waiting for payment..."
                          : null
                      }
                      statusIndicatorColor={
                        isMobile ? (isPaid ? "#22c55e" : "#ef4444") : undefined
                      }
                    />
                  );
                })}
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

        {/* --- Main Content Area (Column Layout) --- */}
        <div
          style={{
            width: "100%",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          {/* Top Section: Payment Details */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              padding: isMobile ? "20px 10px" : "20px",
              textAlign: "center",
            }}
          >
            <p
              className="jsx-72a234951d07662"
              style={{
                width: "100%",

                fontFamily: '"Bold", sans-serif',
              }}
            >
              Send exactly <strong>{entryFee} SOL</strong> to this address:
            </p>
            <div
              style={{
                backgroundColor: "#e9e8f2",
                borderRadius: "8px",
                padding: "10px",
                margin: "10px auto",

                maxWidth: "300px",
                border: "2px solid #aca7c6",
                wordBreak: "break-all",
              }}
            >
              <p style={{ fontFamily: "monospace", color: "#301a6b" }}>
                {truncateAddress(currentUserPeelWallet) ?? "Loading address..."}
              </p>
            </div>
            <div
              style={{
                width: "100%",
              }}
            >
              <button
                onClick={handleCopy}
                disabled={!currentUserPeelWallet || copied}
                className="jsx-7a5051b5ea0cbf35 big"
              >
                {copied ? "COPIED ✔" : "COPY ADDRESS"}
              </button>
            </div>
          </div>

          {/* Bottom Section: Player List */}
        </div>
      </div>
    </div>
  );
}
