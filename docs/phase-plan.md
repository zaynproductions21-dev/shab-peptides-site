# Bio Peptides — Phase Plan

**Client:** Bio Peptides (biopeptides.co.uk) · Client ID: cl_mo71hxje
**Last Updated:** 2026-04-25

---

## Current Status

| Milestone | Status |
|-----------|--------|
| Phase 1: 3 homepage variations | ✅ COMPLETE |
| Client review link shared | ✅ LIVE |
| Client selects homepage direction | ✅ V1 EDITORIAL MEDICAL SELECTED |
| Phase 2: Inner pages | 🔜 NEXT — ready to build |

**Live Preview:** https://shab-peptides-site-zayn-productions.vercel.app

---

## Phase 1 — Homepage Variations (COMPLETE)

Three visually distinct e-commerce + medical lab homepage designs:

| Version | Route | Style | Key Features |
|---------|-------|-------|--------------|
| V1 | /v1 | Editorial Medical | Teal/white, serif headings, MediCenter-inspired, clean product cards |
| V2 | /v2 | Bold Dark Lab | Near-black, purple/cyan neon, cinematic hero, purity bars, grid overlay |
| V3 | /v3 | Warm Friendly | Coral/teal on cream, rounded cards, soft shadows, approachable feel |

**All 3 include:**
- E-commerce product cards with pricing (£24.99–£179.99)
- "Add to Basket" CTAs with size selectors (5mg, 10mg, 30mg)
- Stock badges (In Stock, Made to Order, Enquire)
- Promotional badges (Best Seller, Popular, New)
- Shipping banner (free delivery over £75, same-day dispatch)
- FAQ schema (6 FAQs targeting "best peptide supplier" cluster)
- Organization structured data (JSON-LD)
- Expanded "For Research Purposes Only" trust section
- Real Unsplash lab/medical imagery

**Waiting on:** Client to pick V1, V2, V3, or a combination.

---

## Phase 2 — Inner Pages (NEXT)

### Build NOW (approved)

These pages are informational, low-risk, and support the homepage:

| Page | Primary Keyword | Priority | Notes |
|------|----------------|----------|-------|
| Quality & Testing | "quality testing" | High | Builds E-E-A-T, include sample CoA download |
| Legal Compliance | "UK peptide regulations" | High | Best concept — positions as regulatory expert |
| Research Guidelines | "peptide research guidelines" | Medium | Authority building, AI citation ready |
| Institutional Accounts | "bulk peptide orders UK" | Medium | Rewrite H1 to include value prop |
| Contact | "contact" | Medium | Keep lean — form, details, 2-3 FAQs max |

### Build AFTER LEGAL OPINION

| Page | Primary Keyword | Notes |
|------|----------------|-------|
| Research Compounds (/research-compounds) | "research compounds" | Compliance-first copy only. No transactional language. No "buy" in URL. Must be informational index page. |

**Council rules:**
- No individual compound pages (4 of 5 advisors flagged as highest-risk)
- Revisit after MHRA opinion + search volume data
- URL must be /research-compounds (not /buy-peptides or similar)

### Build AFTER LAUNCH + 30 DAYS

| Page | Primary Keyword | Notes |
|------|----------------|-------|
| Reviews (/reviews) | "bio peptides reviews" | Needs real Trustpilot reviews, lab certs, genuine testimonials — not placeholder copy. Targets Reddit-modifier keywords indirectly. |

---

## Council Restrictions (Permanent)

These are unanimous or near-unanimous rejections — do NOT build:

| Restriction | Ruling | Reason |
|-------------|--------|--------|
| No location pages | 5/5 rejected | Not a local business, no physical locations |
| No individual compound pages | 4/5 flagged | Highest-risk enforcement targets (MHRA) |
| No Reddit keyword pages | 5/5 rejected | Off-site strategy only — engage genuinely in r/Peptides, r/nootropics |

---

## Design Direction — V1 EDITORIAL MEDICAL (LOCKED)

**Selected:** 2026-04-25
**Production URL:** https://shab-peptides-site-zayn-productions.vercel.app/v1

**Design system for all inner pages:**
- **Primary colour:** Teal (#0097A7) with light (#00BCD4) and dark (#00838F) variants
- **Headings:** Playfair Display (serif), bold
- **Body:** Inter (sans-serif)
- **Backgrounds:** White (#FFFFFF) alternating with light surface (#F7FAFB)
- **Cards:** White with #E2E8F0 borders, hover shadow
- **CTAs:** Teal filled buttons, white text
- **Product cards:** Image top, pricing prominent, "Add to Basket" CTA, size selectors
- **Trust signals:** Icon + text credential strips, bordered stat boxes
- **Navigation variant:** "editorial"
- **Footer variant:** "editorial"
- **Form variant:** "editorial"

---

## Technical Stack

- **Framework:** Next.js 16.2.4 (App Router)
- **Styling:** Tailwind CSS 4
- **Fonts:** Inter, Playfair Display, JetBrains Mono
- **Images:** Unsplash (remote patterns configured)
- **Deployment:** Vercel
- **SEO:** FAQ schema (JSON-LD), Organization schema, semantic HTML

---

## File Structure

```
src/
├── app/
│   ├── page.tsx          ← Client review/selector page
│   ├── layout.tsx        ← Root layout (fonts, metadata)
│   ├── globals.css       ← Theme colours (3 palettes)
│   ├── v1/page.tsx       ← Editorial Medical homepage
│   ├── v2/page.tsx       ← Bold Dark Lab homepage
│   └── v3/page.tsx       ← Warm Friendly homepage
├── components/
│   ├── Navigation.tsx    ← 6 variant support
│   ├── Footer.tsx        ← 6 variant support
│   └── QuoteForm.tsx     ← 6 variant support
docs/
├── copy-review.md        ← Full copy audit with scores
└── phase-plan.md         ← This file
```
