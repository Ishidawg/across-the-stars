import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import LevelOne from './pages/LevelOne.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path='level_one' element={<LevelOne />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
);
