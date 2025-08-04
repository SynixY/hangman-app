import type { Metadata } from "next";
import "./globals.css";
import "./gg.css";
import "./startgame.css";
import "./countdown.css";
export const metadata: Metadata = {
  title: "Bonk Arcade",
  description: "Play and earn big, no commision no fee!",
};
import "./game.css";
import "./hangman.css";

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
