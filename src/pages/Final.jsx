import "../App.css"
import Star from "../components/particles/Star"
import Choose from "../components/spaceships/Choose"
import Dialog from "../components/spaceships/common/Dialog"
import Character from "/src/assets/png/final/iara.png"
import Arrow from "/src/assets/png/dialog/level_one/flecha-roxa.png"
import console from "/src/assets/png/videogames/console.png"
import { useState } from "react"

export default function Final() {
  const choice1 = localStorage.getItem("choice1")
  const choice1Name  = localStorage.getItem("choice1Name")
  const choice2 = localStorage.getItem("choice2")
  const choice2Name  = localStorage.getItem("choice2Name")

  const [isDialogOpen, setDialogOpen] = useState(true)
  const [graduallyOpening, setgraduallyOpening] = useState(false)
  const [blur,setBlur] = useState(false)
  

  const text = [
    "Você chegou longe... e trouxe os cartuchos. Estou impressionada.",
    "O console está logo ali, ele custa 200 dólares lunares.",
    "Você provou seu valor. O console é seu... com direito a autógrafo galáctico!",
  ]

  const style = {
    height: "100dvh",
    overflow: "hidden",
    backgroundImage: "url('/src/assets/png/final/loja.png')",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    imageRendering: "pixelated",

    /* background-color: hsla(0, 0%, 0%, 0.25); */

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
  
  return(
      <div className="final-container" style={style}>
        <main className="choose-container">
        {!isDialogOpen && (
          <>
            <h1 className="final-title">Jogue os jogos que você encontrou no <br></br>Station Lovetron </h1>
            <img className="img-final" src={console} />
            <main className="main-final-images">
              <div>
                <img className="img-final" src={choice1} />
                <h1>{choice1Name}</h1>
              </div>
              <div>
                <img className="img-final" src={choice2} />
                <h1>{choice2Name}</h1>
              </div>
            </main>
            <div className="final-background" style={{
              backdropFilter: blur ? "blur(4px)" : "none",
            }} />
            <div
              className={`star-fade ${graduallyOpening ? 'show' : ''}`}
            >
              <Star />
            </div>
          </>
        )}
        </main>
        <Dialog dialog={text} image={Character} characterName={"Iara"} arrow={Arrow} onClose={ () => {
          setDialogOpen(false)
          setTimeout(() => setgraduallyOpening(true), 400)
          setTimeout(() => setBlur(true), 400 + 800)
          }}/>
      </div>
  )
}