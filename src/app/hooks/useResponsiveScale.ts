"use client";

import { useState, useEffect } from "react";

/**
 * A custom hook that calculates a responsive scale factor based on window width.
 * @param baseWidth The width (in pixels) at which the scale should be 1.0. Defaults to 1300.
 * @returns The calculated scale factor, capped at a maximum of 1.0.
 */
const useResponsiveScale = (baseWidth = 1300) => {
  const [scale, setScale] = useState(1.0);

  useEffect(() => {
    const handleResize = () => {
      // Normalize scale based on the base width, but don't go larger than 1.0
      const newScale = Math.min(1.0, window.innerWidth / baseWidth);
      setScale(newScale);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial scale

    return () => window.removeEventListener("resize", handleResize);
  }, [baseWidth]);

  return scale;
};

export default useResponsiveScale;
