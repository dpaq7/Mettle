import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HeroProvider } from './context/HeroContext'
import { CombatProvider } from './context/CombatContext'
import { RollHistoryProvider } from './context/RollHistoryContext'
import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <HeroProvider>
        <CombatProvider>
          <RollHistoryProvider>
            <App />
          </RollHistoryProvider>
        </CombatProvider>
      </HeroProvider>
    </ThemeProvider>
  </StrictMode>,
)
