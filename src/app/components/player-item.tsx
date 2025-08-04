import React from "react";

interface PlayerItemProps {
  username?: string;
  isOwner?: boolean;
  isEmpty?: boolean;
  statusText?: string | null;
  customClassName?: string;
  avatarUrl?: string;
  backgroundColor?: string; // Prop for custom background color
  statusIndicatorColor?: string; // Prop for the mobile status dot
  viewMode?: "full" | "compact"; // Prop to switch between desktop/mobile view
  isCurrentTurn?: boolean;
}

const PlayerItem: React.FC<PlayerItemProps> = ({
  username,
  isOwner = false,
  isEmpty = false,
  statusText = null,
  customClassName = "",
  avatarUrl = "/images/avatar/1.png",
  backgroundColor,
  statusIndicatorColor,
  viewMode = "full",
  isCurrentTurn = false,
}) => {
  if (isEmpty) {
    return (
      <div className="jsx-e5240cdf0a94de60 jsx-7347205 user empty">
        <div className="jsx-e5240cdf0a94de60 jsx-7347205 avatar" />
        <span className="jsx-e5240cdf0a94de60 jsx-7347205">
          <p className="jsx-e5240cdf0a94de60 jsx-7347205">EMPTY</p>
        </span>
      </div>
    );
  }

  const userClasses = [
    "jsx-e5240cdf0a94de60",
    "jsx-7347205",
    "user",
    customClassName,
    isCurrentTurn ? "is-turn" : "", // Conditionally add class
  ]
    .join(" ")
    .trim();

  const rootStyle: React.CSSProperties = {
    position: "relative",
    // Use a specific color for the current turn, otherwise use the prop or default
    backgroundColor: isCurrentTurn ? "#ffc107" : backgroundColor,
  };

  const statusTextStyle: React.CSSProperties = {
    fontSize: "12px",
    fontFamily: "Bold, sans-serif",
    color: statusText === "Paid ✔" ? "#437e73" : "#555",
    textTransform: "none",
  };

  const avatarStyle = {
    backgroundImage: `url(${avatarUrl})`,
    // --- REPLACE THE OLD STYLE WITH THIS ---
    aspectRatio: "1 / 1", // This forces the container to be a perfect square
    width: "100%", // Allow the parent to control the size
    height: "100%",
    borderRadius: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className={userClasses} style={rootStyle}>
      <div className="jsx-3239482990 avatar">
        <span className="jsx-3239482990" style={avatarStyle} />
        <i className="jsx-3239482990" />

        {statusIndicatorColor && (
          <div
            style={{
              position: "absolute",
              bottom: "-5px",
              right: "-5px",
              width: "14px",
              height: "14px",
              backgroundColor: statusIndicatorColor,
              borderRadius: "50%",
              border: "2px solid white",
            }}
          />
        )}
      </div>

      {viewMode === "full" && (
        <>
          <span className="jsx-e5240cdf0a94de60 jsx-7347205">
            <p className="jsx-e5240cdf0a94de60 jsx-7347205 nick">{username}</p>
            {statusText && (
              <p
                className="jsx-e5240cdf0a94de60 jsx-7347205"
                style={statusTextStyle}
              >
                {statusText}
              </p>
            )}
          </span>
          {isOwner && (
            <figure className="jsx-e5240cdf0a94de60 jsx-7347205 owner" />
          )}
        </>
      )}
    </div>
  );
};

export default PlayerItem;
