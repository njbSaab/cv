import { useState, useEffect } from 'react'
import { themes } from './styles/themes'
import { i18n   } from './data/i18n'
import { useBreakpoint } from './hooks/useBreakpoint'
import { JOBS  } from './data/jobs'
import { CASES } from './data/cases'
import { Header }       from './components/Header'
import { Sidebar }      from './components/Sidebar'
import { JobCard }      from './components/JobCard'
import { CaseCard }     from './components/CaseCard'
import { SectionLabel } from './components/SectionLabel'

const ECOMMERCE_LINKS = [
  { label: 'santan.ua',               href: 'https://santan.ua'               },
  { label: 'snowmania.com.ua',        href: 'https://snowmania.com.ua'        },
  { label: 'goodsushi.if.ua',         href: 'https://goodsushi.if.ua'         },
  { label: 'kvitka-if.com',           href: 'http://kvitka-if.com'            },
  { label: 'autosezon.ua',            href: 'https://autosezon.ua'            },
  { label: 'thesofa.com.ua',          href: 'https://thesofa.com.ua'          },
  { label: 'carpathian-flavor.in.ua', href: 'https://carpathian-flavor.in.ua' },
]

const CORPORATE_LINKS = [
  { label: 'bakotech.com',            href: 'https://bakotech.com'                               },
  { label: 'ecoculture.biz',          href: 'https://ecoculture.biz'                             },
  { label: 'santan.ua/bonus',         href: 'https://santan.ua/bonusnaya-sistema'                 },
  { label: 'art-pixel.shop',        href: 'https://art-pixel.shop/#portfolio'  },
  { label: 'find-iq.com',             href: 'https://find-iq.com/uk/#capabilities'               },
]


const STATS = [
  { val: '75+',  num: 50,  label: 'Production\nprojects' },
  { val: '150+', num: 100, label: 'GitHub\nrepos'        },
  { val: '400+', num: 400, label: 'CodeWars\nchallenges' },
  { val: '600+', num: 600, label: 'Algo tasks\nsolved'   },
  { val: '3',    num: 3,   label: 'Product\nteams'       },
]

const FLOW_STEPS = [
  { label: 'UI / UX',    icon: '🎨', num: '01' },
  { label: 'Frontend',   icon: '⚡', num: '02' },
  { label: 'Backend',    icon: '⚙️', num: '03' },
  { label: 'Databases',  icon: '🗄️', num: '04' },
  { label: 'DevOps',     icon: '🚀', num: '05' },
  { label: 'Production', icon: '✅', num: '06' },
]

