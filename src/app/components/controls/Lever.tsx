"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface LeverProps {
  onLeverPulled: () => void;
  disabled?: boolean;
}

export default function Lever({ onLeverPulled, disabled = false }: LeverProps) {

  const [pressed, setPressed] = useState(false);

  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateSize = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
      };
      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }
  }, []);

  const isPocket = windowWidth <= 460 && windowHeight < 780;
  const isMobile = windowWidth <= 460 && windowHeight >= 780;
  const isRegularDesktopResized = windowHeight >= 978;

  const getSize = () => {
    if (isRegularDesktopResized) return { width: 150, height: 180 };
    else if (isMobile) return { width: 145, height: 160 };
    else if (isPocket) return { width: 115, height: 135 };
    else return { width: 100, height: 100 };
  };

  const { width, height } = getSize();

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
        // width={isDesktopResizedOrPocket ? 98 : isMobile ? 120 : 150}
        // height={isDesktopResizedOrPocket ? 116 : isMobile ? 132 : 180}
        width={width}
        height={height}
        alt="Alavanca"
      />
    </div>
  );
}
