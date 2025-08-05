"use client";
import React from "react";

interface ChatMessageProps {
  external: boolean;
  username: string;
  message: string;
  isGuess: boolean;
  avatarUrl: string;
}

// A dedicated, robust component for the avatar.
const ChatAvatar = ({ url }: { url: string }) => (
  <div
    style={{
      width: "46px",
      height: "46px",
      borderRadius: "50%",
      backgroundColor: "transparent", // No background color
      flexShrink: 0,
      overflow: "hidden", // Crucial for making the image circular
    }}
  >
    <img
      src={url}
      alt="avatar"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover", // Prevents the image from stretching
      }}
    />
  </div>
);

export default function ChatMessage({
  external,
  username,
  message,
  avatarUrl,
  isGuess,
}: ChatMessageProps) {
  // Base styles for the message balloon
  const balloonStyle: React.CSSProperties = {
    position: "relative",
    padding: "10px 15px",
    borderRadius: "18px",
    fontFamily: '"Bold", sans-serif',
    fontSize: "15px",
    lineHeight: "1.4",
    maxWidth: "250px",
    wordWrap: "break-word",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  // Conditional styles for guesses, external, and internal messages
  if (isGuess) {
    balloonStyle.backgroundColor = "#FFFBEB";
    balloonStyle.color = "#92400E";
  } else if (external) {
    balloonStyle.backgroundColor = "#FFFFFF";
    balloonStyle.color = "#1F2937";
    balloonStyle.borderBottomLeftRadius = "4px";
  } else {
    balloonStyle.backgroundColor = "#7C3AED";
    balloonStyle.color = "#FFFFFF";
    balloonStyle.borderBottomRightRadius = "4px";
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "10px",
        width: "100%",
        paddingLeft: "20px",
        paddingRight: "20x",
        marginBottom: "1rem",
        // This flips the layout based on who sent the message
        flexDirection: external ? "row" : "row-reverse",
      }}
    >
      <ChatAvatar url={avatarUrl} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // This aligns the username correctly
          alignItems: external ? "flex-start" : "flex-end",
        }}
      >
        <span
          style={{
            fontFamily: '"Black", sans-serif',
            fontSize: "14px",
            color: "#E9D5FF",
            marginBottom: "4px",
            padding: "0 5px",
          }}
        >
          {username}
        </span>

        <div style={balloonStyle}>
          {message}
          {/* This is the new, corrected speech bubble tail */}
          <div
            style={{
              content: '""',
              position: "absolute",
              bottom: "0px",
              width: "0",
              height: "0",
              border: "10px solid transparent",
              // Position the tail on the correct side
              left: external ? "-10px" : "auto",
              right: external ? "auto" : "-10px",
              // This creates the triangle shape pointing in the right direction
              borderBottomColor: external
                ? "transparent"
                : `${balloonStyle.backgroundColor}`,
              borderRightColor: external
                ? `${balloonStyle.backgroundColor}`
                : "transparent",
              transform: external ? "translateY(-5px)" : "translateY(-5px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
