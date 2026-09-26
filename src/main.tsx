// The starting point: loads the fonts and styles, then switches the site on.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource/unbounded/500.css'
import '@fontsource/unbounded/700.css'
import './styles/tokens.css'
import './styles/global.css'
import './scene/Scene.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
