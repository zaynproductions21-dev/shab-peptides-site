---
name: premio-design
description: Premio Peptides' house design system — the live Editorial token set, canonical component class strings, layout rhythm, typography rules, and motion tokens. Load this BEFORE writing or editing any UI in this repo (components, pages, forms, cards, buttons, nav), before choosing a colour or radius, and before adding any animation. Use it when asked to build, restyle, or review any visual element here, or when a change should "look like the rest of the site". For motion craft (easing choice, interruption, performance) this skill sets the tokens and defers to the `animate` / `review-animations` / `animation-performance` skills.
---

# Premio Peptides — House Design System

Premio Peptides is a UK research-peptide supplier. The interface reads as **clinical-editorial**: cream ground, medical teal accent, serif display headings, generous whitespace. It should feel like a medical journal that happens to sell things — not like a supplement store.

## Initial response

When loaded without a specific question, reply only:

> Premio design system loaded — Editorial tokens, canonical components, and motion tokens. What are we building?

Then wait.

---

## 1. There is exactly ONE live design system

`src/app/globals.css` defines four token blocks. **Only one is live.**

| Block | Status | Evidence |
|---|---|---|
| **V1 Editorial** (`--color-editorial-*`, `--color-cream*`) | **LIVE** | 1,429 usages; all 31 pages pass `variant="editorial"` |
| V2 Bold (`--color-bold-*`) | **DEAD** | 260 usages, all inside unreachable variant branches |
| V3 Warm (`--color-warm-*`) | **DEAD** | 50 usages, same |
| Shared accents (`--color-primary`, `secondary`, `gold`, `lab-green`, `charcoal`) | **MOSTLY DEAD** | 42 usages, legacy |

### Rules
- **Never introduce a `bold-*`, `warm-*`, `primary`, `secondary`, `gold`, `lab-green` or `charcoal` class.** They are leftovers from a variant bake-off that Editorial won.
- `Navigation.tsx`, `Footer.tsx` and `QuoteForm.tsx` accept a `variant` prop with six values. Every caller passes `"editorial"`. When editing these, **only touch the `editorial` branch** unless explicitly asked to clean up the dead ones.
- Do not delete the dead variants as a side-effect of other work. It's a separate, deliberate cleanup.

---

## 2. Colour — semantic roles

Use the Tailwind class, never a raw hex, never an arbitrary value.

| Role | Class | Hex | Use for |
|---|---|---|---|
| Page ground | `bg-cream` | `#FAFAF8` | Body background. Warm off-white, never pure `#fff`. |
| Raised surface | `bg-white` | `#FFFFFF` | Cards that must lift off the cream. |
| Recessed surface | `bg-editorial-surface` | `#F7FAFB` | Inset panels, table stripes, form fields, quiet cards. |
| Body text | `text-editorial-text` | `#1A2332` | All headings and body copy. Near-black navy, never `#000`. |
| Secondary text | `text-editorial-muted` | `#6B7A8D` | Captions, labels, metadata, placeholders. |
| Hairline | `border-editorial-border` | `#E2E8F0` | **Every** border. One border colour, site-wide. |
| Accent | `bg-/text-editorial-accent` | `#0097A7` | Primary actions, links, eyebrows, active states. |
| Accent hover | `bg-editorial-accent-dark` | `#00838F` | Hover on accent fills only. |
| Accent tint | `bg-editorial-accent/5` … `/10` | — | Informational panels, badge grounds. |
| Success | `text-editorial-green` | `#43A047` | In-stock, verified, passed COA. |
| Warning / attention | `text-editorial-warm` | `#FF8A65` | Low stock, caution notes. Not for errors. |

### Colour rules
- **One accent.** Teal carries every interactive affordance. Do not add a second brand colour to create hierarchy — use weight, size and space instead.
- Tints are `/5`, `/10`, `/15`, `/20` only. No other opacity steps.
- Green and warm are **status**, never decoration.
- Dark sections (`bg-editorial-text`) are allowed as a full-bleed footer or a single emphasis band. Not as a card.

---

## 3. Typography

Three families, loaded via `next/font/google` in `src/app/layout.tsx`:

| Family | Class | Variable | Use |
|---|---|---|---|
| Playfair Display | `font-serif` | `--font-playfair` | **All headings.** 178 usages — this is the brand's voice. |
| Inter | default (`font-sans`) | `--font-inter` | All body copy, labels, buttons. |
| JetBrains Mono | `font-mono` | `--font-jetbrains-mono` | Dosages, batch numbers, order refs, COA values, anything a reader might transcribe. |

### Canonical heading strings (copy these verbatim)

```
Page H1      font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15]
Section H2   font-serif text-2xl font-bold text-editorial-text mb-6
Card H3      font-serif text-xl font-bold text-editorial-text mb-3
Small H4     font-serif text-base font-bold text-editorial-text
Eyebrow      text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3
Micro-label  text-xs uppercase tracking-wider text-editorial-muted font-semibold
```

