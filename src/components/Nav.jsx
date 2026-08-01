import { NavLink, Link } from 'react-router-dom'
import { site } from '../data/content.js'
import './nav.css'

/**
 * Pill nav, BeNorth-style: brand chip + outlined pill links with ↗,
 * floating on the paper. Metadata line (coords · est) sits center on
 * wide screens, hire pill right.
 */
export default function Nav() {
  return (
    <header className="nav">
      <div className="nav__inner container">
        <Link to="/" className="nav__brand" aria-label="AARYAFX — home">
          {site.brand}<span className="nav__brand-r">®</span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          <NavLink to="/" end className="pill nav__pill">
            {({ isActive }) => (
              <>
                Index{isActive && <span className="nav__dot" aria-hidden="true" />}
                <span className="pill__arrow" aria-hidden="true">↗</span>
              </>
            )}
          </NavLink>
          <NavLink to="/about" className="pill nav__pill">
            {({ isActive }) => (
              <>
                About{isActive && <span className="nav__dot" aria-hidden="true" />}
                <span className="pill__arrow" aria-hidden="true">↗</span>
              </>
            )}
          </NavLink>
          <NavLink to="/work" className="pill nav__pill">
            {({ isActive }) => (
              <>
                Work{isActive && <span className="nav__dot" aria-hidden="true" />}
                <span className="pill__arrow" aria-hidden="true">↗</span>
              </>
            )}
          </NavLink>
        </nav>

        <p className="nav__geo meta meta--accent" aria-hidden="true">
          {site.coords}
          <br />
          {site.est} · AHMEDABAD
        </p>

        <a className="pill pill--solid nav__hire" href={`mailto:${site.email}`}>
          Hire me<span className="pill__arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  )
}
