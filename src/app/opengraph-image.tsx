import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Bio Peptides — Research Peptides UK'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: 'linear-gradient(135deg, #1f2937, #111827)', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, borderRadius: 20, background: 'linear-gradient(135deg, #6366f1, #0891b2)', fontSize: 36, fontWeight: 800, color: '#fff' }}>BP</div>
          <div style={{ fontSize: 52, fontWeight: 800, color: '#ffffff', letterSpacing: -2 }}>Bio Peptides</div>
          <div style={{ fontSize: 24, color: '#94a3b8', maxWidth: 600, textAlign: 'center', lineHeight: 1.4 }}>The UK&apos;s Most Reliable Source for Research Peptides</div>
          <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, color: '#6366f1' }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: '#6366f1' }} />
              99%+ Purity
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, color: '#059669' }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: '#059669' }} />
              Same-Day Dispatch
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, color: '#0891b2' }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: '#0891b2' }} />
              UK-Based
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
