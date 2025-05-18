"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface ButtonsPanelProps {
  buttons: boolean[];
  onButtonClick: (index: number) => void;
}

export default function ButtonsPanel({ buttons, onButtonClick }: ButtonsPanelProps) {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <div
      style={{
        position: "absolute",
        ...(isMobile ? { top: "67%" } : { top: "67%" }),
        ...(isMobile ? { left: "62%" } : { left: "55%" }),
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "0.45rem",
        pointerEvents: "auto",
      }}
    >
      {buttons.map((btn, index) => (
        <div
          key={index}
          onClick={() => onButtonClick(index)}
          style={{
            cursor: "pointer",
            marginLeft: index >= 2 ? (index >= 4 ? "2rem" : "0.80rem") : "0rem",
            zoom: isMobile ? 1 : 1.1,
          }}
        >
          <Image
            src={btn ? "/png/button1-pressed.png" : "/png/button-1.png"}
            width={42}
            height={42}
            alt={`Botão ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
}
