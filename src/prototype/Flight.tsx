import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { chapters, footer, hero } from '../content/content'
import './Flight.css'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────
// SCROLL FILM PROTOTYPE
//
// How it works, in plain English:
//  • The page is very tall. A "stage" stays pinned to the screen while you scroll.
//  • On the stage is the AI-generated flight film (made in Kling, joined by Claude).
//  • Scrolling moves the film forward or backward, frame by frame.
//  • Each chapter gets a similar amount of scrolling, even though the film spends
//    different amounts of time on each (see CHAPTERS below).
//  • All words, tags and buttons are real HTML on top of the film.
// ─────────────────────────────────────────────────────────────

type Choice = 'accept' | 'override' | null

// Film time (seconds) covered by each chapter, and how much scrolling it gets
// (weight). Times come from the finished film: 04-film/aurora-flight-master.mp4
const CHAPTERS = [
  { key: 'hero', from: 0, to: 1.5, weight: 1 },
  { key: 'define', from: 1.5, to: 9.4, weight: 1.6 },
  { key: 'plan', from: 9.4, to: 13.0, weight: 1.2 },
  { key: 'delegate', from: 13.0, to: 15.8, weight: 1.2 },
  { key: 'monitor', from: 15.8, to: 20.8, weight: 1.3 },
  { key: 'decide', from: 20.8, to: 25.9, weight: 1.5 },
  { key: 'deliver', from: 25.9, to: 41.0, weight: 2.2 },
  { key: 'finale', from: 41.0, to: 46.0, weight: 1.8 },
] as const

// Ring labels for the finale, placed on the film's last frame (percent of the 16:9 frame)
const RINGS = [
  { lines: ['01 Define', '02 Plan'], x: 66, y: 30 },
  { lines: ['03 Delegate', '04 Monitor'], x: 70, y: 41 },
  { lines: ['05 Decide', '06 Deliver'], x: 64.5, y: 53 },
]

const RAIL = ['define', 'plan', 'delegate', 'monitor', 'decide', 'deliver']

