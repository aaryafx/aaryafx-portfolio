import { site, closing } from '../data/content.js'
import './footer.css'

/**
 * BeNorth-style close: big statement, contact block (city + email),
 * START A PROJECT pill, socials, colophon. Same on every page.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__statement display">{closing.line}</p>

        <div className="footer__grid">
          <div className="footer__contact">
            <p className="meta footer__label">Based in</p>
            <p className="footer__value">
              {site.location}
              <br />
              <span className="meta meta--accent">{site.coords}</span>
            </p>
          </div>

          <div className="footer__contact">
            <p className="meta footer__label">Say hello</p>
            <a className="footer__value footer__mail" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>

          <div className="footer__cta">
            <a className="pill pill--solid footer__start" href={`mailto:${site.email}?subject=Project%20for%20AARYAFX`}>
              {closing.cta}
              <span className="pill__arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <ul className="footer__socials">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a className="pill footer__social" href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                  <span className="pill__arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>

          <p className="meta footer__colophon">
            ©{year} {site.brand} · {site.name} · Cut in {site.location.split(',')[0]}
          </p>
        </div>
      </div>
    </footer>
  )
}
