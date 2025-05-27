import "../App.css"
import Hyperspace from "../components/particles/Hyperspace"
import SpaceshipTwo from "../components/spaceships/SpaceshipTwo"

// Games
import gameOne from "../assets/png/videogames/turbosapao.png"
import gameTwo from "../assets/png/videogames/bunnynessmorados.png"
import { useState } from "react"
import { useNavigate } from "react-router"
import Choose from "../components/spaceships/Choose"
import Star from "../components/particles/Star"
import { motion as Motion } from "framer-motion"


export default function LevelTwo() {
  const [stage, setStage] = useState("game")
  const navigate = useNavigate()

  const gameNameOne = "Turbo Sapão"
  const gameNameTwo = "Bunny Nessmorados"

  function handleWin() {
    setStage("choose")
  }

  function handleSelect(choice) {
    // localStorage.setItem("choice2", choice) Here I managed to save the options, but dont imagine that image will be focked
    const chosenImage = choice === 1 ? gameOne : gameTwo
    const chosenName  = choice === 1 ? gameNameOne  : gameNameTwo
    localStorage.setItem("choice2", chosenImage)
    localStorage.setItem("choice2Name", chosenName)
    navigate("/car_cable")
  }

  if (stage === "choose") {
      return (
        <div className="final-container">
          <Star />
          <Motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1,   opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >              
            <Choose
              imageOne={gameOne}
              imageTwo={gameTwo}
              textOne="Turbo Sapão"
              textTwo="Bunny Nessmorados"
              onSelect={handleSelect}
            />
          </Motion.div>
        </div>
      )
  }

  return(
    <>
      <Motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0,   opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="level-one-container">
          <Hyperspace />
          <SpaceshipTwo onWin={handleWin} />
        </div>
      </Motion.div>
    </>
  )

}