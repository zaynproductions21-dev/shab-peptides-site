import Link from "next/link";

interface FooterProps {
  variant?: "light" | "dark" | "minimal";
}

export default function Footer({ variant = "light" }: FooterProps) {
  const isDark = variant === "dark";
  const bgClass = isDark ? "bg-zinc-950 border-zinc-800" : variant === "minimal" ? "bg-gray-50 border-gray-100" : "bg-gray-900 border-gray-800";
  const textClass = isDark ? "text-zinc-400" : variant === "minimal" ? "text-gray-500" : "text-gray-400";
  const headingClass = isDark ? "text-zinc-200" : variant === "minimal" ? "text-gray-700" : "text-white";
  const linkHoverClass = isDark ? "hover:text-zinc-200" : variant === "minimal" ? "hover:text-primary" : "hover:text-white";

  return (
    <footer className={`${bgClass} border-t`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className={`flex items-center gap-2 ${headingClass}`}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-primary" aria-hidden="true">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
                <circle cx="16" cy="10" r="3" fill="currentColor" />
                <circle cx="10" cy="20" r="3" fill="currentColor" />
                <circle cx="22" cy="20" r="3" fill="currentColor" />
                <line x1="16" y1="13" x2="10" y2="17" stroke="currentColor" strokeWidth="1.5" />
                <line x1="16" y1="13" x2="22" y2="17" stroke="currentColor" strokeWidth="1.5" />
                <line x1="10" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="text-lg font-semibold tracking-tight">Shab Peptides</span>
            </Link>
            <p className={`mt-4 text-sm leading-relaxed ${textClass}`}>
              The UK&rsquo;s trusted supplier of high-purity research peptides for academic
              and pharmaceutical institutions.
            </p>
            <p className={`mt-4 text-xs font-mono ${textClass}`}>
              For research use only. Not for human consumption.
            </p>
          </div>

          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${headingClass}`}>
              Compounds
            </h3>
            <ul className="mt-4 space-y-3">
              {["Retatrutide", "GLP-1 Agonists", "Metabolic Compounds", "Custom Synthesis"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#compounds"
                      className={`text-sm ${textClass} ${linkHoverClass} transition-colors`}
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${headingClass}`}>
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                "High-Purity Supply",
                "Quality Certification",
                "Express Delivery",
                "Technical Consultation",
                "Bulk Programmes",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#services"
                    className={`text-sm ${textClass} ${linkHoverClass} transition-colors`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${headingClass}`}>
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li className={`text-sm ${textClass}`}>
                United Kingdom
              </li>
              <li>
                <a
                  href="mailto:info@shabpeptides.co.uk"
                  className={`text-sm ${textClass} ${linkHoverClass} transition-colors`}
                >
                  info@shabpeptides.co.uk
                </a>
              </li>
              <li>
                <Link
                  href="#contact"
                  className={`text-sm ${textClass} ${linkHoverClass} transition-colors`}
                >
                  Request a Quote
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={`mt-12 pt-8 border-t ${isDark ? "border-zinc-800" : variant === "minimal" ? "border-gray-200" : "border-gray-800"}`}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className={`text-xs ${textClass}`}>
              &copy; {new Date().getFullYear()} Shab Peptides Ltd. All rights reserved.
            </p>
            <div className={`flex gap-6 text-xs ${textClass}`}>
              <Link href="#" className={`${linkHoverClass} transition-colors`}>
                Privacy Policy
              </Link>
              <Link href="#" className={`${linkHoverClass} transition-colors`}>
                Terms of Service
              </Link>
              <Link href="#" className={`${linkHoverClass} transition-colors`}>
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
