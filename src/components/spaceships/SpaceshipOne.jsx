import { useState, useEffect, useRef } from "react"
import "../../App.css"
import spaceship from "../../assets/png/level_one/bkg/spaceship.png"

// TrafficLights
import trafficLightOff from "../../assets/png/level_one/semaforo/semaforo-apagado.png"
import trafficLightGreen from "../../assets/png/level_one/semaforo/semaforo-verde.png"
import trafficLightRed from "../../assets/png/level_one/semaforo/semaforo-vermelho.png"
import trafficLightYellow from "../../assets/png/level_one/semaforo/semaforo-amarelo.png"

// Levers
import lever from "../../assets/png/level_one/alavancas/alavanca-normal.png"
import leverDown from "../../assets/png/level_one/alavancas/alavanca-puxada.png"

// Buttons
import largeButton from "../../assets/png/level_one/botoes/botao-grande.png"
import largeButtonClick from "../../assets/png/level_one/botoes/botao-grande-pressionado.png"
import mediumButton from "../../assets/png/level_one/botoes/botao-medio.png"
import mediumButtonClick from "../../assets/png/level_one/botoes/botao-medio-pressionado.png"
import smallButton from "../../assets/png/level_one/botoes/botao-pequeno.png"
import smallButtonClick from "../../assets/png/level_one/botoes/botao-pequeno-pressionado.png"

// Dialog stuff
import Dialog from "./common/Dialog"
import Character from "../../assets/png/dialog/level_one/serene.png";
import Arrow from "../../assets/png/dialog/level_one/flecha-roxa.png";

// Sounds
import errorSound from "@assets/sound/soundeffects/error-2.mp3"
import clickElementSound from "@assets/sound/soundeffects/click-elements.mp3"
import levelSoundtrack from "@assets/sound/soundtrack/level-one.mp3"

// Others
import Typography from "./common/Typography"
import CustomImage from "./common/CustomImage"
import useSound from "use-sound"
import { useLocation } from "react-router"

const BUTTONS = [
  { id: 'small-1', normal: smallButton, pressed: smallButtonClick },
  { id: 'small-2', normal: smallButton, pressed: smallButtonClick },
  { id: 'medium-1', normal: mediumButton, pressed: mediumButtonClick },
  { id: 'medium-2', normal: mediumButton, pressed: mediumButtonClick },
  { id: 'large-1', normal: largeButton, pressed: largeButtonClick },
  { id: 'large-2', normal: largeButton, pressed: largeButtonClick }
]

