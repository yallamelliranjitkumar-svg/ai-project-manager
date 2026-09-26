import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { chapters, footer, hero } from '../content/content'
import './Flight.css'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────
// SCROLL-FLIGHT PROTOTYPE (parallax / "2.5D")
//
// How it works, in plain English:
//  • The page is very tall. A "stage" stays pinned to the screen while you scroll.
//  • Inside the stage are flat picture layers: stars, nebula, the ship, the station.
//  • One timeline, 0 → 100, describes the whole flight. Scrolling moves through
//    that timeline, so scrolling back rewinds it.
//  • Layers that move at different speeds create the feeling of depth (parallax).
//
// All positions inside a "frame" are percentages of a 16:9 picture, because the
// ship and station cut-outs were cut from 16:9 images and must line up with them.
// ─────────────────────────────────────────────────────────────

type Choice = 'accept' | 'override' | null

// Where things sit inside the 16:9 frame (percent), measured from the images
const SHIP_CENTER = { x: 50, y: 57 }
const DOCK_POINT = { x: 33, y: 41 } // left end of the station's middle ring

const DRONES = [
  { name: 'Strategy Agent', x: 24, y: 20 },
  { name: 'Stakeholder Agent', x: 76, y: 17 },
  { name: 'Data Agent', x: 85, y: 47, alert: true },
  { name: 'Risk Agent', x: 36, y: 84, alert: true },
  { name: 'Delivery Agent', x: 62, y: 88 },
]

const RINGS = [
  { label: '01 Define · 02 Plan', x: 66, y: 30 },
  { label: '03 Delegate · 04 Monitor', x: 70, y: 41 },
  { label: '05 Decide · 06 Deliver', x: 65, y: 56 },
]

// When each text panel is on screen (timeline units, 0–100)
const TIMES = {
  hero: [0, 7],
  define: [9, 16],
  plan: [18, 29],
  delegate: [31, 43],
  monitor: [45, 56],
  decide: [58, 68],
  deliver: [70, 85],
  finale: [88, 100],
}

const RAIL = [
  { label: '01', at: 9 },
  { label: '02', at: 18 },
  { label: '03', at: 31 },
  { label: '04', at: 45 },
  { label: '05', at: 58 },
  { label: '06', at: 70 },
]

