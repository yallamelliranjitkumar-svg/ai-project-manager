import { process } from '../content/content'
import './ProcessStrip.css'

// Section 3: the launch sequence, Idea → Prompt → Claude → Code → Iteration → Product.
export function ProcessStrip() {
  const last = process.steps.length - 1
  return (
    <section className="section process">
      <div className="container">
        <span className="label">{process.label}</span>
        <h2 className="h2">{process.title}</h2>
        <ol className="process__list">
          {process.steps.map((step, i) => (
            <li key={step.title} className={`process__step${step.title === 'Claude' ? ' process__step--ai' : ''}`}>
              <span className="process__count">T-{last - i}</span>
              <span className="process__chip">{step.title}</span>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
