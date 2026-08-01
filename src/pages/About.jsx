import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Marquee from '../components/Marquee.jsx'
import { useReveal } from '../hooks/useReveal.js'
import { about, site, work } from '../data/content.js'
import './about.css'

/**
 * About — Pacôme's about page, translated into the daylight system.
 * One giant sentence with inline chips over a faint grid, a rotating
 * showreel badge, the detail in two columns, an auto-marquee of work
 * thumbnails, then cut to the work.
 */

/* Inline chip artwork. Hand-drawn SVGs; each sits on its own tile
   (tile colour/border set per-id in about.css). All decorative —
   the h1 must read as a clean sentence without them. */
const CHIP_ART = {
  clapper: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M2.5 10.6h19V19a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2v-8.4Z" />
      <path fill="currentColor" d="M2.8 9.1 2 5.9l17-3.4.8 3.2L2.8 9.1Z" />
      <path
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.4"
        d="m6.5 4.9 1.7 2.7m3.1-3.7 1.7 2.7m3.1-3.7 1.7 2.7"
      />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M13.4 2 4.6 13.5h5.7L8.6 22l8.8-11.5h-5.7L13.4 2Z" />
    </svg>
  ),
  burst: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        d="M12 2.5v5.4M12 16.1v5.4M3.8 7.3l4.7 2.7M15.5 14l4.7 2.7M3.8 16.7l4.7-2.7M15.5 10l4.7-2.7"
      />
    </svg>
  ),
}

function Chip({ id }) {
  return (
    <span className={`about__chip about__chip--${id}`} aria-hidden="true">
      {id === 'counter' ? <span className="about__chipnum">100+</span> : CHIP_ART[id]}
    </span>
  )
}

/* The statement rises as three groups on mount (one orchestrated
   moment, no per-word splitting). Chunked here, staggered in CSS. */
const STATEMENT_GROUPS = (() => {
  const size = Math.ceil(about.statement.length / 3)
  const groups = []
  for (let i = 0; i < about.statement.length; i += size) {
    groups.push(about.statement.slice(i, i + size))
  }
  return groups
})()

const clients = work.map((w) => w.client)

/* Dark viewport thumbnail for the marquee. Duotone comes from each
   item's hues via inline custom props (same recipe spirit as
   workcard.css .workcard__framegfx). */
function Thumb({ item }) {
  return (
    <Link
      to="/work"
      className="about__thumb"
      tabIndex={-1}
      style={{ '--h1': item.hues[0], '--h2': item.hues[1] }}
    >
      <span className="about__thumbgfx" />
      <span className="about__thumbclient">{item.client}</span>
      <span className="about__thumbchip">View project ↗</span>
    </Link>
  )
}

export default function About() {
  useReveal()

  return (
    <div className="about">
      {/* 1 — the statement */}
      <section className="about__hero">
        <h1 className="about__statement">
          {STATEMENT_GROUPS.map((group, gi) => (
            <span className="about__rise" style={{ '--g': gi }} key={gi}>
              {group.map((tok, ti) => (
                <Fragment key={ti}>
                  {tok.kind === 'chip' ? <Chip id={tok.id} /> : <span>{tok.t}</span>}{' '}
                </Fragment>
              ))}
            </span>
          ))}
        </h1>

        <Link to="/work" className="about__badge" aria-label="Showreel — see the work">
          <svg viewBox="0 0 140 140" aria-hidden="true" focusable="false">
            <defs>
              <path
                id="about-badge-arc"
                d="M70 70m-54 0a54 54 0 1 1 108 0a54 54 0 1 1-108 0"
                fill="none"
              />
            </defs>
            <text className="about__badge-text">
              <textPath href="#about-badge-arc" textLength="338" lengthAdjust="spacing">
                SHOWREEL ✲ 2026 ✲ SHOWREEL ✲ 2026 ✲{' '}
              </textPath>
            </text>
            <text
              className="about__badge-star"
              x="70"
              y="70"
              textAnchor="middle"
              dominantBaseline="central"
            >
              ✲
            </text>
          </svg>
        </Link>

        <p className="about__scrollcue meta" aria-hidden="true">
          (Scroll)
        </p>
      </section>

      {/* 2 — the detail */}
      <section className="about__detail container reveal">
        <h2 className="sr-only">The detail</h2>
        <div className="eyebrow">
          <span className="meta">The detail</span>
          <span className="eyebrow__rule" aria-hidden="true" />
          <span className="meta">
            {site.est} · {site.location}
          </span>
        </div>

        <div className="about__columns">
          <span className="sticker sticker--accent about__sticker" style={{ '--tilt': '3deg' }}>
            {site.years} years · 100+ cuts
          </span>

          <div className="about__prose">
            {about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="about__aside">
            <div className="about__group">
              <h3 className="meta about__label">Tools</h3>
              <ul className="about__pills">
                {about.tools.map((t) => (
                  <li className="pill pill--tag" key={t}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="about__group">
              <h3 className="meta about__label">Disciplines</h3>
              <ul className="about__pills">
                {about.disciplines.map((d) => (
                  <li className="pill pill--tag" key={d}>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="about__group">
              <h3 className="meta about__label">Clients</h3>
              <ul className="about__pills">
                {clients.map((c) => (
                  <li className="pill pill--tag" key={c}>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — thumbnail marquee. The moving strip is decorative
          (aria-hidden, links unfocusable); the sr-only list after it
          carries the real links for keyboard and screen-reader users,
          and becomes visible while focused. */}
      <section className="about__strip reveal">
        <h2 className="sr-only">Selected work</h2>
        <div className="container">
          <div className="eyebrow">
            <span className="meta">The work</span>
            <span className="eyebrow__rule" aria-hidden="true" />
            <span className="meta">Auto-scroll · hover to pause</span>
          </div>
        </div>

        <div role="presentation" aria-hidden="true">
          <Marquee duration={30} className="about__marquee">
            {work.map((w) => (
              <Thumb key={w.id} item={w} />
            ))}
          </Marquee>
        </div>

        <div className="container">
          <ul className="about__srlist sr-only">
            {work.map((w) => (
              <li key={w.id}>
                <Link className="pill" to="/work">
                  {w.client} — view project
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 — cut to the work */}
      <section className="about__cta container reveal">
        <h2 className="sr-only">Next</h2>
        <p className="about__ctaline">That&rsquo;s the background. The cuts make the case.</p>
        <div className="about__ctarow">
          <Link to="/work" className="pill pill--solid">
            See the work
            <span className="pill__arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
          <a href={`mailto:${site.email}`} className="pill">
            Email me
            <span className="pill__arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </section>
    </div>
  )
}
