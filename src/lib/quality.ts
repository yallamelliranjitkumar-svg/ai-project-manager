// Decides how much 3D work the visitor's device can handle.
// Phones and small screens get a lighter scene (see DESIGN.md §10).

export type Quality = {
  low: boolean
  particles: number
  windows: number
  bloom: boolean
  maxPixelRatio: number
  reducedMotion: boolean
}

export function getQuality(): Quality {
  const touch = window.matchMedia('(pointer: coarse)').matches
  const small = window.innerWidth < 768
  const low = touch || small
  return {
    low,
    particles: low ? 800 : 3000,
    windows: low ? 200 : 600,
    bloom: !low,
    maxPixelRatio: low ? 1.5 : 2,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  }
}

// Checks whether the browser can draw 3D at all.
export function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}
