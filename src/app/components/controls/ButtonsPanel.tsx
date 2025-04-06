"use client";

import React from "react";
import Image from "next/image";

interface ButtonsPanelProps {
  buttons: boolean[];
  onButtonClick: (index: number) => void;
}

export default function ButtonsPanel({ buttons, onButtonClick }: ButtonsPanelProps) {
  return (
    <div
      style={{
        // backgroundColor: 'yellow',
        position: "absolute",
        top: "68%",
        left: "56%",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "0.45rem",
        pointerEvents: "auto",
      }}
    >
      {buttons.map((btn, index) => (
        <div key={index} onClick={() => onButtonClick(index)} style={{
          cursor: "pointer",
          marginLeft: index >= 2 ? (index >= 4 ? "2rem" : "0.80rem") : "0rem" // Red
        }}>
          <Image
            src={btn ? "/png/button1-pressed.png" : "/png/button-1.png"}
            width={40}
            height={40}
            alt={`Botão ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
}
