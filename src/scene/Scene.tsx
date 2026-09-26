import { Canvas, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { ProjectSphere } from './ProjectSphere'
import { Particles } from './Particles'
import type { Quality } from '../lib/quality'
import './Scene.css'

// The 3D stage. It sits fixed behind the whole page and never scrolls.
// In Phase 2, scrolling will move the camera and change the sphere.
export default function Scene({ quality }: { quality: Quality }) {
  return (
    <div className="scene" aria-hidden="true">
      <Canvas
        dpr={[1, quality.maxPixelRatio]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: !quality.low, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#07060b']} />
        <fog attach="fog" args={['#07060b', 6, 18]} />
        <Stage quality={quality} />
        {quality.bloom && (
          <EffectComposer>
            <Bloom intensity={0.9} luminanceThreshold={0.35} luminanceSmoothing={0.3} mipmapBlur />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}

function Stage({ quality }: { quality: Quality }) {
  // Wide screens: sphere sits to the right of the hero text.
  // Narrow screens: sphere sits smaller in the lower right, clear of the headline.
  const { viewport } = useThree()
  const wide = viewport.aspect > 1.1
  const position: [number, number, number] = wide
    ? [viewport.width * 0.3, 0.1, 0]
    : [viewport.width * 0.22, -viewport.height * 0.28, 0]
  const scale = wide ? Math.min(1.1, viewport.width * 0.12) : 0.6

  return (
    <>
      <ProjectSphere
        position={position}
        scale={scale}
        reducedMotion={quality.reducedMotion}
        strongHalo={!quality.bloom}
      />
      <Particles count={quality.particles} reducedMotion={quality.reducedMotion} />
    </>
  )
}
