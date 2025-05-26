import "../App.css"
import Star from "../components/particles/Star"
import Choose from "../components/spaceships/Choose"

export default function Final() {
  
  return(
    <>
      <div className="final-container">
        <Star />
        <Choose />
      </div>
    </>
  )
}