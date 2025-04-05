import Image from 'next/image';
import React, { useState } from 'react';

interface DialogProps {
  // text: string;
  pages: string[];
  position?: 'top' | 'bottom';
}

export default function Dialog({ pages, position = 'bottom' }: DialogProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const handleAdvance = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '20em',
      background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)"
    }}>
      <div
        style={{
          // display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center',
          // flexDirection: 'row',
          // gap: '.45em',
          color: '#d3d2e9',
          fontSize: '.90em',
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          top: position === 'top' ? '0' : 'auto',
          bottom: position === 'bottom' ? '0' : 'auto',
          backgroundColor: '#2d2871',
          padding: '1em',
          margin: '4em auto',
          maxWidth: '100%',
          maxHeight: '400px',
          border: '.25em solid #100d36',
          borderRadius: '1em',
          textAlign: 'center',
          textWrap: 'wrap',
          textOverflow: 'ellipsis',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(5px)',
        }}
      >
        <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: '.45em',
        }}>
          <Image
            src="svg/favicon.svg"
            width={150}
            height={150}
            alt="Picture of the author"
          />
          <h1>{pages[currentPage]}</h1>
        </div>
        {pages.length > 1 && currentPage < pages.length - 1 && (
        <button
          onClick={handleAdvance}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '1rem',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Avançar
        </button>
      )}
      </div>
    </div>
  );
}
