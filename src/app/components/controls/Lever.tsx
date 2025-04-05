"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Lever() {
  const [pressed, setPressed] = useState(false);

  return (
    <div
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{ cursor: "pointer", position: "relative" }}
    >
      <Image
        src={
          pressed
            ? "/png/alavanca-puxada.png"
            : "/png/alavanca-normal.png"
        }
        width={150}
        height={150}
        alt="Alavanca"
      />
    </div>
  );
}
