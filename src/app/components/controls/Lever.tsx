"use client";

import React, { useState } from "react";
import Image from "next/image";

interface LeverProps {
  onLeverPulled: () => void;
  disabled?: boolean;
}

export default function Lever({ onLeverPulled, disabled = false }: LeverProps) {
  const [pressed, setPressed] = useState(false);

  const handleMouseDown = () => {
    if (!disabled) setPressed(true);
  };

  const handleMouseUp = () => {
    if (!disabled) {
      setPressed(false);
      onLeverPulled();
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) setPressed(false);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: disabled ? "not-allowed" : "pointer", position: "relative" }}
    >
      <Image
        src={pressed ? "svg/alavanca-puxada.svg" : "svg/alavanca-normal.svg"}
        width={130}
        height={150}
        alt="Alavanca"
      />
    </div>
  );
}
