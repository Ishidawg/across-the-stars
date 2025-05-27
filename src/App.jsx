import './App.css'
import HomeElements from './components/home/HomeElements'
import Star from './components/particles/Star'
import { motion as Motion } from "framer-motion"


function App() {

  
  return (

      <div>
        <Star />
          <Motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1,   opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
          <HomeElements />
        </Motion.div>
      </div>
  )
}

export default App
