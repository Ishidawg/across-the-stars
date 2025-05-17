import gameLogo from '../../assets/svg/logo.svg';
import '../../App.css'

export default function HomeElements() {

  return (
    <div className='home-container'>
      <img src={gameLogo} alt="Logo" />
      <div>
        <h1>Across the stars</h1>
        <button>Play</button>
      </div>
    </div>
  );
}