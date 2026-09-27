import { footer, site } from '../content/content'
import './Footer.css'

// Section 6: closing line and links.
// The home page (flight film) already shows the closing line in its finale,
// so it hides it here and passes its own credit line.
export function Footer({ showClosing = true, credit = footer.credit }: { showClosing?: boolean; credit?: string }) {
  const links = [
    { href: site.linkedin, label: footer.linkedinLabel },
    { href: site.github, label: footer.githubLabel },
    { href: site.repo, label: footer.repoLabel },
  ]

  return (
    <footer className={`footer${showClosing ? '' : ' footer--compact'}`}>
      <div className="container">
        {showClosing && (
          <p className="footer__closing">
            <span>{footer.closing[0]}</span>
            <span className="footer__closing-accent">{footer.closing[1]}</span>
          </p>
        )}
        <div className={`footer__bottom${showClosing ? '' : ' footer__bottom--flush'}`}>
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
            © {new Date().getFullYear()} {site.name}. {credit}
          </p>
        </div>
      </div>
    </footer>
  )
}
