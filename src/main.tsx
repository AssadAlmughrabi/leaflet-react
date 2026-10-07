import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PlantsProvider } from '@/context/PlantsProvider'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlantsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PlantsProvider>
  </StrictMode>,
)
