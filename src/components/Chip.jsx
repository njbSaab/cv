export function Chip({ label, type = '', t, size = 'sm' }) {
  const base = {
    display: 'inline-block',
    fontFamily: "'DM Mono', monospace",
    fontSize: size === 'lg' ? '12px' : '11px',
    padding: size === 'lg' ? '4px 11px' : '3px 9px',
    borderRadius: '4px',
    border: '1px solid',
    lineHeight: '1.65',
    whiteSpace: 'nowrap',
    letterSpacing: '0.01em',
  }

  const variants = {
    hot:   { background: t.chipHot,   borderColor: t.chipHotBorder,   color: t.chipHotText   },
    mid:   { background: t.chipMid,   borderColor: t.chipMidBorder,   color: t.chipMidText   },
    react: { background: t.chipReact, borderColor: t.chipReactBorder, color: t.chipReactText },
    '':    { background: t.chip,      borderColor: t.chipBorder,      color: t.chipText      },
  }

  return <span style={{ ...base, ...(variants[type] ?? variants['']) }}>{label}</span>
}
