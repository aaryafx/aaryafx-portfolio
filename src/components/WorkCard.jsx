import { useRef, useState, useCallback } from 'react'
import './workcard.css'

/**
 * The site's signature interaction: hover-scrubbing, exactly how an editor
 * previews a clip in a project bin. Moving the pointer horizontally across
 * the card steps through its frames; a scrub bar tracks underneath.
 *
 * Works without a mouse: cards are focusable, and arrow keys step frames.
 * With media = null (current state) it scrubs a generated duotone frame
 * strip; when a real video/poster lands in content.js the same wrapper
 * scrubs video currentTime instead.
 */
export default function WorkCard({ item, index }) {
  const ref = useRef(null)
  const videoRef = useRef(null)
  const [frame, setFrame] = useState(0)
  const [active, setActive] = useState(false)

  const frames = item.frames || 8

  const scrubTo = useCallback(
    (p) => {
      const clamped = Math.min(0.999, Math.max(0, p))
      setFrame(Math.floor(clamped * frames))
      const v = videoRef.current
      if (v && v.duration) v.currentTime = clamped * v.duration
    },
    [frames],
  )

  const onPointerMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    scrubTo((e.clientX - rect.left) / rect.width)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      setFrame((f) => Math.min(frames - 1, f + 1))
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setFrame((f) => Math.max(0, f - 1))
    }
  }

  const progress = frames > 1 ? frame / (frames - 1) : 0
  const [h1, h2] = item.hues

  return (
    <article
      className={'workcard' + (active ? ' is-active' : '')}
      ref={ref}
      tabIndex={0}
      role="group"
      aria-label={`${item.client} — ${item.title}. Use left and right arrow keys to scrub frames.`}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onPointerMove={onPointerMove}
      onKeyDown={onKeyDown}
    >
      <div className="workcard__screen" style={{ '--h1': h1, '--h2': h2 }}>
        {item.media?.type === 'video' ? (
          <video
            ref={videoRef}
            className="workcard__video"
            src={item.media.src}
            poster={item.media.poster}
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <div className="workcard__frame" data-frame={frame}>
            <span
              className="workcard__framegfx"
              style={{ transform: `translateX(${(frame / frames) * -12}%) scale(${1 + frame * 0.015})` }}
              aria-hidden="true"
            />
            <span className="workcard__framenum meta" aria-hidden="true">
              F{String(frame + 1).padStart(2, '0')}
            </span>
          </div>
        )}

        {/* in/out point brackets, visible on hover */}
        <span className="workcard__bracket workcard__bracket--in" aria-hidden="true" />
        <span className="workcard__bracket workcard__bracket--out" aria-hidden="true" />

        {/* scrub bar tracking the pointer */}
        <div className="workcard__scrub" aria-hidden="true">
          <div className="workcard__scrub-fill" style={{ transform: `scaleX(${progress})` }} />
          <div className="workcard__playhead" style={{ left: `${progress * 100}%` }} />
        </div>
      </div>

      <div className="workcard__info">
        <span className="workcard__index meta" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="workcard__client">{item.client}</h3>
        <p className="workcard__title">{item.title}</p>
        <p className="workcard__meta meta">
          {item.role} · {item.sector} · {item.year}
        </p>
      </div>
    </article>
  )
}
