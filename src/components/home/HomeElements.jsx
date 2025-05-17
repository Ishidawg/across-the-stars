import gameLogo from '../../assets/svg/logo.svg';
import '../../App.css'
import { NavLink } from 'react-router';

export default function HomeElements() {

  return (
    <div className='home-container'>
      <img src={gameLogo} alt="Logo" />
      <div>
        <h1>Across the stars</h1>
        <NavLink to="/level_one">
          <button>Play</button>
        </NavLink>
      </div>
    </div>
  );
}