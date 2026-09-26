import { useState, type ReactNode } from 'react'
import { chapters } from '../content/content'
import './Chapters.css'

type Choice = 'accept' | 'override' | null

// Section 4: the six-chapter story, told as screens aboard Aurora Station.
// Phase 2 connects scrolling through these chapters to the 3D station.
export function Chapters() {
  const [define, plan, delegate, monitor, decide, deliver] = chapters
  // Remembers which button the visitor pressed in Chapter 5
  const [choice, setChoice] = useState<Choice>(null)

  return (
    <section className="chapters" aria-label="The six chapters of a project">
      <Chapter index={0} {...define}>
        <p className="chapter__brief">{define.brief}</p>
      </Chapter>

      <Chapter index={1} {...plan}>
        <p className="chapter__stat">{plan.stat}</p>
      </Chapter>

      <Chapter index={2} {...delegate}>
        <ul className="chapter__agents">
          {delegate.agents?.map((a) => (
            <li key={a.agent} className="chapter__agent">
              <span className="chapter__agent-name">
                <span className="ai-tag">AI</span>
                {a.agent}
              </span>
              <span className="chapter__agent-role">{a.role}</span>
            </li>
          ))}
        </ul>
      </Chapter>

      <Chapter index={3} {...monitor}>
        <ul className="chapter__warnings">
          {monitor.warnings?.map((w) => (
            <li key={w} className="chapter__warning">
              <span className="chapter__warning-tag">Alert</span>
              {w}
            </li>
          ))}
        </ul>
      </Chapter>

      <Chapter index={4} {...decide}>
        <p className="chapter__rec">
          <span className="ai-tag">AI</span>
          {decide.recommendation}
        </p>
        <p className="chapter__missing">{decide.missing}</p>
        <div className="chapter__choices" role="group" aria-label="Make the call">
          <button
            className="btn btn--secondary btn--ai"
            aria-pressed={choice === 'accept'}
            onClick={() => setChoice('accept')}
          >
            {decide.accept}
          </button>
          <button
            className="btn btn--primary btn--human"
            aria-pressed={choice === 'override'}
            onClick={() => setChoice('override')}
          >
            {decide.override}
          </button>
        </div>
      </Chapter>

      <Chapter
        index={5}
        {...deliver}
        text={choice === 'accept' && deliver.acceptText ? deliver.acceptText : deliver.text}
        tone={choice === 'accept' ? 'warn' : undefined}
      />
    </section>
  )
}

type ChapterProps = {
  index: number
  title: string
  ward: string
  question: string
  text: string
  tone?: 'warn'
  children?: ReactNode
}

// One chapter = one screen-tall block with a HUD glass panel.
// Panels alternate left and right so the station always has room.
function Chapter({ index, title, ward, question, text, tone, children }: ChapterProps) {
  const side = index % 2 === 0 ? 'left' : 'right'
  return (
    <article className={`chapter chapter--${side}`} id={`chapter-${index + 1}`}>
      <div className="container chapter__inner">
        <div className="chapter__panel hud">
          <span className="label">
            0{index + 1} / 06 · {ward}
          </span>
          <h2 className="chapter__title">{title}</h2>
          <p className="chapter__question">{question}</p>
          <hr className="hud-divider" />
          <p
            className={`chapter__text${tone === 'warn' ? ' chapter__text--warn' : ''}`}
            aria-live={index === 5 ? 'polite' : undefined}
          >
            {text}
          </p>
          {children}
        </div>
      </div>
    </article>
  )
}
