/* ─── Header ──────────────────────────────────────────────── */

/* ── SVG Icons ────────────────────────────────────────────── */
const IconMail = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2.5"/>
    <polyline points="2,6 12,14 22,6"/>
  </svg>
)
const IconTelegram = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8-1.68 7.94c-.12.57-.46.71-.93.44l-2.57-1.89-1.24 1.19c-.14.13-.25.25-.52.25l.18-2.61 4.72-4.27c.21-.18-.04-.28-.32-.1L7.83 14.6 5.3 13.83c-.56-.17-.57-.56.12-.83l10.33-3.98c.47-.17.88.1.89.78z"/>
  </svg>
)
const IconGithub = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.64.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85l-.01 2.74c0 .27.18.58.69.48C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z"/>
  </svg>
)
const IconLinkedin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.91 1.64-1.85 3.37-1.85 3.6 0 4.28 2.37 4.28 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm1.79 13.02H3.55V9h3.58v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"/>
  </svg>
)
const IconDB = ({ color }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
    <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
  </svg>
)
const IconCloud = ({ color }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
  </svg>
)
const IconFire = ({ color }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
)

const IconReact = ({ color = '#61DAFB' }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={color}>
    <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9z"/>
  </svg>
)

/* PRIMARY is built inside Header() to use theme tokens — see below */

/* ── Contacts ─────────────────────────────────────────────── */
const CONTACTS = [
  { Icon: IconMail,     label: 'sdr.expert@gmail.com',    href: 'mailto:sdr.expert@gmail.com'     },
  { Icon: IconTelegram, label: '@Nj_Saab',                href: 'https://t.me/Nj_Saab'            },
  { Icon: IconGithub,   label: 'github.com/njbSaab',      href: 'https://github.com/njbSaab'      },
  { Icon: IconLinkedin, label: 'linkedin.com/in/nj-saab', href: 'https://linkedin.com/in/nj-saab' },
]

import { useBreakpoint } from '../hooks/useBreakpoint'

