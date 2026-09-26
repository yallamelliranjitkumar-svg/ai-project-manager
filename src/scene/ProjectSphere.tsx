import { Suspense, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import labelFont from '@fontsource/unbounded/files/unbounded-latin-500-normal.woff?url'

// The glowing PROJECT core at the centre of Aurora Station, drawn entirely
// in code (no model file). Clinical white with a cyan rim: the hospital's colours.
//
// It is made of two layers:
//  1. The body: a sphere whose edges glow violet (like a planet's atmosphere)
//     and whose surface ripples slowly, so it feels alive.
//  2. The halo: a slightly larger, see-through shell that adds a soft glow
//     around the outside. This works even on phones where bloom is off.

// Small programs that run on the graphics card. The "vertex" one shapes the
// surface (the ripple); the "fragment" one colours every pixel (the glow).
const bodyVertex = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec3 p = position;
    float ripple = sin(p.x * 3.0 + uTime * 0.6) * sin(p.y * 3.2 + uTime * 0.5) * sin(p.z * 2.8 + uTime * 0.7);
    p += normal * ripple * 0.02;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

const bodyFragment = /* glsl */ `
  uniform vec3 uDeep;
  uniform vec3 uRim;
  uniform vec3 uCore;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float facing = max(dot(normalize(vNormal), normalize(vView)), 0.0);
    float edge = 1.0 - facing;
    float rim = pow(edge, 5.0);
    float core = pow(facing, 3.0);
    // A bright clinical-white heart fading to a glowing cyan edge
    vec3 color = uDeep * 0.3 + uCore * core * 0.75 + uRim * rim * 2.2;
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`

const haloVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

const haloFragment = /* glsl */ `
  uniform vec3 uRim;
  uniform float uStrength;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float facing = abs(dot(normalize(vNormal), normalize(vView)));
    float glow = pow(facing, 3.0) * uStrength;
    gl_FragColor = vec4(uRim * glow, glow);
    #include <colorspace_fragment>
  }
`

type Props = {
  position?: [number, number, number]
  scale?: number
  reducedMotion?: boolean
  strongHalo?: boolean
  label?: boolean
  labelY?: number
  labelSize?: number
}

export function ProjectSphere({ position = [0, 0, 0], scale = 1, reducedMotion = false, strongHalo = false, label = true, labelY = -1.55 * scale, labelSize = 0.13 * scale }: Props) {
  const group = useRef<THREE.Group>(null)

  const bodyUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color('#0e5f73') },
      uRim: { value: new THREE.Color('#3dd9eb') },
      uCore: { value: new THREE.Color('#eaf8fb') },
    }),
    [],
  )

  const haloUniforms = useMemo(
    () => ({
      uRim: { value: new THREE.Color('#3dd9eb') },
      uStrength: { value: strongHalo ? 0.9 : 0.55 },
    }),
    [strongHalo],
  )

  // Runs every frame (about 60 times a second): moves time forward for the
  // ripple and makes the sphere "breathe" and turn slowly.
  useFrame((state, delta) => {
    if (reducedMotion || !group.current) return
    bodyUniforms.uTime.value += delta
    const t = state.clock.elapsedTime
    group.current.rotation.y += delta * 0.08
    const breathe = 1 + Math.sin(t * 0.8) * 0.015
    group.current.scale.setScalar(scale * breathe)
  })

  return (
    <group position={position}>
      <group ref={group} scale={scale}>
        <mesh>
          <icosahedronGeometry args={[1, 32]} />
          <shaderMaterial
            vertexShader={bodyVertex}
            fragmentShader={bodyFragment}
            uniforms={bodyUniforms}
            toneMapped={false}
          />
        </mesh>
        <mesh scale={1.35}>
          <sphereGeometry args={[1, 48, 48]} />
          <shaderMaterial
            vertexShader={haloVertex}
            fragmentShader={haloFragment}
            uniforms={haloUniforms}
            side={THREE.BackSide}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
      </group>
      {/* The label waits for its font on its own, so the core never waits for it */}
      {label && (
        <Suspense fallback={null}>
          <Text
            font={labelFont}
            fontSize={labelSize}
            letterSpacing={0.3}
            position={[0, labelY, 0]}
            color="#8deff7"
            anchorX="center"
            anchorY="middle"
          >
            PROJECT
          </Text>
        </Suspense>
      )}
    </group>
  )
}
