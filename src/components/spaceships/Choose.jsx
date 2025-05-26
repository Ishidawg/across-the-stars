  import { useState, useEffect } from "react"
  import "../../App.css"

  export default function Choose({ imageOne, imageTwo, textOne, textTwo, onSelect, initialChoice = null}) {
    const [selected, setSelected] = useState(initialChoice)

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
              <img src={imageOne} />
              <h1>{textOne}</h1>
            </div>
            <div>
              <img src={imageTwo} />
              <h1>{textTwo}</h1>
            </div>
          </main>
        </div>
      </>
    )
  }