import { process } from '../content/content'
import './ProcessStrip.css'

// Section 3: Idea → Prompt → Claude → Code → Iteration → Product.
export function ProcessStrip() {
  return (
    <section className="section process">
      <div className="container">
        <span className="label">{process.label}</span>
        <h2 className="h2">{process.title}</h2>
        <ol className="process__list">
          {process.steps.map((step, i) => (
            <li key={step.title} className="process__step">
              <span className="process__chip">
                <span className="process__num">{i + 1}</span>
                {step.title}
              </span>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
