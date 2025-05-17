import "../../App.css"
import spaceship from "../../assets/png/level_one/bkg/spaceship.png"
import CustomButton from "./common/CustomButton"

// TrafficLights
import trafficLightOff from "../../assets/png/level_one/semaforo/semaforo-apagado.png"
import trafficLightGreen from "../../assets/png/level_one/semaforo/semaforo-verde.png"
import trafficLightYellow from "../../assets/png/level_one/semaforo/semaforo-amarelo.png"
import trafficLightRed from "../../assets/png/level_one/semaforo/semaforo-vermelho.png"

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

export default function SpaceshipOne() {
  const handleSmall = () => {
    console.log("test little shit button")
  }
  const handleMedium = () => {
    console.log("test medium shit button")
  }
  const handleLarge = () => {
    console.log("test large shit button")
  }

  const spaceshipStyle = {
    backgroundImage: `url(${spaceship})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    imageRendering: "pixelated",
    overflow: "hidden",
  }

  return (
    <div className="spaceship level-one-ship" style={spaceshipStyle}>
      <div className="level-one-controls">
        <img src={trafficLightOff} />
        <img src={lever} />
        <div className="level-one-buttons">
          <div className="small">
            <CustomButton
              normalSrc={smallButton}
              pressedSrc={smallButtonClick}
              alt="botão pequeno"
              onPress={handleSmall}
            />
            <CustomButton
              normalSrc={smallButton}
              pressedSrc={smallButtonClick}
              alt="botão pequeno"
              onPress={handleSmall}
            />
          </div>
          <div className="medium">
            <CustomButton
              normalSrc={mediumButton}
              pressedSrc={mediumButtonClick}
              alt="botão médio"
              onPress={handleMedium}
            />
            <CustomButton
              normalSrc={mediumButton}
              pressedSrc={mediumButtonClick}
              alt="botão médio"
              onPress={handleMedium}
            />
          </div>
          <div className="large">
            <CustomButton
              normalSrc={largeButton}
              pressedSrc={largeButtonClick}
              alt="botão grande"
              onPress={handleLarge}
            />
            <CustomButton
              normalSrc={largeButton}
              pressedSrc={largeButtonClick}
              alt="botão grande"
              onPress={handleLarge}
            />
          </div>
        </div>
      </div>
    </div>
  );
}