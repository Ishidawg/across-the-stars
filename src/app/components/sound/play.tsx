"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface PlaySoundProps {
  path: string;
  volume?: number;
  loop?: boolean;
}

function PlaySound({ path, volume = 1.0, loop = false }: PlaySoundProps) {
  const audio = new Audio(path);
  audio.volume = volume;
  audio.loop = loop;
  audio.play()

  return null;
}

export default function ButtonPlay() {
  const [playSound, setPlaySound] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setPlaySound(true);
    router.push('/spaceship');
  };

  return (
    <div>
      {playSound && <PlaySound path="sound/soundeffects/start-button.mp3" volume={1} loop={false} />}
      <button
        type="button"
        onClick={handleClick}
        style={{
          marginTop: '8rem',
          fontSize: '2rem',
          backgroundColor: '#2d2871',
          color: '#d3d2e9',
          padding: '0.5rem 2rem',
          border: '2px solid #d3d2e9',
          borderRadius: '0.25rem',
          cursor: 'pointer',
          zIndex: 1,
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3c33a5')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2d2871')}
      >
        PLAY
      </button>
    </div>
  );
}
