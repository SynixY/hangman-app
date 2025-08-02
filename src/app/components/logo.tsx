import React from "react";

function Logo() {
  return (
    <>
      <div className="logo-container">
        <div className="hangman-character">
          <img
            src="/images/hangman.png"
            alt="Hanging Character"
            className="hangman-img"
          />
        </div>
        <img
          src="/images/logo.png"
          alt="Hangman Game Logo"
          className="logo-img"
        />
      </div>

      <style jsx>{`
        .logo-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        .logo-img {
          /* Make the logo text responsive */
          max-width: 100%;
          /* Set a new, smaller base width */
          width: 190px;
          height: auto;
          display: block;
        }

        .hangman-img {
          /* Make the character smaller */
          width: 30px;
          height: auto;
        }

        .hangman-character {
          position: absolute;
          top: 30px; /* Adjusted for smaller logo size */
          left: 50%;
          transform-origin: top center;
          animation: sway 4s ease-in-out infinite;
        }

        @keyframes sway {
          0% {
            transform: translateX(-50%) rotate(10deg);
          }
          50% {
            transform: translateX(-50%) rotate(-10deg);
          }
          100% {
            transform: translateX(-50%) rotate(10deg);
          }
        }
      `}</style>
    </>
  );
}

export default Logo;
