"use client";
import React, { useState, useEffect } from "react";
import useIsMobile from "../hooks/useIsMobile";

interface CountdownTimerProps {
  initialSeconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialSeconds }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const isMobile = useIsMobile(640);
  useEffect(() => {
    // Ensure we don't start a timer if the initial time is 0
    if (initialSeconds <= 0) return;

    // Reset the timer if the initialSeconds prop changes
    setSecondsLeft(initialSeconds);

    const interval = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [initialSeconds]);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = secondsLeft / initialSeconds;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div
      style={{
        position: "relative",
        width: "80px",
        height: "80px",
        fontFamily: '"Bold", sans-serif',
      }}
    >
      <svg width="80" height="80" viewBox="0 0 120 120">
        {/* Background Circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#000000"
          strokeOpacity="0.2"
          strokeWidth={isMobile ? "10" : "15"}
        />
        {/* Progress Circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={isMobile ? "white" : "#7661c9"}
          strokeWidth={isMobile ? "10" : "15"}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "24px",
          textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
        }}
      >
        {secondsLeft}
      </div>
    </div>
  );
};

export default CountdownTimer;
