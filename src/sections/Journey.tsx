import { journey } from '../content/content'
import './Journey.css'

// Section 2: a flight path from Earth (Healthcare IT) up to the station (Project Management).
export function Journey() {
  return (
    <section className="section" id="journey">
      <div className="container">
        <span className="label">{journey.label}</span>
        <h2 className="h2">{journey.title}</h2>
        <ol className="journey">
          {journey.steps.map((step, i) => (
            <li key={step.title} className="journey__step">
              <span className="journey__alt">
                0{i + 1} · {step.altitude}
              </span>
              <h3 className="h3">{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
