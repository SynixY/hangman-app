"use client";
import { BACKEND_URL } from "@/app/stores/useGameStore";
import React, { useEffect, useState } from "react";
import { BsTwitterX } from "react-icons/bs";

export default function Footer() {
  const [treasuryAddress, setTreasuryAddress] = useState("Loading...");

  useEffect(() => {
    // Fetch the address from the new backend endpoint
    const fetchAddress = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/config/treasury`);
        if (!response.ok) {
          console.error("Failed to fetch address");
        }
        const data = await response.json();
        if (data.reward_token_mint_address) {
          setTreasuryAddress(data.reward_token_mint_address);
        } else {
          setTreasuryAddress("not live yet");
        }
      } catch (error) {
        console.error("Could not fetch treasury address:", error);
        setTreasuryAddress("not live yet");
      }
    };

    fetchAddress();
  }, []);
  return (
    <footer className="jsx-ad15c1348c48af6b">
      <span className="jsx-ad15c1348c48af6b" style={{ width: "100%" }}>
        <nav
          className="jsx-ad15c1348c48af6b"
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <a
            className="jsx-ad15c1348c48af6b"
            href="https://letsbonk.fun/token/"
          >
            CA: {treasuryAddress}
          </a>
          <hr className="jsx-ad15c1348c48af6b" />

          <section className="jsx-ad15c1348c48af6b">
            <a
              href="https://x.com/BonkArcade_Fun"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <BsTwitterX style={{ color: "white" }} />
            </a>
          </section>
        </nav>
      </span>
    </footer>
  );
}
