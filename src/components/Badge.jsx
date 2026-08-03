import './badge.css'

/**
 * Rotating circular-text badge with a starburst center (Morez device).
 * Pure presentational; wrap it in a <Link>/<a> if it should navigate.
 *
 * Props:
 *   text — the phrase; it is repeated twice around the circle
 *   size — px diameter (default 150)
 */
export default function Badge({ text, size = 150 }) {
  const phrase = `${text} — ${text} — `

  return (
    <span className="badge" style={{ '--badge-size': `${size}px` }} aria-hidden="true">
      <svg viewBox="0 0 150 150" focusable="false">
        <defs>
          <path
            id="badge-arc"
            d="M75 75m-58 0a58 58 0 1 1 116 0a58 58 0 1 1-116 0"
            fill="none"
          />
        </defs>
        <text className="badge__text">
          <textPath href="#badge-arc" textLength="364" lengthAdjust="spacingAndGlyphs">
            {phrase}
          </textPath>
        </text>
      </svg>
      <span className="badge__burst">
        <svg viewBox="0 0 40 40" focusable="false">
          <path
            className="badge__burst-shape"
            d="M20 2l3.2 6.9 6.4-4.2-.9 7.6 7.6-.9-4.2 6.4L39 20l-6.9 3.2 4.2 6.4-7.6-.9.9 7.6-6.4-4.2L20 39l-3.2-6.9-6.4 4.2.9-7.6-7.6.9 4.2-6.4L1 20l6.9-3.2-4.2-6.4 7.6.9-.9-7.6 6.4 4.2z"
          />
          <path className="badge__burst-arrow" d="M14 17l6 6 6-6" />
        </svg>
      </span>
    </span>
  )
}
