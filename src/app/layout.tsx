import type { Metadata } from "next";
import "./globals.css";
import "./gg.css";
import "./startgame.css";
import "./countdown.css";

import "./game.css";
import "./hangman.css";

export const metadata: Metadata = {
  // Your existing title and description are great.
  title: "Bonk Arcade",
  description: "Play and earn big, no commision no fee!",

  // --- ADD THIS OBJECT ---
  // This tells social media sites how to display your link.
  openGraph: {
    title: "Bonk Arcade",
    description: "Play and earn big, no commision no fee!",
    type: "website",
    url: "https://your-bonk-arcade-url.com", // Remember to change this to your real domain later
    siteName: "Bonk Arcade",
  },

  // --- AND ADD THIS OBJECT for Twitter ---
  twitter: {
    card: "summary", // Use 'summary' card type when there's no image
    title: "Bonk Arcade",
    description: "Play and earn big, no commision no fee!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`antialiased`}>
        <div id="__next">{children}</div>
      </body>
    </html>
  );
}
