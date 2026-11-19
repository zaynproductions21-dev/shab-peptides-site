"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Drives the section reveals. This lives in React rather than in the gate
// script because every internal link is a next/link: a one-shot observer built
// on the `load` event only ever sees the first page's sections, so after a
// client-side navigation the incoming page stays hidden behind html.pm-reveal
// with nothing watching it. That shipped, and left /quality with 17 of 19
// content blocks at opacity 0 for anyone who arrived via a link.
//
// The gate itself (adding pm-reveal to <html>) stays as an inline script in the
// document head — it has to run before first paint, or content flashes visible
// and then hides.

const REVEAL_CLASS = "pm-reveal";
const IN_CLASS = "pm-in";
// Cards inside a .pm-stagger grid are watched one at a time. A section-wide
// reveal cannot work for them: /compounds is a single section around a 4,809px
// grid, so it fires when its top edge appears and animates all thirty cards at
// once, 27 of them off screen.
const CARD_CLASS = "pm-card";
const CARD_IN_CLASS = "pm-card-in";
// Cards that cross the line together — a row — arrive in sequence. A card
// arriving alone has no delay, so scrolling never feels laggy.
const CARD_STAGGER_MS = 70;
const CARD_STAGGER_CAP = 5;
const FAILSAFE_MS = 2500;
const RETURN_MS = 1200;

// How far up from the bottom of the viewport a section must come before it
// counts as "in view". The observer and the failsafe MUST read this from the
// same place. When they didn't, the failsafe used the full viewport while the
// observer used the full viewport minus 10%, so any section resting in that
// band was "in view and still hidden" to the failsafe and "not yet in view" to
// the observer — a false positive that silently switched the reveals off.
const BOTTOM_MARGIN = 0.1;

