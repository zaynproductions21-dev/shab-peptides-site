"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

interface QuickAddButtonProps {
  slug: string;
  name: string;
  size: string;
  price: string;
  image: string;
}

export default function QuickAddButton({ slug, name, size, price, image }: QuickAddButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({ slug, name, size, price, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={added ? `${name} added to basket` : `Add ${name} ${size} to basket`}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-editorial-accent/40 ${
        added
          ? "bg-editorial-green text-white"
          : "bg-editorial-accent text-white hover:bg-editorial-accent-dark hover:shadow-md active:scale-[0.97]"
      }`}
    >
      {added ? (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 13l4 4L19 7" />
          </svg>
          Added
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
            <line x1="12" y1="10" x2="12" y2="16" />
            <line x1="9" y1="13" x2="15" y2="13" />
          </svg>
          Add
        </>
      )}
    </button>
  );
}
