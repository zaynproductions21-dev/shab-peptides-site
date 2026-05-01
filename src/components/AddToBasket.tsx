"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

interface AddToBasketProps {
  slug: string;
  name: string;
  sizes: { size: string; price: string }[];
  image: string;
  inStock?: boolean;
}

export default function AddToBasket({ slug, name, sizes, image, inStock = true }: AddToBasketProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const [enquirySent, setEnquirySent] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
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

  async function handleEnquiry(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "enquiry",
          compound: name,
          size: selected.size,
          customer: { name: enquiryForm.name, email: enquiryForm.email },
          message: enquiryForm.message || `I'm interested in ${name} (${selected.size}). Please notify me when it's back in stock.`,
        }),
      });
      setEnquirySent(true);
    } catch {
      setEnquirySent(true);
    } finally {
      setSending(false);
    }
  }

  if (!inStock) {
    return (
      <div>
        {/* Size selector (still shown so they can specify interest) */}
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

        {/* Out of stock badge */}
        <div className="flex items-center gap-3 mb-5">
          <p className="text-3xl font-bold text-editorial-muted line-through">{selected.price}</p>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-editorial-warm/10 border border-editorial-warm/20 px-3 py-1.5 text-sm font-semibold text-editorial-warm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
            </svg>
            Out of Stock
          </span>
        </div>

        {/* Enquiry form */}
        {enquirySent ? (
          <div className="rounded-xl border border-editorial-green/30 bg-editorial-green/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-editorial-green">
                <path d="M5 13l4 4L19 7" />
              </svg>
              <p className="font-serif font-bold text-editorial-text">Enquiry Sent</p>
            </div>
            <p className="text-sm text-editorial-muted">We&rsquo;ll be in touch about {name} ({selected.size}) availability. Expect a reply within 2-4 business hours.</p>
          </div>
        ) : (
          <form onSubmit={handleEnquiry} className="rounded-xl border border-editorial-border bg-editorial-surface p-5 space-y-3">
            <p className="font-serif font-bold text-editorial-text text-sm">Enquire About This Peptide</p>
            <p className="text-xs text-editorial-muted">Get notified when {name} is back in stock, or ask about availability.</p>
            <input
              type="text"
              placeholder="Your name"
              required
              value={enquiryForm.name}
              onChange={(e) => setEnquiryForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-lg border border-editorial-border bg-white px-3.5 py-2.5 text-sm text-editorial-text placeholder-editorial-muted focus:outline-none focus:ring-2 focus:ring-editorial-accent/30 focus:border-editorial-accent"
            />
            <input
              type="email"
              placeholder="Your email"
              required
              value={enquiryForm.email}
              onChange={(e) => setEnquiryForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-lg border border-editorial-border bg-white px-3.5 py-2.5 text-sm text-editorial-text placeholder-editorial-muted focus:outline-none focus:ring-2 focus:ring-editorial-accent/30 focus:border-editorial-accent"
            />
            <textarea
              placeholder={`Message (optional) — e.g. "Interested in ${selected.size}, please notify me when available"`}
              rows={2}
              value={enquiryForm.message}
              onChange={(e) => setEnquiryForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full rounded-lg border border-editorial-border bg-white px-3.5 py-2.5 text-sm text-editorial-text placeholder-editorial-muted focus:outline-none focus:ring-2 focus:ring-editorial-accent/30 focus:border-editorial-accent resize-none"
            />
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold text-white bg-editorial-accent hover:bg-editorial-accent-dark transition-colors shadow-md disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              {sending ? "Sending..." : "Send Enquiry"}
            </button>
          </form>
        )}
      </div>
    );
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
