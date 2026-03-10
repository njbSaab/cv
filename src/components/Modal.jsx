import { useRef, useState, useEffect } from 'react'
import { useClickOutside } from '../hooks/useClickOutside'

export function Modal({ item, onClose, t, isCase }) {
  const ref = useRef(null)
  useClickOutside(ref, onClose)
  const [openSec, setOpenSec] = useState(null)
  const { detail } = item

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        animation: 'fadeIn .18s ease',
      }}
    >
      <div
        ref={ref}
        style={{
          background: t.modalBg,
          border: `1px solid ${t.border}`,
          borderRadius: 14,
          width: '100%', maxWidth: 780,
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: `0 28px 70px rgba(0,0,0,.55), 0 0 0 1px ${t.border}`,
          animation: 'slideUp .22s ease',
        }}
      >
        {/* Top accent line */}
        <div style={{ height: 3, background: `linear-gradient(90deg, ${t.accent}, ${t.accent2})`, borderRadius: '14px 14px 0 0' }} />

        {/* Header */}
        <div style={{ padding: '26px 32px 22px', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14 }}>
            <div style={{ flex: 1 }}>
              {isCase && (
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: t.accent, letterSpacing: '.12em', marginBottom: 8 }}>
                  CASE {item.num}
                </div>
              )}
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, color: t.white, lineHeight: 1.25, marginBottom: 8 }}>
                {item.title}
              </div>
              {!isCase && (
                <div style={{ fontSize: 14, color: t.muted }}>
                  <span style={{ color: t.accent2, fontWeight: 600 }}>{item.company}</span>
                  <span style={{ margin: '0 6px', opacity: 0.5 }}>·</span>
                  {item.sub}
                </div>
              )}
              {isCase && (
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11.5, color: t.muted, marginTop: 4, lineHeight: 1.55 }}>
                  {item.stack}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              style={{
                background: t.surface2, border: `1px solid ${t.border}`,
                borderRadius: 8, color: t.muted, cursor: 'pointer',
                width: 34, height: 34, fontSize: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                transition: 'color .15s, border-color .15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = t.text; e.currentTarget.style.borderColor = t.accent }}
              onMouseLeave={e => { e.currentTarget.style.color = t.muted; e.currentTarget.style.borderColor = t.border }}
            >
              ×
            </button>
          </div>

          {/* Meta row (cases) */}
          {detail.role && (
            <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
              {[['👤 Role', detail.role], ['⏱ Duration', detail.duration]].map(([k, v]) => (
                <div key={k} style={{ background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 7, padding: '6px 14px', fontSize: 12.5 }}>
                  <span style={{ color: t.muted }}>{k}: </span>
                  <span style={{ color: t.text, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          )}

          {detail.description && (
            <p style={{ fontSize: 14, color: t.muted, lineHeight: 1.7, marginTop: 14 }}>{detail.description}</p>
          )}

          {/* Job period badge */}
          {item.period && (
            <div style={{ marginTop: 14 }}>
              <span style={{
                fontFamily: "'DM Mono',monospace", fontSize: 11, color: t.accent,
                padding: '3px 10px', border: `1px solid rgba(${t.accentRgb},.3)`,
                borderRadius: 5, background: `rgba(${t.accentRgb},.05)`,
              }}>
                {item.period}
              </span>
            </div>
          )}
        </div>

        {/* Accordion sections */}
        <div style={{ padding: '20px 32px 28px' }}>
          {detail.sections.map((sec, i) => (
            <div key={i} style={{ border: `1px solid ${t.border}`, borderRadius: 10, marginBottom: 10, overflow: 'hidden' }}>
              <button
                onClick={() => setOpenSec(openSec === i ? null : i)}
                style={{
                  width: '100%', padding: '13px 18px',
                  background: openSec === i ? t.surface2 : 'transparent',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10,
                  transition: 'background .15s',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600, color: t.text }}>
                  <span style={{ fontSize: 16 }}>{sec.icon}</span>
                  {sec.label}
                </span>
                <span style={{
                  fontFamily: "'DM Mono',monospace", fontSize: 11.5,
                  color: openSec === i ? t.accent : t.faint,
                  transform: openSec === i ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform .2s, color .2s',
                  display: 'inline-block',
                }}>▾</span>
              </button>

              {openSec === i && (
                <div style={{ padding: '6px 18px 16px', borderTop: `1px solid ${t.border}`, animation: 'expandDown .18s ease' }}>
                  {sec.items.map((text, j) => (
                    <div key={j} style={{
                      display: 'flex', gap: 10, padding: '6px 0',
                      borderBottom: j < sec.items.length - 1 ? `1px solid ${t.faint}22` : 'none',
                    }}>
                      <span style={{ color: t.accent, fontSize: 8, marginTop: 7, flexShrink: 0 }}>▸</span>
                      <span style={{ fontSize: 13.5, color: t.muted, lineHeight: 1.65 }}>{text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
