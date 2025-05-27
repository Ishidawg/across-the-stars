import Dialog from "../components/spaceships/common/Dialog"
import Character from "/src/assets/png/final/iara.png"
import Arrow from "../assets/png/dialog/level_one/flecha-roxa.png";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import useSound from "use-sound";
import consoleImage from "/src/assets/png/videogames/console.png"
import { motion as Motion } from "framer-motion"


// Sounds
import pageSoundtrack from "@assets/sound/soundtrack/carcable.mp3"
import Star from "../components/particles/Star";

export default function Journey() {
  const navigate = useNavigate()

  const [play, { stop }] = useSound(pageSoundtrack, { volume: 1, loop: true });
  const location = useLocation(); // need this to know if route changes, so I can stop music

  useEffect(() => {
    play()

    // return means if the componente "unmounts" or smth like return itself
    return () => stop()
  }, [play, stop]); // need to add dependencies so the soundtrack can start, I don't know why yet tho
  
  useEffect(() => {
    play()

    // return means if the componente "unmounts" or smth like return itself
    return () => stop()
  }, [location.pathname]);

  function handleClose() {
    navigate("/level_one")
  }

  const text = [
    "Novo console exclusivo do planeta das flores! Venha comprar o Station Lovetron!",
    "Os cartuchos (jogos) exclusivos você irá adquirir durante a jornada! Faça uma boa escolha!",
    "Você irá comprar o Station Lovetron na loja da Iara, que só é acessível pelo teleférico,que fica no planeta gelado!",
  ]

  return(
    <>
      <Motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0,   opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="journey-container">
          <Motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1,   opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >   
            <img src={consoleImage} />
          </Motion.div>
        </div>
        <Star />
        <Dialog dialog={text} image={Character} characterName={"Iara"} arrow={Arrow} onClose={ () => {handleClose()} }/>
      </Motion.div>
    </>
  )
}