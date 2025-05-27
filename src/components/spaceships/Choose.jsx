import { useState, useEffect } from "react"
import "../../App.css"

// Sounds
import useSound from "use-sound"
import collectSound from "@assets/sound/soundeffects/collect.mp3"
import chooseSoundtrack from "@assets/sound/soundtrack/reward.mp3"
import { useLocation } from "react-router"

export default function Choose({ imageOne, imageTwo, textOne, textTwo, onSelect, initialChoice = null}) {
  const [selected, setSelected] = useState(initialChoice)

  const [play, { stop }] = useSound(chooseSoundtrack, { volume: 1, loop: true });
  const [collectSFX] = useSound(collectSound, { volume: 1 })

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

  useEffect(() => {
    if (selected !== null) {
      onSelect(selected)
    }
  }, [selected, onSelect])
  
  return(
    <>
      <div className="choose-container">
        <article>
          <h1>Parabéns por ter conseguido!</h1>
          <h1>Escolha um jogo abaixo:</h1>
        </article>
        <main>
          <div>
            <img src={imageOne} onClick={() => {
              setSelected(1)
              collectSFX()
            }} />
            <h1>{textOne}</h1>
          </div>
          <div>
            <img src={imageTwo} onClick={() => {
              setSelected(2)
              collectSFX()
            }} />
            <h1>{textTwo}</h1>
          </div>
        </main>
      </div>
    </>
  )
}