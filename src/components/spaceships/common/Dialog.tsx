import { useState } from "react";
import "../../../App.css";

// Dont know why it shown like an error...
import closeButton from "../../../assets/png/dialog/common/xvermelho.png";

export default function Dialog({dialog, image, characterName, arrow, onClose }) {
  const [page, setPage] = useState(0);
  const [closed, setClosed] = useState(false);


  const handleNextPage = () => {
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
          <img className="arrow" src={(page < dialog.length - 1 ) ? arrow : closeButton } onClick={handleNextPage}/>
        </div>
      </div>
    </>
  );
}