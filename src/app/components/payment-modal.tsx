"use client";
import React, { useState } from "react";
import { useGameStore } from "@/app/stores/useGameStore";
import { shallow, useShallow } from "zustand/shallow";
import CountdownTimer from "./countdown-timer";

function PaymentStatusList() {
  const { players } = useGameStore(
    useShallow((state) => ({
      players: state.players,
    }))
  );

  return (
    <div className="left jsx-5f9af3a98e99b444">
      <h4 className="jsx-8a159d9480957b3c">
        PLAYERS {players.length}/{players.length}
      </h4>
      <div className="users jsx-5f9af3a98e99b444">
        <div className="players jsx-6c5c34bf46e1a27">
          <div className="scroll over top jsx-2980934243">
            <div className="scrollElements jsx-2980934243">
              {players.map((player, index) => {
                const isPaid = player.has_paid;
                // Conditionally apply classes based on payment status
                const userClasses = `user jsx-7347205 ${
                  isPaid ? "show" : "waiting"
                }`;

                return (
                  <div key={index} className={userClasses}>
                    <div className="jsx-3239482990 avatar">
                      <span className="jsx-3239482990" />
                      <i className="jsx-3239482990" />
                    </div>
                    <span className="jsx-7347205">
                      <p className="nick jsx-7347205">{player.username}</p>
                      {/* Sub-text for payment status */}
                      <p
                        className="jsx-7347205"
                        style={{
                          fontSize: "12px",
                          fontFamily: "Bold, sans-serif",
                          color: isPaid ? "#437e73" : "#d1e3ff",
                          textTransform: "none",
                        }}
                      >
                        {isPaid ? "Paid ✔" : "Waiting for payment..."}
                      </p>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentModal() {
  const [copied, setCopied] = useState(false);

  const {
    paymentTimeout,
    currentUserPeelWallet,
    entryFee,
    setPaymentModalOpen,
  } = useGameStore(
    useShallow((state) => ({
      winner: state.winner,
      paymentTimeout: state.paymentTimeout,
      entryFee: state.entryFee,
      currentUserPeelWallet: state.currentUserPeelWallet,
      setPaymentModalOpen: state.setPaymentModalOpen,
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

  return (
    // FIX: Added zIndex to ensure the modal is on top
    <div
      className="jsx-2835833729 background fade-enter-done"
      style={{ zIndex: 100 }}
    >
      <div
        className="jsx-2835833729 content"
        style={{
          background: "transparent",
          padding: 0,
          width: "1050px", // Accommodate two-column layout
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button
          onClick={() => setPaymentModalOpen(false)}
          className="jsx-f1ed09f139fd0ff4 close"
          style={{ top: "10px", right: "10px" }}
        />

        <h2 className="jsx-585ea3472e396a52" style={{ marginBottom: "20px" }}>
          PAYMENT REQUIRED
        </h2>

        <div className="center jsx-5f9af3a98e99b444">
          <PaymentStatusList />

          <div className="right jsx-5f9af3a98e99b444">
            <div className="settings jsx-5f9af3a98e99b444">
              <div
                className="data jsx-5f9af3a98e99b444"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  padding: "20px",
                }}
              >
                {paymentTimeout > 0 && (
                  <CountdownTimer initialSeconds={paymentTimeout} />
                )}
                <p style={{ color: "white", margin: "20px 0" }}>
                  Send exactly <strong>{entryFee} SOL</strong> to this address:
                </p>
                <div
                  style={{
                    backgroundColor: "rgba(38, 28, 92, 0.5)",
                    borderRadius: "8px",
                    padding: "15px",
                    margin: "0 auto",
                    width: "100%",
                    maxWidth: "480px",
                    border: "1px solid #7d63e9",
                    wordBreak: "break-all",
                  }}
                >
                  <code style={{ color: "#eee", fontSize: "1rem" }}>
                    {currentUserPeelWallet ?? "Loading address..."}
                  </code>
                </div>
                <button
                  onClick={handleCopy}
                  disabled={!currentUserPeelWallet || copied}
                  className="jsx-7a5051b5ea0cbf35 big"
                  style={{ marginTop: "25px" }}
                >
                  {copied ? "COPIED ✔" : "COPY ADDRESS"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
