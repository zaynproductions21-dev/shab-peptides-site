import Link from "next/link";

type Variant = "light" | "dark" | "minimal" | "editorial" | "bold" | "warm";

interface FooterProps {
  variant?: Variant;
}

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/premiopeptides/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@premiopeptides",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V7.94a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.37z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCTElJqw28k0KZYjpNHjfORw",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
] as const;

export default function Footer({ variant = "light" }: FooterProps) {
  const styles: Record<Variant, { bg: string; text: string; heading: string; hover: string; border: string; disclaimer: string }> = {
    light: { bg: "bg-gray-900", text: "text-gray-400", heading: "text-white", hover: "hover:text-white", border: "border-gray-800", disclaimer: "text-gray-500" },
    dark: { bg: "bg-zinc-950", text: "text-zinc-400", heading: "text-zinc-200", hover: "hover:text-zinc-200", border: "border-zinc-800", disclaimer: "text-zinc-600" },
    minimal: { bg: "bg-gray-50", text: "text-gray-500", heading: "text-gray-700", hover: "hover:text-primary", border: "border-gray-200", disclaimer: "text-gray-400" },
    editorial: { bg: "bg-editorial-text", text: "text-editorial-muted", heading: "text-cream", hover: "hover:text-editorial-warm", border: "border-editorial-text", disclaimer: "text-editorial-muted" },
    bold: { bg: "bg-bold-bg", text: "text-bold-muted", heading: "text-white", hover: "hover:text-bold-cyan", border: "border-bold-border", disclaimer: "text-bold-muted" },
    warm: { bg: "bg-warm-text", text: "text-warm-muted", heading: "text-warm-bg", hover: "hover:text-warm-accent-light", border: "border-warm-text", disclaimer: "text-warm-muted" },
  };

  const s = styles[variant];
  const isSerif = variant === "editorial";

  return (
    <footer className={`${s.bg} border-t ${s.border}`}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className={`flex items-center gap-2 ${s.heading}`}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-primary" aria-hidden="true">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
                <circle cx="16" cy="10" r="3" fill="currentColor" />
                <circle cx="10" cy="20" r="3" fill="currentColor" />
                <circle cx="22" cy="20" r="3" fill="currentColor" />
                <line x1="16" y1="13" x2="10" y2="17" stroke="currentColor" strokeWidth="1.5" />
                <line x1="16" y1="13" x2="22" y2="17" stroke="currentColor" strokeWidth="1.5" />
                <line x1="10" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className={`text-lg tracking-tight ${isSerif ? "font-serif font-semibold" : "font-semibold"}`}>
                Premio Peptides
              </span>
            </Link>
            <p className={`mt-4 text-sm leading-relaxed ${s.text}`}>
              The UK&rsquo;s trusted supplier of high-purity research peptides for academic
              and pharmaceutical institutions.
            </p>
            <p className={`mt-4 text-xs font-mono ${s.disclaimer}`}>
              For research use only. Not for human consumption.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full border ${s.border} ${s.text} ${s.hover} transition-colors`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${s.heading}`}>
              Pages
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Shop Peptides", href: "/compounds" },
                { label: "Why Premio", href: "/why-premio" },
                { label: "Quality & Testing", href: "/quality" },
                { label: "Research Guidelines", href: "/guidelines" },
                { label: "Reconstitution Calculator", href: "/reconstitution-calculator" },
                { label: "Institutional Accounts", href: "/institutional" },
                { label: "About Us", href: "/about" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={`text-sm ${s.text} ${s.hover} transition-colors`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${s.heading}`}>
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Contact Us", href: "/contact" },
                { label: "FAQ", href: "/faq" },
                { label: "Delivery & Returns", href: "/delivery" },
                { label: "Legal Compliance", href: "/compliance" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={`text-sm ${s.text} ${s.hover} transition-colors`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${s.heading}`}>
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li className={`text-sm ${s.text}`}>United Kingdom</li>
              <li>
                <a href="mailto:info@premiopeptides.co.uk" className={`text-sm ${s.text} ${s.hover} transition-colors`}>
                  info@premiopeptides.co.uk
                </a>
              </li>
              <li>
                <Link href="/contact" className={`text-sm ${s.text} ${s.hover} transition-colors`}>
                  Send an Enquiry
                </Link>
              </li>
              <li>
                <Link href="/institutional#apply" className={`text-sm ${s.text} ${s.hover} transition-colors`}>
                  Institutional Accounts
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={`mt-12 pt-8 border-t ${s.border}`}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className={`text-xs ${s.text}`}>
              &copy; {new Date().getFullYear()} BELL RED LIMITED (trading as Premio Peptides). Company No. 12841067. All rights reserved.
            </p>
            <div className={`flex flex-wrap gap-4 sm:gap-6 text-xs ${s.text}`}>
              <Link href="/privacy" className={`${s.hover} transition-colors`}>Privacy Policy</Link>
              <Link href="/terms" className={`${s.hover} transition-colors`}>Terms of Service</Link>
              <Link href="/cookies" className={`${s.hover} transition-colors`}>Cookie Policy</Link>
              <Link href="/delivery" className={`${s.hover} transition-colors`}>Delivery &amp; Returns</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
