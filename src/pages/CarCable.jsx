import Dialog from "../components/spaceships/common/Dialog";
import Arrow from "../assets/png/dialog/level_one/flecha-roxa.png";
import Character from "/src/assets/png/final/iara.png"

import { useNavigate } from "react-router";

export default function CarCable() {
  const navigate = useNavigate()

  const text = [
    "Com todas os cartuchos em mãos e o planeta Gelo vencido, o próximo passo está claro.  Comprar o CONSOLE.",
    "Pra isso resta um único trajeto: o teleférico rumo à loja mais misteriosa do universo...",
  ]

  function handleClose() {
    navigate("/final")
  }

  return(
    <>
      <div className="car-cable-container">
        <Dialog dialog={text} image={Character} characterName={"Iara"} arrow={Arrow} onClose={ () => {handleClose()} }/>
      </div>
    </>
  )
}