import { NavLink, Link } from 'react-router-dom'
import { site } from '../data/content.js'
import './nav.css'

/**
 * Morez-style bar: a black rounded strip with the scratchy marker brand
 * left and mono links right. Sticky so the brand rides along the page.
 */
export default function Nav() {
  return (
    <header className="nav">
      <div className="nav__bar">
        <Link to="/" className="nav__brand scratch" aria-label="AARYAFX — home">
          {site.brand}
        </Link>

        <nav className="nav__links" aria-label="Primary">
          <NavLink to="/" end className="nav__link">
            Index
          </NavLink>
          <NavLink to="/about" className="nav__link">
            About
          </NavLink>
          <NavLink to="/work" className="nav__link">
            Work
          </NavLink>
          <a className="pill nav__hire" href={`mailto:${site.email}`}>
            Hire me
          </a>
        </nav>
      </div>
    </header>
  )
}
