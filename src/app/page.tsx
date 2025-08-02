"use client";
import Home from "./components/home-page/home-page";
import StartGame from "./components/start-game/start-game";
import { useGameStore } from "./stores/useGameStore"; // Make sure path is correct
import PaymentModal from "./components/payment-modal";
import WinModal from "./components/win-modal";
import Countdown from "./components/start-game/countdown";
import Game from "./components/handman/game";
import { useEffect } from "react";

export default function HomePage() {
  const view = useGameStore((state) => state.view);
  const isPaymentModalOpen = useGameStore((state) => state.isPaymentModalOpen);
  const isCountdownModalOpen = useGameStore(
    (state) => state.isCountdownModalOpen
  );
  const isWinModalOpen = useGameStore((state) => state.isWinModalOpen);

  // This function will render the correct component based on the current view state
  const renderView = () => {
    switch (view) {
      case "lobby":
        return <StartGame />;
      case "game":
        return <Game />; // TODO: Add case for 'finished'
      case "home":
      default:
        return <Home />;
    }
  };

  return (
    <>
      {/* Modals can still be here if they are global */}{" "}
      {isPaymentModalOpen && <PaymentModal />}{" "}
      {isCountdownModalOpen && <Countdown />} {/* <LangModal /> */}{" "}
      {/* <WarningModal /> */} {isWinModalOpen && <WinModal />} {renderView()}{" "}
    </>
  );
}
