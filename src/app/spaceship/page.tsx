"use client";

import { useEffect, useState } from "react";
import Dialog from "../components/dialog";
import StarsSpeeding from "../components/shaders/StarsSpeeding";
import PageTransition from "../components/animations/TransitionLayout";
import Lever from "../components/controls/Lever";
import TrafficLights from "../components/controls/TrafficLights";
// import ButtonsPanel from "../components/controls/ButtonsPanel";
// import Image from "next/image";
import "../../app/globals.css";

export default function Spaceship() {
  const dialogPages = [
    "A nave está fora de controle!",
    "Puxe a alavanca quando o semáforo estiver verde."
  ];

  // const [buttons, setButtons] = useState([false, false, false, false, false, false]);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const [trafficLight, setTrafficLight] = useState<"green" | "yellow" | "red">("red");
  const [gameStatus, setGameStatus] = useState<"outOfControl" | "success" | "gameOver">("outOfControl");

  useEffect(() => {
    const cycle = ["green", "yellow", "red"] as const;
    let currentIndex = 0;
    const interval = setInterval(() => {
      setTrafficLight(cycle[currentIndex]);
      currentIndex = (currentIndex + 1) % cycle.length;
    }, 1000); // muda a cada 1 segundo (ajuste se necessário)
    return () => clearInterval(interval);
  }, []);

  const handleLeverPulled = () => {
    if (trafficLight === "green") {
      setGameStatus("success");
      console.log("Sucesso! Avançando para a próxima fase.");
      // Aqui você pode redirecionar para a próxima fase ou atualizar o estado global do jogo.
    } else {
      setGameStatus("gameOver");
      console.log("Game Over!");
      // Aqui você pode exibir uma tela de game over ou reiniciar o jogo.
    }
  };

  // const allButtonsActive = buttons.every(status => status);

  // const handleButtonClick = (index: number) => {
  //   if (!buttons[index]) {
  //     const newButtons = [...buttons];
  //     newButtons[index] = true;
  //     setButtons(newButtons);
  //   }
  // };

  // const onLeverPulled = () => {
  //   if (trafficLight === "verde") {
  //     console.log("Sucesso! Avançando para a próxima fase.")
  //   } else {
  //     console.log("Game Over!");
  //   }
  // };

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
            backgroundImage: "url(/png/spaceship-emptysemaforo.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            imageRendering: "crisp-edges",
            overflow: "hidden",
            zIndex: 1,
          }}
          className={gameStatus === "outOfControl" ? "shake" : ""}
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
            {/* <ButtonsPanel buttons={buttons} onButtonClick={handleButtonClick} /> */}
            <div
              className="lever"
              style={{
                // backgroundColor: 'blue',
                position: "absolute",
                bottom: "10%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                // pointerEvents: allButtonsActive ? "auto" : "none",
              }}
            >
              <Lever onLeverPulled={handleLeverPulled} disabled={gameStatus !== "outOfControl"} />
            </div>
            {gameStatus === "success" && (
            <div
              style={{
                position: "absolute",
                top: "10%",
                width: "100%",
                textAlign: "center",
                color: "green",
                fontSize: "2rem",
                zIndex: 3,
              }}
            >
              Sucesso! Próxima fase.
            </div>
            )}
            {gameStatus === "gameOver" && (
              <div
                style={{
                  position: "absolute",
                  top: "10%",
                  width: "100%",
                  textAlign: "center",
                  color: "red",
                  fontSize: "2rem",
                  zIndex: 3,
                }}
              >
                Game Over!
              </div>
            )}
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