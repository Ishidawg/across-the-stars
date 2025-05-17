import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { MoveDirection, OutMode } from "@tsparticles/engine";

export default function Star() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = () => {};

  const options = useMemo(
    () => ({
      background: {
        color: "#0F0F37",
      },
      fpsLimit: 30,
      particles: {
        number: {
          value: 150,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: true,
          speed: 0.1,
          straight: false,
        },
        opacity: {
          animation: {
            enable: true,
            speed: 3,
            sync: false,
          },
          value: { min: 0, max: 1 },
        },
        size: {
          value: { min: 1, max: 3 },
        },
        shadow: { // I have add shadow to make a "blur" effect around the particle
          enable: true,
          color: "#FFFF88",
          blur: 5,
          offset: {
            x: 0,
            y: 0,
          },
        },
      },
      // interactivity: { Repulse the stars
      //     events: {
      //       onHover: {
      //         enable: true,
      //         mode: "repulse",
      //       }
      //     },
      //     modes: {
      //       repulse: {
      //         distance: 100,
      //         duration: 1,
      //       }
      //     }
      //   }
    }),
    [],
  );

  if (!init) return null;

  return (
    <div
      style={{
        position: "relative",
        zIndex: -1
      }}
    >
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    </div>
  );
}
