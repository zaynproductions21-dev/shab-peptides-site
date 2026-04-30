import Link from "next/link";

type Variant = "light" | "dark" | "minimal" | "editorial" | "bold" | "warm";

interface FooterProps {
  variant?: Variant;
}

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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
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
          </div>

          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${s.heading}`}>
              Pages
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Shop Peptides", href: "/compounds" },
                { label: "Quality & Testing", href: "/quality" },
                { label: "Research Guidelines", href: "/guidelines" },
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
                <a href="mailto:info@premiopeptides.com" className={`text-sm ${s.text} ${s.hover} transition-colors`}>
                  info@premiopeptides.com
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
