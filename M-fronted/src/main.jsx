import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import MangaConProvider from './Context/MangaContex.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_Client_ID} >
    <BrowserRouter>
      <MangaConProvider>
        <App />
      </MangaConProvider>
    </BrowserRouter>,
  </GoogleOAuthProvider>
)
