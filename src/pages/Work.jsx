import { work, site } from '../data/content.js'
import WorkCard from '../components/WorkCard.jsx'
import { useReveal } from '../hooks/useReveal.js'
import './work.css'

/**
 * Work — Morez's project list in an editor's hands. A centered header,
 * then the clients as full-width rounded panels stacked in a calm
 * vertical rhythm. Each panel hover-scrubs (or arrow-keys, when
 * focused) — WorkCard owns that interaction and its own info row.
 */
export default function Work() {
  useReveal()

  const showreel = site.socials.find((s) => s.label === 'YouTube')
  const count = String(work.length).padStart(2, '0')

  return (
    <div className="work">
      {/* 1 — header */}
      <header className="work__header container reveal">
        <p className="work__kicker">What we made together</p>
        <h1 className="head work__title">
          Selected <span className="underline-marker">work</span>
        </h1>
        <p className="work__sub">
          Five clients across quick commerce, sport, retail, real estate and entertainment —
          shot and cut over five years.{' '}
          <strong className="mono-strong">Hover any panel to scrub it.</strong>
        </p>
        <p className="work__count">
          {count} projects{' '}
          <span className="work__star" aria-hidden="true">
            ✳
          </span>{' '}
          2022–2026
        </p>
      </header>

      {/* 2 — the list: full-width panels, one after another */}
      <section className="work__list container">
        <h2 className="sr-only">Projects</h2>
        <ul className="work__stack">
          {work.map((item, i) => (
            <li
              key={item.id}
              className="work__cell reveal"
              style={{ '--work-delay': `${i * 90}ms` }}
            >
              <WorkCard item={item} index={i} />
            </li>
          ))}
        </ul>
      </section>

      {/* 3 — outro. The footer owns the big CTA; this stays compact. */}
      <section className="work__outro container reveal">
        <div className="panel work__outro-panel">
          <p className="work__kicker">Want the full films?</p>
          <h2 className="head work__outro-line">
            Full cuts and case breakdowns go out on request.
          </h2>
          <div className="work__outro-actions">
            <a className="pill pill--gradient" href={`mailto:${site.email}`}>
              Email me
              <span className="pill__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            {showreel && (
              <a
                className="pill pill--outline"
                href={showreel.href}
                target="_blank"
                rel="noreferrer"
              >
                Showreel
                <span className="pill__arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
