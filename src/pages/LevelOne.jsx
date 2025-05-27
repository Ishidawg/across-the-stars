import "../App.css"
import Hyperspace from "../components/particles/Hyperspace";
import SpaceshipOne from "../components/spaceships/SpaceshipOne";

// Games
import gameOne from "../assets/png/videogames/cogunautsnight.png"
import gameTwo from "../assets/png/videogames/deepbyte.png"
import { useState } from "react";
import { useNavigate } from "react-router";
import Choose from "../components/spaceships/Choose";
import Star from "../components/particles/Star";

export default function LevelOne() {
  const [stage, setStage] = useState("game")
  const navigate = useNavigate()

  const gameNameOne = "Cogunauts Night"
  const gameNameTwo = "Deep Byte"

  function handleWin() {
    setStage("choose")
  }

  function handleSelect(choice) {
    // localStorage.setItem("choice1", choice) Here I managed to save the options, but dont imagine that image will be focked
    const chosenImage = choice === 1 ? gameOne : gameTwo
    const chosenName  = choice === 1 ? gameNameOne  : gameNameTwo
    localStorage.setItem("choice1", chosenImage)
    localStorage.setItem("choice1Name", chosenName)
    navigate("/level_two")
  }

  if (stage === "choose") {
    return (
      <div className="final-container">
        <Star />        
        <Choose
          imageOne={gameOne}
          imageTwo={gameTwo}
          textOne="Cogunauts Night"
          textTwo="Deep Byte"
          onSelect={handleSelect}
        />
      </div>
    )
  }


  return (
    <div className="level-one-container">
      <Hyperspace />
      <SpaceshipOne onWin={handleWin} />
    </div>
  );
}