export function Flight() {
  const root = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [choice, setChoice] = useState<Choice>(null)
  const [active, setActive] = useState('hero')
  const [loaded, setLoaded] = useState(0) // film download, 0–100 (-1 = failed)
  const [ready, setReady] = useState(false)
  const [define, plan, delegate, monitor, decide, deliver] = chapters

  // ── 1. Download the whole film first, so jumping to any frame is instant.
  //       Phones get the lighter version.
  useEffect(() => {
    const small = window.matchMedia('(max-width: 767px)').matches
    const url = small ? '/film/flight-540.mp4' : '/film/flight-1080.mp4'
    let objectUrl = ''
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(url)
        const total = Number(res.headers.get('content-length')) || 0
        const reader = res.body!.getReader()
        const parts: Uint8Array[] = []
        let got = 0
        for (;;) {
          const { done, value } = await reader.read()
          if (done || cancelled) break
          parts.push(value)
          got += value.length
          if (total) setLoaded(Math.round((got / total) * 100))
        }
        if (cancelled) return
        objectUrl = URL.createObjectURL(new Blob(parts as BlobPart[], { type: 'video/mp4' }))
        const v = video.current!
        v.addEventListener(
          'loadeddata',
          () => {
            // Some phones only show frames after the video has "played" once
            v.play()
              .then(() => v.pause())
              .catch(() => {})
              .finally(() => setReady(true))
          },
          { once: true },
        )
        v.src = objectUrl
      } catch {
        setLoaded(-1) // keep the poster; the text story still works
      }
    })()
    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [])

  // ── 2. Scroll → film time, plus text panels on the same timeline
  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let lenis: Lenis | null = null
    const raf = (time: number) => lenis?.raf(time * 1000)
    if (!reduced) {
      lenis = new Lenis({ lerp: 0.09 })
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)
    }

    // The film time we want to show. A small loop moves the video there,
    // waiting for each jump to finish before the next (keeps phones smooth).
    const film = { t: 0 }
    const seek = () => {
      const v = video.current
      if (v && v.readyState >= 2 && !v.seeking && Math.abs(v.currentTime - film.t) > 1 / 48) v.currentTime = film.t
    }
    gsap.ticker.add(seek)

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root)
      const total = CHAPTERS.reduce((s, c) => s + c.weight, 0)
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.flight',
          start: 'top top',
          end: 'bottom bottom',
          scrub: reduced ? true : 0.6,
          onUpdate: (self) => {
            // Which chapter are we in?
            let acc = 0
            const pos = self.progress * total
            for (const c of CHAPTERS) {
              acc += c.weight
              if (pos <= acc) {
                setActive(c.key)
                break
              }
            }
          },
        },
      })

      let at = 0
      for (const c of CHAPTERS) {
        // Film: this chapter's slice of time, spread over its share of scrolling
        const filmShare = c.key === 'finale' ? 0.6 : 1
        tl.fromTo(film, { t: c.from }, { t: c.to, duration: c.weight * filmShare, immediateRender: false }, at)

        // Text panel: fades in after the chapter starts, out before it ends
        const panel = q(`.p-${c.key}`)
        const inAt = at + c.weight * 0.12
        const outAt = at + c.weight * 0.82
        if (c.key === 'hero') {
          tl.to(panel, { autoAlpha: 0, y: -24, duration: c.weight * 0.2, ease: 'power1.in' }, outAt)
        } else {
          tl.fromTo(panel, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: c.weight * 0.12, ease: 'power1.out' }, inAt)
          if (c.key !== 'finale') tl.to(panel, { autoAlpha: 0, y: -24, duration: c.weight * 0.12, ease: 'power1.in' }, outAt)
        }

        // Extra effects per chapter
        if (c.key === 'monitor') {
          tl.fromTo(q('.alert-glow'), { autoAlpha: 0 }, { autoAlpha: 1, duration: c.weight * 0.2 }, inAt)
          tl.to(q('.alert-glow'), { autoAlpha: 0, duration: c.weight * 0.2 }, outAt)
        }
        if (c.key === 'decide') {
          tl.fromTo(q('.signals'), { autoAlpha: 0 }, { autoAlpha: 1, duration: c.weight * 0.1 }, inAt)
          tl.fromTo(
            q('.signal'),
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: c.weight * 0.35, ease: 'power1.inOut', stagger: c.weight * 0.08 },
            inAt,
          )
          tl.to(q('.signals'), { autoAlpha: 0, duration: c.weight * 0.12 }, outAt)
        }
        if (c.key === 'finale') {
          tl.fromTo(
            q('.ring-label'),
            { autoAlpha: 0, x: -12 },
            { autoAlpha: 1, x: 0, duration: c.weight * 0.1, stagger: c.weight * 0.1 },
            at + c.weight * 0.55,
          )
          tl.fromTo(q('.station-alert'), { autoAlpha: 0 }, { autoAlpha: 1, duration: c.weight * 0.1 }, at + c.weight * 0.75)
        }
        at += c.weight
      }
    }, root)

    return () => {
      ctx.revert()
      gsap.ticker.remove(raf)
      gsap.ticker.remove(seek)
      lenis?.destroy()
    }
  }, [])

  const deliverText = choice === 'accept' && deliver.acceptText ? deliver.acceptText : deliver.text

  return (
    <div ref={root}>
      <div className="flight">
        <div className="stage">
          {/* The film (16:9, covering the screen) with its overlays in the same box */}
          <div className="frame">
            <video
              ref={video}
              className="film"
              muted
              playsInline
              preload="none"
              poster="/film/poster.webp"
              aria-hidden="true"
            />
            <div className="overlay">
              {RINGS.map((r) => (
                <span key={r.lines[0]} className="ring-label" style={{ left: `${r.x}%`, top: `${r.y}%` }}>
                  {r.lines.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </span>
              ))}
              {choice === 'accept' && <span className="station-alert" style={{ left: '61%', top: '51%' }} />}
            </div>
          </div>

          <div className="vignette" aria-hidden="true" />
          <div className="alert-glow" aria-hidden="true" />

          {/* Decide: the AI signal (violet) and the human signal (warm white) meet in the middle */}
          <svg className="signals" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
            <path className="signal signal--ai" pathLength={1} d="M 1600 120 Q 1200 260, 800 450" />
            <path className="signal signal--human" pathLength={1} d="M 0 780 Q 400 640, 800 450" />
          </svg>

          <div className="tag-prototype label">Prototype · scroll film</div>
          {!ready && loaded >= 0 && (
            <div className="loader label" role="status">
              Requesting docking clearance… {loaded}%
            </div>
          )}

          {/* ── Text panels (real HTML, so they stay sharp and readable) ── */}
          <section className="panel panel--hero p-hero">
            <span className="label">{hero.status}</span>
            <h1 className="panel__hero-title">
              {hero.lines[0]}
              <br />I build <span className="ai-text">with AI</span>.
            </h1>
            <p className="panel__cue label">Scroll to launch ↓</p>
          </section>

          <Panel cls="p-define" pos="bl" index={0} ch={define}>
            <p className="panel__brief">{define.brief}</p>
          </Panel>
          <Panel cls="p-plan" pos="bl" index={1} ch={plan}>
            <p className="panel__stat">{plan.stat}</p>
          </Panel>
          <Panel cls="p-delegate" pos="br" index={2} ch={delegate}>
            <ul className="panel__agents">
              {delegate.agents?.map((a) => (
                <li key={a.agent}>
                  <span className="ai-tag">AI</span>
                  {a.agent}
                </li>
              ))}
            </ul>
          </Panel>
          <Panel cls="p-monitor" pos="br" index={3} ch={monitor}>
            <ul className="panel__alerts">
              {monitor.warnings?.map((w) => (
                <li key={w}>
                  <span className="panel__alert-tag">Alert</span>
                  {w}
                </li>
              ))}
            </ul>
          </Panel>
          <Panel cls="p-decide" pos="r" index={4} ch={decide}>
            <p className="panel__small">
              <span className="ai-tag">AI</span>
              {decide.recommendation}
            </p>
            <p className="panel__small panel__muted">{decide.missing}</p>
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
          <Panel cls="p-deliver" pos="tl" index={5} ch={{ ...deliver, text: deliverText }} warn={choice === 'accept'} />

          <section className="panel panel--finale p-finale">
            <span className="label">Aurora Station · Docked</span>
            <p className="panel__closing">
              {footer.closing[0]} <span className="panel__closing-accent">{footer.closing[1]}</span>
            </p>
            <p className="panel__stages label">01 Define · 02 Plan · 03 Delegate · 04 Monitor · 05 Decide · 06 Deliver</p>
          </section>

          {/* Progress rail: 01–06 */}
          <ol className="rail" aria-label="Flight progress">
            {RAIL.map((key, i) => {
              const idx = RAIL.indexOf(active)
              const state = key === active ? 'active' : idx > i || active === 'finale' ? 'done' : ''
              return (
                <li key={key} className={`rail__tick ${state}`}>
                  0{i + 1}
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      <section className="after">
        <p className="label">End of prototype</p>
        <p>
          The flight film was generated with Kling AI from three reference images, shot by shot, then joined and
          prepared for the web by Claude. See inspiration/scroll/log.txt for the full process.
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
  pos: 'bl' | 'br' | 'tl' | 'r'
  warn?: boolean
  children?: ReactNode
}

function Panel({ cls, pos, index, ch, warn, children }: PanelProps) {
  return (
    <section className={`panel panel--${pos} hud ${cls}`}>
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
