"use client";

import { useState, useEffect } from "react";

/**
 * A custom hook to detect if the screen is mobile-sized based on a breakpoint.
 * @param {number} breakpoint The width in pixels to consider as the mobile breakpoint.
 * @returns {boolean} True if the window width is less than or equal to the breakpoint.
 */
const useIsMobile = (breakpoint = 640) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler immediately to set the initial state
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
