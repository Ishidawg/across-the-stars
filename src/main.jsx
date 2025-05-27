import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import LevelOne from './pages/LevelOne.jsx'
import LevelTwo from './pages/LevelTwo.jsx'
import Final from './pages/Final.jsx'
import CarCable from './pages/CarCable.jsx'
import { AnimatePresence } from "framer-motion"
import Journey from './pages/Journey.jsx'

createRoot(document.getElementById('root')).render(
  <AnimatePresence mode="wait">
    <StrictMode>
      <BrowserRouter>
        <Routes location={location} key={location.pathname}>
          <Route index element={<App />} />
          <Route path='journey' element={<Journey />} />
          <Route path='level_one' element={<LevelOne />} />
          <Route path='level_two' element={<LevelTwo />} />
          <Route path='car_cable' element={<CarCable />} />
          <Route path='final' element={<Final />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </AnimatePresence>
);
