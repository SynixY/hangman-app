"use client";
import React from "react";
import LogoTopBar from "./logo-top-bar";
import HomeCenter from "./home-center";
import Footer from "./footer";
import useResponsiveScale from "../../hooks/useResponsiveScale";
import useIsMobile from "../../hooks/useIsMobile";
import { useGameStore } from "@/app/stores/useGameStore";
import Ticker from "./ticker"; // 1. Import the new component

function Home() {
  const scale = useResponsiveScale(1800);
  const isMobile = useIsMobile(800);
  const setIsTutorialOpen = useGameStore((state) => state.setIsTutorialOpen);

  // If it's mobile, render the original, clean layout
  if (isMobile) {
    return (
      <>
        <Ticker />
        <div id="content" className="jsx-c2cb53106fc23b05 jsx-3140246774">
          <div
            style={{ transform: `scale(1.0)` }}
            className="jsx-c2cb53106fc23b05 jsx-3140246774 screen"
          >
            <div className="jsx-d0e8374e17477ac4 start">
              <div className="jsx-ddf51313b1730fe4 hamburguer"></div>
              <LogoTopBar />
              <button
                className="jsx-d0e8374e17477ac4 infos"
                onClick={() => setIsTutorialOpen(true)}
              ></button>
              <HomeCenter />
              <Footer />
            </div>
          </div>
        </div>
      </>
    );
  }

  // If it's desktop, render the new layout with the sidebar
  return (
    <>
      <Ticker /> {/* 3. And also add the Ticker here */}
      <div id="content" className="jsx-c2cb53106fc23b05 jsx-3140246774">
        <div
          style={{ transform: `scale(${scale})` }}
          className="jsx-c2cb53106fc23b05 jsx-3140246774 screen"
        >
          <div className="jsx-d0e8374e17477ac4 start">
            <LogoTopBar />
            <HomeCenter />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
