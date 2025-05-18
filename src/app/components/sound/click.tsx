"use client";

import { useRef } from "react";
import Image from "next/image";

interface CustomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  onClick?: () => void;
  soundPath?: string;
  soundVolume?: number;
  cursor?: boolean;
}

export default function CustomImage({
  src,
  alt,
  width,
  height,
  onClick,
  soundPath,
  soundVolume = 1.0,
  cursor = true,
}: CustomImageProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = () => {
    if (soundPath && !audioRef.current) {
      const audio = new Audio(soundPath);
      audio.volume = soundVolume;
      audioRef.current = audio;
    }

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => console.error("Erro ao reproduzir som:", error));
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      onClick={handleClick}
      style={{
        cursor: cursor ? "pointer" : "default",
        transition: "opacity 0.3s ease",
      }}
    />
  );
}
