import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Level from './pages/Level.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path='level_one' element={<Level />} />
    </Routes>
    {/* <StrictMode>
      <App />
    </StrictMode> */}
  </BrowserRouter>
);
