import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import LevelOne from './pages/LevelOne.jsx'
import LevelTwo from './pages/LevelTwo.jsx'
import Final from './pages/Final.jsx'
import CarCable from './pages/CarCable.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path='level_one' element={<LevelOne />} />
          <Route path='level_two' element={<LevelTwo />} />
          <Route path='car_cable' element={<CarCable />} />
          <Route path='final' element={<Final />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
);
