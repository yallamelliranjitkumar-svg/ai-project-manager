import { hero } from '../content/content'
import './Hero.css'

// Section 1: the big opening statement, with Earth and Aurora Station behind it.
export function Hero() {
  const [first, second] = hero.lines
  // "with AI." is shown in violet, because violet always means AI
  const [before, after] = second.split('with AI')

  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <span className="label hero__status">
          <span className="hero__status-dot" aria-hidden="true" />
          {hero.status}
        </span>
        <p className="hero__eyebrow">{hero.eyebrow}</p>
        <h1 className="hero__title">
          <span className="hero__line">{first}</span>
          <span className="hero__line">
            {before}
            <span className="ai-text">with AI</span>
            {after}
          </span>
        </h1>
        <p className="body-l hero__intro">{hero.intro}</p>
        <a href="#journey" className="hero__cue">
          <span className="hero__cue-line" aria-hidden="true" />
          {hero.scrollCue}
        </a>
      </div>
    </section>
  )
}
