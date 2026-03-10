export function SectionLabel({ children, t }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          letterSpacing: '.16em',
          textTransform: 'uppercase',
          color: t.accent,
          whiteSpace: 'nowrap',
          fontWeight: 500,
        }}
      >
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: t.border }} />
    </div>
  )
}