export function Header({ t, tr }) {
  const { isMobile, isTablet } = useBreakpoint()

  /* ── Primary Stack (theme-aware colors) ──────────────────── */
  const PRIMARY = [
    {
      icon:  null,
      label: 'Angular',
      sub:   'OOP + FSD · RxJS · NgRx · Taiga UI',
      cases: 'Quiz · Bot Admin · Landings',
      note:  '3.5 yr',
      color: t.accent,
      rgb:   t.accentRgb,
    },
    {
      icon:  null,
      label: 'NestJS',
      sub:   'Clean Architecture · CQRS · DDD',
      cases: 'All 4 cases · Orchestrators',
      note:  '1.5 yr',
      color: t.accent2,
      rgb:   t.accent2Rgb,
    },
    {
      icon:  <IconReact color={t.chipReactText} />,
      label: 'React',
      sub:   'React 19 · Hooks · Zustand · SPA',
      cases: 'VoteApp · Sports Platform',
      note:  'v19',
      color: t.chipReactText,
      rgb:   t.reactRgb,
    },
    {
      icon:  <IconDB color={t.postgresColor} />,
      label: 'PostgreSQL · MySQL',
      sub:   'TypeORM · Prisma · Relations',
      cases: 'Quiz · VoteApp · Bot · Betting',
      note:  'Primary DB',
      color: t.postgresColor,
      rgb:   t.postgresRgb,
    },
    {
      icon:  <IconCloud color={t.cloudflareColor} />,
      label: 'Cloudflare D1',
      sub:   'Workers · Edge SQL · SQLite',
      cases: 'Dynamic Voting · Edge Deploy',
      note:  'Edge DB',
      color: t.cloudflareColor,
      rgb:   t.cloudflareRgb,
    },
    {
      icon:  <IconFire color={t.firebaseColor} />,
      label: 'Firebase',
      sub:   'Realtime DB · Firestore · Auth',
      cases: 'Analytics · Tracking · Auth',
      note:  'Cloud DB',
      color: t.firebaseColor,
      rgb:   t.firebaseRgb,
    },
  ]

  /* ── Architecture & Pattern groups (need theme colors) ──── */
  const PATTERN_GROUPS = [
    {
      title: tr.archTitle,
      color: t.accent,
      rgb:   t.accentRgb,
      items: ['Clean Architecture', 'OOP', 'FSD', 'Layered / Modular'],
    },
    {
      title: tr.patternsTitle,
      color: t.accent2,
      rgb:   t.accent2Rgb,
      items: ['CQRS', 'Repository', 'DI / IoC', 'Observer / Event'],
    },
    {
      title: tr.deliveryTitle,
      color: t.chipReactText,
      rgb:   t.reactRgb,
      items: ['SPA · PWA', 'Microservices', 'REST API', 'WebSocket'],
    },
  ]

  return (
    <div style={{ background: t.bg, borderBottom: `1px solid ${t.border}`, position: 'relative', overflow: isMobile ? 'visible' : 'hidden', paddingTop: isMobile ? 35 : 0 }}>

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, ${t.faint}55 1px, transparent 1px)`,
        backgroundSize: '24px 24px', opacity: 0.55,
      }} />

      {/* Glow orbs — floating */}
      <div style={{ position: 'absolute', top: -80,  left: -60,  width: 380, height: 380, background: `radial-gradient(circle, rgba(${t.accentRgb},.11) 0%, transparent 65%)`,  pointerEvents: 'none', animation: 'floatOrb 8s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: -60, right: '20%', width: 300, height: 300, background: `radial-gradient(circle, rgba(${t.accent2Rgb},.09) 0%, transparent 65%)`, pointerEvents: 'none', animation: 'floatOrb 11s ease-in-out infinite reverse' }} />
      <div style={{ position: 'absolute', top: -40, right: '10%',  width: 260, height: 260, background: `radial-gradient(circle, rgba(97,218,251,.07) 0%, transparent 70%)`,       pointerEvents: 'none', animation: 'floatOrb 13s ease-in-out infinite' }} />

      {/* ─── Main content ─────────────────────────────────── */}
      <div style={{ padding: isMobile ? '28px 5px 0' : '20px 56px 0', position: 'relative', zIndex: 1 }}>

        {/* ── Text LEFT  /  Avatar RIGHT ────────────────── */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'center' : 'stretch',
          gap: isMobile ? 24 : 40,
          paddingBottom: 20,
        }}>

          {/* Mobile avatar (small, centered, shown above text) */}
          {isMobile && (
            <div style={{ position: 'relative', width: 90, height: 90 }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `conic-gradient(${t.accent}, ${t.accent2}, ${t.chipReactText}, ${t.accent})`, animation: 'spin 5s linear infinite', boxShadow: `0 0 24px rgba(${t.accentRgb},.3)` }} />
              <div style={{ position: 'absolute', inset: 2, borderRadius: '50%', overflow: 'hidden', background: t.surface2 }}>
                <img src="/image1.jpg" alt="Najib Saab" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              </div>
              <div style={{ position: 'absolute', bottom: 3, right: 3, width: 13, height: 13, borderRadius: '50%', background: '#22c55e', border: `2px solid ${t.bg}`, animation: 'pulseDot 2.2s ease infinite', zIndex: 2 }} />
            </div>
          )}

          {/* LEFT — all text ────────────────────────────── */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, width: isMobile ? '100%' : 'auto', alignItems: isMobile ? 'stretch' : 'flex-start' }}>

            {/* Status badge — hidden on mobile */}
            {!isMobile && <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.25)',
              borderRadius: 20, padding: '6px 14px', marginBottom: 14,
              alignSelf: 'flex-start',
              animation: 'fadeSlideUp .5s ease both',
              animationDelay: '0s',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px rgba(34,197,94,.8)' }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#22c55e', letterSpacing: '.1em' }}>
                {tr.availableForHire}
              </span>
            </div>}

            {/* Name */}
            <div
              key={`name-${t.bg}`}
              style={{
                fontFamily: "'Syne',sans-serif", fontWeight: 800,
                fontSize: isMobile ? 32 : 46,
                lineHeight: 1, letterSpacing: '-.5px', marginBottom: 10,
                background: t.nameGradient,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                animation: 'fadeSlideUp .6s ease both', animationDelay: '.1s',
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              Najib Saab
            </div>

            {/* Title — gradient + bigger */}
            <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap', animation: 'fadeSlideUp .6s ease both', animationDelay: '.22s', justifyContent: isMobile ? 'center' : 'flex-start' }}>
              <span
                key={`title-${t.bg}`}
                style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 700,
                  fontSize: isMobile ? 17 : 21,
                  background: t.titleGradient,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}
              >
                {tr.roleTitle}
              </span>
              <span style={{ color: t.faint, fontSize: 18 }}>·</span>
              <span style={{ color: t.accent, fontWeight: 700, fontSize: 17 }}>{tr.yearsExp}</span>
              <span style={{ color: t.muted, fontSize: 15.5 }}>{tr.commercialExp}</span>
            </div>

            {/* Contacts — under title */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? 2 : 8, marginBottom: isMobile ? 15 : 28, animation: 'fadeSlideUp .6s ease both', animationDelay: '.36s' }}>
              {CONTACTS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: isMobile ? 4 : 7,
                    background: t.surface2, border: `1px solid ${t.border}`,
                    borderRadius: 20, padding: isMobile ? '6px 6px' : '6px 14px',
                    fontSize: 12.5, color: t.muted, textDecoration: 'none',
                    transition: 'background .15s, border-color .15s, color .15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = t.accent
                    e.currentTarget.style.color       = t.accent
                    e.currentTarget.style.background  = `rgba(${t.accentRgb},.07)`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = t.border
                    e.currentTarget.style.color       = t.muted
                    e.currentTarget.style.background  = t.surface2
                  }}
                >
                  <Icon />
                  {label}
                </a>
              ))}
            </div>

            {/* Primary Stack */}
            <div style={{ marginBottom: 20, animation: 'fadeSlideUp .6s ease both', animationDelay: '.5s' }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: t.muted, letterSpacing: '.16em', textTransform: 'uppercase', marginBottom: 10 }}>
                {tr.primaryStack}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: 10 }}>
                {PRIMARY.map(({ icon, label, sub, cases, note, color, rgb }) => (
                  <div key={label} style={{
                    background: `rgba(${rgb},.06)`,
                    border: `1px solid rgba(${rgb},.25)`,
                    borderRadius: 10,
                    padding: '10px 14px',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    {/* top bar */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `rgba(${rgb},.55)`, borderRadius: '10px 10px 0 0' }} />
                    {/* title row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      {icon}
                      <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13.5, color, lineHeight: 1 }}>{label}</span>
                    </div>
                    {/* sub */}
                    <div style={{ fontSize: 11, color: t.muted, lineHeight: 1.35, marginBottom: 5 }}>{sub}</div>
                    {/* cases tag */}
                    <div style={{ fontSize: 10.5, color: `rgba(${rgb},.75)`, marginBottom: 6, fontFamily: "'DM Mono',monospace", lineHeight: 1.3 }}>
                      ↳ {cases}
                    </div>
                    {/* note badge */}
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color, opacity: 0.75, background: `rgba(${rgb},.1)`, borderRadius: 3, padding: '1px 6px', display: 'inline-block' }}>{note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Architecture & Patterns grid ───────────── */}
            <div style={{ animation: 'fadeSlideUp .6s ease both', animationDelay: '.65s', width: '100%', overflow: 'hidden' }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: t.muted, letterSpacing: '.16em', textTransform: 'uppercase', marginBottom: 10 }}>
                {tr.archPatterns}
              </div>
              {isMobile ? (
                /* ── Mobile: horizontal scroll carousel ─── */
                <div style={{
                  display: 'flex', flexDirection: 'row',
                  gap: 10, overflowX: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  paddingBottom: 6,
                  scrollbarWidth: 'none', msOverflowStyle: 'none',
                }}>
                  {PATTERN_GROUPS.map(({ title, color, rgb, items }) => (
                    <div key={title} style={{
                      flexShrink: 0, width: 175,
                      background: `rgba(${rgb},.05)`,
                      border: `1px solid rgba(${rgb},.2)`,
                      borderLeft: `3px solid rgba(${rgb},.7)`,
                      borderRadius: '0 8px 8px 0',
                      padding: '10px 12px',
                    }}>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 9, fontWeight: 500 }}>{title}</div>
                      {items.map(item => (
                        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                          <span style={{ width: 4, height: 4, borderRadius: '50%', background: color, opacity: 0.65, flexShrink: 0 }} />
                          <span style={{ fontSize: 12.5, color: t.muted, lineHeight: 1.3 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                /* ── Desktop: 3-col grid ─────────────────── */
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {PATTERN_GROUPS.map(({ title, color, rgb, items }) => (
                  <div key={title} style={{
                    background: `rgba(${rgb},.05)`,
                    border: `1px solid rgba(${rgb},.2)`,
                    borderLeft: `3px solid rgba(${rgb},.7)`,
                    borderRadius: '0 8px 8px 0',
                    padding: '10px 12px',
                  }}>
                    <div style={{
                      fontFamily: "'DM Mono',monospace", fontSize: 10,
                      color, letterSpacing: '.12em', textTransform: 'uppercase',
                      marginBottom: 9, fontWeight: 500,
                    }}>
                      {title}
                    </div>
                    {items.map(item => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: color, opacity: 0.65, flexShrink: 0 }} />
                        <span style={{ fontSize: 12.5, color: t.muted, lineHeight: 1.3 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
                </div>
              )}{/* end patterns ternary */}
            </div>

          </div>{/* end LEFT */}

          {/* RIGHT — Avatar card (desktop only) ─────────── */}
          {!isMobile && <div style={{
            width: 310, flexShrink: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 18,
            background: `rgba(${t.accentRgb},.04)`,
            border: `1px solid ${t.border}`,
            borderRadius: 16,
            padding: '28px 20px',
            position: 'relative', overflow: 'hidden',
            height: 'fit-content',
            alignSelf: 'center',
            animation: 'fadeSlideUp .7s ease both',
            animationDelay: '.2s',
          }}>
            {/* Card inner glow */}
            <div style={{ position: 'absolute', top: -50, right: -50, width: 180, height: 180, background: `radial-gradient(circle, rgba(${t.accentRgb},.14) 0%, transparent 70%)`, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -40, left: -40, width: 150, height: 150, background: `radial-gradient(circle, rgba(97,218,251,.08) 0%, transparent 70%)`, pointerEvents: 'none' }} />

            {/* Avatar circle */}
            <div style={{ position: 'relative', width: 130, height: 130, zIndex: 1 }}>
              {/* Spinning gradient ring */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: `conic-gradient(${t.accent}, ${t.accent2}, ${t.chipReactText}, ${t.accent})`,
                animation: 'spin 5s linear infinite',
                boxShadow: `0 0 40px rgba(${t.accentRgb},.3), 0 0 80px rgba(${t.accentRgb},.1)`,
              }} />
              {/* Photo — stays still */}
              <div style={{
                position: 'absolute', inset: 3, borderRadius: '50%',
                overflow: 'hidden', background: t.surface2,
              }}>
                <img
                  src="/image1.jpg"
                  alt="Najib Saab"
                  style={{
                    width: '100%', height: '100%', borderRadius: '50%',
                    objectFit: 'cover', objectPosition: 'center top',
                    display: 'block',
                  }}
                />
              </div>
              {/* Online indicator */}
              <div style={{
                position: 'absolute', bottom: 4, right: 4,
                width: 17, height: 17, borderRadius: '50%',
                background: '#22c55e', border: `3px solid ${t.bg}`,
                animation: 'pulseDot 2.2s ease infinite',
                zIndex: 2,
              }} />
            </div>

            {/* Card info */}
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15.5, color: t.text, marginBottom: 4 }}>
                Najib Saab
              </div>
              <div style={{ fontSize: 12, color: t.muted, lineHeight: 1.4 }}>
                Fullstack Engineer
              </div>
            </div>

            {/* Divider */}
            <div style={{ width: '80%', height: 1, background: t.border }} />

            {/* Meta */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', width: '100%', position: 'relative', zIndex: 1 }}>
              {[
                ['📍', tr.location],
                ['🌐', tr.remoteOk],
                ['⚡', tr.projects],
              ].map(([emoji, text]) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: t.muted }}>
                  <span style={{ fontSize: 12 }}>{emoji}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ width: '80%', height: 1, background: t.border }} />

            {/* Social icon links */}
            <div style={{ display: 'flex', gap: 8, position: 'relative', zIndex: 1 }}>
              {CONTACTS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  title={label}
                  style={{
                    width: 34, height: 34,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: t.surface2, border: `1px solid ${t.border}`,
                    borderRadius: 8, color: t.muted, textDecoration: 'none',
                    transition: 'color .15s, border-color .15s, background .15s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color      = t.accent
                    e.currentTarget.style.borderColor = t.accent
                    e.currentTarget.style.background  = `rgba(${t.accentRgb},.1)`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color      = t.muted
                    e.currentTarget.style.borderColor = t.border
                    e.currentTarget.style.background  = t.surface2
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>

          </div>}{/* end RIGHT */}

        </div>{/* end flex row */}

      </div>
    </div>
  )
}