### Type rules
- **Headings are serif, always.** A sans heading is a bug.
- Body copy is `text-sm` (296 usages) with `text-base` reserved for lead paragraphs. The site runs deliberately tight — do not bump body text to `text-base` "for readability" without being asked.
- Only `tracking-tight` on the H1. Never tighten body text.
- Eyebrow above an H2 is the standard section opener. Accent-coloured, uppercase, `tracking-wider`.

---

## 4. Layout rhythm

```
Content width    max-w-4xl   (default — 61 usages)
Prose width      max-w-3xl   (long-form reading)
Narrow/form      max-w-2xl
Section padding  py-16       (default)  |  py-20 (major)  |  py-24 (hero only)
Gutter           px-4 sm:px-6
```

- `max-w-4xl mx-auto px-4 sm:px-6` is the standard container. Use it unless there's a reason.
- Sections alternate `bg-cream` → `bg-white` or `bg-editorial-surface` to separate. **Never two adjacent sections with the same background and no border.**
- Radii: `rounded-lg` for controls (125 usages), `rounded-xl` for cards (63), `rounded-2xl` for feature cards (33), `rounded-full` for pills and avatars. **No other radius.**
- Shadows: `shadow-sm` on raised controls, `shadow-md` on hover lift. `shadow-lg`/`2xl` for overlays only. Prefer a border over a shadow for flat surfaces.

---

## 5. Canonical components

These exact strings already appear many times in the codebase. Reuse them rather than composing new ones.

### Primary button (11 existing usages — the house standard)
```tsx
className="inline-flex items-center justify-center rounded-lg bg-editorial-accent px-7 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors shadow-sm"
```

### Secondary / ghost button
```tsx
className="inline-flex items-center justify-center rounded-lg border border-editorial-border px-7 py-3.5 text-sm font-medium text-editorial-text hover:bg-editorial-surface transition-colors"
```

### Submit button (forms — uppercase, with disabled state)
```tsx
className="px-6 py-3 rounded-lg bg-editorial-accent hover:bg-editorial-accent-dark text-white text-sm font-semibold uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
```

### Card
```tsx
// raised
className="rounded-xl border border-editorial-border bg-white p-6"
// recessed / quiet
className="rounded-xl border border-editorial-border bg-editorial-surface p-6"
// feature
className="rounded-2xl border border-editorial-border bg-white p-6 sm:p-7"
```

### Text input / textarea
```tsx
className="w-full rounded-lg border border-editorial-border bg-white px-3.5 py-2.5 text-sm text-editorial-text placeholder-editorial-muted focus:outline-none focus:ring-2 focus:ring-editorial-accent/30 focus:border-editorial-accent"
```
Focus is **always** `ring-2 ring-editorial-accent/30` + `border-editorial-accent`. Never remove the focus ring without replacing it.

### Badge / pill
```tsx
className="inline-block rounded-full bg-editorial-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-editorial-accent"
```

### Info panel
```tsx
className="rounded-lg bg-editorial-accent/5 border border-editorial-accent/15 p-4"
```

---

## 6. Motion tokens

**The motion system is live** (shipped 2026-10-28). `src/app/globals.css` carries the reveal, draw and reduced-motion blocks; `src/app/layout.tsx` carries the `pm-reveal` script. The tokens below are implemented, not aspirational — match them rather than inventing new values.

### Section reveals
A single `beforeInteractive` script in `layout.tsx` adds `pm-reveal` to `<html>`, then on `load` an IntersectionObserver adds `.pm-in` to each `<section>` except the first (the hero — never animate it, it is the LCP element). CSS staggers the section's direct children ~70ms apart, capped at the 5th.

Three properties are **not optional**, each of them load-bearing:
- The hidden state exists only behind `html.pm-reveal`, added after confirming `IntersectionObserver` exists and reduced motion is not requested. If the script never runs, nothing is ever hidden.
- A failsafe independent of the observer drops `pm-reveal` if a section is **in view and still hidden** after 2.5s. Testing "has anything revealed yet?" instead is wrong — that is false at the top of every page.
- React discards DOM mutations made before hydration, so the script must tag `<html>` only and let CSS select content structurally. Per-element `data-` attributes written pre-hydration are wiped.

### Duration scale
| Token | Use |
|---|---|
| `duration-150` | Colour/opacity on hover and focus. The default for `transition-colors`. |
| `duration-200` | Small element enter/exit — badges, tooltips, inline reveals. |
| `duration-300` | Dropdowns, popovers, accordion panels. |
| `duration-500` | Full-surface overlays — lightbox, cart drawer, modal backdrop. |

Nothing over 500ms. Nothing under 100ms (reads as a glitch, not a transition).

### Easing
| Direction | Class | Why |
|---|---|---|
| **Enter** (appearing, opening, expanding) | `ease-out` | Fast start, settles gently. Feels responsive. **This is the one agents get wrong most often.** |
| **Exit** (dismissing, closing, collapsing) | `ease-in` | Accelerates away. Gets out of the user's way. |
| **Both directions / move** | `ease-in-out` | Position changes on an element that stays visible. |
| Hover colour | omit | 150ms is too short for easing to register. |