/* ── Animated counter ────────────────────────────────────── */
function StatItem({ num, suffix, label, t }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let current = 0
    const duration = 1100
    const step = num / (duration / 16)
    const timer = setInterval(() => {
      current = Math.min(current + step, num)
      setCount(Math.floor(current))
      if (current >= num) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [num])

  return (
    <div style={{ flex: 1, padding: '22px 14px', textAlign: 'center', animation: 'countUp .5s ease' }}>
      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 30, color: t.accent, lineHeight: 1, marginBottom: 6 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 12, color: t.muted, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{label}</div>
    </div>
  )
}

/* ── Download icon ───────────────────────────────────────── */
const IconDownload = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

export default function App() {
  const [isDark,      setIsDark     ] = useState(() => localStorage.getItem('cv-theme') !== 'light')
  const [lang,        setLang       ] = useState(() => localStorage.getItem('cv-lang')  || 'en')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const t  = themes[isDark ? 'dark' : 'light']
  const tr = i18n[lang]
  const { isMobile, isTablet } = useBreakpoint()

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem('cv-theme', next ? 'dark' : 'light')
  }
  const toggleLang = () => {
    const next = lang === 'en' ? 'uk' : 'en'
    setLang(next)
    localStorage.setItem('cv-lang', next)
  }

  /* ── Pipeline animation ──────────────────────────────────
     pipeStep: -1 = off-left | 0..N-1 = on track | N = off-right
     Sequence: 0→1→…→N-1→N(off-right) → instant jump to -1(off-left) → 0→…
  ────────────────────────────────────────────────────────── */
  const [pipeStep,    setPipeStep   ] = useState(0)
  const [pipeTransit, setPipeTransit] = useState(true)

  useEffect(() => {
    const N = FLOW_STEPS.length
    const id = setInterval(() => {
      setPipeStep(prev => {
        if (prev === N) {
          // Currently off-right — jump instantly to off-left, then re-enable
          setPipeTransit(false)
          requestAnimationFrame(() => {
            setPipeStep(-1)
            requestAnimationFrame(() => setPipeTransit(true))
          })
          return N           // hold until rAF resolves
        }
        return prev + 1      // advance: -1→0, 0→1, … N-1→N
      })
    }, 800)
    return () => clearInterval(id)
  }, [])

  /* pipeline geometry helpers */
  const P_N        = FLOW_STEPS.length
  const P_TRACK_L  = 100 / P_N / 2          // 8.33%  — first circle center
  const P_TRACK_R  = 100 - P_TRACK_L        // 91.67% — last circle center
  const P_TOTAL    = P_TRACK_R - P_TRACK_L  // 83.33%
  const P_SEG      = P_TOTAL / (P_N - 1)    // 16.67% per step
  // pipeStep -1 → tail at -8.34% (off-left); N → tail at 108.33% (off-right)
  const P_SEG_LEFT  = P_TRACK_L + pipeStep * P_SEG
  const P_SEG_RIGHT = P_SEG_LEFT + P_SEG
  const activeCircle = pipeStep >= 0 && pipeStep < P_N ? pipeStep : -1
  const wormTransition = pipeTransit
    ? 'left .62s cubic-bezier(.4,0,.2,1)'
    : 'none'

  return (
    <>
      <style>{`
        ::-webkit-scrollbar-track { background: ${t.bg}; }
        ::-webkit-scrollbar-thumb { background: ${t.border}; border-radius: 3px; }
      `}</style>

      <div style={{ background: t.bg, minHeight: '100vh', transition: 'background .25s' }}>

        {/* ── Floating controls ─────────────────────────── */}
        <div className="no-print" style={{ position: 'fixed', top: isMobile ? 10 : 18, right: isMobile ? 10 : 18, zIndex: 500, display: 'flex', gap: 6 }}>

          {/* Download CV */}
          <a
            href="/Najib_Saab_CV_v2.docx"
            download="Najib_Saab_CV_v2.docx"
            style={{
              background: t.surface, border: `1px solid ${t.border}`,
              borderRadius: 20, padding: '7px 15px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              color: t.muted, fontSize: 12, fontFamily: "'DM Mono',monospace",
              boxShadow: '0 2px 12px rgba(0,0,0,.2)',
              textDecoration: 'none',
              transition: 'border-color .2s, color .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = t.border;  e.currentTarget.style.color = t.muted  }}
          >
            <IconDownload />
            {tr.downloadCV}
          </a>

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            style={{
              background: t.surface, border: `1px solid ${t.border}`,
              borderRadius: 20, padding: isMobile ? '7px 10px' : '7px 15px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
              color: t.accent, fontSize: 12, fontFamily: "'DM Mono',monospace",
              boxShadow: '0 2px 12px rgba(0,0,0,.2)',
              fontWeight: 600, letterSpacing: '.06em',
              transition: 'border-color .2s, background .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.background = `rgba(${t.accentRgb},.07)` }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = t.border;  e.currentTarget.style.background = t.surface }}
          >
            🌐{!isMobile && ` ${tr.langBtn}`}
          </button>

          {/* Theme toggle — icon only on mobile */}
          <button
            onClick={toggleTheme}
            style={{
              background: t.surface, border: `1px solid ${t.border}`,
              borderRadius: 20, padding: isMobile ? '7px 10px' : '7px 15px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              color: t.text, fontSize: 12, fontFamily: "'DM Mono',monospace",
              boxShadow: '0 2px 12px rgba(0,0,0,.2)',
              transition: 'background .2s',
            }}
          >
            <span>{isDark ? '☀️' : '🌙'}</span>
            {!isMobile && <span>{isDark ? tr.lightTheme : tr.darkTheme}</span>}
          </button>

          {/* Sidebar menu — mobile only */}
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                background: t.surface, border: `1px solid ${t.border}`,
                borderRadius: 20, padding: '7px 10px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: t.text,
                boxShadow: '0 2px 12px rgba(0,0,0,.2)',
                transition: 'border-color .2s, background .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.border;  e.currentTarget.style.color = t.text  }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          )}
        </div>

        {/* ── Page container ────────────────────────────── */}
        <div style={{ maxWidth: 1280, margin: '0 auto', background: t.surface, boxShadow: '0 0 80px rgba(0,0,0,.14)', minHeight: '100vh', transition: 'background .25s' }}>

          <Header t={t} tr={tr} />

          {/* ── Summary / Full-Cycle bar ───────────────── */}
          <div style={{ background: t.summaryBg, borderRadius: 12, padding: isMobile ? '18px 20px 22px' : '24px 56px 28px', transition: 'background .25s', position: 'relative', overflow: 'hidden', margin: isMobile ? '12px 12px' : '20px 24px', border: `1px solid ${t.border}`, boxShadow: `0 0 0 1px rgba(${t.accentRgb},.06), 0 4px 24px rgba(${t.accentRgb},.05)` }}>
            {/* Gradient top border */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${t.accent}, ${t.accent2}, ${t.chipReactText})` }} />

            {/* ── Pipeline header ───────── */}
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: t.muted, letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>{tr.fullCycleLabel}</span>
              <div style={{ flex: 1, height: 1, background: t.border }} />
            </div>

            {/* ── Step numbers ──────────── */}
            <div style={{ display: 'flex', marginBottom: 6 }}>
              {FLOW_STEPS.map(({ num }, i) => (
                <div key={num} style={{
                  flex: 1, textAlign: 'center',
                  fontFamily: "'DM Mono',monospace", fontSize: 9,
                  color: i === activeCircle ? t.accent : t.muted,
                  opacity: i === activeCircle ? 1 : 0.4,
                  letterSpacing: '.06em',
                  transition: 'color .3s, opacity .3s',
                }}>
                  {num}
                </div>
              ))}
            </div>

            {/* ── Circles + connecting line ─ */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              {/* Static dim track */}
              <div style={{
                position: 'absolute',
                left: `${P_TRACK_L}%`, right: `${P_TRACK_L}%`,
                height: 2, top: '50%', transform: 'translateY(-50%)',
                background: t.border, borderRadius: 2, zIndex: 0,
              }} />
              {/* Moving worm segment — both tail AND head slide together */}
              <div style={{
                position: 'absolute',
                left: `${P_SEG_LEFT}%`,
                width: `${P_SEG}%`,
                height: 2, top: '50%', transform: 'translateY(-50%)',
                background: `linear-gradient(90deg, transparent, rgba(${t.accent2Rgb},.6), ${t.accent2}, ${t.accent}, ${t.accent})`,
                borderRadius: 2, zIndex: 1,
                transition: pipeTransit ? 'left .62s cubic-bezier(.4,0,.2,1)' : 'none',
              }} />
              {/* Spark — rides the segment head */}
              <div style={{
                position: 'absolute',
                left: `calc(${P_SEG_RIGHT}% - 5px)`,
                top: '50%', transform: 'translateY(-50%)',
                width: 10, height: 10, borderRadius: '50%',
                background: t.accent,
                boxShadow: `0 0 10px ${t.accent}, 0 0 22px rgba(${t.accentRgb},.6)`,
                zIndex: 2,
                transition: wormTransition,
              }} />
              {FLOW_STEPS.map(({ icon }, i) => {
                const isActive = i === activeCircle
                const isDone   = activeCircle >= 0 && i < activeCircle
                const sz = isMobile ? 34 : 44
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 3 }}>
                    <div style={{
                      width: sz, height: sz, borderRadius: '50%',
                      background: isActive
                        ? `rgba(${t.accentRgb},.18)`
                        : isDone ? `rgba(${t.accentRgb},.07)` : t.surface2,
                      border: `2px solid ${isActive || isDone ? t.accent : t.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: isMobile ? 14 : 18,
                      boxShadow: isActive
                        ? `0 0 22px rgba(${t.accentRgb},.65), 0 0 0 5px rgba(${t.accentRgb},.12)`
                        : isDone ? `0 0 8px rgba(${t.accentRgb},.25)` : 'none',
                      transform: isActive ? 'scale(1.2)' : 'scale(1)',
                      transition: 'all .5s cubic-bezier(.4,0,.2,1)',
                    }}>
                      {icon}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ── Step labels ───────────── */}
            <div style={{ display: 'flex', marginBottom: 22 }}>
              {FLOW_STEPS.map(({ }, i) => {
                const isActive = i === activeCircle
                const isDone   = activeCircle >= 0 && i < activeCircle
                return (
                  <div key={i} style={{
                    flex: 1, textAlign: 'center',
                    fontFamily: "'DM Mono',monospace", fontSize: isMobile ? 8.5 : 10.5,
                    color: isActive ? t.accent : isDone ? `rgba(${t.accentRgb},.6)` : t.muted,
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: '.02em',
                    transition: 'color .3s',
                  }}>
                    {tr.flowSteps[i]}
                  </div>
                )
              })}
            </div>

            {/* ── Summary text ──────────── */}
            <div style={{ borderLeft: `3px solid rgba(${t.accentRgb},.3)`, paddingLeft: 16 }}>
              <p style={{ fontSize: 14.5, color: t.muted, lineHeight: 1.85 }}>
                {tr.sum1} <strong style={{ color: t.text }}>{tr.sum2}</strong>{tr.sum3}{' '}
                <strong style={{ color: t.text }}>{tr.sum4}</strong>{tr.sum5}
                <strong style={{ color: t.accent }}>{tr.sum6}</strong>{tr.sum7}
                <strong style={{ color: t.text }}>{tr.sum8}</strong>{tr.sum9}
                <strong style={{ color: t.text }}>{tr.sum10}</strong>{tr.sum11}
              </p>
            </div>
          </div>

          {/* ── Body ──────────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 16 : 5, padding: isMobile ? '0 12px' : '0 24px', alignItems: 'flex-start' }}>
            <Sidebar t={t} tr={tr} isMobile={isMobile} isDrawerOpen={sidebarOpen} onDrawerClose={() => setSidebarOpen(false)} />

            <main style={{ flex: 1, padding: isMobile ? '0 0 24px' : '8px 0px 32px 10px', display: 'flex', flexDirection: 'column', gap: isMobile ? 28 : 36, overflow: 'hidden', width: isMobile ? '100%' : 'auto' }}>

              {/* Stats */}
              <div style={{
                display: 'flex',
                border: `1px solid ${t.border}`,
                borderRadius: 10,
                overflowX: isMobile ? 'auto' : 'hidden',
                overflowY: 'hidden',
                background: t.bg,
                boxShadow: `inset 0 1px 0 rgba(${t.accentRgb},.06)`,
                WebkitOverflowScrolling: 'touch',
              }}>
                {STATS.map(({ val, num }, i) => {
                  const match = val.match(/(\d+)(.*)/)
                  const n   = match ? parseInt(match[1]) : num
                  const sfx = match ? match[2] : ''
                  return (
                    <div key={val} style={{ flex: isMobile ? '0 0 auto' : 1, minWidth: isMobile ? 90 : 'auto', borderRight: i < STATS.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                      <StatItem num={n} suffix={sfx} label={tr.stats[i]} t={t} />
                    </div>
                  )
                })}
              </div>

              {/* Work Experience */}
              <div style={{ paddingLeft: 15 }}>
                <SectionLabel t={t}>{tr.workExp}</SectionLabel>
                {JOBS.map(job => <JobCard key={job.id} job={job} t={t} tr={tr} />)}
              </div>

              {/* Key Projects */}
              <div>
                <SectionLabel t={t}>{tr.keyProjects}</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 14 : 20 }}>
                  {CASES.map((item, i) => <CaseCard key={item.id} item={item} t={t} tr={tr} index={i} />)}
                </div>
              </div>

              {/* Portfolio */}
              <div>
                <SectionLabel t={t}>{tr.portfolioLabel}</SectionLabel>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                  {/* ── Featured: art-pixel.shop ──────────────── */}
                  <a
                    href="https://art-pixel.shop/#portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block', textDecoration: 'none',
                      background: t.bg,
                      border: `1px solid rgba(${t.accentRgb},.3)`,
                      borderLeft: `4px solid ${t.accent}`,
                      borderRadius: '0 10px 10px 0',
                      padding: '16px 20px',
                      position: 'relative', overflow: 'hidden',
                      transition: 'border-color .2s, background .2s, box-shadow .2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor    = t.accent
                      e.currentTarget.style.background     = `rgba(${t.accentRgb},.04)`
                      e.currentTarget.style.boxShadow      = `0 4px 20px rgba(${t.accentRgb},.1)`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor    = `rgba(${t.accentRgb},.3)`
                      e.currentTarget.style.background     = t.bg
                      e.currentTarget.style.boxShadow      = 'none'
                    }}
                  >
                    {/* glow */}
                    <div style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, background: `radial-gradient(circle, rgba(${t.accentRgb},.08) 0%, transparent 70%)`, pointerEvents: 'none' }} />

                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: t.accent, letterSpacing: '.16em', textTransform: 'uppercase', marginBottom: 6 }}>
                          {tr.portfolioFeaturedBadge}
                        </div>
                        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, color: t.white, marginBottom: 8 }}>
                          art-pixel.shop
                        </div>
                        <div style={{ fontSize: 13.5, color: t.muted, lineHeight: 1.65, maxWidth: 540 }}>
                          {tr.portfolioFeaturedDesc}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                          {['OpenCart B2C/B2B', 'WordPress', 'Custom UI/UX', 'SCSS', 'jQuery', 'Bootstrap'].map(tag => (
                            <span key={tag} style={{
                              fontFamily: "'DM Mono',monospace", fontSize: 10.5,
                              color: t.muted, background: t.surface2,
                              border: `1px solid ${t.border}`, borderRadius: 4,
                              padding: '2px 8px',
                            }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        fontFamily: "'DM Mono',monospace", fontSize: 12,
                        color: t.accent, whiteSpace: 'nowrap', marginTop: 4,
                      }}>
                        {tr.viewAllCases}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </div>
                    </div>
                  </a>

                  {/* ── E-commerce links ──────────────────────── */}
                  <div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: t.accent, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{tr.ecommerceGroup}</span>
                      <div style={{ flex: 1, height: 1, background: `rgba(${t.accentRgb},.2)` }} />
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                      {ECOMMERCE_LINKS.map(({ label, href }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: "'DM Mono',monospace", fontSize: 11.5, color: t.muted, textDecoration: 'none', background: t.bg, border: `1px solid ${t.border}`, borderRadius: 5, padding: '4px 10px', transition: 'color .15s, border-color .15s, background .15s' }}
                          onMouseEnter={e => { e.currentTarget.style.color = t.accent; e.currentTarget.style.borderColor = `rgba(${t.accentRgb},.5)`; e.currentTarget.style.background = `rgba(${t.accentRgb},.06)` }}
                          onMouseLeave={e => { e.currentTarget.style.color = t.muted;  e.currentTarget.style.borderColor = t.border; e.currentTarget.style.background = t.bg }}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                          {label}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* ── Corporate / Sites links ───────────────── */}
                  <div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: `rgba(${t.accent2Rgb},1)`, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{tr.sitesGroup}</span>
                      <div style={{ flex: 1, height: 1, background: `rgba(${t.accent2Rgb},.2)` }} />
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                      {CORPORATE_LINKS.map(({ label, href }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: "'DM Mono',monospace", fontSize: 11.5, color: t.muted, textDecoration: 'none', background: t.bg, border: `1px solid ${t.border}`, borderRadius: 5, padding: '4px 10px', transition: 'color .15s, border-color .15s, background .15s' }}
                          onMouseEnter={e => { e.currentTarget.style.color = t.accent2; e.currentTarget.style.borderColor = `rgba(${t.accent2Rgb},.5)`; e.currentTarget.style.background = `rgba(${t.accent2Rgb},.06)` }}
                          onMouseLeave={e => { e.currentTarget.style.color = t.muted;   e.currentTarget.style.borderColor = t.border; e.currentTarget.style.background = t.bg }}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                          {label}
                        </a>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Courses */}
              <div>
                <SectionLabel t={t}>{tr.coursesLabel}</SectionLabel>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {tr.courses.map(([icon, title, desc]) => (
                    <div key={title} style={{
                      display: 'flex', gap: 12, padding: '10px 0',
                      borderBottom: `1px solid ${t.faint}33`,
                    }}>
                      <span style={{ fontSize: 15, flexShrink: 0, lineHeight: 1.5 }}>{icon}</span>
                      <div>
                        <span style={{ fontSize: 13.5, fontWeight: 600, color: t.text }}>{title}:</span>{' '}
                        <span style={{ fontSize: 13.5, color: t.muted }}>{desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </main>
          </div>

          {/* ── Footer ────────────────────────────────────── */}
          <div style={{
            borderTop: `1px solid ${t.border}`,
            padding: isMobile ? '12px 20px' : '14px 56px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: t.bg,
            flexWrap: 'wrap', gap: 8,
            textAlign: isMobile ? 'center' : 'left',
          }}>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: t.faint }}>
              Najib Saab · sdr.expert@gmail.com · Kyiv, Ukraine · {new Date().getFullYear()}
            </span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: t.accent }}>
              {tr.footerRight}
            </span>
          </div>

        </div>
      </div>
    </>
  )
}
