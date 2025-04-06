import Image from 'next/image';
import React, { useEffect, useState } from 'react';
// import OpacityTransition from '../animations/Opacity';

interface DialogProps {
  pages: string[];
  position?: 'top' | 'bottom';
}

export default function Dialog({ pages, position = 'bottom' }: DialogProps) {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [closed, setClosed] = useState(false);


  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const isMobile = windowWidth < 768;

  const handleAdvance = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleClose = () => {
    setClosed(true);
  };

  if (closed) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '20em',
      background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
      zIndex: 1000
    }}>
      <div
        style={{
          color: '#d3d2e9',
          fontSize: isMobile ? '.90em' : '1.2em',
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          top: position === 'top' ? '0' : 'auto',
          bottom: position === 'bottom' ? '0' : 'auto',
          backgroundColor: '#2d2871',
          padding: '1em',
          margin: isMobile ? '2em auto' : '4em auto',
          // margin: '4em auto',
          width: isMobile ? '90%' : 'auto',
          maxHeight: '400px',
          border: '.25em solid #100d36',
          borderRadius: '1em',
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(5px)',
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: '.45em',
        }}>
          <Image
            src="svg/serene.svg"
            width={150}
            height={150}
            alt="Ícone do diálogo"
          />
          <article>
            <h1>{pages[currentPage]}</h1>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginTop: '20px',
              // backgroundColor: 'red',
            }}>
              {currentPage < pages.length - 1 ? (
                <Image
                  src="svg/arrow.svg"
                  width={64}
                  height={64}
                  alt="Arrow"
                  onClick={handleAdvance}
                  style={{
                    cursor: 'pointer',
                  }}
                />
                // <button
                //   onClick={handleAdvance}
                //   style={{
                //     padding: '10px 20px',
                //     fontSize: '1rem',
                //     backgroundColor: '#2196F3',
                //     color: 'white',
                //     border: 'none',
                //     borderRadius: '4px',
                //     cursor: 'pointer',
                //   }}
                // >
                //   Avançar
                // </button>
              ) : (
                <Image
                  src="svg/xred.svg"
                  width={64}
                  height={64}
                  alt="Arrow"
                  onClick={handleClose}
                  style={{
                    cursor: 'pointer',
                  }}
                />
                // <button
                //   onClick={handleClose}
                //   style={{
                //     padding: '10px 20px',
                //     fontSize: '1rem',
                //     backgroundColor: '#e53935',
                //     color: 'white',
                //     border: 'none',
                //     borderRadius: '4px',
                //     cursor: 'pointer',
                //   }}
                // >
                //   Fechar
                // </button>
              )}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
