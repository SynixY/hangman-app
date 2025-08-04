"use client";
import React from "react";
import Marquee from "react-fast-marquee";
import useIsMobile from "../../hooks/useIsMobile";

const Ticker = () => {
  const isMobile = useIsMobile(640);

  const tickerContainerStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "rgba(66, 66, 66, 0.75)",
    borderBottom: "2px solid #5cffb6",
    padding: isMobile ? "0.4rem 0" : "0.6rem 0",
    zIndex: 50,
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
  };

  // This style is now just for the text itself
  const textStyle: React.CSSProperties = {
    fontFamily: '"Black", sans-serif',
    fontSize: isMobile ? "14px" : "18px",
    textTransform: "uppercase",
    color: "#5cffb6",
    textShadow: isMobile
      ? "2px 2px 0px rgb(23, 5, 87)"
      : "3px 3px 0px rgb(23, 5, 87)",
  };

  const separatorStyle: React.CSSProperties = {
    height: isMobile ? "18px" : "24px",
    width: "auto",
    margin: "0 2.5rem", // Adds space around the bonk image
  };

  const tickerItems = [
    "More Games Coming Soon",
    "Chess",
    "Strategic Games",
    "Social Games",
    "Shooter",
  ];

  return (
    <div style={tickerContainerStyle}>
      <Marquee gradient={false} speed={60}>
        {tickerItems.map((item, index) => (
          // FIX: Wrap each item and its separator in a flex container
          // This ensures they are always side-by-side.
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <span style={textStyle}>{item}</span>
            <img
              src="/images/bonk-transparent.png"
              alt="bonk separator"
              style={separatorStyle}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Ticker;
