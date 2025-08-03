import React from "react";

interface ChatMessageProps {
  external: boolean;
  username: string;
  message: string;
  isGuess: boolean;
  avatarUrl: string;
}

export default function ChatMessage({
  external,
  username,
  message,
  avatarUrl,
  isGuess,
}: ChatMessageProps) {
  // A guess can have a different style, e.g., a "waiting" blue background
  const balloonClass = `jsx-d889a1c61adf7b0c balloon ${
    isGuess ? "waiting" : ""
  }`;

  const avatarStyle = {
    backgroundImage: `url(${avatarUrl})`,
  };

  const messageStyle = {
    backgroundColor: isGuess ? "#FFFBEB" : external ? "#F3F4F6" : "#4F46E5",
    color: isGuess ? "#92400E" : external ? "#1F2937" : "#FFFFFF",
    border: isGuess ? "1px solid #FBBF24" : "none",
  };
  // Current user's message (right-aligned)
  if (!external) {
    return (
      <div className="jsx-380c8a0d0db173e2 item">
        <div className="jsx-d889a1c61adf7b0c answerBalloon answer">
          <div className="jsx-d889a1c61adf7b0c">
            <span className="jsx-d889a1c61adf7b0c">{username}</span>
            <div className={balloonClass} style={messageStyle}>
              <span className="jsx-d889a1c61adf7b0c">{message}</span>
            </div>
          </div>
          <div className="jsx-4181276377 avatar">
            <span className="jsx-4181276377" style={avatarStyle} />
          </div>
        </div>
      </div>
    );
  }

  // Other players' messages (left-aligned)
  return (
    <div className="jsx-380c8a0d0db173e2 item">
      <div className="jsx-3852781a54d26fc4 drawBalloon drawing">
        <div className="jsx-3109622701 avatar">
          <span className="jsx-3109622701" style={avatarStyle} />
        </div>
        <div className="jsx-3852781a54d26fc4">
          <span className="jsx-3852781a54d26fc4 nick">{username}</span>
          <div className={balloonClass} style={messageStyle}>
            <span className="jsx-d889a1c61adf7b0c">{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
