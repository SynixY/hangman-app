"use client";
import React, { useState, useEffect } from "react";
import useIsMobile from "../hooks/useIsMobile";

interface CountdownTimerProps {
  totalDuration: number;
  startTime: number | null;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  totalDuration,
  startTime,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(totalDuration);
  const isMobile = useIsMobile(640);
  useEffect(() => {
    // If there's no start time, we can't calculate anything.
    if (!startTime) {
      setSecondsLeft(totalDuration);
      return;
    }

    // This function calculates the time left and updates the state.
    const updateRemainingTime = () => {
      const elapsedMs = Date.now() - startTime;
      const elapsedSeconds = Math.floor(elapsedMs / 1000);
      const remaining = Math.max(0, totalDuration - elapsedSeconds);
      setSecondsLeft(remaining);
      return remaining;
    };

    // Update the time immediately when the component loads
    const initialRemaining = updateRemainingTime();

    // Only start the interval if there's time left
    if (initialRemaining > 0) {
      const interval = setInterval(() => {
        if (updateRemainingTime() <= 0) {
          clearInterval(interval);
        }
      }, 1000);

      // Cleanup function to clear the interval
      return () => clearInterval(interval);
    }
  }, [startTime, totalDuration]);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  // The progress is now calculated based on the total duration
  const progress = totalDuration > 0 ? secondsLeft / totalDuration : 0;
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
          color: isMobile ? "white" : "#E7E1FF",
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
