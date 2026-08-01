import { work, site } from '../data/content.js'
import WorkCard from '../components/WorkCard.jsx'
import { useReveal } from '../hooks/useReveal.js'
import './work.css'

/**
 * Work — the project bin on the poster wall. Five dark viewports punched
 * into the paper, laid out in an editorial poster rhythm. Hover (or arrow
 * keys, when focused) scrubs each one — WorkCard owns that interaction.
 */
export default function Work() {
  useReveal()

  const showreel = site.socials.find((s) => s.label === 'YouTube')
  const count = String(work.length).padStart(2, '0')

  return (
    <div className="work">
      <div className="container">
        <header className="work__header reveal">
          <div className="work__masthead">
            <h1 className="display work__title">Selected work</h1>
            <span className="sticker work__sticker" style={{ '--tilt': '2.5deg' }}>
              Bin — {work.length} clips
            </span>
          </div>

          <p className="work__intro">
            Five clients across quick commerce, sport, retail, real estate and entertainment
            — shot and cut over five years. Full films go out on request.
          </p>

          <p className="meta work__count">
            {count} projects · 2022–2026 · hover or arrow keys to scrub
          </p>
        </header>

        <ul className="work__grid">
          {work.map((item, i) => (
            <li
              key={item.id}
              className={`work__cell work__cell--${i + 1} reveal`}
              style={{ '--work-delay': `${i * 90}ms` }}
            >
              <WorkCard item={item} index={i} />
            </li>
          ))}
        </ul>

        <aside className="work__outro reveal">
          <p className="work__outro-line">Full cuts and case breakdowns on request.</p>
          <div className="work__outro-actions">
            <a className="pill pill--solid" href={`mailto:${site.email}`}>
              Email me<span className="pill__arrow" aria-hidden="true">↗</span>
            </a>
            {showreel && (
              <a className="pill" href={showreel.href} target="_blank" rel="noreferrer">
                Showreel<span className="pill__arrow" aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
