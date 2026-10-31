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

    // Fail open. The question is "is a section on screen and still hidden?",
    // not "has anything revealed yet?" — the latter is false at the top of
    // every page and would trip immediately. Re-armed on each navigation,
    // which is the half that was missing.
    const timers: ReturnType<typeof setTimeout>[] = [];
    function failsafe() {
      if (document.hidden) return;
      // Same trigger line the observer uses, not the raw viewport.
      const line = window.innerHeight * (1 - BOTTOM_MARGIN);
      for (const section of sections) {
        if (section.classList.contains(IN_CLASS)) continue;
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

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
      for (const t of timers) clearTimeout(t);
    };
  }, [pathname]);

  return null;
}
