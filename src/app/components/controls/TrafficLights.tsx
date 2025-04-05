"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function TrafficLightsComponent() {
  const [light, setLight] = useState<"normal" | "amarelo" | "verde" | "vermelho">("normal");

  return (
    <div style={{ position: "relative" }}>
      {light === "normal" && (
        <Image
          src="/png/semaforo-normal.png"
          width={100}
          height={100}
          alt="Semáforo normal"
        />
      )}
      {light === "amarelo" && (
        <Image
          src="/png/semaforo-amarelo.png"
          width={100}
          height={100}
          alt="Semáforo amarelo"
        />
      )}
      {light === "verde" && (
        <Image
          src="/png/semaforo-verde.png"
          width={100}
          height={100}
          alt="Semáforo verde"
        />
      )}
      {light === "vermelho" && (
        <Image
          src="/png/semaforo-vermelho.png"
          width={100}
          height={100}
          alt="Semáforo vermelho"
        />
      )}
    </div>
  );
}
