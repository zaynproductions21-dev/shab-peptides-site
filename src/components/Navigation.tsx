"use client";

import Link from "next/link";
import { useState } from "react";
import CartIcon from "./CartIcon";

type Variant = "light" | "dark" | "minimal" | "editorial" | "bold" | "warm";

interface NavigationProps {
  variant?: Variant;
}

export default function Navigation({ variant = "light" }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const styles: Record<Variant, { bg: string; text: string; link: string; logo: string; mobileBg: string; cta: string }> = {
    light: {
      bg: "bg-white/95 backdrop-blur-md border-gray-200",
      text: "text-charcoal",
      link: "text-charcoal-light hover:text-primary transition-colors",
      logo: "text-primary",
      mobileBg: "bg-white border-gray-200",
      cta: "bg-primary text-white hover:bg-primary-dark",
    },
    dark: {
      bg: "bg-zinc-950/90 backdrop-blur-md border-zinc-800",
      text: "text-zinc-100",
      link: "text-zinc-400 hover:text-white transition-colors",
      logo: "text-primary-light",
      mobileBg: "bg-zinc-950 border-zinc-800",
      cta: "bg-primary text-white hover:bg-primary-dark",
    },
    minimal: {
      bg: "bg-white/95 backdrop-blur-md border-gray-100",
      text: "text-charcoal",
      link: "text-gray-500 hover:text-primary transition-colors",
      logo: "text-primary",
      mobileBg: "bg-white border-gray-100",
      cta: "bg-primary text-white hover:bg-primary-dark",
    },
    editorial: {
      bg: "bg-cream/95 backdrop-blur-md border-editorial-border",
      text: "text-editorial-text",
      link: "text-editorial-muted hover:text-editorial-accent transition-colors",
      logo: "text-editorial-accent",
      mobileBg: "bg-cream border-editorial-border",
      cta: "bg-editorial-accent text-white hover:bg-editorial-accent-light",
    },
    bold: {
      bg: "bg-bold-bg/95 backdrop-blur-md border-bold-border",
      text: "text-white",
      link: "text-bold-muted hover:text-bold-cyan transition-colors",
      logo: "text-bold-accent-light",
      mobileBg: "bg-bold-bg border-bold-border",
      cta: "bg-bold-accent text-white hover:bg-bold-accent-light",
    },
    warm: {
      bg: "bg-warm-bg/95 backdrop-blur-md border-warm-border",
      text: "text-warm-text",
      link: "text-warm-muted hover:text-warm-accent transition-colors",
      logo: "text-warm-accent",
      mobileBg: "bg-warm-bg border-warm-border",
      cta: "bg-warm-accent text-white hover:bg-warm-accent-light",
    },
  };

  const s = styles[variant];
  const isSerif = variant === "editorial";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${s.bg} border-b`}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className={`flex items-center gap-2.5 ${s.text}`}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 32 32"
              fill="none"
              className={s.logo}
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="16" cy="10" r="3" fill="currentColor" />
              <circle cx="10" cy="20" r="3" fill="currentColor" />
              <circle cx="22" cy="20" r="3" fill="currentColor" />
              <line x1="16" y1="13" x2="10" y2="17" stroke="currentColor" strokeWidth="1.5" />
              <line x1="16" y1="13" x2="22" y2="17" stroke="currentColor" strokeWidth="1.5" />
              <line x1="10" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className={`text-sm md:text-lg tracking-tight whitespace-nowrap ${isSerif ? "font-serif font-semibold" : "font-semibold"}`}>
              Premio <span className={s.logo}>Peptides</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-5 xl:gap-6 ml-8">
            {[
              { label: "Home", href: "/" },
              { label: "Peptides", href: "/compounds" },
              { label: "Quality", href: "/quality" },
              { label: "Why Premio", href: "/why-premio" },
              { label: "Calculator", href: "/reconstitution-calculator" },
              { label: "Blog", href: "/blog" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium ${s.link} ${isSerif ? "tracking-wide" : ""}`}
              >
                {item.label}
              </Link>
            ))}
            <CartIcon />
            <a
              href="https://wa.me/971585742670?text=Hi%20Premio%20Peptides%2C%20I%27d%20like%20to%20place%20an%20order.%20Can%20you%20help%3F"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white hover:bg-[#20BD5A] transition-colors shadow-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <Link
              href="/contact"
              className={`hidden xl:inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${s.cta}`}
            >
              Request Quote
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <CartIcon />
            <a
              href="https://wa.me/971585742670?text=Hi%20Premio%20Peptides%2C%20I%27d%20like%20to%20place%20an%20order.%20Can%20you%20help%3F"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm active:bg-[#20BD5A]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          <button
            type="button"
            className={`p-2 ${s.text}`}
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
      </div>

      {mobileMenuOpen && (
        <div className={`lg:hidden ${s.mobileBg} border-t px-4 py-4 space-y-3`}>
          {[
            { label: "Home", href: "/" },
            { label: "Peptides", href: "/compounds" },
            { label: "Quality", href: "/quality" },
            { label: "Why Premio", href: "/why-premio" },
            { label: "Calculator", href: "/reconstitution-calculator" },
            { label: "Blog", href: "/blog" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`block text-sm font-medium ${s.link}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://wa.me/971585742670?text=Hi%20Premio%20Peptides%2C%20I%27d%20like%20to%20place%20an%20order.%20Can%20you%20help%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-medium text-white hover:bg-[#20BD5A] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
          <Link
            href="/contact"
            className={`block text-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${s.cta}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Request Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
