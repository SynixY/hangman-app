"use client";
import React from "react";
import LogoTopBar from "./logo-top-bar";
import HomeCenter from "./home-center";
import Footer from "./footer";
import useResponsiveScale from "../../hooks/useResponsiveScale";
import useIsMobile from "../../hooks/useIsMobile";
import { useGameStore } from "@/app/stores/useGameStore";
import GameSelector from "./game-selector";

function Home() {
  const scale = useResponsiveScale(1800);
  console.log(scale);
  const isMobile = useIsMobile(800);
  const setIsTutorialOpen = useGameStore((state) => state.setIsTutorialOpen);

  // If it's mobile, render the original, clean layout
  if (isMobile) {
    return (
      <>
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
      {/* Column 2: Main Content */}
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
