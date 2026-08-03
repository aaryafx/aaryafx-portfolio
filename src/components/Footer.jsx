import { site, closing } from '../data/content.js'
import './footer.css'

/**
 * Morez-style close: stacked outlined contact rows, the scratchy logo
 * big and centered, one last heading, socials, colophon.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__rows">
          <div className="row-outline footer__row">
            <span>
              {site.name} — {site.location}
            </span>
          </div>
          <a className="row-outline footer__row footer__row--link" href={`mailto:${site.email}`}>
            <span className="footer__mail">{site.email}</span>
          </a>
          <div className="row-outline footer__row footer__socialrow">
            {site.socials.map((s, i) => (
              <span key={s.label}>
                <a className="footer__social" href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
                {i < site.socials.length - 1 && <span aria-hidden="true"> ✳ </span>}
              </span>
            ))}
          </div>
        </div>

        <p className="footer__logo scratch" aria-hidden="true">
          {site.brand}
        </p>

        <p className="footer__line head">{closing.line}</p>

        <div className="footer__cta">
          <a className="pill pill--gradient" href={`mailto:${site.email}?subject=Project%20for%20AARYAFX`}>
            {closing.cta}
            <span className="pill__arrow" aria-hidden="true">→</span>
          </a>
        </div>

        <p className="footer__colophon">
          ©{year} {site.brand} · cut in {site.location.split(',')[0]} · {site.est.toLowerCase()}
        </p>
      </div>
    </footer>
  )
}
