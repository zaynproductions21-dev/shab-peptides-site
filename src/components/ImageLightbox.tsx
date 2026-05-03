"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageLightboxProps {
  src: string;
  alt: string;
}

export default function ImageLightbox({ src, alt }: ImageLightboxProps) {
  const [open, setOpen] = useState(false);

  if (!src) return null;

  return (
    <>
      {/* Thumbnail */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className="relative w-full aspect-[3/2] rounded-xl overflow-hidden border border-editorial-border bg-editorial-surface hover:border-editorial-accent/30 transition-all group/img cursor-zoom-in"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover group-hover/img:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md bg-white/90 backdrop-blur px-2 py-1 text-[10px] font-semibold text-editorial-text opacity-0 group-hover/img:opacity-100 transition-opacity shadow-sm">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
          Expand
        </span>
      </button>

      {/* Lightbox overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="relative max-w-4xl max-h-[85vh] w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain bg-white"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
