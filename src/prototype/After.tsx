import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { about, footer, site, stats } from '../content/content'
import './After.css'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────
// AFTER THE FILM: the project's real numbers, then About me.
//  • The numbers count up once, when the strip scrolls into view.
//  • The career steps fade in one after another.
//  • With "reduce motion" switched on, everything simply shows.
// ─────────────────────────────────────────────────────────────

export function After() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root)

      // Numbers count up from 0
      q('.stat__n').forEach((node: Element) => {
        const el = node as HTMLElement
        const end = Number(el.dataset.n)
        const v = { n: 0 }
        el.textContent = '0'
        gsap.to(v, {
          n: end,
          duration: end > 100 ? 1.8 : 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => (el.textContent = Math.round(v.n).toLocaleString('en-US')),
        })
      })

      // Everything marked .rise slides up into place as it scrolls into view
      q('.rise').forEach((el: Element) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 28,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root}>
      {/* ── What it took ── */}
      <section className="stats" aria-labelledby="stats-title">
        <div className="container">
          <p className="label rise">{stats.label}</p>
          <h2 id="stats-title" className="after__title rise">
            {stats.title}
          </h2>
          <ul className="stats__row">
            {stats.items.map((s) => (
              <li key={s.label} className="stat rise">
                <span className="stat__value">
                  <span className="stat__n" data-n={s.n}>
                    {s.n.toLocaleString('en-US')}
                  </span>
                  {s.suffix}
                </span>
                <span className="stat__label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── About me ── */}
      <section className="about" aria-labelledby="about-title">
        <div className="container">
          <p className="label rise">{about.label}</p>
          <h2 id="about-title" className="after__title rise">
            {about.title}
          </h2>
          <p className="about__intro rise">
            <strong>{site.name}.</strong> {about.intro}
          </p>

          <ol className="about__steps">
            {about.steps.map((s) => (
              <li key={s.role} className="about__step rise">
                <span className="about__years label">{s.years}</span>
                <h3 className="about__role">{s.role}</h3>
                <p className="about__org">{s.org}</p>
                <p className="about__text">{s.text}</p>
              </li>
            ))}
          </ol>

          <ul className="about__skills rise" aria-label="Skills">
            {about.skills.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>

          <a className="about__cta rise" href={site.linkedin} target="_blank" rel="noreferrer">
            {about.cta} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      {/* ── How this was made (lined up with the sections above) ── */}
      <section className="made" aria-label="How this was made">
        <div className="container">
          <p className="label rise">How this was made</p>
          <p className="made__text rise">{footer.howMade}</p>
        </div>
      </section>
    </div>
  )
}
