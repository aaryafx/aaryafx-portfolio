import { Link } from 'react-router-dom'
import { site, closing, pillars, work } from '../data/content.js'
import Marquee from '../components/Marquee.jsx'
import Badge from '../components/Badge.jsx'
import WorkCard from '../components/WorkCard.jsx'
import { useReveal } from '../hooks/useReveal.js'
import './home.css'

/**
 * Landing page — Holo dark.
 * 1 hero holo panel + scroll badge · 2 dual marquee band · 3 showreel panel
 * · 4 services light flip · 5 stacked work list · 6 CTA panel.
 * App renders the sticky Nav and Footer around this page.
 */

/** Wrap one target word of a copy string in a marker accent span. */
function markWord(text, word, cls) {
  const i = text.indexOf(word)
  if (i === -1) return text
  return (
    <>
      {text.slice(0, i)}
      <span className={cls}>{word}</span>
      {text.slice(i + word.length)}
    </>
  )
}

export default function Home() {
  useReveal()

  const city = site.location.split(',')[0] // "Ahmedabad"
  const estYear = site.est.split(' ')[1] // "2021"

  /* One repeating unit of the name band: "AARYAFX ✳ AARYAFX ✚" */
  const bandUnit = (
    <span className="head home__band-word">
      {site.brand}
      <span className="home__band-sep">✳</span>
      {site.brand}
      <span className="home__band-sep">✚</span>
    </span>
  )

  return (
    <>
      {/* ---- 1 · HERO PANEL ---- */}
      <section className="hero" aria-labelledby="hero-h">
        <div className="container">
          <div className="panel holo hero__panel">
            <h1 className="head hero__title" id="hero-h">
              {markWord(site.role, 'editor', 'underline-marker')}
            </h1>
            <p className="hero__intro">
              {site.brand} is Aarya Patel —{' '}
              <span className="mono-strong hero__strong">video editor based in {city}</span>{' '}
              since {estYear}. Five years of fast cuts,{' '}
              <span className="mono-strong hero__strong">100+ videos for Zepto</span>, and
              brand work from cricket to retail.
            </p>
          </div>

          {/* Scroll cue straddling the panel's bottom edge */}
          <div className="hero__badge">
            <a className="hero__badge-link" href="#reel">
              <Badge text="Scroll — need an editor ?" size={150} />
              <span className="sr-only">Scroll to the showreel</span>
            </a>
          </div>
        </div>
      </section>

      {/* ---- 2 · DUAL MARQUEE BAND ---- */}
      <section className="home__band reveal">
        <h2 className="sr-only">{site.brand}</h2>
        <div className="home__band-rows" aria-hidden="true">
          <Marquee duration={30}>
            {bandUnit}
            {bandUnit}
            {bandUnit}
          </Marquee>
          <Marquee duration={34} reverse>
            {bandUnit}
            {bandUnit}
            {bandUnit}
          </Marquee>
        </div>
      </section>

      {/* ---- 3 · SHOWREEL PANEL ---- */}
      {/* Placeholder viewport: the real reel slots in here later. */}
      <section className="home__section reveal" id="reel" aria-labelledby="home-reel-h">
        <h2 className="sr-only" id="home-reel-h">
          Showreel
        </h2>
        <div className="container">
          <div className="panel home__reel">
            <p className="home__reel-slate" aria-hidden="true">
              ▶ {site.brand} — showreel
            </p>
            <div className="home__reel-center">
              <p className="scratch home__reel-title" aria-hidden="true">
                Showreel
              </p>
              <p className="home__reel-note">©2026 — full reel on request</p>
              <a
                className="pill pill--gradient"
                href={`mailto:${site.email}?subject=Showreel%20request`}
              >
                Request the reel
                <span className="pill__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---- 4 · SERVICES — THE LIGHT FLIP ---- */}
      <section className="home__section reveal" aria-labelledby="home-services-h">
        <div className="container">
          <div className="panel home__light">
            <p className="home__kicker">What I do, à la carte</p>
            <h2 className="head home__light-title" id="home-services-h">
              Three ways to <span className="highlight-marker">use</span> me
            </h2>

            <div className="home__pillars">
              {pillars.map((p) => (
                <article className="home__pillar" key={p.num}>
                  <p className="home__pillar-num" aria-hidden="true">
                    {p.num}
                  </p>
                  <h3 className="head home__pillar-name">{p.name}</h3>
                  <p className="home__pillar-line">{p.line}</p>
                  <p className="home__pillar-body">{p.body}</p>
                  <ul className="home__pillar-tags" aria-label={`${p.name} — services`}>
                    {p.tags.map((t) => (
                      <li key={t}>
                        <span className="pill pill--outline home__pillar-tag">{t}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    className="pill home__pillar-more"
                    to="/about"
                    aria-label={`More about ${p.name.toLowerCase()}`}
                  >
                    More
                    <span className="pill__arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- 5 · WORK LIST ---- */}
      <section className="home__section reveal" aria-labelledby="home-work-h">
        <div className="container">
          <h2 className="head home__work-title" id="home-work-h">
            Selected work
          </h2>
          <p className="home__work-sub">Hover to scrub — like a real edit bay.</p>

          <div className="home__worklist">
            {work.map((item, i) => (
              <WorkCard item={item} index={i} key={item.id} />
            ))}
          </div>
        </div>
      </section>

      {/* ---- 6 · CTA PANEL ---- */}
      <section className="home__section reveal" aria-labelledby="home-cta-h">
        <div className="container">
          <div className="panel home__cta">
            <div className="home__cta-text">
              <p className="home__kicker home__kicker--left">{closing.kicker}</p>
              <h2 className="head home__cta-line" id="home-cta-h">
                {markWord(closing.line, 'scroll', 'underline-marker')}
              </h2>
              <a className="pill pill--gradient" href={`mailto:${site.email}`}>
                {closing.cta}
                <span className="pill__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
            <div className="panel holo--warm home__cta-strip" aria-hidden="true" />
          </div>
        </div>
      </section>
    </>
  )
}
