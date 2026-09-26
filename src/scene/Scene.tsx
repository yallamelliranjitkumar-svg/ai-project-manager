import { Suspense, useMemo } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import labelFont from '@fontsource/unbounded/files/unbounded-latin-500-normal.woff?url'
import { Earth } from './Earth'
import { Station } from './Station'
import { Particles } from './Particles'
import type { Quality } from '../lib/quality'
import './Scene.css'

// The 3D stage: Earth, Aurora Station and the stars. It sits fixed behind
// the whole page and never scrolls. In Phase 2, scrolling will move the
// camera and change the station chapter by chapter.
export default function Scene({ quality }: { quality: Quality }) {
  return (
    <div className="scene" aria-hidden="true">
      <Canvas
        dpr={[1, quality.maxPixelRatio]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: !quality.low, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#04070d']} />
        <World quality={quality} />
        {quality.bloom && (
          <EffectComposer>
            <Bloom intensity={0.8} luminanceThreshold={0.7} luminanceSmoothing={0.25} mipmapBlur />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}

function World({ quality }: { quality: Quality }) {
  // Where the sun is. Earth's day/night line and the station's lighting both use it.
  // It sits to the right and slightly behind, so most of the Earth we see is on
  // the night side (city lights), with a bright sunlit crescent on the right.
  const sun = useMemo(() => new THREE.Vector3(6, 1.5, -2.5).normalize(), [])

  // Wide screens: the station floats on the right, beside the headline.
  // Narrow screens: the station sits smaller, lower down, above Earth's edge.
  const { viewport } = useThree()
  const wide = viewport.aspect > 1.1
  const stationPosition: [number, number, number] = wide
    ? [viewport.width * 0.32, 0.75, 0]
    : [viewport.width * 0.2, -viewport.height * 0.2, 0]
  const stationScale = wide ? Math.min(0.72, viewport.width * 0.085) : 0.45
  // Earth is huge and far away, so only its curved top edge shows at the bottom
  const earthPosition: [number, number, number] = wide ? [-3, -17.6, -12] : [0, -15.4, -10]
  const earthRadius = 14

  return (
    <>
      <ambientLight intensity={0.12} color="#9db0bb" />
      <directionalLight position={sun.clone().multiplyScalar(10)} intensity={2.2} color="#fff6ea" />

      {/* Earth waits for its images on its own, so the station appears straight away */}
      <Suspense fallback={null}>
        <Earth position={earthPosition} radius={earthRadius} sun={sun} hd={!quality.low} reducedMotion={quality.reducedMotion} />
      </Suspense>

      <Station
        position={stationPosition}
        scale={stationScale}
        windows={quality.windows}
        reducedMotion={quality.reducedMotion}
        strongHalo={!quality.bloom}
      />

      <Suspense fallback={null}>
        <Text
          font={labelFont}
          fontSize={0.09}
          letterSpacing={0.3}
          position={[stationPosition[0], stationPosition[1] - 1.75 * stationScale, 0]}
          color="#8deff7"
          anchorX="center"
          anchorY="middle"
        >
          PROJECT · AURORA STATION
        </Text>
      </Suspense>

      <Particles count={quality.particles} reducedMotion={quality.reducedMotion} />
    </>
  )
}
