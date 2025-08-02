import React from "react";
import Logo from "../logo";

function LogoTopBar() {
  return (
    <div className="jsx-d0e8374e17477ac4 logo">
      <span className="jsx-d0e8374e17477ac4">
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            margin: "0 auto",
            outline: "none",
          }}
          role="button"
          aria-label="animation"
          tabIndex={0}
        >
          <Logo></Logo>
        </div>
      </span>
      <p className="jsx-d0e8374e17477ac4">Telefono Senza Fili</p>
    </div>
  );
}

export default LogoTopBar;
