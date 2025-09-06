import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MangaConProvider } from './Context/MangaContex.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MangaConProvider>
      <App />
    </MangaConProvider>
  </BrowserRouter>,
)
