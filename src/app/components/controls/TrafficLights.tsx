"use client";

import React from "react";
import Image from "next/image";

interface TrafficLightsProps {
  currentLight: "green" | "yellow" | "red";
}

export default function TrafficLights({ currentLight }: TrafficLightsProps) {
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
      <Image src={src} width={160} height={160} alt="Semáforo" />
    </div>
  );
}
