import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import WikiSandboxPage from './wiki' // Make sure the path is correct
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* This tells React: if the path is "/", show the challenge */}
        <Route path="/" element={<App />} />
        
        {/* This tells React: if the path is "/wiki", show your wiki page */}
        <Route path="/wiki" element={<WikiSandboxPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)