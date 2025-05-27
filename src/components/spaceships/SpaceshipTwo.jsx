import { useEffect, useRef, useState } from "react"
// import { useNavigate } from "react-router"
import "../../App.css"
import spaceship from "../../assets/png/level_two/background.png"
import frozen from "../../assets/png/level_two/frozen.png"
import lowFire from "../../assets/png/level_two/low-fire.gif"
import highFire from "../../assets/png/level_two/high-fire.gif"
import ironFence from "../../assets/png/level_two/iron-frame.png"
import BlowAirLow from "../../assets/png/level_two/blow-air-1.png"
import BlowAirFull from "../../assets/png/level_two/blow-air-2.png"

// Dialog
import Dialog from "./common/Dialog"
import Typography from "./common/Typography"
import Arrow from "../../assets/png/dialog/level_one/flecha-roxa.png"
import Character from "../../assets/png/dialog/level_two/aurora.png"

// Sounds
import blowAirSound from "@assets/sound/soundeffects/blow-air.wav"
import fireSound from "@assets/sound/soundeffects/fire.mp3"
import levelSoundtrack from "@assets/sound/soundtrack/level-two.mp3"
import useSound from "use-sound"
import { useLocation } from "react-router"

export default function SpaceshipTwo({ onWin }) {
  const [fireState, setFireState] = useState("high")
  const [blowState, setBlowState] = useState("low")
  const [message, setMessage] = useState("")
  const [isDialogOpen, setDialogOpen] = useState(true)
  const [gameWon, setGameWon] = useState(false)
  const [countdown, setCountdown] = useState(10)
  const [gameRunning, setGameRunning] = useState(false) // Im no using game run, so I will put a console log just to build

  const lowFireRef = useRef(null)
  const noneRef = useRef(null)
  const winTimeoutRef = useRef(null)
  const countdownIntervalRef = useRef(null)

  const [play, { stop }] = useSound(levelSoundtrack, { volume: 0.8, loop: true });
  const [playFire, { stop: stopFire }] = useSound(fireSound, { volume: 0.3, loop: true });
  const [blowAirSFX] = useSound(blowAirSound, { volume: 4 })

  const location = useLocation(); // need this to know if route changes, so I can stop music

  // useEffect(() => {
  //   play()
  //   playFire()

  //   // return means if the componente "unmounts" or smth like return itself
  //   return () => {
  //     stop()
  //     stopFire()
  //   }
  // }, [location.pathname, play, playFire, stop, stopFire]);

  useEffect(() => {
    play()
    return () => stop()
  }, [location.pathname, play, stop])

  useEffect(() => {
    if (fireState === "high") {
      playFire()
    } else {
      stopFire()
    }
  }, [fireState, playFire, stopFire])

  console.log(gameRunning) // yeah byattch... wtf Im doing

  // const navigate = useNavigate()

  const text = [
    "Planeta Gelo à vista! Congelante, traiçoeiro... e totalmente necessário. Se quiser mesmo colocar as mãos naquele console dos sonhos, vai ter que passar por esse frio cósmico primeiro.",
    "O sistema térmico local é instável. Seu desafio: manter o fogão aceso por 10 segundos. Simples na teoria... mas nesse gelo todo? Boa sorte, astronauta.",
    "Não deixa o frio vencer, a missão está só começando, e você está indo muito bem!!!"
  ]

  const gameWonText = [
    "Perfeito, você passou de mais uma missão! Só falta comprarmos a última fita exclusiva e podemos ir comprar o console!"
  ]

  const spaceshipStyle = {
    backgroundImage: `url(${spaceship})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    imageRendering: "pixelated",
    overflow: "hidden",
  }

  useEffect(() => {
    if (!isDialogOpen) {
      const startTimer = setTimeout(() => {
        startGame()
      }, 1000)
      return () => clearTimeout(startTimer)
    }
  }, [isDialogOpen])

  function startGame() {
    setGameRunning(true)
    setFireState("high")
    clearTimeout(winTimeoutRef.current)
    clearInterval(countdownIntervalRef.current)

    countdownIntervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current)
        }
        return prev - 1
      })
    }, 1000)

    winTimeoutRef.current = setTimeout(() => {
      setGameWon(true)
      setGameRunning(false)
      setTimeout(() => {
        setMessage('Você conseguiu!');
        setTimeout(() => {
          setMessage('Escolha seu prêmio!');
          setTimeout(() => {
            setMessage('Para jogar no seu novo console!');
          }, 800);
        }, 800);
      }, 800);
      // setTimeout(() => setMessage("Parabéns!."), 500)
      // setMessage("Você venceu! Vamos para o nível final.")
      // setTimeout(() => navigate("/final_level"), 2000)

      // if(onWin) onWin()
    }, 10000)

    startLowFireCountdown()
  }

  function startLowFireCountdown() {
    clearTimeout(lowFireRef.current)
    clearTimeout(noneRef.current)
    lowFireRef.current = setTimeout(() => {
      setFireState("low")
      noneRef.current = setTimeout(() => {
        extinguishFire()
      }, 1500)
    }, 1000)
  }

  function extinguishFire() {
    if (gameWon === false) { // this code block is just perfect...
      clearTimeout(winTimeoutRef.current)
      clearInterval(countdownIntervalRef.current)
      setGameRunning(false)
      setFireState("none")
      if (gameWon === true) setMessage("A lareira apagou!")
      if (gameWon === false) {
        setTimeout(() => {
          setMessage("")
          setFireState("high")
          setCountdown(10)
          startGame()
        }, 2000)
      }
    }
  }

  function handleBlowClick() {
    blowAirSFX()
    if (gameWon) return
    setBlowState(prev => (prev === "low" ? "full" : "low"))
    setFireState("high")
    startLowFireCountdown()
  }

  return (
    <>
      {!gameWon &&(
        <div style={{
          backgroundImage: `url(${frozen})`,
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 1,
          overflow: "hidden",
          opacity: 0.25,

          transition: "all 100ms eaase",
          display: fireState === "high" ? "none" : "block",
          pointerEvents: "none"
        }}></div>
      )}
      {message && <Typography text={message} style={{ zIndex: 2}} />}
      {!gameWon && !isDialogOpen && (
        <div className="countdown-container">
          <h1 className="countdown">
            {countdown}
          </h1>
          <h1 className="countdown">
            {countdown}
          </h1>
        </div>
      )}
      <div className="spaceship level-two-ship" style={spaceshipStyle}>
        <div className="image-container">
          <img className="iron-fence" src={ironFence} />
          {fireState !== "none" && (
            <img className="fire" src={fireState === "high" ? highFire : lowFire} />
          )}
          <img
            className="blow-air"
            src={blowState === "low" ? BlowAirLow : BlowAirFull}
            onClick={handleBlowClick}
            style={{ cursor: "pointer" }}
          />
        </div>
        {!gameWon && (
          <Dialog dialog={text} image={Character} characterName="Aurora" arrow={Arrow} onClose={setDialogOpen} />
        )}
        {gameWon && (
          // <Dialog dialog={gameWonText} image={Character} characterName="Aurora" arrow={Arrow} onClose={ () => { navigate("/final")}} />
          <Dialog dialog={gameWonText} image={Character} characterName="Aurora" arrow={Arrow} onClose={ () => { onWin() }} />
        )}
      </div>
    </>
  )
}