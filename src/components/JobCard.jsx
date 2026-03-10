import { useState } from 'react'
import { Chip } from './Chip'
import { Modal } from './Modal'
import { useInView } from '../hooks/useInView'

export function JobCard({ job, t, tr }) {
  const [expanded, setExpanded] = useState(false)
  const [modal, setModal]       = useState(false)
  const [ref, inView] = useInView(0.1)

  return (
    <>
      {modal && <Modal item={job} onClose={() => setModal(false)} t={t} isCase={false} />}

      <div
        ref={ref}
        style={{
          position: 'relative', paddingLeft: 28, marginBottom: 34,
          opacity:   inView ? 1 : 0,
          transform: inView ? 'none' : 'translateY(22px)',
          transition: 'opacity .55s ease, transform .55s ease',
        }}
      >
        {/* Timeline line */}
        <div style={{
          position: 'absolute', left: 0, top: 10, bottom: -22,
          width: 1,
          background: `linear-gradient(to bottom, ${t.accent}, ${t.border})`,
        }} />
        {/* Timeline dot */}
        <div style={{
          position: 'absolute', left: -5, top: 8,
          width: 11, height: 11, borderRadius: '50%',
          background: t.accent,
          boxShadow: `0 0 12px ${t.dotGlow}`,
        }} />

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap', marginBottom: 6 }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17, color: t.white, lineHeight: 1.3 }}>
            {job.title}
          </div>
          <span style={{
            fontFamily: "'DM Mono',monospace", fontSize: 11, color: t.accent,
            padding: '3px 10px', border: `1px solid rgba(${t.accentRgb},.35)`,
            borderRadius: 5, background: `rgba(${t.accentRgb},.06)`,
            whiteSpace: 'nowrap',
          }}>
            {job.period}
          </span>
        </div>

        <div style={{ fontSize: 13.5, color: t.muted, marginBottom: 12, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
          {/* Multiple named company links (e.g. job2) */}
          {job.companies ? (
            <>
              {job.companies.map(({ name, url }, i) => (
                <span key={name} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  {i > 0 && <span style={{ color: t.faint, marginRight: 2 }}>·</span>}
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      fontWeight: 600, fontSize: 13.5,
                      color: t.accent2, textDecoration: 'none',
                      transition: 'color .15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = t.accent}
                    onMouseLeave={e => e.currentTarget.style.color = t.accent2}
                  >
                    {name}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                </span>
              ))}
            </>
          ) : (
            /* Single company (e.g. job1, job3) */
            <>
              <span style={{ color: t.accent2, fontWeight: 600 }}>{job.company}</span>
              {job.companyUrl && (
                <a
                  href={job.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 3,
                    fontSize: 11, fontFamily: "'DM Mono',monospace",
                    color: t.muted, textDecoration: 'none',
                    background: t.surface2, border: `1px solid ${t.border}`,
                    borderRadius: 4, padding: '1px 7px',
                    transition: 'color .15s, border-color .15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = t.accent; e.currentTarget.style.borderColor = t.accent }}
                  onMouseLeave={e => { e.currentTarget.style.color = t.muted;  e.currentTarget.style.borderColor = t.border  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  website
                </a>
              )}
            </>
          )}
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{tr[`job${job.id.replace('job','')  }sub`] || job.sub}</span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
          {job.tags.map(({ label, type }) => (
            <Chip key={label} label={label} type={type} t={t} />
          ))}
        </div>

        {/* Bullets */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {job.bullets.map((b, i) => (
            <li key={i} style={{ fontSize: 13.5, color: t.muted, padding: '4px 0 4px 16px', position: 'relative', lineHeight: 1.6 }}>
              <span style={{ position: 'absolute', left: 0, color: t.accent, fontSize: 12 }}>–</span>
              {b}
            </li>
          ))}
        </ul>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <button
            onClick={() => setExpanded(!expanded)}
            onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.muted }}
            style={{
              fontFamily: "'DM Mono',monospace", fontSize: 11,
              padding: '5px 14px', borderRadius: 6,
              background: 'transparent', border: `1px solid ${t.border}`,
              color: t.muted, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'border-color .15s, color .15s',
            }}
          >
            <span style={{ display: 'inline-block', transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▾</span>
            {expanded ? tr.collapse : tr.quickView}
          </button>

          <button
            onClick={() => setModal(true)}
            onMouseEnter={e => e.currentTarget.style.background = `rgba(${t.accentRgb},.22)`}
            onMouseLeave={e => e.currentTarget.style.background = `rgba(${t.accentRgb},.10)`}
            style={{
              fontFamily: "'DM Mono',monospace", fontSize: 11,
              padding: '5px 14px', borderRadius: 6,
              background: `rgba(${t.accentRgb},.10)`,
              border: `1px solid rgba(${t.accentRgb},.4)`,
              color: t.accent, cursor: 'pointer',
              transition: 'background .15s',
            }}
          >
            {tr.fullDetails}
          </button>
        </div>

        {/* Inline quick-view */}
        {expanded && (
          <div style={{
            marginTop: 16, padding: '16px 20px',
            background: t.surface2, borderRadius: 10, border: `1px solid ${t.border}`,
            animation: 'expandDown .18s ease',
          }}>
            {job.detail.sections.slice(0, 2).map((sec, i) => (
              <div key={i} style={{ marginBottom: i < 1 ? 18 : 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 10 }}>
                  {sec.icon} {sec.label}
                </div>
                {sec.items.map((text, j) => (
                  <div key={j} style={{ display: 'flex', gap: 8, padding: '3px 0' }}>
                    <span style={{ color: t.accent, fontSize: 8, marginTop: 6, flexShrink: 0 }}>▸</span>
                    <span style={{ fontSize: 13, color: t.muted, lineHeight: 1.6 }}>{text}</span>
                  </div>
                ))}
              </div>
            ))}
            <button
              onClick={() => { setExpanded(false); setModal(true) }}
              style={{ marginTop: 14, fontSize: 12, color: t.accent, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, fontFamily: "'DM Mono',monospace" }}
            >
              {tr.seeAll} {job.detail.sections.length} {tr.seeAllSec}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
