import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from "@vercel/analytics/react"
import './index.css'
import { Spades } from './spades.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Spades />
    <Analytics />
  </StrictMode>,
)
