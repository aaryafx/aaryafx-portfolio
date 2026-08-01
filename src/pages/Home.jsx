import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { site, about, pillars, work } from '../data/content.js'
import Marquee from '../components/Marquee.jsx'
import WorkCard from '../components/WorkCard.jsx'
import { useReveal } from '../hooks/useReveal.js'
import './home.css'

/**
 * Landing page — the poster wall.
 * 1 hero marquee wordmark · 2 showreel viewport · 3 about + pillars ·
 * 4 draggable work strip with cursor DRAG chip · 5 clients line.
 * App renders Nav (absolute over the hero) and Footer around this page.
 */
export default function Home() {
  useReveal()

  const wrapRef = useRef(null)
  const stripRef = useRef(null)
  const chipRef = useRef(null)
  const drag = useRef({ down: false, x: 0, left: 0 })

  const roleShort = site.role.split(' & ')[0] // "Video editor"
  const city = site.location.split(',')[0] // "Ahmedabad"

  /* --- Work strip: mouse drag-to-scroll. Touch and wheel scroll natively;
     pointer capture keeps the drag alive when the cursor leaves the strip.
     React removes these handlers with the element, so nothing leaks. --- */

  const onStripPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return
    const strip = stripRef.current
    drag.current = { down: true, x: e.clientX, left: strip.scrollLeft }
    strip.setPointerCapture(e.pointerId)
    strip.classList.add('is-dragging')
  }

  const onStripPointerMove = (e) => {
    if (!drag.current.down) return
    stripRef.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x)
  }

  const onStripPointerEnd = (e) => {
    if (!drag.current.down) return
    drag.current.down = false
    const strip = stripRef.current
    strip.classList.remove('is-dragging')
    if (strip.hasPointerCapture(e.pointerId)) strip.releasePointerCapture(e.pointerId)
  }

  const onStripKeyDown = (e) => {
    // Only when the strip itself is focused — cards use arrows to scrub.
    if (e.target !== e.currentTarget) return
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    stripRef.current.scrollBy({ left: e.key === 'ArrowRight' ? 320 : -320 })
  }

  /* --- Cursor-following DRAG chip: direct style mutation via ref,
     no re-render per move. Hidden on touch devices in CSS. --- */

  const onWrapPointerMove = (e) => {
    const chip = chipRef.current
    if (!chip || e.pointerType !== 'mouse') return
    const rect = wrapRef.current.getBoundingClientRect()
    chip.style.transform = `translate3d(${e.clientX - rect.left}px, ${e.clientY - rect.top}px, 0) translate(-50%, -50%)`
  }

  const onWrapPointerEnter = (e) => {
    if (e.pointerType === 'mouse') chipRef.current?.classList.add('is-on')
  }

  const onWrapPointerLeave = () => {
    chipRef.current?.classList.remove('is-on')
  }

  const wordmark = (
    <span className="hero__word display">
      {site.brand}
      <span className="hero__reg">®</span>
      <span className="hero__sep">—</span>
      {roleShort}
      <span className="hero__sep">—</span>
    </span>
  )

  return (
    <>
      {/* ---- 1 · HERO ---- */}
      <section className="hero" aria-label="Intro">
        <h1 className="sr-only">
          {site.brand} — {site.role.toLowerCase()}, {city}
        </h1>

        <div className="hero__band">
          <div className="hero__mq" aria-hidden="true">
            <Marquee duration={30}>
              {wordmark}
              {wordmark}
            </Marquee>
          </div>

          <span
            className="sticker sticker--accent hero__sticker hero__sticker--rec"
            style={{ '--tilt': '5deg' }}
            aria-hidden="true"
          >
            <span className="recdot" />
            REC
          </span>
          <span
            className="sticker hero__sticker hero__sticker--zepto"
            style={{ '--tilt': '-3.5deg' }}
            aria-hidden="true"
          >
            100+ cuts for Zepto
          </span>
        </div>

        <div className="container hero__row">
          <p className="hero__role">
            {site.role} — {site.location} · {site.years} years
          </p>
          <p className="meta" aria-hidden="true">
            (Scroll)
          </p>
        </div>
      </section>

      {/* ---- 2 · SHOWREEL ---- */}
      {/* Placeholder viewport: a real video slots in here later. */}
      <section className="home__section reveal" aria-labelledby="home-reel-h">
        <div className="container">
          <div className="home__reel">
            <p className="home__reel-slate meta" aria-hidden="true">
              ▶ {site.brand} — Showreel
            </p>
            <div className="home__reel-center">
              <h2 className="home__reel-title display" id="home-reel-h">
                Showreel
              </h2>
              <p className="meta">©2026 — Full reel on request</p>
              <a className="pill home__reel-pill" href={`mailto:${site.email}?subject=Showreel%20request`}>
                Request the reel
                <span className="pill__arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---- 3 · ABOUT TEASER ---- */}
      <section className="home__section reveal" aria-labelledby="home-about-h">
        <div className="container">
          <div className="eyebrow">
            <h2 className="meta" id="home-about-h">
              About
            </h2>
            <span className="eyebrow__rule" aria-hidden="true" />
            <p className="meta meta--accent">
              {site.est} · {city}
            </p>
          </div>

          <p className="home__lede">{about.lede}</p>

          <div className="home__pillars">
            {pillars.map((p) => (
              <article className="home__pillar" key={p.num}>
                <p className="home__pillar-num" aria-hidden="true">
                  {p.num}
                </p>
                <h3 className="home__pillar-name display">{p.name}</h3>
                <p className="home__pillar-line">{p.line}</p>
                <p className="home__pillar-body">{p.body}</p>
                <ul className="home__pillar-tags" aria-label={`${p.name} — services`}>
                  {p.tags.map((t) => (
                    <li key={t}>
                      <span className="pill pill--tag">{t}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <Link to="/about" className="pill home__cta">
            More about Aarya
            <span className="pill__arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      {/* ---- 4 · WORK TEASER ---- */}
      <section className="home__section reveal" aria-labelledby="home-work-h">
        <div className="container">
          <div className="eyebrow">
            <h2 className="meta" id="home-work-h">
              Selected work
            </h2>
            <span className="eyebrow__rule" aria-hidden="true" />
            <p className="meta meta--accent" aria-hidden="true">
              Drag
            </p>
          </div>
        </div>

        <div
          className="home__dragwrap"
          ref={wrapRef}
          onPointerMove={onWrapPointerMove}
          onPointerEnter={onWrapPointerEnter}
          onPointerLeave={onWrapPointerLeave}
        >
          <div
            className="home__strip"
            ref={stripRef}
            role="region"
            aria-label="Selected work. Scrolls horizontally — arrow keys also scroll."
            tabIndex={0}
            onPointerDown={onStripPointerDown}
            onPointerMove={onStripPointerMove}
            onPointerUp={onStripPointerEnd}
            onPointerCancel={onStripPointerEnd}
            onKeyDown={onStripKeyDown}
          >
            {work.map((item, i) => (
              <div className={'home__slide' + (i % 2 ? ' home__slide--drop' : '')} key={item.id}>
                <WorkCard item={item} index={i} />
              </div>
            ))}
          </div>

          <span className="home__dragchip display" ref={chipRef} aria-hidden="true">
            Drag
          </span>
        </div>

        <div className="container home__work-cta">
          <Link to="/work" className="pill">
            All work
            <span className="pill__arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      {/* ---- 5 · CLIENTS LINE ---- */}
      <section className="home__section home__clientsline reveal" aria-label="Clients">
        <Marquee duration={18} reverse>
          {work.map((w) => (
            <span className="home__client" key={w.id}>
              {w.client}
              <span className="home__client-sep" aria-hidden="true">✲</span>
            </span>
          ))}
        </Marquee>
      </section>
    </>
  )
}
