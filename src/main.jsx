import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../modern-normalize.css'
import App from './App.jsx'
// import Layout from './pages/Layout/Layout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <App />
  </StrictMode>,
)
