"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";

interface QuickAddButtonProps {
  slug: string;
  name: string;
  size: string;
  price: string;
  image: string;
  inStock?: boolean;
}

const CONFIRM_MS = 1800;

export default function QuickAddButton({ slug, name, size, price, image, inStock = true }: QuickAddButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  // One timer per button. The previous version started a new setTimeout on
  // every click without clearing the last one, so a second click within the
  // confirmation window was cancelled early by the first click's timer still
  // running — the tick vanished while the item had just been added.
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({ slug, name, size, price, image });
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), CONFIRM_MS);
  }

  if (!inStock) {
    return (
      <Link
        href={`/compounds/${slug}`}
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors duration-150 shadow-sm bg-editorial-warm/10 text-editorial-warm border border-editorial-warm/20 hover:bg-editorial-warm/20 active:scale-[0.97]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
        Enquire
      </Link>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        // The label stays stable. Swapping it to "added" relabelled the control
        // a user had just focused; the confirmation belongs in the live region
        // below, which is what screen readers are built to announce.
        aria-label={`Add ${name} ${size} to basket`}
        className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition-[background-color,box-shadow] duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-editorial-accent/40 ${
          added
            ? "bg-editorial-green text-white"
            : "bg-editorial-accent text-white hover:bg-editorial-accent-dark hover:shadow-md active:scale-[0.97]"
        }`}
      >
        {added ? (
          <span className="pm-confirm inline-flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 13l4 4L19 7" />
            </svg>
            Added
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
              <line x1="12" y1="10" x2="12" y2="16" />
              <line x1="9" y1="13" x2="15" y2="13" />
            </svg>
            Add
          </span>
        )}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {added ? `${name} ${size} added to basket` : ""}
      </span>
    </>
  );
}
