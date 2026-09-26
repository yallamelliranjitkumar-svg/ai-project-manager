import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ProjectSphere } from './ProjectSphere'

// Aurora Station: a ring-shaped hospital orbiting Earth, drawn entirely in code.
// Its shape is based on the Stanford torus, a public 1975 NASA design study.
//
//   - the glowing PROJECT core sits at the centre
//   - four spokes join the core to the ring
//   - six ward modules sit around the ring (see DESIGN.md §6)
//   - hundreds of tiny window lights twinkle along the ring
//   - two solar panels stretch out along the station's axis

const RING_RADIUS = 1.6
const RING_TUBE = 0.08

// The six wards, in order around the ring. "lit: false" = still dark.
// (In later phases each ward lights up as its agent arrives.)
const WARDS = [
  { name: 'Command Deck', lit: true },
  { name: 'Comms Array', lit: true },
  { name: 'Diagnostics Lab', lit: true },
  { name: 'Safety Systems', lit: true },
  { name: 'Docking Bay', lit: true },
  { name: 'New AI Ward', lit: false },
]

const windowVertex = /* glsl */ `
  attribute float aPhase;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vTwinkle;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = 2.2 * uPixelRatio * (6.0 / -mv.z);
    // Each window gently brightens and dims on its own slow rhythm
    vTwinkle = 0.55 + 0.45 * sin(uTime * 0.6 + aPhase);
  }
`

const windowFragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vTwinkle;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.1, d) * vTwinkle;
    gl_FragColor = vec4(uColor * 1.6, alpha);
    #include <colorspace_fragment>
  }
`

type Props = {
  position: [number, number, number]
  scale: number
  windows: number
  reducedMotion?: boolean
  strongHalo?: boolean
}

export function Station({ position, scale, windows, reducedMotion = false, strongHalo = false }: Props) {
  const ring = useRef<THREE.Group>(null)

  // Scatter window lights along the outer face of the ring
  const { windowPositions, phases } = useMemo(() => {
    const windowPositions = new Float32Array(windows * 3)
    const phases = new Float32Array(windows)
    const r = RING_TUBE + 0.004
    for (let i = 0; i < windows; i++) {
      const around = Math.random() * Math.PI * 2
      const onTube = (Math.random() - 0.5) * 1.3
      const dist = RING_RADIUS + r * Math.cos(onTube)
      windowPositions[i * 3] = dist * Math.cos(around)
      windowPositions[i * 3 + 1] = r * Math.sin(onTube)
      windowPositions[i * 3 + 2] = dist * Math.sin(around)
      phases[i] = Math.random() * Math.PI * 2
    }
    return { windowPositions, phases }
  }, [windows])

  const windowUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#bdf5fb') },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    }),
    [],
  )

  // The ring turns very slowly; the windows twinkle
  useFrame((_, delta) => {
    if (reducedMotion) return
    windowUniforms.uTime.value += delta
    if (ring.current) ring.current.rotation.y += delta * 0.03
  })

  return (
    <group position={position} scale={scale}>
      {/* Tilt the station so we see the ring at an angle, not edge-on */}
      <group rotation={[0.7, 0, -0.25]}>
        {/* Core: doesn't spin with the ring */}
        <ProjectSphere scale={0.3} reducedMotion={reducedMotion} strongHalo={strongHalo} label={false} />

        {/* Central mast and solar panels along the station's axis */}
        <mesh>
          <cylinderGeometry args={[0.03, 0.03, 2.6, 12]} />
          <meshStandardMaterial color="#1b2733" metalness={0.7} roughness={0.45} />
        </mesh>
        {[1, -1].map((side) => (
          <mesh key={side} position={[0, side * 1.1, 0]}>
            <boxGeometry args={[1.5, 0.012, 0.34]} />
            <meshStandardMaterial
              color="#0b2340"
              emissive="#0e5f73"
              emissiveIntensity={0.25}
              metalness={0.4}
              roughness={0.35}
            />
          </mesh>
        ))}

        <group ref={ring}>
          {/* The ring itself */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[RING_RADIUS, RING_TUBE, 24, 160]} />
            <meshStandardMaterial color="#1b2733" metalness={0.7} roughness={0.45} />
          </mesh>

          {/* Four spokes from the core to the ring (two rods crossing the centre) */}
          {[0, 1].map((i) => (
            <mesh key={i} rotation={[0, (i * Math.PI) / 2, Math.PI / 2]}>
              <cylinderGeometry args={[0.018, 0.018, RING_RADIUS * 2, 8]} />
              <meshStandardMaterial color="#223242" metalness={0.6} roughness={0.5} />
            </mesh>
          ))}

          {/* The six ward modules, evenly spaced around the ring */}
          {WARDS.map((ward, i) => {
            const angle = (i / WARDS.length) * Math.PI * 2 + Math.PI / 6
            const x = RING_RADIUS * Math.cos(angle)
            const z = RING_RADIUS * Math.sin(angle)
            return (
              <group key={ward.name} position={[x, 0, z]} rotation={[0, -angle, 0]}>
                <mesh>
                  <boxGeometry args={[0.2, 0.2, 0.36]} />
                  <meshStandardMaterial color="#243444" metalness={0.6} roughness={0.4} />
                </mesh>
                {/* Ward light: cyan when active, dark until it comes online */}
                <mesh position={[0.11, 0.06, 0]}>
                  <sphereGeometry args={[0.035, 12, 12]} />
                  <meshBasicMaterial color={ward.lit ? '#8deff7' : '#1b2733'} toneMapped={false} />
                </mesh>
              </group>
            )
          })}

          {/* Window lights */}
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[windowPositions, 3]} />
              <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
            </bufferGeometry>
            <shaderMaterial
              vertexShader={windowVertex}
              fragmentShader={windowFragment}
              uniforms={windowUniforms}
              transparent
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </points>
        </group>

        {/* The core lights up the inside of the ring */}
        <pointLight color="#8deff7" intensity={6} distance={5} decay={2} />
      </group>
    </group>
  )
}
