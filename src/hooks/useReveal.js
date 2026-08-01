import { useEffect } from 'react'

/**
 * Scroll-reveal: adds .is-visible to any .reveal element entering the viewport.
 * Call once per page. CSS in base.css handles reduced-motion and no-JS.
 */
export function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add('js')
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
