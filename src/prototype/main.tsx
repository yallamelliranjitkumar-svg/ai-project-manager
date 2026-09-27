// Starting point for the home page (index.html): the scroll-flight film.
// It shares the real site's fonts, colours and words, but nothing else.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource/unbounded/500.css'
import '@fontsource/unbounded/700.css'
import '@fontsource-variable/jetbrains-mono'
import '../styles/tokens.css'
import '../styles/global.css'
import { Analytics } from '@vercel/analytics/react'
import { Flight } from './Flight'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Flight />
    {/* Vercel visitor analytics: counts page visits, no cookies */}
    <Analytics />
  </StrictMode>,
)
