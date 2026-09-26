import { site } from '../content/content'
import './Nav.css'

// The slim bar fixed to the top of the screen.
export function Nav() {
  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href="#top" className="nav__name">
          {site.name}
        </a>
        <a href={site.linkedin} target="_blank" rel="noreferrer" className="nav__link">
          Connect
        </a>
      </div>
    </header>
  )
}
