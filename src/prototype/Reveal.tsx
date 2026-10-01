import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './Reveal.css'

// ─────────────────────────────────────────────────────────────
// PAGE REVEAL: the airlock intro
//
// How it works, in plain English:
//  • While the film downloads, the screen is covered by two "blast doors"
//    (a top half and a bottom half) with a big counter and the site title.
//  • The doors hold two copies of the same picture, each showing its own half,
//    so together they look like one screen.
//  • When the film is ready, a bright laser line cuts across the middle,
//    the doors unlock with a small jolt, then slide apart (top up, bottom down).
//  • Behind them the film zooms gently into place, and the hero words rise in.
// ─────────────────────────────────────────────────────────────

const MIN_SHOW = 2.4 // seconds: the intro always plays this long, even if the film is already saved
const GIVE_UP = 14 // seconds: on very slow connections, open anyway (the small loading pill takes over)

type Props = {
  loaded: number // film download, 0–100 (-1 = failed)
  ready: boolean
  onOpen: () => void // doors started opening: let the page scroll again
}

export function Reveal({ loaded, ready, onOpen }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const [gone, setGone] = useState(false)
  // The latest download state, read by the animation loop below
  const state = useRef({ loaded, ready })
  state.current = { loaded, ready }
  const openRef = useRef(onOpen)
  openRef.current = onOpen

  useEffect(() => {
    const el = root.current!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const q = gsap.utils.selector(el)
    const counters = q('.rv-count') as HTMLElement[]
    const status = q('.rv-status') as HTMLElement[]
    const start = performance.now()
    let shown = 0
    let opening = false

    const ctx = gsap.context(() => {
      // ── 1. Intro: brackets draw in, title letters rise, small labels appear
      if (!reduced) {
        const intro = gsap.timeline({ defaults: { ease: 'expo.out' } })
        intro
          .from(q('.rv-corner'), { scale: 0.4, autoAlpha: 0, duration: 1, stagger: 0.06 }, 0.1)
          .from(q('.rv-letter'), { yPercent: 110, duration: 1.1, stagger: 0.025 }, 0.2)
          .from(q('.rv-meta'), { autoAlpha: 0, y: 10, duration: 0.8, stagger: 0.05 }, 0.5)
          .from(q('.rv-count-wrap'), { yPercent: 100, duration: 1.2 }, 0.4)
          .from(q('.rv-bar'), { scaleX: 0, duration: 1.2 }, 0.6)
      }

      // ── 2. The open: laser cut, unlock jolt, doors part, film zooms in, hero words rise
      const open = () => {
        opening = true
        status.forEach((s) => (s.textContent = 'Clearance granted · Doors opening'))
        const film = document.querySelector('.stage .frame')
        const hero = document.querySelectorAll('.p-hero .hero-in')

        if (reduced) {
          gsap.to(el, { autoAlpha: 0, duration: 0.4, onStart: () => openRef.current(), onComplete: () => setGone(true) })
          return
        }

        const tl = gsap.timeline({ onComplete: () => setGone(true) })
        tl.to(q('.rv-bar-fill'), { backgroundColor: '#8deff7', duration: 0.2 }, 0)
          // The laser line cuts across from the centre outwards
          .fromTo(q('.rv-laser'), { scaleX: 0, autoAlpha: 1 }, { scaleX: 1, duration: 0.7, ease: 'expo.inOut' }, 0.15)
          .to(q('.rv-flash'), { autoAlpha: 1, duration: 0.08, yoyo: true, repeat: 1 }, 0.75)
          // Unlock jolt: doors crack open a few pixels and hiss
          .to(q('.rv-door--top'), { yPercent: -2.5, duration: 0.18, ease: 'power3.out' }, 0.85)
          .to(q('.rv-door--bottom'), { yPercent: 2.5, duration: 0.18, ease: 'power3.out' }, 0.85)
          .to(q('.rv-seam-glow'), { autoAlpha: 1, duration: 0.2 }, 0.85)
          .to(q('.rv-laser'), { autoAlpha: 0, duration: 0.3 }, 0.95)
          .add(() => openRef.current(), 1.15)
          // Then they slide away for good
          .to(q('.rv-door--top'), { yPercent: -101, duration: 1.4, ease: 'expo.inOut' }, 1.15)
          .to(q('.rv-door--bottom'), { yPercent: 101, duration: 1.4, ease: 'expo.inOut' }, 1.15)
          // Words on the doors drift a little slower than the doors: a sense of depth
          .to(q('.rv-door--top .rv-content'), { yPercent: 12, duration: 1.4, ease: 'expo.inOut' }, 1.15)
          .to(q('.rv-door--bottom .rv-content'), { yPercent: -12, duration: 1.4, ease: 'expo.inOut' }, 1.15)
        if (film) tl.fromTo(film, { scale: 1.35, filter: 'brightness(0.4)' }, { scale: 1, filter: 'brightness(1)', duration: 2.2, ease: 'expo.out', clearProps: 'transform,filter' }, 1.2)
        if (hero.length)
          tl.fromTo(hero, { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.2, stagger: 0.08, ease: 'expo.out', clearProps: 'all' }, 1.75)
      }

      // ── 3. Each frame: move the counter smoothly towards the real download progress
      const tick = () => {
        if (opening) return
        const { loaded: l, ready: r } = state.current
        const t = (performance.now() - start) / 1000
        // If the server doesn't say the file size, creep forward so it never looks stuck
        const creep = 88 * (1 - Math.exp(-t / 5))
        const target = r || l < 0 ? 100 : Math.min(99, Math.max(l, creep * 0.5))
        shown += (target - shown) * 0.08
        if (target === 100 && shown > 99.6) shown = 100
        const text = String(Math.floor(shown)).padStart(3, '0')
        counters.forEach((c) => (c.textContent = text))
        q('.rv-bar-fill').forEach((b: HTMLElement) => (b.style.transform = `scaleX(${shown / 100})`))
        if ((shown === 100 && t >= MIN_SHOW) || t >= GIVE_UP) open()
      }
      gsap.ticker.add(tick)
      return () => gsap.ticker.remove(tick)
    }, el)

    return () => ctx.revert()
  }, [])

  if (gone) return null

  return (
    <div ref={root} className="reveal" role="status" aria-label="Loading the flight film">
      <Door side="top" />
      <Door side="bottom" />
      <div className="rv-laser" aria-hidden="true" />
      <div className="rv-flash" aria-hidden="true" />
    </div>
  )
}

