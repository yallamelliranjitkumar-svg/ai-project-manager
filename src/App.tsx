import { lazy, Suspense, useMemo } from 'react'
import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { Journey } from './sections/Journey'
import { ProcessStrip } from './sections/ProcessStrip'
import { Chapters } from './sections/Chapters'
import { Experiments } from './sections/Experiments'
import { Footer } from './sections/Footer'
import { getQuality, supportsWebGL } from './lib/quality'

// The 3D scene is loaded separately ("lazily"), so the text appears first
// and the 3D fades in a moment later instead of making visitors wait.
const Scene = lazy(() => import('./scene/Scene'))

export default function App() {
  const quality = useMemo(getQuality, [])
  const webgl = useMemo(supportsWebGL, [])

  return (
    <>
      {webgl ? (
        <Suspense fallback={null}>
          <Scene quality={quality} />
        </Suspense>
      ) : (
        <div className="scene-fallback" aria-hidden="true" />
      )}
      <Nav />
      <main className="page">
        <Hero />
        <Journey />
        <ProcessStrip />
        <Chapters />
        <Experiments />
      </main>
      <Footer />
    </>
  )
}
