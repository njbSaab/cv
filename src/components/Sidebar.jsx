import { useState, useEffect } from 'react'
import { Chip } from './Chip'
import { SectionLabel } from './SectionLabel'
import { DevopsAccordion } from './DevopsAccordion'

/* ── Shared content (used in both desktop and drawer) ──── */
function Content({ t, tr, barsReady }) {
  return (
    <>
      {/* Metrics */}
      <div>
        <SectionLabel t={t}>{tr.metricsLabel}</SectionLabel>
        {tr.metricsRows.map(([name, w, val]) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 12.5, color: t.muted, width: 68, flexShrink: 0 }}>{name}</span>
            <div style={{ flex: 1, height: 3, background: t.border, borderRadius: 2, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: barsReady ? w : '0%',
                background: `linear-gradient(90deg, ${t.accent}, ${t.accent2})`,
                borderRadius: 2, transition: 'width 1s cubic-bezier(.4,0,.2,1)',
              }} />
            </div>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: t.accent, whiteSpace: 'nowrap', minWidth: 40, textAlign: 'right' }}>{val}</span>
          </div>
        ))}
      </div>

      {/* Frontend */}
      <div>
        <SectionLabel t={t}>{tr.frontendLabel}</SectionLabel>
        {[
          [tr.frameworksGroup, [['Angular 15+','hot'],['RxJS / NgRx','hot'],['Vue 3','mid'],['Pinia','mid'],['React','']]],
          [tr.archGroup,       [['OOP + FSD','hot'],['Taiga UI','hot'],['Ang. Material',''],['Vuetify','']]],
          [tr.stylingGroup,    [['SCSS',''],['Tailwind',''],['GSAP',''],['AOS','']]],
        ].map(([group, chips]) => (
          <div key={group} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: t.text, marginBottom: 6 }}>{group}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {chips.map(([label, type]) => <Chip key={label} label={label} type={type} t={t} />)}
            </div>
          </div>
        ))}
      </div>

      {/* Backend */}
      <div>
        <SectionLabel t={t}>{tr.backendLabel}</SectionLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
          {[['NestJS','hot'],['Clean Arch','hot'],['CQRS','hot'],['TypeORM','mid'],['Prisma','mid'],['Express',''],['Fastify',''],['FastAPI',''],['WebSocket','']].map(([l,ty]) => (
            <Chip key={l} label={l} type={ty} t={t} />
          ))}
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: t.text, marginBottom: 6 }}>{tr.dbGroup}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {[['PostgreSQL','hot'],['MySQL','hot'],['MongoDB',''],['Firebase',''],['CF D1','']].map(([l,ty]) => (
            <Chip key={l} label={l} type={ty} t={t} />
          ))}
        </div>
      </div>

      {/* DevOps */}
      <div>
        <SectionLabel t={t}>{tr.devopsLabel}</SectionLabel>
        <DevopsAccordion t={t} />
      </div>

      {/* Soft Skills */}
      <div>
        <SectionLabel t={t}>{tr.softSkillsLabel}</SectionLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {tr.softSkillsList.map(skill => (
            <span key={skill} style={{
              fontSize: 12, color: t.muted,
              background: t.surface2, border: `1px solid ${t.border}`,
              borderRadius: 4, padding: '3px 9px',
              fontFamily: "'DM Sans',sans-serif",
            }}>{skill}</span>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div>
        <SectionLabel t={t}>{tr.langLabel}</SectionLabel>
        {tr.sidebarLangs.map(([name, level]) => (
          <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: t.text }}>{name}</span>
            <span style={{
              fontSize: 11, fontFamily: "'DM Mono',monospace", color: t.muted,
              background: t.surface2, padding: '2px 8px', borderRadius: 4, border: `1px solid ${t.border}`,
            }}>{level}</span>
          </div>
        ))}
      </div>

      {/* Education */}
      <div>
        <SectionLabel t={t}>{tr.eduLabel}</SectionLabel>
        {tr.eduList.map(([school, degree]) => (
          <div key={school} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: t.text, lineHeight: 1.45, marginBottom: 3 }}>{school}</div>
            <div style={{ fontSize: 12, color: t.muted }}>{degree}</div>
          </div>
        ))}
      </div>
    </>
  )
}

/* ── Gradient shimmer bar ──────────────────────────────── */
const GradientBar = ({ t }) => (
  <div style={{
    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
    background: `linear-gradient(90deg, ${t.accent}, ${t.accent2}, ${t.accent})`,
    backgroundSize: '200% 100%', animation: 'shimmerBar 3s linear infinite',
  }} />
)

/* ── Main component ────────────────────────────────────── */
export function Sidebar({ t, tr, isMobile, isDrawerOpen, onDrawerClose }) {
  const [barsReady, setBarsReady] = useState(false)
  useEffect(() => { const id = setTimeout(() => setBarsReady(true), 400); return () => clearTimeout(id) }, [])

  /* Mobile: fixed drawer */
  if (isMobile) return (
    <>
      {/* Backdrop */}
      <div
        onClick={onDrawerClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 998,
          background: 'rgba(0,0,0,.55)',
          backdropFilter: 'blur(3px)',
          opacity: isDrawerOpen ? 1 : 0,
          pointerEvents: isDrawerOpen ? 'auto' : 'none',
          transition: 'opacity .3s ease',
        }}
      />
      {/* Drawer panel */}
      <aside style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 300, zIndex: 999,
        background: t.surface,
        borderLeft: `1px solid ${t.border}`,
        display: 'flex', flexDirection: 'column', gap: 24,
        padding: '20px 20px 32px',
        overflowY: 'auto',
        transform: isDrawerOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform .32s cubic-bezier(.4,0,.2,1)',
        boxShadow: isDrawerOpen ? '-8px 0 40px rgba(0,0,0,.35)' : 'none',
      }}>
        <GradientBar t={t} />

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: t.text }}>
            Skills & Info
          </span>
          <button
            onClick={onDrawerClose}
            style={{
              background: t.surface2, border: `1px solid ${t.border}`,
              borderRadius: 8, color: t.muted, cursor: 'pointer',
              width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = t.accent; e.currentTarget.style.borderColor = t.accent }}
            onMouseLeave={e => { e.currentTarget.style.color = t.muted;  e.currentTarget.style.borderColor = t.border }}
          >×</button>
        </div>

        <Content t={t} tr={tr} barsReady={barsReady} />
      </aside>
    </>
  )

  /* Desktop: normal inline */
  return (
    <aside style={{
      width: 300, flexShrink: 0,
      border: `1px solid ${t.border}`,
      borderRadius: 16, padding: '32px 24px',
      background: `rgba(${t.accentRgb},.04)`,
      display: 'flex', flexDirection: 'column', gap: 30,
      position: 'relative', overflow: 'hidden',
      alignSelf: 'flex-start',
    }}>
      <GradientBar t={t} />
      <Content t={t} tr={tr} barsReady={barsReady} />
    </aside>
  )
}
