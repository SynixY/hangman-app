"use client";
import Home from "./components/home-page/home-page";
import StartGame from "./components/start-game/start-game";
import { useGameStore } from "./stores/useGameStore"; // Make sure path is correct
import PaymentModal from "./components/payment-modal";
import WinModal from "./components/win-modal";
import Countdown from "./components/start-game/countdown";
import Game from "./components/handman/game";
import ErrorModal from "./components/error";
import { useShallow } from "zustand/shallow";

export default function HomePage() {
  const view = useGameStore((state) => state.view);

  const {
    isWinModalOpen,
    isErrorModalOpen,
    isPaymentModalOpen,
    isCountdownModalOpen,
  } = useGameStore(
    useShallow((state) => ({
      isWinModalOpen: state.isWinModalOpen,
      isPaymentModalOpen: state.isPaymentModalOpen,
      isCountdownModalOpen: state.isCountdownModalOpen,
      isErrorModalOpen: state.isErrorModalOpen,
    }))
  );

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
      {/* <WarningModal /> */} {isWinModalOpen && <WinModal />}{" "}
      {isErrorModalOpen && <ErrorModal />} {renderView()}{" "}
    </>
  );
}
