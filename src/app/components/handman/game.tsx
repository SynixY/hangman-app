"use client";
import React, { useState, useEffect } from "react";
import Scrapbook from "./scrapbook";
import Players from "./players";
import { useGameStore } from "@/app/stores/useGameStore";

export default function Game() {
  const [isMobile, setIsMobile] = useState(false);
  const setView = useGameStore((state) => state.setView);

  useEffect(() => {
    // Store the original background style
    const originalBackground = document.body.style.backgroundImage;

    // Apply the new background when the component mounts
    document.body.style.backgroundImage =
      "linear-gradient(215deg, rgb(110, 31, 207) 0%, rgb(46, 163, 207) 85%)";

    // This is the cleanup function that runs when the component unmounts
    return () => {
      // Restore the original background
      document.body.style.backgroundImage = originalBackground;
    };
  }, []); // The empty array [] ensures this effect runs only once on mount and unmount

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    // Set the initial value on component mount
    handleResize();

    // Add event listener to update on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        id="content"
        className="jsx-c2cb53106fc23b05 jsx-3140246774"
        style={{ height: isMobile ? "766px" : "100%" }}
      >
        <div
          className="jsx-c2cb53106fc23b05 jsx-3140246774 screen fade-enter-done"
          style={{ transform: isMobile ? "scale(1)" : "scale(1)" }}
        >
          <div className="jsx-380c8a0d0db173e2 book">
            {!isMobile && (
              <>
                {" "}
                <div
                  className="jsx-edb3820d2b555758 exit"
                  onClick={() => setView("home")}
                >
                  <strong className="jsx-edb3820d2b555758">HOME PAGE</strong>
                </div>
                <figure className="jsx-c943d1a75f1e99b4" />{" "}
              </>
            )}
            <div className="jsx-380c8a0d0db173e2 center">
              <Players />
              <Scrapbook />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
