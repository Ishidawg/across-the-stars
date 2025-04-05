"use client"

// import { useRouter } from 'next/navigation';
import Dialog from '../components/dialog';
import '../../app/globals.css';
import StarsSpeeding from '../components/shaders/StarsSpeeding';
import PageTransition from '../components/animations/TransitionLayout';
import Image from 'next/image';

export default function Spaceship() { 
  // const router = useRouter();

  const dialogPages = [
    'Bem-vindo à nave! Prepare-se para decolar.',
    'Lembre-se de verificar os instrumentos de voo.',
    'Boa viagem e divirta-se!'
  ];

  return (      
    <main>
      <Dialog pages={dialogPages} position="bottom" />
      <PageTransition>
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
          <div className="controls" style={{
            backgroundColor: 'red'
          }}>
            <div className="buttons">
              <Image
                src="/png/button-1.png"
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
              <Image
                src="/png/button-2.png"
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
              <Image
                src="/png/button-3.png"
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
            <div className="lever">
              <Image
                src="/png/alavanca-normal.png"
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
              <Image
                src="/png/alavanca-puxada.png"
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
            <div className="traffic-lights">
              <Image
                src="/png/semaforo-normal.png"
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
              <Image
                src="/png/semaforo-amarelo.png"
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
              <Image
                src="/png/semaforo-verde.png"
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
              <Image
                src="/png/semaforo-vermelho.png"
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
          </div>
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
          </div>
        </div>
      </PageTransition>
    </main>
  );
}