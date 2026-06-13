'use client'

import { useEffect, useState } from 'react'

// Consent-gated, privacy-hardened analytics for a research-peptides shop
// (health-adjacent). PostHog loads ONLY after the visitor explicitly accepts.
// Session replay masks ALL inputs and ALL text; profiles are only created for
// identified users. Key and host come from env — nothing fires until
// NEXT_PUBLIC_POSTHOG_KEY is set.
const PH_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || ''
const PH_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com'
const CONSENT_KEY = 'pp_cookie_consent'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window { posthog?: any; __ppPhLoaded?: boolean }
}

function loadPostHog() {
  if (!PH_KEY || typeof window === 'undefined' || window.__ppPhLoaded) return
  window.__ppPhLoaded = true
  const assets = PH_HOST.replace('.i.posthog.com', '-assets.i.posthog.com')
  const s = document.createElement('script')
  s.async = true
  s.src = `${assets}/static/array.js`
  document.head.appendChild(s)
  s.onload = () => {
    try {
      window.posthog!.init(PH_KEY, {
        api_host: PH_HOST,
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
        person_profiles: 'identified_only',
        session_recording: { maskAllInputs: true, maskTextSelector: '*' },
      })
      window.posthog!.register({ site: 'premio-peptides', site_name: 'Premio Peptides', site_domain: 'premiopeptides.co.uk' })
    } catch { /* ignore */ }
  }
}

export default function Analytics() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let saved: string | null = null
    try { saved = localStorage.getItem(CONSENT_KEY) } catch { /* ignore */ }
    if (saved === 'accepted') loadPostHog()
    else if (saved !== 'declined' && PH_KEY) setShow(true)
  }, [])

  const accept = () => {
    try { localStorage.setItem(CONSENT_KEY, 'accepted') } catch { /* ignore */ }
    loadPostHog()
    setShow(false)
  }
  const decline = () => {
    try { localStorage.setItem(CONSENT_KEY, 'declined') } catch { /* ignore */ }
    setShow(false)
  }

  if (!show) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: 'fixed', left: 16, right: 16, bottom: 16, zIndex: 1000,
        maxWidth: 560, marginLeft: 'auto', marginRight: 'auto',
        background: '#111827', color: '#e5e7eb', borderRadius: 14,
        padding: '16px 18px', boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
        display: 'flex', flexDirection: 'column', gap: 12,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ fontSize: 13.5, lineHeight: 1.55 }}>
        We use privacy-respecting analytics to understand how this site is used. We never
        record the details you type, and we don&apos;t use advertising cookies. You can decline
        and the site works exactly the same.{' '}
        <a href="/privacy" style={{ color: '#86efac', textDecoration: 'underline' }}>Privacy Policy</a>
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <button onClick={decline} style={{ background: 'transparent', color: '#d1d5db', border: '1px solid #374151', padding: '8px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
          Decline
        </button>
        <button onClick={accept} style={{ background: '#059669', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
          Accept analytics
        </button>
      </div>
    </div>
  )
}
