"use client"; // This component now uses hooks, so it must be a client component.

import React from "react";
import LogoTopBar from "./logo-top-bar";
import HomeCenter from "./home-center";
import Footer from "./footer";
import useResponsiveScale from "../../hooks/useResponsiveScale"; // Adjust path if needed
import useIsMobile from "../../hooks/useIsMobile"; // Adjust path if needed
import { useGameStore } from "@/app/stores/useGameStore"; // Adjust path if needed

function Home() {
  const scale = useResponsiveScale(1300);
  const isMobile = useIsMobile(640);
  const setIsTutorialOpen = useGameStore((state) => state.setIsTutorialOpen);

  return (
    <>
      {/*<div className="jsx-b6582d438744e10b side">
        <div id="garticphone-com_160x600"></div>
      </div>*/}
      <div id="content" className="jsx-c2cb53106fc23b05 jsx-3140246774">
        <div
          style={{ transform: `scale(${!isMobile ? scale : 1.0})` }}
          className="jsx-c2cb53106fc23b05 jsx-3140246774 screen"
        >
          <div className="jsx-d0e8374e17477ac4 start">
            {isMobile ? (
              <>
                <div className="jsx-ddf51313b1730fe4 hamburguer"></div>
                <LogoTopBar />
                <button
                  className="jsx-d0e8374e17477ac4 infos"
                  onClick={() => setIsTutorialOpen(true)}
                ></button>
              </>
            ) : (
              // On desktop, show the full top bar
              <LogoTopBar />
            )}
            <HomeCenter />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
