'use client';

import { useRouter } from 'next/navigation';
import Stars from './components/shaders/Stars';
import Image from 'next/image';
import React from 'react';

export default function Home() {
  const router = useRouter();

  return (
    <main
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        textAlign: 'center',
        color: '#d3d2e9',
      }}
    >
      <Stars />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          zoom: '1.4',
        }}
      >
        <h1 style={{
          position: 'relative',
          zIndex: 1,
          fontSize: '2.5rem',
          margin: 0,
        }}>
          Across the Stars
        </h1>
        <Image
          src="svg/favicon.svg"
          width={350}
          height={350}
          alt="Ícone do jogo"
          priority
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
            filter: 'drop-shadow(0 0 2rem #00000080)',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
      <button
        type="button"
        onClick={() => router.push('/spaceship')}
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
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3c33a5')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2d2871')}
      >
        PLAY
      </button>
      <div
        className='cat-spaceship'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          bottom: '2rem',
          pointerEvents: 'none',
          transition: 'all 0.3s ease-out'
        }}>
        <Image
          className='fire'
          src="svg/fire.svg"
          width={150}
          height={150}
          alt="Ícone do jogo"
          priority
          style={{
            position: 'absolute',
            filter: 'drop-shadow(0 0 2rem #00000080)',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
        <Image
          src="svg/spacecat.svg"
          width={150}
          height={150}
          alt="Ícone do jogo"
          priority
          style={{
            position: 'absolute',
            filter: 'drop-shadow(0 0 2rem #00000080)',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
    </main>
  );
}
