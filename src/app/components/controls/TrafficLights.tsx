"use client";

import React from "react";
import Image from "next/image";

interface TrafficLightsProps {
  currentLight: "normal" | "amarelo" | "verde" | "vermelho";
}

export default function TrafficLights({ currentLight }: TrafficLightsProps) {
  let src = "";
  switch (currentLight) {
    case "amarelo":
      src = "/png/semaforo-amarelo.png";
      break;
    case "verde":
      src = "/png/semaforo-verde.png";
      break;
    case "vermelho":
      src = "/png/semaforo-vermelho.png";
      break;
    default:
      src = "/png/semaforo-normal.png";
  }

  return (
    <div style={{ position: "relative" }}>
      <Image src={src} width={140} height={140} alt="Semáforo" />
    </div>
  );
}
