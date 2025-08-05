"use client";
import React, { useEffect, useState } from "react";
import { useGameStore } from "@/app/stores/useGameStore";
import Number3 from "./number-3";
import Number2 from "./number-2";
import Number1 from "./number-1";
import { useShallow } from "zustand/shallow";

export default function Countdown() {
  const [countdown, setCountdown] = useState(3);
  const setView = useGameStore((state) => state.setView);
  const { setCountdownModalOpen } = useGameStore(
    useShallow((state) => ({
      setCountdownModalOpen: state.setCountdownModalOpen,
    }))
  );

  useEffect(() => {
    // This timer just ticks the number down
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // This effect runs when the number changes
    if (countdown <= 0) {
      // When the countdown is finished, close the modal and switch the page view
      setCountdownModalOpen(false);
      setView("game");
    }
  }, [countdown, setView, setCountdownModalOpen]);

  return (
    <div
      className="jsx-632766508 fade-enter-done"
      style={{ zIndex: 200, height: "100%" }}
    >
      <span className="jsx-632766508 lottie">
        {countdown === 3 && <Number3 />}
        {countdown === 2 && <Number2 />}
        {countdown === 1 && <Number1 />}
      </span>
    </div>
  );
}
