import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { MoveDirection, OutMode } from "@tsparticles/engine";

export default function Hyperspace() {
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
          value: 120,
        },
        color: {
          value: "#d4d3e9"
        },
        shape: {
          type: "circle",
        },
        opacity: { value: 0.8 },
        size: {
          value: { min: 0.5, max: 2.0 },
          animation: {
            enable: true,
            speed: 4,
            minimumValue: 0.5,
            startValue: "min",
            destroy: "none",
            mode: "increase",
            sync: false,
          },
        },
        move: {
          enable: true,
          speed: {min: 4, max: 10},
          direction: MoveDirection.outside,
          straight: true, // dont se difference
          outModes: OutMode.out,
          random: true,
          trail: {
            enable: true,
            length: 20,
            fill: {
              color: "#0F0F37",
            },
          },
        },
      },
      emitters: {
        rate: {
            quantity: 10,
            delay: 5,
        },
      },
    detectRetina: true,
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
