"use client";
import React from "react";

// A simple SVG placeholder for the hangman icon, styled to match the flat UI
const HangmanIcon = ({ color = "#6D28D9" }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 20v-8m0-4V4m0 4h6m-6 0H3m6 0v4m0 0h6m-6 0H3" />
    <circle cx="12" cy="7" r="3" />
  </svg>
);

// A simple SVG placeholder for a shooter icon
const ShooterIcon = ({ color = "#9CA3AF" }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.5"
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
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    height: "100%",
    backgroundColor: "#111827", // A very dark grey for the background
  };

  const getLinkStyle = (active: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    fontFamily: '"Bold", sans-serif',
    fontSize: "1.25rem",
    fontWeight: "900", // Extra bold
    color: active ? "white" : "#9CA3AF", // White for active, grey for inactive
    backgroundColor: active ? "#4F46E5" : "#1F2937", // Bright purple for active, dark grey for inactive
    textDecoration: "none",
    padding: "1rem 1.5rem",
    borderRadius: "16px",
    transition: "all 0.2s ease-in-out",
    cursor: active ? "pointer" : "not-allowed",
    border: "2px solid",
    borderColor: active ? "#818CF8" : "#374151", // Lighter purple border for active
    boxShadow: active ? "0 0 20px rgba(79, 70, 229, 0.5)" : "none",
  });

  const soonTagStyle: React.CSSProperties = {
    fontSize: "0.75rem",
    fontWeight: "bold",
    color: "#111827",
    backgroundColor: "#FBBF24", // A punchy yellow/orange
    padding: "4px 8px",
    borderRadius: "6px",
    marginLeft: "auto", // Pushes the tag to the far right
  };

  return (
    <div style={containerStyle}>
      {games.map((game) => (
        <a key={game.name} href={game.href} style={getLinkStyle(game.active)}>
          {game.icon}
          <span>{game.name.toUpperCase()}</span>
          {!game.active && <span style={soonTagStyle}>SOON</span>}
        </a>
      ))}
    </div>
  );
}
