import type { Metadata } from "next";
import { Jersey_10 } from "next/font/google";
import "./globals.css";

const jerseyFont = Jersey_10({
  variable: "--font-jersey-10",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Across the Stars",
  description: "Um jogo point-and-click espacial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jerseyFont.variable}>
        {children}
      </body>
    </html>
  );
}
