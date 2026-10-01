import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { chapters, footer, hero } from '../content/content'
import { Nav } from '../sections/Nav'
import { Footer } from '../sections/Footer'
import { After } from './After'
import { Reveal } from './Reveal'
import './Flight.css'

gsap.registerPlugin(ScrollTrigger)
// Phones: the address bar sliding in and out resizes the window; don't re-measure the page for that
ScrollTrigger.config({ ignoreMobileResize: true })

// ─────────────────────────────────────────────────────────────
// SCROLL FILM (the home page)
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
// (weight). Times come from the finished film: 04-film/aurora-flight-v4.mp4 (all-angle version)
//  climb (right side) · orbit right → front → left, ship flies out of frame · cut to the nebula:
//  left side → rear · rear, into the storm · out of the storm behind the ship, station ahead →
//  round the back to the right side · docking · whole station
const CHAPTERS = [
  { key: 'hero', from: 0, to: 1.5, weight: 1 },
  { key: 'define', from: 1.5, to: 9.4, weight: 1.6 },
  { key: 'plan', from: 9.4, to: 14.25, weight: 1.3 },
  { key: 'delegate', from: 14.25, to: 19.3, weight: 1.3 },
  { key: 'monitor', from: 19.3, to: 21.9, weight: 1.3 },
  { key: 'decide', from: 21.9, to: 24.3, weight: 1.5 },
  { key: 'deliver', from: 24.3, to: 42.45, weight: 2.4 },
  { key: 'finale', from: 42.45, to: 47.55, weight: 1.8 },
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
  const [opened, setOpened] = useState(false) // the intro doors have opened
  const lenisRef = useRef<Lenis | null>(null)
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
        // The loading message must always clear. Phones differ in which "ready" signal they
        // send (iPhones may send none unless told to load), so accept any of them, and as a
        // safety net clear it a few seconds after the download finished anyway.
        let done = false
        const markReady = () => {
          if (done || cancelled) return
          done = true
          setReady(true)
          ScrollTrigger.refresh() // measure the page again now the film is ready
          // Some phones only show frames after the video has "played" once (don't wait for it)
          v.play()
            .then(() => v.pause())
            .catch(() => {})
        }
        for (const ev of ['loadedmetadata', 'loadeddata', 'canplay']) v.addEventListener(ev, markReady, { once: true })
        setTimeout(markReady, 3000)
        v.preload = 'auto'
        v.src = objectUrl
        v.load()
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
      lenisRef.current = lenis
      lenis.stop() // no scrolling until the intro doors open (see Reveal.tsx)
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

        // Text: floats over the film, builds up piece by piece, drifts, then leaves
        const panel = q(`.p-${c.key}`)
        const w = c.weight
        const inAt = at + w * 0.1
        const outAt = at + w * 0.84
        if (c.key === 'hero') {
          tl.to(panel, { autoAlpha: 0, y: -40, duration: w * 0.2, ease: 'power1.in' }, outAt)
        } else if (c.key === 'finale' || reduced) {
          tl.fromTo(panel, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: w * 0.12, ease: 'power1.out' }, inAt)
          if (c.key !== 'finale') tl.to(panel, { autoAlpha: 0, duration: w * 0.12 }, outAt)
        } else {
          const part = (sel: string) => q(`.p-${c.key} ${sel}`)
          tl.set(panel, { autoAlpha: 1 }, inAt)
          // Slow drift the whole time it's on screen: a floating, in-space feel
          tl.fromTo(panel, { y: 14, x: -8 }, { y: -22, x: 8, duration: w * 0.9 }, inAt)
          // 1. label slides in  2. title rises word by word  3. question  4. sentences  5. extras
          tl.fromTo(part('.fx-label'), { autoAlpha: 0, x: -24 }, { autoAlpha: 1, x: 0, duration: w * 0.06, ease: 'power2.out' }, inAt)
          tl.fromTo(
            part('.fx-word'),
            { autoAlpha: 0, yPercent: 70, rotate: 4 },
            { autoAlpha: 1, yPercent: 0, rotate: 0, duration: w * 0.07, stagger: w * 0.02, ease: 'power3.out' },
            inAt + w * 0.03,
          )
          tl.fromTo(part('.fx-q'), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: w * 0.06, ease: 'power2.out' }, inAt + w * 0.1)
          tl.fromTo(
            part('.fx-line'),
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: w * 0.06, stagger: w * 0.04, ease: 'power2.out' },
            inAt + w * 0.14,
          )
          tl.fromTo(
            part('.fx-item'),
            { autoAlpha: 0, x: -18 },
            { autoAlpha: 1, x: 0, duration: w * 0.06, stagger: w * 0.045, ease: 'power2.out' },
            inAt + w * 0.24,
          )
          tl.to(panel, { autoAlpha: 0, duration: w * 0.1, ease: 'power1.in' }, outAt)
        }

        // Things that CHANGE while you read (skipped for reduced motion: the final text just shows)
        if (!reduced) {
          if (c.key === 'define') {
            // The creative brief types itself out
            const el = q('.fx-type')[0] as HTMLElement | undefined
            if (el) {
              const full = el.dataset.text ?? ''
              const typed = { n: 0 }
              tl.fromTo(
                typed,
                { n: 0 },
                {
                  n: full.length,
                  duration: w * 0.36,
                  immediateRender: false,
                  onUpdate: () => (el.textContent = full.slice(0, Math.round(typed.n))),
                },
                inAt + w * 0.26,
              )
              el.textContent = '' // starts empty, then types
            }
          }
          if (c.key === 'plan') {
            // The numbers count up
            q('.fx-count').forEach((node: Element) => {
              const el = node as HTMLElement
              const end = Number(el.dataset.n)
              const v = { n: 0 }
              tl.fromTo(
                v,
                { n: 0 },
                { n: end, duration: w * 0.2, immediateRender: false, onUpdate: () => (el.textContent = String(Math.round(v.n))) },
                inAt + w * 0.26,
              )
              el.textContent = '0'
            })
          }
          if (c.key === 'monitor') {
            // Each check flips from cyan "Checking" to amber "Alert"
            q('.fx-alert').forEach((li: Element, i: number) => {
              const flip = inAt + w * (0.4 + i * 0.12)
              // (colour values = --cyan-bright and --warn in tokens.css; GSAP needs real colours to blend)
              tl.fromTo(li, { color: '#8deff7' }, { color: '#f5a524', duration: w * 0.05 }, flip)
              tl.fromTo(li.querySelector('.fx-check'), { autoAlpha: 1 }, { autoAlpha: 0, duration: w * 0.04 }, flip)
              tl.fromTo(li.querySelector('.fx-warn'), { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: w * 0.05, ease: 'back.out(3)' }, flip)
            })
          }
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
      lenisRef.current = null
    }
  }, [])

  // While the intro doors are shut, the page can't scroll (touch screens included)
  useEffect(() => {
    if (opened) return
    const html = document.documentElement
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = ''
    }
  }, [opened])

  const openDoors = () => {
    setOpened(true)
    lenisRef.current?.start()
  }

  const deliverText = choice === 'accept' && deliver.acceptText ? deliver.acceptText : deliver.text

  return (
    <div ref={root}>
      <Nav />
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

          {/* Only if the doors gave up waiting on a very slow connection */}
          {opened && !ready && loaded >= 0 && (
            <div className="loader label" role="status">
              Requesting docking clearance… {loaded}%
            </div>
          )}

          {/* ── Text panels (real HTML, so they stay sharp and readable) ── */}
          <section className="panel panel--hero p-hero">
            {/* hero-mask / hero-in: each piece rises out of its own mask after the intro doors open */}
            <span className="hero-mask">
              <span className="hero-in label">{hero.status}</span>
            </span>
            <h1 className="panel__hero-title" aria-label={hero.lines.join(' ')}>
              <span className="hero-mask" aria-hidden="true">
                <span className="hero-in">{hero.lines[0]}</span>
              </span>
              <span className="hero-mask" aria-hidden="true">
                <span className="hero-in">
                  I build <span className="ai-text">with AI</span>.
                </span>
              </span>
            </h1>
            <span className="hero-mask">
              <span className="hero-in panel__hero-proof">{hero.proof}</span>
            </span>
            <span className="hero-mask">
              <span className="hero-in panel__cue label">Scroll to launch ↓</span>
            </span>
          </section>

          {/* Each chapter sits in the empty part of its shot (see pos) */}
          <Panel cls="p-define" pos="tl" index={0} ch={define}>
            {/* The brief types itself out: the invisible copy keeps the space, the visible copy is typed */}
            <p className="panel__brief fx-item">
              <span className="panel__brief-ghost" aria-hidden="true">
                {define.brief}
              </span>
              <span className="panel__brief-typed fx-type" data-text={define.brief}>
                {define.brief}
              </span>
            </p>
          </Panel>
          <Panel cls="p-plan" pos="tr" index={1} ch={plan}>
            <p className="panel__stat fx-item">
              {plan.stats?.map((s, i) => (
                <span key={s.label}>
                  {i > 0 && ' · '}
                  <span className="panel__stat-n fx-count" data-n={s.n}>
                    {s.n}
                  </span>{' '}
                  {s.label}
                </span>
              ))}
            </p>
          </Panel>
          <Panel cls="p-delegate" pos="tr" index={2} ch={delegate}>
            <ul className="panel__agents">
              {delegate.agents?.map((a) => (
                <li key={a.agent} className="fx-item">
                  <span className="ai-tag">AI</span>
                  {a.agent}
                </li>
              ))}
            </ul>
          </Panel>
          <Panel cls="p-monitor" pos="tr" index={3} ch={monitor}>
            <ul className="panel__alerts">
              {monitor.warnings?.map((w) => (
                <li key={w} className="fx-item fx-alert">
                  <span className="panel__alert-tags">
                    <span className="panel__check-tag fx-check">{monitor.checking}</span>
                    <span className="panel__alert-tag fx-warn">{monitor.alert}</span>
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </Panel>
          <Panel cls="p-decide" pos="l" index={4} ch={decide}>
            <p className="panel__small fx-item">
              <span className="ai-tag">AI</span>
              {decide.recommendation}
            </p>
            <p className="panel__small panel__muted fx-item">{decide.missing}</p>
            <div className="panel__choices fx-item">
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

      <After />
      <Footer showClosing={false} credit={footer.filmCredit} />
      <Reveal loaded={loaded} ready={ready} onOpen={openDoors} />
    </div>
  )
}

type PanelProps = {
  cls: string
  index: number
  ch: { title: string; ward: string; question: string; text: string }
  pos: 'tl' | 'tr' | 'l'
  warn?: boolean
  children?: ReactNode
}

// Chapter text floating over the film (no box). It's split into small pieces (fx-*)
// so the scroll timeline can bring them in one after another.
function Panel({ cls, pos, index, ch, warn, children }: PanelProps) {
  const sentences = ch.text.split(/(?<=\.)\s+/)
  return (
    <section className={`panel panel--${pos} panel--free ${cls}`}>
      <span className="label fx-label">
        0{index + 1} / 06 · {ch.ward}
      </span>
      <h2 className="panel__title" aria-label={ch.title}>
        {[...ch.title].map((letter, i) => (
          <span key={i} className="fx-word" aria-hidden="true">
            {letter}
          </span>
        ))}
      </h2>
      <p className="panel__question fx-q">{ch.question}</p>
      <p className={`panel__text${warn ? ' panel__text--warn' : ''}`}>
        {sentences.map((s, i) => (
          <span key={`${s}-${i}`} className="fx-line">
            {s}{' '}
          </span>
        ))}
      </p>
      {children}
    </section>
  )
}
