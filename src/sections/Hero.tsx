import { hero } from '../content/content'
import './Hero.css'

// Section 1: the big opening statement.
export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <span className="label">{hero.eyebrow}</span>
        <h1 className="hero__title">
          {hero.lines.map((line) => (
            <span key={line} className="hero__line">
              {line}
            </span>
          ))}
        </h1>
        <p className="body-l hero__intro">{hero.intro}</p>
        <a href="#journey" className="hero__cue">
          <span className="hero__cue-dot" aria-hidden="true" />
          {hero.scrollCue}
        </a>
      </div>
    </section>
  )
}
