import { useEffect, useRef, useState } from 'react'

/**
 * Returns [ref, inView] — inView becomes true once the element
 * enters the viewport (fires once, then stops observing).
 */
export function useInView(threshold = 0.12) {
  const ref    = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        obs.unobserve(el)
      }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, inView]
}
