"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface TrafficLightsProps {
  currentLight: "green" | "yellow" | "red";
}

export default function TrafficLights({ currentLight }: TrafficLightsProps) {
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

  let src = "";
  switch (currentLight) {
    case "green":
      src = "svg/semaforo-verde.svg";
      break;
    case "yellow":
      src = "svg/semaforo-amarelo.svg";
      break;
    case "red":
      src = "svg/semaforo-vermelho.svg";
      break;
    default:
      src = "svg/semaforo-normal.svg";
  }

  const getSize = () => {
    if (isRegularDesktopResized) return { width: 180, height: 180 };
    else if (isMobile) return { width: 160, height: 160 };
    else if (isPocket) return { width: 135, height: 135 };
    else return { width: 100, height: 100 };
  };

  const { width, height } = getSize();

  return (
    <div style={{ position: "relative" }}>
      <Image
        src={src}
        width={width}
        height={height}
        alt="Semáforo"
      />
    </div>
  );
}