**An enter animation with `ease-in` is a bug.** See the `animate` skill for the full reasoning.

### Property rules
- Animate `opacity` and `transform` only. Both are composite-only — free on the GPU.
- **Never `transition-all`.** All 13 instances were removed on 2026-10-28; the count is now zero and must stay there. Name the property: `transition-colors`, `transition-transform`, `transition-opacity`, or a bracketed list such as `transition-[border-color,box-shadow]`.
- Never animate `height`, `width`, `top`, `left`, `margin` or `padding`. Use `transform` or `grid-template-rows`/`max-height` with care.
- Never animate from `scale(0)` — start at `scale(0.95)`–`scale(0.98)`.
- Respect `prefers-reduced-motion`: wrap non-essential motion in `motion-safe:` or a media query.

### Motion restraint
Premio sells a regulated research product. Motion must read as **precision, not showmanship**. Subtle and fast. No bounce on commerce actions, no parallax, no scroll-jacking, no decorative looping animation. Confidence-signalling UI (COA panels, batch data, compliance copy) should feel still.

### Where motion belongs here
Add it to: cart drawer open/close, `ImageLightbox` enter/exit, `QuickAddButton` confirmation, accordion/FAQ panels, `CompoundGrid` card hover lift, form validation reveals, `ReconstitutionCalculator` result updates.

Do **not** animate: price figures, stock counts, compliance text, COA values, the nav on scroll.

---

### The chromatogram figure

`src/components/ChromatogramFigure.tsx` is the quality graphic on the homepage and
`/quality`. It replaced `/generated/section-3.webp`, an AI-generated photo captioned as
the third-party laboratory's own HPLC equipment — a claim the quality page itself
contradicts, since the whole argument is that Premio has no in-house lab.

**It must stay labelled illustrative.** It is drawn from a peak list, not measured. Never
caption it with a compound, a batch, a purity percentage or a retention time, and never
present it as a real result; real figures belong on the batch CoA. If a genuine CoA
chromatogram ever becomes available, that is strictly better — use it instead.

It draws itself with `stroke-dashoffset`, using `pathLength={1000}` so the dash length
needs no JavaScript measurement. Under `prefers-reduced-motion` the completed trace
renders immediately.

### Verifying motion — read this before concluding it is broken

Scroll animation on this site has produced false negatives three different ways:
1. **The Claude preview pane reports `document.hidden`**, which starves
   IntersectionObserver, makes `window.scrollTo` inert and can report
   `innerHeight: 0`. The failsafe then correctly skips too. Verify in real headless
   Chrome over CDP instead, where `visibilityState` is `visible`.
2. **A stale dev server serves pre-edit CSS.** `curl` the `/_next/static/.../*.css` the
   page actually links and grep it before blaming the code.
3. **`getComputedStyle` returns a live object.** Copy values out with `String(...)`
   before changing state, or the "before" sample mutates under you.

Never run `npm run build` while `next dev` is running — both write `.next`.

---

## 7. Known defects — fix when touching these files, don't let them spread

1. **`ImageLightbox.tsx`** — hand-rolled `fixed inset-0` overlay with no `aria-modal`, no focus trap, no Escape handler, no enter/exit animation.
2. **`QuickAddButton.tsx:25`** — `setTimeout(1800)` fake toast. Should be a real toast (see `ask-sonner`).
3. ~~13 × `transition-all`~~ — **fixed 2026-10-28**, count is zero. The quiz progress bar also stopped animating `width` and now uses `origin-left` + `scaleX()`.
4. **Dead variant branches** in `Navigation`/`Footer`/`QuoteForm`.
5. **Dead token blocks** V2/V3 in `globals.css`.

---

## 8. Before hand-rolling a component, stop

This repo has **no UI library and no motion library**. Every dialog, drawer, menu and toast is hand-built, which is why accessibility gaps keep appearing. Before writing a new overlay, menu, drawer, tooltip, combobox or toast from scratch, load the **`pick-ui-library`** skill and take its recommendation.

### Companion skills
| Task | Skill |
|---|---|
| Building any new animation | `animate` |
| Reviewing motion in a diff | `review-animations` |
| Animation feels janky | `animation-performance` |
| Finding what to animate | `find-animation-opportunities` |
| Choosing a dialog/toast/drawer library | `pick-ui-library` |
| Mobile feel (tap, 100vh, safe areas) | `mobile-native` |
| Stress-testing with bad data | `break-ui` |
| Exploring several visual directions | `prototype` |
| General polish philosophy | `emil-design-eng` |

This skill owns **tokens and brand**. Those skills own **craft**. When they conflict on a value, this skill wins on colour/type/radius/spacing; they win on easing, duration behaviour and interaction mechanics.
