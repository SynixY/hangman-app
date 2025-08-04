import React from "react";
import { BsTwitterX } from "react-icons/bs";

export default function Footer() {
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
            CA: Coming soon
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
