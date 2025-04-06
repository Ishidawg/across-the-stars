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
import Modal from "../components/genericModal";

export default function Spaceship() {
  const initialDialog = [
    "Por conta dos detritos e rochas no espaço, a nave está fora de controle!",
    "Puxe a alavanca no momento em que o semáforo ficar verde.",
    "Assim evitamos colisões e conseguimos velocidade para escapar daqui!",
    "Caso não conseguir... teremos problemas... hehe",
    "Boa sorte!",
  ];

  // const [buttons, setButtons] = useState([false, false, false, false, false, false]);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const [trafficLight, setTrafficLight] = useState<"green" | "yellow" | "red">("red");
  const [gameStatus, setGameStatus] = useState<"outOfControl" | "success" | "gameOver" | "complete">("outOfControl");

  const [phase, setPhase] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalImage, setModalImage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const isMobile = windowWidth < 768;
  

  useEffect(() => {
    const cycle = ["green", "yellow", "red"] as const;
    let currentIndex = 0;
    const interval = setInterval(() => {
      setTrafficLight(cycle[currentIndex]);
      currentIndex = (currentIndex + 1) % cycle.length;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLeverPulled = () => {
    if (trafficLight === "green") {
      if (phase < 3) {
        setModalImage("svg/asteroid-milkshake.svg");
        setGameStatus("success");
        setModalTitle("Muito bem!");
        setModalMessage(`Você passou para a próxima fase! (Fase ${phase + 1} de 3)`);
        setModalOpen(true);
        setPhase(prev => prev + 1);
      } else {
        setModalImage("svg/finalscreen.svg");
        setGameStatus("complete");
        setModalTitle("Parabéns!");
        setModalMessage("Você completou o jogo!");
        setModalOpen(true);
      }
    } else {
      setModalImage("svg/gameover.svg");
      setGameStatus("gameOver");
      setModalTitle("Game Over");
      setModalMessage("Ohh não! Você errou o momento da alavanca.");
      setModalOpen(true);
    }
  };


  // const handleNextPhase = () => {
  //   setModalTitle("Parabéns!");
  //   setModalMessage("Você passou para a próxima fase.");
  //   setModalOpen(true);
  // };

  // const handleGameOver = () => {
  //   setModalTitle("Game Over");
  //   setModalMessage("Você errou o momento da alavanca.");
  //   setModalOpen(true);
  // };

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



  return (
    <main>
      <Dialog pages={initialDialog} position="bottom" />
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
            imageRendering: "pixelated",
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
              // pointerEvents: "none",
            }}
          >
            <div
              className="traffic-lights"
              style={{
                // backgroundColor: 'red',
                position: "absolute",
                ...(isMobile ? { bottom: "8%" } : { bottom: "6%" }),
                // bottom: "8%",
                ...(isMobile ? { left: "18%" } : { left: "41%" }),
                // left: "39%",
                // left: "18%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "auto",
                zIndex: 2,
              }}
            >
              <TrafficLights currentLight={trafficLight} />
            </div>


            {/* <ButtonsPanel buttons={buttons} onButtonClick={handleButtonClick} /> */}
            <div
              className="lever"
              style={{
                // backgroundColor: 'blue',
                position: "absolute",
                bottom: "10%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: gameStatus === "outOfControl" ? "auto" : "none",
                zIndex: 2,
              }}
            >
              <Lever onLeverPulled={handleLeverPulled} disabled={gameStatus !== "outOfControl"} />
            </div>
          </div>
        </div>
      </PageTransition>
      <Modal
        isOpen={modalOpen}
        title={modalTitle}
        message={modalMessage}
        image={modalImage}
        complete={gameStatus === "complete"}
        onClose={() => {
          setModalOpen(false);
          setGameStatus("outOfControl");
        }}
      />
    </main>
  );
}