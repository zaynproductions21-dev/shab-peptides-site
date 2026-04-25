"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

interface AddToBasketProps {
  slug: string;
  name: string;
  sizes: { size: string; price: string }[];
  image: string;
}

export default function AddToBasket({ slug, name, sizes, image }: AddToBasketProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const selected = sizes[selectedIndex];

  function handleAdd() {
    addItem({
      slug,
      name,
      size: selected.size,
      price: selected.price,
      image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div>
      {/* Size selector */}
      <p className="text-xs font-semibold text-editorial-muted uppercase tracking-wider mb-3">Select Size</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {sizes.map((s, i) => (
          <button
            key={s.size}
            onClick={() => setSelectedIndex(i)}
            className={`inline-flex items-center rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
              i === selectedIndex
                ? "border-editorial-accent bg-editorial-accent/5 text-editorial-accent"
                : "border-editorial-border text-editorial-muted hover:border-editorial-accent/30"
            }`}
          >
            {s.size} — <span className="font-bold ml-1">{s.price}</span>
          </button>
        ))}
      </div>

      {/* Price + Add button */}
      <div className="flex items-center gap-4">
        <p className="text-3xl font-bold text-editorial-accent">{selected.price}</p>
        <button
          onClick={handleAdd}
          className={`inline-flex items-center rounded-lg px-6 py-3.5 text-sm font-semibold text-white transition-all shadow-md ${
            added
              ? "bg-editorial-green shadow-editorial-green/20"
              : "bg-editorial-accent hover:bg-editorial-accent-dark shadow-editorial-accent/20"
          }`}
        >
          {added ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mr-2">
                <path d="M5 13l4 4L19 7" />
              </svg>
              Added!
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
              </svg>
              Add to Basket
            </>
          )}
        </button>
      </div>
    </div>
  );
}
