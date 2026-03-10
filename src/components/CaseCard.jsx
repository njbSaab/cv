import { useState } from 'react'
import { Modal } from './Modal'
import { useInView } from '../hooks/useInView'

export function CaseCard({ item, t, tr, index = 0 }) {
  const [modal, setModal] = useState(false)
  const [hover, setHover] = useState(false)
  const [ref, inView] = useInView(0.08)

  return (
    <>
      {modal && <Modal item={item} onClose={() => setModal(false)} t={t} isCase />}

      {/* ── Gradient border wrapper ────────────────────────── */}
      <div
        ref={ref}
        onClick={() => setModal(true)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          opacity:   inView ? 1 : 0,
          /* combine scroll-reveal + hover transform */
          transform: !inView ? 'translateY(24px)' : hover ? 'translateY(-3px)' : 'none',
          transition: `opacity .5s ease ${index * 0.12}s, transform .5s ease ${index * 0.12}s, background .25s, box-shadow .2s`,
          background: hover
            ? `linear-gradient(180deg, ${t.accent} 0%, ${t.border} 22%, ${t.border} 78%, ${t.accent2} 100%)`
            : `linear-gradient(180deg, rgba(${t.accentRgb},.4) 0%, ${t.border} 22%, ${t.border} 78%, rgba(${t.accent2Rgb},.28) 100%)`,
          padding: 1,
          borderRadius: 11,
          cursor: 'pointer',
          boxShadow: hover
            ? `0 12px 32px rgba(0,0,0,.25), 0 0 0 1px rgba(${t.accentRgb},.1)`
            : `0 2px 8px rgba(0,0,0,.1)`,
        }}
      >
        {/* ── Inner card ──────────────────────────────────── */}
        <div style={{
          background: t.cardBg,
          borderRadius: 10,
          padding: '20px 22px',
          position: 'relative', overflow: 'hidden',
        }}>

          {/* Top gradient bar — shimmer */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, ${t.accent}, ${t.accent2}, ${t.accent})`,
            backgroundSize: '200% 100%',
            animation: 'shimmerBar 2.5s linear infinite',
            opacity: hover ? 1 : 0.6,
            transition: 'opacity .25s',
          }} />

          {/* Bottom gradient bar */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
            background: `linear-gradient(90deg, ${t.accent2}, transparent, ${t.accent})`,
            opacity: hover ? 0.5 : 0.15,
            transition: 'opacity .25s',
          }} />

          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10.5, color: t.accent, letterSpacing: '.12em', marginBottom: 8 }}>
            CASE {item.num}
          </div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: t.white, marginBottom: 8, lineHeight: 1.35 }}>
            {item.title}
          </div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: t.muted, marginBottom: 12, lineHeight: 1.55 }}>
            {item.stack}
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {item.bullets.map((b, i) => (
              <li key={i} style={{ display: 'flex', gap: 8, padding: '3px 0' }}>
                <span style={{ color: t.accent, fontSize: 8, marginTop: 5, flexShrink: 0 }}>▸</span>
                <span style={{ fontSize: 13, color: t.muted, lineHeight: 1.5 }}>{b}</span>
              </li>
            ))}
          </ul>

          <div style={{
            marginTop: 14, fontSize: 11,
            color: hover ? t.accent : t.faint,
            fontFamily: "'DM Mono',monospace",
            transition: 'color .15s',
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            <span>{tr.clickExplore}</span>
            <span style={{ transform: hover ? 'translateX(3px)' : 'none', transition: 'transform .15s', display: 'inline-block' }}>→</span>
          </div>
        </div>
      </div>
    </>
  )
}
