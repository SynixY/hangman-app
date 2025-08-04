"use client";
import useIsMobile from "@/app/hooks/useIsMobile";
import { useGameStore } from "@/app/stores/useGameStore";
import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

// Define the data for each tutorial step, now including an image source
const tutoSteps = [
  {
    title: "1. JOIN A MATCH",
    text: "Pay the entry fee in SOL. You'll be matched with up to 3 other players.",
    imageSrc: "/images/tutorial/step0.png",
  },
  {
    title: "2. TAKE TURNS",
    text: "Each player gets timed turns to guess a letter or the word.",
    imageSrc: "/images/tutorial/step1.png",
  },
  {
    title: "3. AVOID MISTAKES",
    text: "Wrong guesses build the hangman. Run out of tries and you're out!",
    imageSrc: "/images/tutorial/step2.png",
  },
  {
    title: "4. WIN $ARCADE",
    text: "First to solve the word wins the full prize pool in $ARCADE.",
    imageSrc: "/images/tutorial/step3.png",
  },
  {
    title: "5. OR OUTLAST",
    text: "If others are eliminated, the last one standing wins by default.",
    imageSrc: "/images/tutorial/step4.png",
  },
];

export default function MiniTutorialSteps() {
  const [step, setStep] = useState(0);
  const isMobile = useIsMobile(640);
  const { isTutorialOpen, setIsTutorialOpen } = useGameStore(
    useShallow((state) => ({
      isTutorialOpen: state.isTutorialOpen,
      setIsTutorialOpen: state.setIsTutorialOpen,
    }))
  );

  // This determines if the component should behave as a pop-up modal
  const isModal = isMobile && isTutorialOpen;

  useEffect(() => {
    // Only animate the steps if the tutorial is visible
    if (!isModal && isMobile) return;

    const interval = setInterval(() => {
      setStep((s) => (s + 1 >= tutoSteps.length ? 0 : s + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isModal, isMobile]);

  // On mobile, don't render anything unless the modal is opened
  if (isMobile && !isTutorialOpen) {
    return null;
  }

  // The 'showMobile' class makes it appear as a modal
  const containerClasses = `jsx-171f7a710ec7f2d8 tutorial step${step}${
    isModal ? " showMobile" : ""
  }`;

  return (
    <div className={containerClasses}>
      <div className="jsx-171f7a710ec7f2d8">
        <h3 className="jsx-171f7a710ec7f2d8">HOW TO PLAY</h3>
        <button
          onClick={() => setIsTutorialOpen(false)}
          className="jsx-171f7a710ec7f2d8 close"
        ></button>
        <div className="jsx-171f7a710ec7f2d8 steps">
          {/* Map over the data to render each step dynamically */}
          {tutoSteps.map((tutoStep, index) => (
            <div className="jsx-171f7a710ec7f2d8" key={index}>
              <figure className="jsx-171f7a710ec7f2d8">
                {/* Use a standard img tag with the source from our data array */}
                <img
                  src={tutoStep.imageSrc}
                  alt={tutoStep.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </figure>
              <span className="jsx-171f7a710ec7f2d8">
                <h4 className="jsx-171f7a710ec7f2d8">{tutoStep.title}</h4>
                <p className="jsx-171f7a710ec7f2d8">{tutoStep.text}</p>
                {/* Conditionally render the Discord link for the last step */}
                {index === 5 && (
                  <a
                    href="https://discord.gg/gartic"
                    target="_blank"
                    className="jsx-171f7a710ec7f2d8"
                  >
                    JOIN OUR GROUP
                  </a>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
      <ul className="jsx-171f7a710ec7f2d8">
        {/* Map to create the step indicator dots */}
        {tutoSteps.map((_, index) => (
          <li className="jsx-171f7a710ec7f2d8" key={index}>
            <svg className="jsx-171f7a710ec7f2d8">
              <circle
                cx={14}
                cy={14}
                r={12}
                className="jsx-171f7a710ec7f2d8 loader go"
              />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
}
