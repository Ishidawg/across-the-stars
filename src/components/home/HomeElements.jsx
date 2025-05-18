import gameLogo from '../../assets/svg/logo.svg';
import '../../App.css'
import { NavLink } from 'react-router';
import useSound from 'use-sound';
import { useEffect } from 'react';

// Sounds
import titleScreenSoundtrack from "../../assets/sound/soundtrack/title-screen.mp3"
import startButton from "../../assets/sound/soundeffects/start-button.mp3"


export default function HomeElements() {

  const [play, { stop }] = useSound(titleScreenSoundtrack, { volume: 0.2, loop: true });
  const [start] = useSound(startButton, { volume: 0.5 })

  useEffect(() => {
    play()
  }, [play]);

  return (
    <div className='home-container'>
      <img src={gameLogo} alt="Logo" />
      <div>
        <h1>Across the stars</h1>
        <NavLink to="/level_one">
          <button onClick={ () => {
            stop()
            start()
          }}>Play</button>
        </NavLink>
      </div>
    </div>
  );
}