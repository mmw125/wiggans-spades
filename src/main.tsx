import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from "@vercel/analytics/react"
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
    <Analytics />
  </StrictMode>,
)

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App'