export default function SpaceshipOne() {
  const [sequence, setSequence] = useState([])
  const [phase, setPhase] = useState('idle')
  const [flash, setFlash] = useState(null)
  const [inputIndex, setInputIndex] = useState(0)
  const [light, setLight] = useState('off')
  const [score, setScore] = useState(0)
  const [message, setMessage] = useState("")
  const intervalRef = useRef(null)

  const [isDialogOpen, setDialogOpen] = useState(true)

  const [play, { stop }] = useSound(levelSoundtrack, { volume: 0.2, loop: true });
  const [errorSFX] = useSound(errorSound, { volume: 0.5 })
  const [clickSFX] = useSound(clickElementSound, { volume: 0.5 })

  const location = useLocation(); // need this to know if route changes, so I can stop music

  const text = [
    "Olá viajante! Você precisa de velocidade para chegar ao próximo planeta e seguir sua busca pelo jogo lendário!",
    "Em nosso painel temos vários botões, uma alavanca e um semáforo, para conseguir velocidade você precisa ser bom de memória!",
    "Quando o jogo começar, os botões vão piscar em uma ordem, aperte-os na ordem certa e puxe a alavanca quando o semáforo estiver verde! Faça isso 3 vezes!",
    "Boa sorte em sua jornada! Estou torcendo por você!"
  ]

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

  useEffect(() => {
    !isDialogOpen && startRound()
    return () => clearInterval(intervalRef.current)
  }, [isDialogOpen])

  function startRound() {
    setLight('off')
    setScore(0)
    setMessage("")
    removeShake()
    setTimeout(() => startSequence(), 1000 ) // Give time to player focus on the buttons
  }

  function startSequence() {
    const newSequence = Array.from({ length: 3 }, () => BUTTONS[Math.floor(Math.random() * BUTTONS.length)].id)
    setSequence(newSequence)
    setPhase('show')
    showSequence(newSequence)
  }

  function showSequence(sequence) {
    removeShake()
    setMessage("")
    sequence.forEach((btnId, sequenceIndex) => {
      setTimeout(() => {
        setFlash(btnId)
        setTimeout(() => setFlash(null), 500)
      }, sequenceIndex * 800)
    })
    setTimeout(() => {
      setPhase('input')
      setInputIndex(0)
    }, sequence.length * 800)
  }

  function handleButtonPress(id) {
    clickSFX()
    if (phase !== 'input') return
    if (id === sequence[inputIndex]) {
      const next = inputIndex + 1
      if (next === sequence.length) {
        // Pass sequence
        setPhase('lever')
        startTrafficLightCycle()
      } else {
        setInputIndex(next)
      }
    } else {
      // Error sequence
      addShakeError()
      setTimeout(() => resetGame(), 400 ) // Need the timeout, otherwise shake dont work
    }
  }

  function startTrafficLightCycle() {
    const cycle = ['red', 'yellow', 'green']
    let index = 0
    setLight(cycle[index])
    intervalRef.current = setInterval(() => {
      index = (index + 1) % cycle.length
      setLight(cycle[index])
    }, 300)
  }

  function handleLeverPress() {
    if (phase !== 'lever') return
    clearInterval(intervalRef.current)
    if (light === 'green') {
      const newScore = score + 1
      setScore(newScore)
      addShake()
      setMessage(`Boa! Score: ${newScore}`)
      if (newScore >= 3) {
        setMessage('You Win!')
        resetGame()
        return
      }
      nextSequence()
    } else {
      // Push lever on wrong sign
      addShakeError()
      setTimeout(() => resetGame(), 400 ) // Need the timeout, otherwise shake dont work

    }
  }

  function nextSequence() {
    setPhase('show')
    setLight('off')
    const newSequence = Array.from({ length: 3 }, () => BUTTONS[Math.floor(Math.random() * BUTTONS.length)].id)
    setSequence(newSequence)
    setTimeout(() => showSequence(newSequence), 500)
  }

  function resetGame() {
    setPhase('idle')
    setScore(0)
    setLight('off')
    clearInterval(intervalRef.current)
    removeShake()
    setTimeout(startRound, 1000)
  }

  const spaceshipStyle = {
    backgroundImage: `url(${spaceship})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    imageRendering: "pixelated",
    overflow: "hidden",
  }

  // Create this one to not repeat the same line for each button
  function flashButtons(id) {
    return { filter: flash === id ? 'brightness(1.5)' : 'brightness(1)' }
  }

  function lightSrc() {
    if (light === 'green') return trafficLightGreen
    if (light === 'yellow') return trafficLightYellow
    if (light === 'red') return trafficLightRed
    return trafficLightOff
  }

  // To give sense that something wrong is happening
  function addShake() {
    errorSFX()
    document.querySelector(".level-one-ship")?.classList.add("shake"); 
  }

  function addShakeError() {
    errorSFX()
    document.querySelector(".level-one-ship")?.classList.add("shake-error"); 
  }

  function removeShake() {
    document.querySelector(".level-one-ship")?.classList.remove("shake");
    document.querySelector(".level-one-ship")?.classList.remove("shake-error"); 
  }

  // I have tried to improve the code on map to not be so verbose, but I suck at coding so...
  return (
    <>
      {message && <Typography text={message} />}
      <div className="spaceship level-one-ship" style={spaceshipStyle}>
        <div className="level-one-controls">
          <img className="traffic-light" src={lightSrc()} />
          <div className="lever">
            <CustomImage normalSrc={lever} pressedSrc={leverDown} onPress={handleLeverPress} />
          </div>
          <div className="level-one-buttons">
            <div className="small">
              {[BUTTONS[0].id, BUTTONS[1].id].map(id => (
                <div key={id} style={flashButtons(id)}>
                  <CustomImage normalSrc={smallButton} pressedSrc={smallButtonClick} onPress={() => handleButtonPress(id)} />
                </div>
              ))}
            </div>
            <div className="medium">
              {[BUTTONS[2].id, BUTTONS[3].id].map(id => (
                <div key={id} style={flashButtons(id)}>
                  <CustomImage normalSrc={mediumButton} pressedSrc={mediumButtonClick} onPress={() => handleButtonPress(id)} />
                </div>
              ))}
            </div>
            <div className="large">
              {[BUTTONS[4].id, BUTTONS[5].id].map(id => (
                <div key={id} style={flashButtons(id)}>
                  <CustomImage normalSrc={largeButton} pressedSrc={largeButtonClick} onPress={() => handleButtonPress(id)} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Dialog dialog={text} image={Character} characterName={"Serene"} arrow={Arrow} onClose={setDialogOpen}/>
      </div>
    </>
  )
}
