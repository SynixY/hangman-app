"use client";
import React from "react";

// Helper component for the icons
const GameIcon = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      height: "64px",
      width: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "0.5rem",
    }}
  >
    {children}
  </div>
);

// A simple SVG placeholder for the hangman icon
const HangmanIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 20v-8m0-4V4m0 4h6m-6 0H3m6 0v4m0 0h6m-6 0H3" />
    <circle cx="12" cy="7" r="3" />
  </svg>
);

// A simple SVG placeholder for a shooter icon
const ShooterIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15.5 4.5l5 5M8.5 19.5l-5-5M2 2l20 20M12 22a10 10 0 100-20 10 10 0 000 20z" />
  </svg>
);

const games = [
  { name: "Hangman", href: "#", active: true, icon: <HangmanIcon /> },
  { name: "Shooter", href: "#", active: false, icon: <ShooterIcon /> },
];

export default function GameSelector() {
  const containerStyle: React.CSSProperties = {
    padding: "2rem 1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem", // Increased gap
    height: "100%",
    background: "transparent", // No background, it will inherit from parent
  };

  const getLinkStyle = (active: boolean): React.CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: '"Bold", sans-serif',
    fontSize: "1rem",
    fontWeight: "bold",
    color: active ? "#3730A3" : "#A78BFA", // Dark purple for active, lighter for inactive
    backgroundColor: "#E9D5FF", // Light lilac background
    textDecoration: "none",
    padding: "1rem",
    borderRadius: "16px", // More rounded corners
    transition: "all 0.2s ease-in-out",
    cursor: active ? "pointer" : "not-allowed",
    border: "4px solid",
    borderColor: active ? "#34D399" : "#C4B5FD", // Green for active, lilac for inactive
    opacity: active ? 1 : 0.6,
    minHeight: "140px",
  });

  const soonTagStyle: React.CSSProperties = {
    fontSize: "0.7rem",
    fontWeight: "bold",
    color: "#4C1D95",
    marginTop: "4px",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: "2px 8px",
    borderRadius: "6px",
  };

  return (
    <div style={containerStyle}>
      {games.map((game) => (
        <a key={game.name} href={game.href} style={getLinkStyle(game.active)}>
          <GameIcon>{game.icon}</GameIcon>
          <span style={{ textAlign: "center" }}>{game.name.toUpperCase()}</span>
          {!game.active && <span style={soonTagStyle}>SOON</span>}
        </a>
      ))}
    </div>
  );
}
