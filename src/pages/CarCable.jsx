import Dialog from "../components/spaceships/common/Dialog";
import Arrow from "../assets/png/dialog/level_one/flecha-roxa.png";
import Character from "/src/assets/png/final/iara.png"
import { motion as Motion } from "framer-motion"

// Sounds
import pageSoundtrack from "@assets/sound/soundtrack/carcable.mp3"

import { useLocation, useNavigate } from "react-router";
import useSound from "use-sound";
import { useEffect } from "react";

export default function CarCable() {
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

  const text = [
    "Com todas os cartuchos em mãos e o planeta Gelo vencido, o próximo passo está claro.  Comprar o CONSOLE.",
    "Pra isso resta um único trajeto: o teleférico rumo à loja mais misteriosa do universo...",
  ]

  function handleClose() {
    navigate("/final")
  }

  return(
    <>
      <Motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0,   opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="car-cable-container">
          <Dialog dialog={text} image={Character} characterName={"Iara"} arrow={Arrow} onClose={ () => {handleClose()} }/>
        </div>
      </Motion.div>
    </>
  )
}