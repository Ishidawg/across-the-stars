"use client"

import { useRouter } from 'next/navigation';
import Dialog from '../components/dialog';
import '../../app/globals.css';
import StarsSpeeding from '../components/shaders/StarsSpeeding';
// import PageTransition from '../components/animations/TransitionLayout';

export default function Spaceship() {
  const router = useRouter();

  const dialogPages = [
    'Bem-vindo à nave! Prepare-se para decolar.',
    'Lembre-se de verificar os instrumentos de voo.',
    'Boa viagem e divirta-se!'
  ];

  return (      
    <main>
      <StarsSpeeding />
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: 'url(/png/spaceship-transparence.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          imageRendering: 'crisp-edges',
          overflow: 'hidden',
          zIndex: 1,
        }}>
          <Dialog pages={dialogPages} position="bottom" />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          zIndex: 2,
        }}>
          <button 
            style={{
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              backgroundColor: '#2196F3',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            type="button" 
            onClick={() => router.push('/')}
          >
            Return to Home Base
          </button>
        </div>
      </div>
    </main>
  );
}