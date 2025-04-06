"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface TrafficLightsProps {
  currentLight: "green" | "yellow" | "red";
}

export default function TrafficLights({ currentLight }: TrafficLightsProps) {

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
  const isShittyMobile = windowWidth <= 400;


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
  return (
    <div style={{ position: "relative" }}>
      <Image src={src} width={(isMobile ? 150 : isShittyMobile ? 20 : 200)} height={isMobile ? 150 : isShittyMobile ? 100 : 200} alt="Semáforo" />
    </div>
  );
}
