import { useState, type ReactNode } from 'react'
import { chapters } from '../content/content'
import './Chapters.css'

type Choice = 'accept' | 'override' | null

// Section 4: the six-chapter story. In Phase 1 this is the text only;
// Phase 2 connects scrolling through these chapters to the 3D sphere.
export function Chapters() {
  const [define, plan, delegate, monitor, decide, deliver] = chapters
  // Remembers which button the visitor pressed in Chapter 5
  const [choice, setChoice] = useState<Choice>(null)

  return (
    <section className="chapters" aria-label="The six chapters of a project">
      <Chapter index={0} title={define.title} question={define.question} text={define.text}>
        <p className="chapter__brief">{define.brief}</p>
      </Chapter>

      <Chapter index={1} title={plan.title} question={plan.question} text={plan.text}>
        <p className="chapter__stat">{plan.stat}</p>
      </Chapter>

      <Chapter index={2} title={delegate.title} question={delegate.question} text={delegate.text}>
        <ul className="chapter__agents">
          {delegate.agents?.map((a) => (
            <li key={a.agent} className="chapter__agent">
              <span className="chapter__agent-name">{a.agent}</span>
              <span className="chapter__agent-role">{a.role}</span>
            </li>
          ))}
        </ul>
      </Chapter>

      <Chapter index={3} title={monitor.title} question={monitor.question} text={monitor.text}>
        <ul className="chapter__warnings">
          {monitor.warnings?.map((w) => (
            <li key={w} className="chapter__warning">
              {w}
            </li>
          ))}
        </ul>
      </Chapter>

      <Chapter index={4} title={decide.title} question={decide.question} text={decide.text}>
        <p className="chapter__rec">{decide.recommendation}</p>
        <p className="chapter__missing">{decide.missing}</p>
        <div className="chapter__choices" role="group" aria-label="Make the call">
          <button
            className="btn btn--secondary"
            aria-pressed={choice === 'accept'}
            onClick={() => setChoice('accept')}
          >
            {decide.accept}
          </button>
          <button
            className="btn btn--primary"
            aria-pressed={choice === 'override'}
            onClick={() => setChoice('override')}
          >
            {decide.override}
          </button>
        </div>
      </Chapter>

      <Chapter
        index={5}
        title={deliver.title}
        question={deliver.question}
        text={choice === 'accept' && deliver.acceptText ? deliver.acceptText : deliver.text}
      />
    </section>
  )
}

type ChapterProps = {
  index: number
  title: string
  question: string
  text: string
  children?: ReactNode
}

// One chapter = one screen-tall block with a glass text panel.
// Panels alternate left and right so the sphere always has room.
function Chapter({ index, title, question, text, children }: ChapterProps) {
  const side = index % 2 === 0 ? 'left' : 'right'
  return (
    <article className={`chapter chapter--${side}`} id={`chapter-${index + 1}`}>
      <div className="container chapter__inner">
        <div className="chapter__panel glass">
          <span className="label">0{index + 1} / 06</span>
          <h2 className="chapter__title">{title}</h2>
          <p className="chapter__question">{question}</p>
          <p className="chapter__text" aria-live={index === 5 ? 'polite' : undefined}>
            {text}
          </p>
          {children}
        </div>
      </div>
    </article>
  )
}
