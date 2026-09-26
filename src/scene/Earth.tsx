import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

// Animated Earth, made from three NASA images (public domain):
//  - "Blue Marble": the daytime surface
//  - "Black Marble": city lights, shown only on the night side
//  - clouds, which drift slowly over the surface
// Plus a soft cyan-blue atmosphere glow around the edge.

const earthVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vViewW;
  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewW = normalize(cameraPosition - world.xyz);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

const earthFragment = /* glsl */ `
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform sampler2D uClouds;
  uniform vec3 uSun;
  uniform float uCloudShift;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vViewW;
  void main() {
    vec3 n = normalize(vNormalW);
    float light = dot(n, uSun);
    // 0 on the night side, 1 in daylight, with a soft sunset line between
    float day = smoothstep(-0.12, 0.28, light);

    vec3 surface = texture2D(uDay, vUv).rgb * (0.08 + 1.1 * max(light, 0.0));
    float city = texture2D(uNight, vUv).r;
    vec3 cityLights = vec3(1.0, 0.78, 0.5) * pow(city, 1.6) * 1.6;

    // Clouds drift a little faster than the ground
    float clouds = texture2D(uClouds, vUv + vec2(uCloudShift, 0.0)).r;
    clouds = smoothstep(0.15, 0.9, clouds);

    vec3 color = mix(cityLights * (1.0 - clouds), surface, day);
    color = mix(color, vec3(0.95, 0.97, 1.0) * (0.03 + max(light, 0.0)), clouds * 0.85 * (0.15 + 0.85 * day));

    // Atmosphere: thin blue haze at the edge, brightest in sunlight
    float edge = pow(1.0 - max(dot(n, normalize(vViewW)), 0.0), 3.0);
    color += vec3(0.25, 0.65, 1.0) * edge * (0.15 + 0.9 * day);

    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`

const atmosphereVertex = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vViewW;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewW = normalize(cameraPosition - world.xyz);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

const atmosphereFragment = /* glsl */ `
  uniform vec3 uSun;
  varying vec3 vNormalW;
  varying vec3 vViewW;
  void main() {
    vec3 n = normalize(vNormalW);
    float facing = abs(dot(n, normalize(vViewW)));
    // Strongest right at Earth's edge, fading to nothing further out
    float glow = pow(smoothstep(0.0, 0.32, facing), 2.0);
    float sunlit = smoothstep(-0.4, 0.6, dot(n, uSun));
    vec3 color = vec3(0.24, 0.65, 1.0) * glow * (0.15 + 1.1 * sunlit);
    gl_FragColor = vec4(color, glow);
    #include <colorspace_fragment>
  }
`

type Props = {
  position: [number, number, number]
  radius: number
  sun: THREE.Vector3
  hd: boolean
  reducedMotion?: boolean
}

export function Earth({ position, radius, sun, hd, reducedMotion = false }: Props) {
  const size = hd ? '2k' : '1k'
  const [day, night, clouds] = useTexture(
    [`/textures/earth/day-${size}.webp`, `/textures/earth/night-${size}.webp`, `/textures/earth/clouds-${size}.webp`],
    (textures) => {
      // Only the daytime photo holds real colours; the others are brightness maps
      textures[0].colorSpace = THREE.SRGBColorSpace
      textures.forEach((t) => (t.anisotropy = 4))
    },
  )

  const planet = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(
    () => ({
      uDay: { value: day },
      uNight: { value: night },
      uClouds: { value: clouds },
      uSun: { value: sun },
      uCloudShift: { value: 0 },
    }),
    [day, night, clouds, sun],
  )
  const atmosphereUniforms = useMemo(() => ({ uSun: { value: sun } }), [sun])

  // One full turn takes about 4 minutes; clouds drift slightly faster
  useFrame((_, delta) => {
    if (reducedMotion || !planet.current) return
    planet.current.rotation.y += delta * ((Math.PI * 2) / 240)
    uniforms.uCloudShift.value += delta * 0.0008
  })

  const segments = hd ? 128 : 64

  return (
    <group position={position}>
      {/* Tipped back so the visible top edge shows mid-latitudes, not polar ice */}
      <mesh ref={planet} rotation={[-0.9, -1.2, 0]}>
        <sphereGeometry args={[radius, segments, segments]} />
        <shaderMaterial vertexShader={earthVertex} fragmentShader={earthFragment} uniforms={uniforms} />
      </mesh>
      <mesh scale={1.05}>
        <sphereGeometry args={[radius, 64, 64]} />
        <shaderMaterial
          vertexShader={atmosphereVertex}
          fragmentShader={atmosphereFragment}
          uniforms={atmosphereUniforms}
          side={THREE.BackSide}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
