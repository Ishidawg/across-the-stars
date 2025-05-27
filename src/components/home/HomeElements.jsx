import gameLogo from '../../assets/svg/logo.svg';
import '../../App.css'
import { NavLink, useLocation } from 'react-router';
import useSound from 'use-sound';
import { useEffect } from 'react';

// Sounds
import titleScreenSoundtrack from "../../assets/sound/soundtrack/title-screen.mp3"
import startButton from "../../assets/sound/soundeffects/start-button.mp3"


export default function HomeElements() {
  const location = useLocation(); // need this to know if route changes, so I can stop music
  const [play, { stop }] = useSound(titleScreenSoundtrack, { volume: 0.2, loop: true });
  const [start] = useSound(startButton, { volume: 0.5 })

  useEffect(() => {
    play()

    return () => stop()
  }, [play, stop]);

  useEffect(() => {
    play()

    // return means if the componente "unmounts" or smth like return itself
    return () => stop()
  }, [location.pathname]);

  return (
    <div className='home-container'>
      <img src={gameLogo} alt="Logo" />
      <div>
        <h1>Across the stars</h1>
        <NavLink to="/journey">
          <button onClick={ () => {
            stop()
            start()
          }}>Play</button>
        </NavLink>
      </div>
    </div>
  );
}