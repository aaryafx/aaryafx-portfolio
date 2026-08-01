import './marquee.css'

/**
 * Infinite horizontal marquee. Content is rendered twice (second copy
 * aria-hidden) and translated -50% on a loop, so any children work.
 *
 * Props:
 *   duration — seconds per loop (default 24)
 *   reverse  — scroll right instead of left
 *   pauseOnHover — stop while hovered/focused (default true)
 *
 * Under prefers-reduced-motion the animation is disabled and the strip
 * just overflows statically; parents should keep content meaningful
 * from its first copy alone.
 */
export default function Marquee({ children, duration = 24, reverse = false, pauseOnHover = true, className = '' }) {
  return (
    <div
      className={
        'marquee' +
        (reverse ? ' marquee--reverse' : '') +
        (pauseOnHover ? ' marquee--pausable' : '') +
        (className ? ` ${className}` : '')
      }
      style={{ '--marquee-dur': `${duration}s` }}
    >
      <div className="marquee__track">
        <div className="marquee__group">{children}</div>
        <div className="marquee__group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
