import React from "react";
import Logo from "../logo";
import LangDropdown from "./lang-dropdown";
import LogoTopBar from "./logo-top-bar";
import HomeCenter from "./home-center";
import Footer from "./footer";

function Home() {
  return (
    <>
      <div className="jsx-b6582d438744e10b side">
        <div id="garticphone-com_160x600"></div>
      </div>
      <div id="content" className="jsx-c2cb53106fc23b05 jsx-3140246774">
        <div
          style={{ transform: "scale(1.0)" }}
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
