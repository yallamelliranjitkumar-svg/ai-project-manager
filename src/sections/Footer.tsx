import { footer, site } from '../content/content'
import './Footer.css'

// Section 6: closing line and links.
export function Footer() {
  const links = [
    { href: site.linkedin, label: footer.linkedinLabel },
    { href: site.github, label: footer.githubLabel },
    { href: site.repo, label: footer.repoLabel },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__closing">
          <span>{footer.closing[0]}</span>
          <span className="footer__closing-accent">{footer.closing[1]}</span>
        </p>
        <div className="footer__bottom">
          <div>
            <span className="label">{footer.connect}</span>
            <ul className="footer__links">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="footer__credit">
            © {new Date().getFullYear()} {site.name}. {footer.credit}
          </p>
        </div>
      </div>
    </footer>
  )
}
