"use client";

import { useEffect, useState } from "react";
import Dialog from "../components/dialog";
import StarsSpeeding from "../components/shaders/StarsSpeeding";
import PageTransition from "../components/animations/TransitionLayout";
import Lever from "../components/controls/Lever";
import TrafficLights from "../components/controls/TrafficLights";
import ButtonsPanel from "../components/controls/ButtonsPanel";
import "../../app/globals.css";

export default function Spaceship() {
  const dialogPages = [
    "Bem-vindo à nave! Prepare-se para decolar.",
    "Lembre-se de verificar os instrumentos de voo.",
    "Boa viagem e divirta-se!",
  ];

  const [buttons, setButtons] = useState([false, false, false, false, false, false]);
  const [trafficLight, setTrafficLight] = useState<"normal" | "amarelo" | "verde" | "vermelho">("verde");
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const allButtonsActive = buttons.every(status => status);

  const handleButtonClick = (index: number) => {
    if (!buttons[index]) {
      const newButtons = [...buttons];
      newButtons[index] = true;
      setButtons(newButtons);
    }
  };

  const onLeverPulled = () => {
    if (trafficLight === "verde") {
      console.log("Sucesso! Avançando para a próxima fase.")
    } else {
      console.log("Game Over!");
    }
  };

  useEffect(() => {
      if (typeof window !== "undefined") {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []);
  
    const isMobile = windowWidth < 768;

  return (
    <main>
      <Dialog pages={dialogPages} position="bottom" />
      <PageTransition>
        <StarsSpeeding />
        <div
          style={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            backgroundImage: "url(/png/spaceship-transparence.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            imageRendering: "crisp-edges",
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          <div
            className="controls"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            <ButtonsPanel buttons={buttons} onButtonClick={handleButtonClick} />
            <div
              className="lever"
              style={{
                // backgroundColor: 'blue',
                position: "absolute",
                bottom: "10%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: allButtonsActive ? "auto" : "none",
              }}
            >
              <Lever onLeverPulled={onLeverPulled} disabled={!allButtonsActive} />
            </div>
            <div
              className="traffic-lights"
              style={{
                // backgroundColor: 'red',
                position: "absolute",
                bottom: "8%",
                ...(isMobile ? { left: "18%" } : { left: "39%" }),
                // left: "39%",
                // left: "18%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "auto",
              }}
            >
              <TrafficLights currentLight={trafficLight} />
            </div>
          </div>
        </div>
      </PageTransition>
    </main>
  );
}