const TITLE = ['The AI', 'Project Manager']

// One blast door. Both doors draw the same full-screen picture; each shows only its half.
function Door({ side }: { side: 'top' | 'bottom' }) {
  return (
    <div className={`rv-door rv-door--${side}`} aria-hidden={side === 'bottom'}>
      <div className="rv-seam-glow" />
      <div className="rv-content">
        <span className="rv-corner rv-corner--tl" />
        <span className="rv-corner rv-corner--tr" />
        <span className="rv-corner rv-corner--bl" />
        <span className="rv-corner rv-corner--br" />

        <div className="rv-top">
          <span className="rv-meta label">Aurora Station · Docking bay 06</span>
          <span className="rv-meta label">LEO · 408 km · 27,600 km/h</span>
        </div>

        <h2 className="rv-title" aria-label={TITLE.join(' ')}>
          {TITLE.map((line) => (
            <span key={line} className="rv-line">
              {/* Words can wrap onto a new line on narrow screens; letters animate one by one */}
              {line.split(' ').map((word, w) => (
                <span key={w} className="rv-word">
                  {[...word].map((ch, i) => (
                    <span key={i} className="rv-letter">
                      {ch}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          ))}
        </h2>

        <div className="rv-bottom">
          <div className="rv-left">
            <span className="rv-meta label rv-status">Requesting docking clearance</span>
            <span className="rv-bar">
              <span className="rv-bar-fill" />
            </span>
            <span className="rv-meta label rv-by">Ranjit Kumar Yallamelli · Built with AI</span>
          </div>
          <div className="rv-count-mask">
            <div className="rv-count-wrap">
              <span className="rv-count">000</span>
              <span className="rv-pct">%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
