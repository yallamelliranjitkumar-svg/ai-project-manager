import { experiments } from '../content/content'
import './Experiments.css'

// Section 5: four research modules docked on the station, all in development.
export function Experiments() {
  return (
    <section className="section" id="experiments">
      <div className="container">
        <span className="label">{experiments.label}</span>
        <h2 className="h2">{experiments.title}</h2>
        <ul className="experiments">
          {experiments.cards.map((card, i) => (
            <li key={card.title} className="experiment hud">
              <span className="experiment__head">
                <span>Module 0{i + 1}</span>
                <span className="experiment__status">{experiments.soon}</span>
              </span>
              <h3 className="h3">{card.title}</h3>
              <p>{card.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
