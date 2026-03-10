import { useState } from 'react'
import { DEVOPS_ITEMS } from '../data/devops'

export function DevopsAccordion({ t }) {
  const [open, setOpen] = useState(null)

  return (
    <div>
      {DEVOPS_ITEMS.map((item, i) => (
        <div key={i} style={{ borderBottom: `1px solid ${t.border}` }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%', padding: '10px 0',
              background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              <span style={{ fontSize: 12.5, color: open === i ? t.accent : t.text, fontWeight: open === i ? 600 : 400, transition: 'color .15s' }}>
                {item.label}
              </span>
            </div>
            <span style={{
              fontFamily: "'DM Mono',monospace", fontSize: 11,
              color: open === i ? t.accent : t.faint,
              transform: open === i ? 'rotate(0)' : 'rotate(-90deg)',
              transition: 'transform .2s, color .2s',
              display: 'inline-block',
            }}>▾</span>
          </button>

          {open === i && (
            <div style={{ padding: '0 0 13px 28px', fontSize: 12.5, color: t.muted, lineHeight: 1.7, animation: 'expandDown .18s ease' }}>
              {item.detail}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
