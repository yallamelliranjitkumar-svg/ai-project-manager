// Starting point for the scroll-flight prototype page (prototype.html).
// It shares the real site's fonts, colours and words, but nothing else.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource/unbounded/500.css'
import '@fontsource/unbounded/700.css'
import '@fontsource-variable/jetbrains-mono'
import '../styles/tokens.css'
import '../styles/global.css'
import { Flight } from './Flight'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Flight />
  </StrictMode>,
)
