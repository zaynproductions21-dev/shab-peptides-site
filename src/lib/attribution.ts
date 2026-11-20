/**
 * First-touch attribution — captures where a visitor came from on their very
 * first page view in this browsing session, stashes it in sessionStorage,
 * and surfaces it later when the order is placed.
 *
 * SessionStorage (not localStorage) is intentional:
 *   - Clears when the tab is closed → no long-lived tracking → no PECR cookie
 *     consent needed (same reason the AI-referral beacon in layout.tsx can run
 *     before consent).
 *   - A new session = re-attribute (fair for repeat visitors).
 *
 * First-touch (not last-touch) is intentional: once stashed, the record is
 * never overwritten within the session. That means if a researcher lands via
 * ChatGPT, bounces around, comes back via a Google search, then orders — the
 * record still correctly says "ChatGPT drove this order".
 *
 * Shape matches PremioOrder.attribution on the publishos admin side.
 */

const KEY = "pp_attribution_v1"

export interface Attribution {
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
  landingPath?: string
  landingAt?: string
  aiEngine?: "ChatGPT" | "Perplexity" | "Gemini" | "Copilot" | "Claude" | "Meta AI" | "You.com" | "Grok" | null
}

// Same host + param patterns as publishos public/ai-referral.js so admin
// counts and per-order attribution agree on what "ChatGPT" means.
const AI_HOST_PATTERNS: Array<[RegExp, Attribution["aiEngine"]]> = [
  [/(^|\.)chatgpt\.com$/i, "ChatGPT"],
  [/(^|\.)chat\.openai\.com$/i, "ChatGPT"],
  [/(^|\.)openai\.com$/i, "ChatGPT"],
  [/(^|\.)perplexity\.ai$/i, "Perplexity"],
  [/(^|\.)gemini\.google\.com$/i, "Gemini"],
  [/(^|\.)copilot\.microsoft\.com$/i, "Copilot"],
  [/(^|\.)claude\.ai$/i, "Claude"],
  [/(^|\.)meta\.ai$/i, "Meta AI"],
  [/(^|\.)you\.com$/i, "You.com"],
  [/(^|\.)grok\.com$/i, "Grok"],
]
const AI_PARAM_PATTERNS: Array<[RegExp, Attribution["aiEngine"]]> = [
  [/chatgpt|openai/i, "ChatGPT"],
  [/perplexity/i, "Perplexity"],
  [/gemini|bard/i, "Gemini"],
  [/copilot/i, "Copilot"],
  [/claude|anthropic/i, "Claude"],
  [/grok/i, "Grok"],
]

function detectAiEngine(referrer: string, params: URLSearchParams): Attribution["aiEngine"] {
  // utm_source / ref / source wins over host, matching the beacon's precedence
  for (const key of ["utm_source", "ref", "source"]) {
    const v = params.get(key)
    if (!v) continue
    for (const [re, engine] of AI_PARAM_PATTERNS) if (re.test(v)) return engine
  }
  if (referrer) {
    try {
      const host = new URL(referrer).hostname
      for (const [re, engine] of AI_HOST_PATTERNS) if (re.test(host)) return engine
    } catch {}
  }
  return null
}

/**
 * Called from the inline script in layout.tsx on every page load. First call
 * in a session wins. Safe against private windows / disabled storage.
 */
export function captureFirstVisit(): void {
  if (typeof window === "undefined") return
  try {
    if (sessionStorage.getItem(KEY)) return // already captured this session
    const params = new URLSearchParams(location.search)
    const referrer = document.referrer || ""
    const attrib: Attribution = {
      referrer: referrer || undefined,
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
      utmTerm: params.get("utm_term") || undefined,
      utmContent: params.get("utm_content") || undefined,
      landingPath: location.pathname + (location.search || ""),
      landingAt: new Date().toISOString(),
      aiEngine: detectAiEngine(referrer, params),
    }
    sessionStorage.setItem(KEY, JSON.stringify(attrib))
  } catch {
    // Private window / disabled storage / quota — fail silently. The order
    // will still go through without attribution, which is correct behaviour.
  }
}

/** Returns the stashed attribution object for the current session, or null. */
export function getAttribution(): Attribution | null {
  if (typeof window === "undefined") return null
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Attribution
    return parsed && typeof parsed === "object" ? parsed : null
  } catch {
    return null
  }
}
