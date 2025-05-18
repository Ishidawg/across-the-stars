import { useState } from "react";
import "../../../App.css";
import useSound from "use-sound";

// Dont know why it shown like an error... old
// Have to import like this cuz it throws a TS error while on JS, wtf
const closeButton = new URL('@assets/png/dialog/common/xvermelho.png', import.meta.url).href;

const clickButton = new URL('@assets/sound/soundeffects/click.mp3', import.meta.url).href;


export default function Dialog({dialog, image, characterName, arrow, onClose }) {
  const [page, setPage] = useState(0);
  const [closed, setClosed] = useState(false);

  const [click] = useSound(clickButton, { volume: 0.5 })



  const handleNextPage = () => {
    click()
    if (page < dialog.length - 1) {
      setPage(page + 1);
    } else {
      setClosed(true);
      onClose(false);
    }
  };

  if (closed) return null;

  return (
    <>
      <div className="dialog-dim"></div>
      <div className="dialog">
        <section>
          <img src={image}/>
          <h1>{characterName}</h1>
        </section>
        <div>
          <p>
            {dialog[page]}
          </p>
          <img
            className="arrow"
            src={(page < dialog.length - 1 ) ? arrow : closeButton }
            onClick={handleNextPage}
          />
        </div>
      </div>
    </>
  );
}