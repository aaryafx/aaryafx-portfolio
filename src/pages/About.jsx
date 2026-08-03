import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../components/Badge.jsx'
import Marquee from '../components/Marquee.jsx'
import { useReveal } from '../hooks/useReveal.js'
import { about, site, work } from '../data/content.js'
import './about.css'

/**
 * About — Holo dark. One statement panel (holo--cool) with the giant
 * inline-chip sentence and a rotating badge, the detail in two columns
 * (mono prose + outlined rows of pills), a client name marquee, a facts
 * strip, then cut to the work.
 */

/* Inline chip artwork. All decorative (tiles are aria-hidden) — the h1
   must read as a clean sentence without them. Glyphs use currentColor so
   each tile's colour scheme comes from about.css alone. */
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
}

function Chip({ id }) {
  return (
    <span className={`about__chip about__chip--${id}`} aria-hidden="true">
      {id === 'counter' && <span className="about__chipnum">100+</span>}
      {id === 'burst' && <span className="about__chipstar">✳</span>}
      {(id === 'clapper' || id === 'bolt') && CHIP_ART[id]}
    </span>
  )
}

/* One marker underline per section — here, "fast". */
function StatementText({ t }) {
  const at = t.indexOf('fast,')
  if (at === -1) return <span className="head about__word">{t}</span>
  return (
    <span className="head about__word">
      {t.slice(0, at)}
      <span className="underline-marker">fast</span>
      {t.slice(at + 4)}
    </span>
  )
}

const clients = work.map((w) => w.client)

const facts = [
  { value: String(site.years), label: 'years editing' },
  { value: '100+', label: 'videos for Zepto' },
  { value: site.location.split(',')[0], label: 'based' },
  { value: 'Craywingz', label: 'studio' },
]

export default function About() {
  useReveal()

  return (
    <div className="about">
      {/* 1 — statement panel */}
      <section className="about__hero container">
        <div className="holo--cool panel about__statementpanel">
          <h1 className="about__statement">
            {about.statement.map((tok, i) => (
              <Fragment key={i}>
                {tok.kind === 'chip' ? <Chip id={tok.id} /> : <StatementText t={tok.t} />}{' '}
              </Fragment>
            ))}
          </h1>
          <div className="about__stamp">
            <Badge text="Five years — 100+ cuts" size={140} />
          </div>
        </div>
      </section>

      {/* 2 — the detail */}
      <section className="about__detail container reveal">
        <div className="about__cols">
          <div className="about__left">
            <h2 className="about__kicker">The detail</h2>
            <div className="about__prose">
              <p>
                I run edits end to end:{' '}
                <span className="mono-strong">concept, shoot, cut, grade, sound</span>. Most of my
                work is fast-cut, trend-aware short-form with motion graphics built in, delivered
                on schedules where "next week" is not an answer.
              </p>
              <p>
                At <span className="mono-strong">Craywingz</span> I shot and edited{' '}
                <span className="mono-strong">100+ videos for Zepto</span> and cut brand work
                across retail, sports and entertainment —{' '}
                <span className="mono-strong">Phoenix Palladium</span>,{' '}
                <span className="mono-strong">Gujarat Titans</span>,{' '}
                <span className="mono-strong">Shivalik</span>,{' '}
                <span className="mono-strong">Space India</span>.
              </p>
            </div>
          </div>

          <div className="about__rows">
            <div className="row-outline about__row">
              <h3 className="about__rowlabel">Tools</h3>
              <ul className="about__tags">
                {about.tools.map((t) => (
                  <li className="pill pill--outline about__tag" key={t}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="row-outline about__row">
              <h3 className="about__rowlabel">Disciplines</h3>
              <ul className="about__tags">
                {about.disciplines.map((d) => (
                  <li className="pill pill--outline about__tag" key={d}>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="row-outline about__row">
              <h3 className="about__rowlabel">Clients</h3>
              <ul className="about__tags">
                {clients.map((c) => (
                  <li className="pill pill--outline about__tag" key={c}>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — client marquee. Decorative: the same names are readable in
          the Clients row above, so the moving band is aria-hidden. */}
      <section className="about__band reveal">
        <h2 className="sr-only">Clients</h2>
        <div aria-hidden="true">
          <Marquee duration={22} className="about__marquee">
            {clients.map((c) => (
              <Fragment key={c}>
                <span className="head about__mqname">{c}</span>
                <span className="about__mqstar">✳</span>
              </Fragment>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 4 — facts strip */}
      <section className="about__facts container reveal">
        <h2 className="sr-only">Quick facts</h2>
        <ul className="about__factgrid">
          {facts.map((f) => (
            <li className="panel about__fact" key={f.label}>
              <span className="head about__factvalue">{f.value}</span>
              <span className="about__factlabel">{f.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 5 — cut to the work */}
      <section className="about__cta container reveal">
        <h2 className="head about__ctaline">
          That&rsquo;s the background. The <span className="highlight-marker">cuts</span> make the
          case.
        </h2>
        <div className="about__ctarow">
          <Link to="/work" className="pill pill--gradient">
            See the work
            <span className="pill__arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
          <a href={`mailto:${site.email}`} className="pill pill--outline">
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
