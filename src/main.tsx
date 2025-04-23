import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from "@vercel/analytics/react"
import './index.css'
import { Spades } from './Spades.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Spades />
    <Analytics />
  </StrictMode>,
)

import 'bootstrap/dist/css/bootstrap.min.css';