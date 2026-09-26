import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// A slow field of faint stars around the scene, which gives it depth.
// Each speck is a soft round dot drawn by the graphics card.

const vertex = /* glsl */ `
  attribute float aSize;
  uniform float uPixelRatio;
  varying float vFade;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (8.0 / -mv.z);
    vFade = clamp(1.0 - (-mv.z - 4.0) / 16.0, 0.15, 1.0);
  }
`

const fragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vFade;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.0, d) * 0.55 * vFade;
    gl_FragColor = vec4(uColor, alpha);
    #include <colorspace_fragment>
  }
`

type Props = { count: number; reducedMotion?: boolean }

export function Particles({ count, reducedMotion = false }: Props) {
  const points = useRef<THREE.Points>(null)

  // Scatter the specks randomly in a thick shell around the centre
  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 12
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6
      positions[i * 3 + 2] = radius * Math.cos(phi)
      sizes[i] = 0.8 + Math.random() * 1.4
    }
    return { positions, sizes }
  }, [count])

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color('#cfe8ff') },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    }),
    [],
  )

  useFrame((_, delta) => {
    if (reducedMotion || !points.current) return
    points.current.rotation.y += delta * 0.01
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
