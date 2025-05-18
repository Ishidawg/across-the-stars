"use client";

import { useEffect, useRef } from "react";

interface SoundProps {
  path: string;
  volume?: number;
  loop?: boolean;
}

export default function PlayBGM({ path, volume = 1.0, loop = false }: SoundProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {

    const handleUserInteraction = () => {
      if (!audioRef.current) {
        const audio = new Audio(path);
        audio.volume = volume;
        audio.loop = loop;
        audio.play().catch((error) => {
          console.error("Falha ao reproduzir som:", error);
        });
  
        audioRef.current = audio;
  
        window.removeEventListener("click", handleUserInteraction);
        window.removeEventListener("keydown", handleUserInteraction);
      }
    };

    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, [path, volume, loop]);

  return null;
}