export default function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    // The gate script decides whether reveals run at all — it checks for
    // IntersectionObserver support and for prefers-reduced-motion. If it chose
    // not to, nothing is hidden and there is nothing to do.
    if (!root.classList.contains(REVEAL_CLASS)) return;

    // The first section is the hero and the LCP element; it is never animated.
    const sections = Array.from(document.querySelectorAll("section")).slice(1);
    if (sections.length === 0) {
      root.classList.remove(REVEAL_CLASS);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add(IN_CLASS);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: `0px 0px -${BOTTOM_MARGIN * 100}% 0px`, threshold: 0.01 },
    );
    for (const section of sections) io.observe(section);

    // ── per-card reveal for .pm-stagger grids ──────────────────────────────
    const inView = (el: Element) =>
      el.getBoundingClientRect().top < window.innerHeight * (1 - BOTTOM_MARGIN);

    const cardIo = new IntersectionObserver(
      (entries) => {
        // Stagger within the batch, not by nth-child. The observer hands us
        // everything that crossed the line together, which is exactly the row
        // the reader is looking at — so the delay is relative to what they can
        // actually see, and a lone card never waits.
        let i = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.setProperty(
            "--pm-delay",
            `${Math.min(i, CARD_STAGGER_CAP - 1) * CARD_STAGGER_MS}ms`,
          );
          el.classList.add(CARD_IN_CLASS);
          cardIo.unobserve(el);
          i++;
        }
      },
      { rootMargin: `0px 0px -${BOTTOM_MARGIN * 100}% 0px`, threshold: 0.01 },
    );

    const grids = Array.from(document.querySelectorAll<HTMLElement>(".pm-stagger"));
    const armedCards = new Set<Element>();
    function armCards() {
      for (const grid of grids) {
        for (const card of Array.from(grid.children)) {
          if (armedCards.has(card)) continue;
          // Never touch anything already on screen: hiding what the reader can
          // see, then showing it again, is a flash rather than a reveal. It is
          // also what keeps this fail-open — an unarmed card is just visible.
          if (inView(card)) continue;
          armedCards.add(card);
          card.classList.add(CARD_CLASS);
          cardIo.observe(card);
        }
      }
    }
    armCards();

    // /compounds filters its grid from search and category state, so cards are
    // added and removed after this effect has run. Without re-arming, a card
    // filtered back in would never be observed — and because the hidden state
    // is added by this script rather than present in the markup, such a card
    // is visible rather than stranded. This simply gives it its entrance.
    const mo = new MutationObserver(armCards);
    for (const grid of grids) mo.observe(grid, { childList: true });

    // A card resting in the bottom 10% band once the document has no scroll
    // left can NEVER cross the trigger line — there is no more scrolling to
    // do — so the observer never fires and the card stays invisible while the
    // reader is looking straight at it. A section never hit this because a
    // section is tall enough that its top always crosses the line; watching
    // individual cards is what exposes it. Measured at 3 stranded cards on
    // desktop and 1 on mobile at the foot of /compounds.
    //
    // Any non-zero bottom margin has this hole, so rather than weaken the
    // trigger for every card, release whatever is left exactly when the end of
    // the document is reached. rAF-throttled and passive: scrolling must not
    // pay for this.
    const atDocumentEnd = () =>
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 2;
    let queued = false;
    const releaseAtEnd = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        if (!atDocumentEnd()) return;
        for (const card of armedCards) {
          if (card.classList.contains(CARD_IN_CLASS)) continue;
          card.classList.add(CARD_IN_CLASS);
          cardIo.unobserve(card);
        }
      });
    };
    window.addEventListener("scroll", releaseAtEnd, { passive: true });
    window.addEventListener("resize", releaseAtEnd, { passive: true });

    // Fail open. The question is "is a section on screen and still hidden?",
    // not "has anything revealed yet?" — the latter is false at the top of
    // every page and would trip immediately. Re-armed on each navigation,
    // which is the half that was missing.
    const timers: ReturnType<typeof setTimeout>[] = [];
    function failsafe() {
      if (document.hidden) return;
      // Same trigger line the observer uses, not the raw viewport.
      const line = window.innerHeight * (1 - BOTTOM_MARGIN);
      const stalled: Element[] = [...sections, ...armedCards];
      for (const section of stalled) {
        if (
          section.classList.contains(IN_CLASS) ||
          section.classList.contains(CARD_IN_CLASS)
        )
          continue;
        const r = section.getBoundingClientRect();
        if (r.top < line && r.bottom > 0) {
          // One-way for the session: motion is optional, the content is not.
          root.classList.remove(REVEAL_CLASS);
          return;
        }
      }
    }
    timers.push(setTimeout(failsafe, FAILSAFE_MS));

    // A backgrounded tab may not paint, so observers can stay silent until the
    // reader comes back. Re-check on return.
    const onVisible = () => {
      if (!document.hidden) timers.push(setTimeout(failsafe, RETURN_MS));
    };
    document.addEventListener("visibilitychange", onVisible);

    // A section that has not revealed yet is invisible but NOT inert. Its
    // children keep their place in the tab order and stay hit-testable, and on
    // /compounds that is thirty product <Link> cards sitting at opacity 0. A
    // keyboard reader tabbing down does scroll the next one into view, which
    // trips the observer — but asynchronously, so for a frame or two focus
    // rests on something that cannot be seen. A pointer can reach the same
    // thing: a section whose top edge is creeping in below the trigger line is
    // tappable while still hidden. Reveal synchronously in both cases.
    //
    // `focusin` rather than `focus`, because focus does not bubble and the node
    // taking focus is always a descendant of the section, never the section.
    // `pointerdown` rather than `click`, because it fires at the start of the
    // gesture — the card is visible before the tap completes. Passive: this
    // never calls preventDefault and must not delay the reader's own tap.
    const revealOnInteract = (event: Event) => {
      const target = event.target as Element | null;
      const card = target?.closest?.(`.${CARD_CLASS}`);
      if (card && !card.classList.contains(CARD_IN_CLASS)) {
        card.classList.add(CARD_IN_CLASS);
        cardIo.unobserve(card);
      }
      const section = target?.closest?.("section");
      if (section && !section.classList.contains(IN_CLASS)) {
        section.classList.add(IN_CLASS);
        io.unobserve(section);
      }
    };
    document.addEventListener("focusin", revealOnInteract);
    document.addEventListener("pointerdown", revealOnInteract, { passive: true });

    return () => {
      io.disconnect();
      cardIo.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", releaseAtEnd);
      window.removeEventListener("resize", releaseAtEnd);
      document.removeEventListener("visibilitychange", onVisible);
      document.removeEventListener("focusin", revealOnInteract);
      document.removeEventListener("pointerdown", revealOnInteract);
      for (const t of timers) clearTimeout(t);
    };
  }, [pathname]);

  return null;
}
