"use client";

import { useState } from "react";

export default function CopyTrackingButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for old browsers / non-secure contexts
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        alert(`Copy failed — the tracking number is:\n\n${value}`);
      }
      document.body.removeChild(ta);
    }
  }

  return (
    <button
      onClick={copy}
      type="button"
      className={`inline-flex items-center gap-2 rounded-lg border-2 px-6 py-3.5 text-sm font-semibold transition-colors ${
        copied
          ? "border-editorial-green bg-editorial-green/10 text-editorial-green"
          : "border-editorial-accent bg-white text-editorial-accent hover:bg-editorial-accent/5"
      }`}
      aria-label="Copy tracking number to clipboard"
    >
      {copied ? (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
            <path d="M5 13l4 4L19 7" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
          Copy tracking number
        </>
      )}
    </button>
  );
}
