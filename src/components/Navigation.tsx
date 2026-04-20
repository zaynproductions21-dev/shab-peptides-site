"use client";

import Link from "next/link";
import { useState } from "react";

interface NavigationProps {
  variant?: "light" | "dark" | "minimal";
}

export default function Navigation({ variant = "light" }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDark = variant === "dark";
  const bgClass = isDark
    ? "bg-zinc-950/90 backdrop-blur-md border-zinc-800"
    : variant === "minimal"
      ? "bg-white/95 backdrop-blur-md border-gray-100"
      : "bg-white/95 backdrop-blur-md border-gray-200";
  const textClass = isDark ? "text-zinc-100" : "text-charcoal";
  const linkClass = isDark
    ? "text-zinc-400 hover:text-white transition-colors"
    : variant === "minimal"
      ? "text-gray-500 hover:text-primary transition-colors"
      : "text-charcoal-light hover:text-primary transition-colors";
  const logoAccent = isDark ? "text-primary-light" : "text-primary";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${bgClass} border-b`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className={`flex items-center gap-2 ${textClass}`}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              className={logoAccent}
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
              <circle cx="16" cy="10" r="3" fill="currentColor" />
              <circle cx="10" cy="20" r="3" fill="currentColor" />
              <circle cx="22" cy="20" r="3" fill="currentColor" />
              <line x1="16" y1="13" x2="10" y2="17" stroke="currentColor" strokeWidth="1.5" />
              <line x1="16" y1="13" x2="22" y2="17" stroke="currentColor" strokeWidth="1.5" />
              <line x1="10" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="text-lg font-semibold tracking-tight">
              Shab <span className={logoAccent}>Peptides</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#compounds" className={`text-sm font-medium ${linkClass}`}>
              Compounds
            </Link>
            <Link href="#quality" className={`text-sm font-medium ${linkClass}`}>
              Quality
            </Link>
            <Link href="#services" className={`text-sm font-medium ${linkClass}`}>
              Services
            </Link>
            <Link href="#contact" className={`text-sm font-medium ${linkClass}`}>
              Contact
            </Link>
            <Link
              href="#contact"
              className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isDark
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "bg-primary text-white hover:bg-primary-dark"
              }`}
            >
              Request Quote
            </Link>
          </div>

          <button
            type="button"
            className={`md:hidden p-2 ${textClass}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className={`md:hidden ${isDark ? "bg-zinc-950 border-zinc-800" : "bg-white border-gray-200"} border-t px-4 py-4 space-y-3`}>
          <Link href="#compounds" className={`block text-sm font-medium ${linkClass}`} onClick={() => setMobileMenuOpen(false)}>
            Compounds
          </Link>
          <Link href="#quality" className={`block text-sm font-medium ${linkClass}`} onClick={() => setMobileMenuOpen(false)}>
            Quality
          </Link>
          <Link href="#services" className={`block text-sm font-medium ${linkClass}`} onClick={() => setMobileMenuOpen(false)}>
            Services
          </Link>
          <Link href="#contact" className={`block text-sm font-medium ${linkClass}`} onClick={() => setMobileMenuOpen(false)}>
            Contact
          </Link>
          <Link
            href="#contact"
            className="block text-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Request Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
