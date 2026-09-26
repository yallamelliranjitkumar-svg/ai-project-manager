import { experiments } from '../content/content'
import './Experiments.css'

// Section 5: four "coming soon" experiment cards.
export function Experiments() {
  return (
    <section className="section" id="experiments">
      <div className="container">
        <span className="label">{experiments.label}</span>
        <h2 className="h2">{experiments.title}</h2>
        <ul className="experiments">
          {experiments.cards.map((card) => (
            <li key={card.title} className="experiment glass">
              <span className="experiment__tag">{experiments.soon}</span>
              <h3 className="h3">{card.title}</h3>
              <p>{card.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
