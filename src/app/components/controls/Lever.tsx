"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface LeverProps {
  onLeverPulled: () => void;
  disabled?: boolean;
}

export default function Lever({ onLeverPulled, disabled = false }: LeverProps) {

  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const isMobile = windowWidth < 768;

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
        width={isMobile ? 130 : 150}
        height={isMobile ? 150 : 170}
        alt="Alavanca"
      />
    </div>
  );
}