export function Flight() {
  const root = useRef<HTMLDivElement>(null)
  const [choice, setChoice] = useState<Choice>(null)
  const [progress, setProgress] = useState(0)
  const [define, plan, delegate, monitor, decide, deliver] = chapters

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Smooth, weighty scrolling (skipped for visitors who prefer less motion)
    let lenis: Lenis | null = null
    const raf = (time: number) => lenis?.raf(time * 1000)
    if (!reduced) {
      lenis = new Lenis({ lerp: 0.08 })
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root)
      const tl = gsap.timeline({
        defaults: { ease: 'power1.inOut' },
        scrollTrigger: {
          trigger: '.flight',
          start: 'top top',
          end: 'bottom bottom',
          scrub: reduced ? true : 1,
          onUpdate: (self) => setProgress(Math.round(self.progress * 100)),
        },
      })

      // Make the timeline exactly 100 units long, so "at 45" means 45% of the scroll
      tl.set({}, {}, 100)

      // Every layer scales and moves around the ship's centre
      gsap.set(q('.ship'), { transformOrigin: `${SHIP_CENTER.x}% ${SHIP_CENTER.y}%` })
      gsap.set(q('.station, .station-scene, .station-overlay'), { transformOrigin: '50% 50%' })

      // Text panels fade in and out at their times
      const panel = (sel: string, [start, end]: number[], first = false) => {
        if (!first) tl.fromTo(q(sel), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.5 }, start)
        if (end < 100) tl.to(q(sel), { autoAlpha: 0, y: -24, duration: 1.5 }, end - 1.5)
      }
      panel('.p-hero', TIMES.hero, true)
      panel('.p-define', TIMES.define)
      panel('.p-plan', TIMES.plan)
      panel('.p-delegate', TIMES.delegate)
      panel('.p-monitor', TIMES.monitor)
      panel('.p-decide', TIMES.decide)
      panel('.p-deliver', TIMES.deliver)
      panel('.p-finale', TIMES.finale)

      // ── Stars: the far layer drifts slowly, the near layer fast = depth.
      //    They slow down in Monitor and almost stop in Decide.
      tl.fromTo(q('.stars--far'), { backgroundPosition: '0px 0px' }, { backgroundPosition: '-260px -140px', duration: 44, ease: 'none' }, 8)
        .to(q('.stars--far'), { backgroundPosition: '-300px -160px', duration: 24, ease: 'power2.out' }, 52)
        .to(q('.stars--far'), { backgroundPosition: '-420px -230px', duration: 18, ease: 'power2.in' }, 70)
      tl.fromTo(q('.stars--near'), { backgroundPosition: '0px 0px' }, { backgroundPosition: '-1300px -700px', duration: 44, ease: 'none' }, 8)
        .to(q('.stars--near'), { backgroundPosition: '-1450px -780px', duration: 24, ease: 'power2.out' }, 52)
        .to(q('.stars--near'), { backgroundPosition: '-2100px -1150px', duration: 18, ease: 'power2.in' }, 70)
      tl.fromTo(q('.stars'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 5 }, 8)

      // ── HERO → DEFINE: the ship lifts away from Earth.
      //    The cut-out ship lines up exactly with the ship in the photo, so we can
      //    fade the photo away and the ship "stays" while the clouds fall behind.
      tl.to(q('.ship-scene'), { scale: 1.06, duration: 8, ease: 'none' }, 0)
      tl.fromTo(q('.ship'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 7.9)
      tl.to(q('.ship-scene'), { yPercent: 18, scale: 1.25, duration: 7 }, 8)
      tl.to(q('.ship-scene'), { autoAlpha: 0, duration: 2.5, ease: 'power1.in' }, 8)
      tl.fromTo(q('.ship'), { scale: 1.06 }, { scale: 0.72, yPercent: -6, duration: 8 }, 8)
      tl.fromTo(q('.earth-glow'), { autoAlpha: 0.9, yPercent: 0 }, { autoAlpha: 0, yPercent: 60, duration: 9 }, 8)

      // ── PLAN: a glowing route plots ahead of the ship
      tl.fromTo(q('.route-line'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 7 }, 19)
      tl.fromTo(q('.route-dot'), { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 1, stagger: 1.2 }, 20)
      tl.to(q('.route'), { autoAlpha: 0, duration: 2 }, 29)

      // ── DELEGATE: violet nebula (AI) fades in; five AI drones join the formation
      tl.fromTo(q('.nebula'), { autoAlpha: 0, scale: 1.25 }, { autoAlpha: 0.85, scale: 1.05, duration: 12 }, 29)
      q('.drone').forEach((el: Element, i: number) => {
        const d = DRONES[i]
        const fromX = d.x < 50 ? -60 : 60
        tl.fromTo(el, { autoAlpha: 0, xPercent: fromX * 8, yPercent: -200 }, { autoAlpha: 1, xPercent: 0, yPercent: 0, duration: 4, ease: 'power2.out' }, 32 + i * 1.8)
      })

      // ── MONITOR: lightning flickers, Data and Risk drones turn amber, hazards ahead
      tl.to(q('.nebula'), { autoAlpha: 1, scale: 1.12, duration: 10 }, 44)
      ;[45.5, 47, 50, 51, 54].forEach((t, i) =>
        tl.fromTo(q('.flash'), { autoAlpha: 0 }, { autoAlpha: i % 2 ? 0.2 : 0.35, duration: 0.4, yoyo: true, repeat: 1, ease: 'none' }, t),
      )
      tl.fromTo(q('.drone--alert .drone__alert'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.5 }, 47)
      tl.fromTo(q('.hazard'), { autoAlpha: 0, scale: 0.5 }, { autoAlpha: 1, scale: 1, duration: 2, stagger: 1 }, 48)

      // ── DECIDE: the AI signal (violet) and human signal (warm white) meet at the ship
      tl.to(q('.hazard'), { autoAlpha: 0.35, duration: 2 }, 58)
      tl.fromTo(q('.signal--ai'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 4 }, 59)
      tl.fromTo(q('.signal--human'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 4 }, 60)
      tl.fromTo(q('.signal-tag'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.5 }, 60)
      tl.fromTo(q('.signal-meet'), { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 1.5 }, 64)

      // ── DELIVER: leave the nebula, the station grows, the ship flies in and docks
      tl.to(q('.signals, .hazard, .drone__alert'), { autoAlpha: 0, duration: 2 }, 68)
      tl.to(q('.drone'), { autoAlpha: 0, yPercent: 120, duration: 5, stagger: 0.5 }, 69)
      tl.to(q('.nebula'), { autoAlpha: 0, scale: 1.3, duration: 8 }, 68)
      tl.fromTo(q('.station'), { autoAlpha: 0, scale: 0.28, xPercent: 16, yPercent: -4 }, { autoAlpha: 1, scale: 1, xPercent: 0, yPercent: 0, duration: 16, ease: 'power2.inOut' }, 70)
      tl.to(
        q('.ship'),
        {
          scale: 0.12,
          xPercent: DOCK_POINT.x - SHIP_CENTER.x,
          yPercent: DOCK_POINT.y - SHIP_CENTER.y,
          duration: 16,
          ease: 'power2.out',
        },
        69,
      )
      tl.fromTo(q('.dock-pulse'), { autoAlpha: 0, scale: 0.2 }, { autoAlpha: 1, scale: 1.6, duration: 1.5, ease: 'power2.out' }, 85.5)
      tl.to(q('.dock-pulse'), { autoAlpha: 0, duration: 1.5 }, 87)

      // ── FINALE: the full station photo (with Earth) fades in behind, the camera
      //    pulls back, and the three rings are labelled with the six stages
      tl.fromTo(q('.station-scene'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 3 }, 86)
      tl.to(q('.stars'), { autoAlpha: 0, duration: 3 }, 86)
      tl.to(q('.camera'), { scale: 0.9, duration: 12, ease: 'power1.out' }, 88)
      tl.fromTo(q('.ring-label'), { autoAlpha: 0, x: -12 }, { autoAlpha: 1, x: 0, duration: 2, stagger: 1.5 }, 89)
      tl.fromTo(q('.station-alert'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, 90)
    }, root)

    return () => {
      ctx.revert()
      gsap.ticker.remove(raf)
      lenis?.destroy()
    }
  }, [])

  const deliverText = choice === 'accept' && deliver.acceptText ? deliver.acceptText : deliver.text

  return (
    <div ref={root}>
      <div className="flight">
        <div className="stage" aria-hidden="false">
          {/* ── Picture layers (back to front) ── */}
          <div className="stars stars--far" aria-hidden="true" />
          <img className="cover nebula" src="/prototype/nebula.webp" alt="" />
          <div className="camera" aria-hidden="true">
            <img className="frame station-scene" src="/prototype/station-scene.webp" alt="" />
            <img className="frame ship-scene" src="/prototype/ship-scene.webp" alt="" />
            <div className="earth-glow" />
            <img className="frame station" src="/prototype/station.webp" alt="" />

            {/* Overlays drawn in the same 16:9 frame so they line up with the pictures */}
            <div className="frame overlay route">
              <svg viewBox="0 0 1600 900" preserveAspectRatio="none">
                <path className="route-line" pathLength={1} d="M 1152 630 C 1312 684, 1408 720, 1664 792" />
              </svg>
              {[
                [80, 75],
                [88, 80],
                [96, 84],
              ].map(([x, y]) => (
                <span key={x} className="route-dot" style={{ left: `${x}%`, top: `${y}%` }} />
              ))}
            </div>

            <div className="frame overlay signals">
              <svg viewBox="0 0 1600 900" preserveAspectRatio="none">
                <path className="signal signal--ai" pathLength={1} d="M 384 180 Q 544 342, 800 459" />
                <path className="signal signal--human" pathLength={1} d="M 64 108 Q 448 180, 800 459" />
              </svg>
              <span className="signal-meet" style={{ left: '50%', top: '51%' }} />
              <span className="signal-tag signal-tag--human" style={{ left: '3%', top: '8%' }}>
                Human · Command
              </span>
            </div>

            <img className="frame ship" src="/prototype/ship.webp" alt="" />

            <div className="frame overlay">
              {DRONES.map((d) => (
                <span
                  key={d.name}
                  className={`drone${d.alert ? ' drone--alert' : ''}`}
                  style={{ left: `${d.x}%`, top: `${d.y}%` }}
                >
                  <span className="drone__body" />
                  {d.alert && <span className="drone__alert" />}
                  <span className="drone__label">{d.name}</span>
                </span>
              ))}
              <span className="hazard" style={{ left: '90%', top: '64%' }}>
                Hazard
              </span>
              <span className="hazard" style={{ left: '84%', top: '86%' }}>
                Hazard
              </span>
            </div>

            <div className="frame overlay station-overlay">
              <span className="dock-pulse" style={{ left: `${DOCK_POINT.x}%`, top: `${DOCK_POINT.y}%` }} />
              {RINGS.map((r) => (
                <span key={r.label} className="ring-label" style={{ left: `${r.x}%`, top: `${r.y}%` }}>
                  {r.label}
                </span>
              ))}
              {choice === 'accept' && <span className="station-alert" style={{ left: '61%', top: '55%' }} />}
            </div>
          </div>
          <div className="stars stars--near" aria-hidden="true" />
          <div className="flash" aria-hidden="true" />
          <div className="vignette" aria-hidden="true" />

          {/* ── Text panels (real HTML, so they stay sharp and readable) ── */}
          <div className="tag-prototype label">Prototype · parallax test</div>

          <section className="panel panel--hero p-hero">
            <span className="label">{hero.status}</span>
            <h1 className="panel__hero-title">
              {hero.lines[0]}
              <br />I build <span className="ai-text">with AI</span>.
            </h1>
            <p className="panel__cue label">Scroll to launch ↓</p>
          </section>

          <Panel cls="p-define" index={0} ch={define}>
            <p className="panel__brief">{define.brief}</p>
          </Panel>
          <Panel cls="p-plan" index={1} ch={plan}>
            <p className="panel__stat">{plan.stat}</p>
          </Panel>
          <Panel cls="p-delegate" index={2} ch={delegate}>
            <p className="panel__small">
              <span className="ai-tag">AI</span>Five agents join the formation.
            </p>
          </Panel>
          <Panel cls="p-monitor" index={3} ch={monitor}>
            <ul className="panel__alerts">
              {monitor.warnings?.map((w) => (
                <li key={w}>
                  <span className="panel__alert-tag">Alert</span>
                  {w}
                </li>
              ))}
            </ul>
          </Panel>
          <Panel cls="p-decide" index={4} ch={decide} side="right">
            <p className="panel__small">
              <span className="ai-tag">AI</span>
              {decide.recommendation}
            </p>
            <div className="panel__choices">
              <button className="pbtn pbtn--ai" aria-pressed={choice === 'accept'} onClick={() => setChoice('accept')}>
                {decide.accept}
              </button>
              <button
                className="pbtn pbtn--human"
                aria-pressed={choice === 'override'}
                onClick={() => setChoice('override')}
              >
                {decide.override}
              </button>
            </div>
          </Panel>
          <Panel cls="p-deliver" index={5} ch={{ ...deliver, text: deliverText }} warn={choice === 'accept'} />

          <section className="panel panel--finale p-finale">
            <span className="label">Aurora Station · Docked</span>
            <p className="panel__closing">
              {footer.closing[0]} <span className="panel__closing-accent">{footer.closing[1]}</span>
            </p>
          </section>

          {/* Progress rail: 01–06 */}
          <ol className="rail" aria-label="Flight progress">
            {RAIL.map((r, i) => {
              const next = RAIL[i + 1]?.at ?? 88
              const state = progress >= next ? 'done' : progress >= r.at ? 'active' : ''
              return (
                <li key={r.label} className={`rail__tick ${state}`}>
                  {r.label}
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      <section className="after">
        <p className="label">End of prototype</p>
        <p>
          This is a free parallax test built from three still images. The final version could use an AI-generated
          film for smoother, cinematic motion. See docs/SCROLL-ANIMATION-PLAN.md.
        </p>
        <a className="label" href="/">
          ← Back to the main site
        </a>
      </section>
    </div>
  )
}

type PanelProps = {
  cls: string
  index: number
  ch: { title: string; ward: string; question: string; text: string }
  side?: 'left' | 'right'
  warn?: boolean
  children?: ReactNode
}

function Panel({ cls, index, ch, side = 'left', warn, children }: PanelProps) {
  return (
    <section className={`panel panel--${side} hud ${cls}`}>
      <span className="label">
        0{index + 1} / 06 · {ch.ward}
      </span>
      <h2 className="panel__title">{ch.title}</h2>
      <p className="panel__question">{ch.question}</p>
      <p className={`panel__text${warn ? ' panel__text--warn' : ''}`}>{ch.text}</p>
      {children}
    </section>
  )
}
