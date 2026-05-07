import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Why Premio Peptides | Comparison, Customer Journey & Quality Pipeline",
  description:
    "How Premio Peptides differs from grey-market suppliers. Side-by-side comparison, the order-to-bench customer journey, and our 8-stage quality pipeline.",
  alternates: { canonical: "/why-premio" },
  openGraph: {
    title: "Why Premio Peptides | Trusted UK Research Peptide Supply",
    description: "Comparison, customer journey, and quality pipeline.",
    url: "/why-premio",
    type: "website",
  },
};

// ───────────────────────── Concept A — Comparison Table ─────────────────────────

const COMPARISON_ROWS: { label: string; premio: string; generic: string; premioOK: boolean; genericOK: boolean }[] = [
  { label: "Company registered (UK Companies House)", premio: "Bell Red Ltd · No. 12841067", generic: "Anonymous / overseas", premioOK: true, genericOK: false },
  { label: "Public registered address", premio: "UK address listed", generic: "PO box or none", premioOK: true, genericOK: false },
  { label: "Real phone + WhatsApp support", premio: "Verified business numbers", generic: "Form-only contact", premioOK: true, genericOK: false },
  { label: "Certificate of Analysis per batch", premio: "Included with every order", generic: "Generic / on request only", premioOK: true, genericOK: false },
  { label: "Third-party HPLC + ESI-MS testing", premio: "ISO-accredited testing partner", generic: "Manufacturer-supplied data only", premioOK: true, genericOK: false },
  { label: "UK-based cold-chain stock", premio: "Held at 2–8°C in UK warehouse", generic: "EU-only / dropship", premioOK: true, genericOK: false },
  { label: "Same-day dispatch (orders by 2pm)", premio: "Tracked next-day UK delivery", generic: "5–10 day shipping", premioOK: true, genericOK: false },
  { label: "Manual research-purpose verification", premio: "60-minute phone confirmation", generic: "No verification step", premioOK: true, genericOK: false },
  { label: "BACS payment with paper trail", premio: "Bank transfer, audit-friendly", generic: "Crypto-only / unverified rails", premioOK: true, genericOK: false },
  { label: "Reconstitution + dosing calculators", premio: "Free on-site research tools", generic: "None", premioOK: true, genericOK: false },
];

function ComparisonSection() {
  return (
    <section id="comparison" className="py-16 lg:py-20 bg-editorial-surface">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3">Side by Side</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-editorial-text leading-tight">
            Premio Peptides <span className="text-editorial-muted font-normal">vs</span> Typical Grey-Market Vendor
          </h2>
          <p className="mt-3 text-editorial-muted max-w-2xl">
            Ten things every research-peptide buyer should be able to verify before they pay. We can. Most can&rsquo;t.
          </p>
        </div>

        <div className="rounded-2xl border-2 border-editorial-accent/30 bg-white shadow-sm overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] bg-editorial-text text-white text-xs sm:text-sm font-semibold uppercase tracking-wider">
            <div className="px-4 sm:px-6 py-4">What you can verify</div>
            <div className="px-4 sm:px-6 py-4 bg-editorial-accent text-white border-l border-white/20">Premio Peptides</div>
            <div className="px-4 sm:px-6 py-4 border-l border-white/20 text-white/70">Typical Grey-Market Vendor</div>
          </div>

          {/* Rows */}
          {COMPARISON_ROWS.map((row, i) => (
            <div key={row.label} className={`grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] border-t border-editorial-border ${i % 2 === 0 ? "bg-white" : "bg-editorial-surface/40"}`}>
              <div className="px-4 sm:px-6 py-4 text-sm font-semibold text-editorial-text">{row.label}</div>
              <div className="px-4 sm:px-6 py-4 text-sm text-editorial-text bg-editorial-accent/5 md:border-l border-editorial-border flex items-start gap-2">
                <CheckIcon className="text-editorial-green mt-0.5 shrink-0" />
                <span>{row.premio}</span>
              </div>
              <div className="px-4 sm:px-6 py-4 text-sm text-editorial-muted md:border-l border-editorial-border flex items-start gap-2">
                <CrossIcon className="text-red-500 mt-0.5 shrink-0" />
                <span>{row.generic}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-editorial-muted text-right">For research use only. Comparison reflects market norms — your supplier may differ.</p>
      </div>
    </section>
  );
}

// ───────────────────────── Concept B — Customer Journey ─────────────────────────

const JOURNEY_STEPS: { time: string; title: string; body: string; icon: string }[] = [
  { time: "0:00", title: "Browse", body: "Filter by research category. Live stock indicator on every product. CoA available before you click order.", icon: "search" },
  { time: "0:05", title: "Cart", body: "Quick-Add from any card. Basket totals in GBP. No surprise fees at checkout.", icon: "cart" },
  { time: "0:10", title: "Checkout", body: "Research-purpose details + Turnstile bot check. No card stored — BACS issued post-verification.", icon: "form" },
  { time: "1:00", title: "Verify", body: "Manual phone or WhatsApp call within 60 minutes. We confirm the research context and email payment details.", icon: "phone" },
  { time: "Same day", title: "Dispatch", body: "Packed cold-chain (2–8°C), tracked, batch-specific CoA enclosed. Out the door before 2pm cut-off.", icon: "truck" },
  { time: "Next AM", title: "On the bench", body: "Researcher signs for the package the following morning. Documentation paired to batch reference.", icon: "flask" },
];

function JourneySection() {
  return (
    <section id="journey" className="py-16 lg:py-20 bg-white">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3">The Journey</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-editorial-text leading-tight">
            From order to researcher&rsquo;s bench <span className="text-editorial-accent">in 24 hours</span>
          </h2>
          <p className="mt-3 text-editorial-muted max-w-2xl mx-auto">
            Six checkpoints. One business day. Every step documented and verifiable.
          </p>
        </div>

        {/* Horizontal connector — desktop only */}
        <div className="relative">
          <div aria-hidden="true" className="hidden lg:block absolute top-7 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-editorial-accent/20 via-editorial-accent to-editorial-accent/20" />

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-3 list-none">
            {JOURNEY_STEPS.map((step, i) => (
              <li key={step.title} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-editorial-accent text-white shadow-md ring-4 ring-white">
                  <JourneyIcon name={step.icon} />
                </div>
                <p className="mt-3 text-xs font-mono text-editorial-accent font-semibold tracking-wider">{step.time}</p>
                <h3 className="mt-1 font-serif text-lg font-bold text-editorial-text">{step.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-editorial-muted leading-relaxed px-1">{step.body}</p>
                {i < JOURNEY_STEPS.length - 1 && (
                  <span aria-hidden="true" className="lg:hidden mt-4 text-editorial-accent">↓</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── Concept C — Quality Pipeline ─────────────────────────

const PIPELINE_STAGES: { num: string; title: string; what: string; why: string }[] = [
  { num: "01", title: "Source", what: "UK manufacturing partner, ISO-accredited synthesis facility.", why: "Provenance you can audit. No anonymous overseas drop-shipping." },
  { num: "02", title: "Receive", what: "Incoming batch logged, unique lot number assigned, sealed at 2–8°C on arrival.", why: "Full chain of custody from receipt onward." },
  { num: "03", title: "Test", what: "Third-party laboratory runs HPLC, ESI-MS and LAL endotoxin testing on every batch.", why: "Independent verification — we don&rsquo;t mark our own homework." },
  { num: "04", title: "Approve", what: "99%+ purity threshold required. Batches that fail are quarantined and never sold.", why: "No exceptions. Failed lots don&rsquo;t end up on the catalogue." },
  { num: "05", title: "Document", what: "CoA generated, batch reference issued, lot tied to a specific dispatch barcode.", why: "Every researcher can match documentation to physical stock." },
  { num: "06", title: "Stock", what: "Cold-chain (2–8°C) UK warehouse, FIFO rotation, sealed-pen integrity checks.", why: "Peptide stability preserved from arrival to ship." },
  { num: "07", title: "Verify", what: "Manual phone or WhatsApp call confirming research purpose before any dispatch.", why: "A friction step — but the right one for a research-only product." },
  { num: "08", title: "Ship", what: "Same-day if ordered by 2pm. Tracked next-day UK delivery. CoA paper-shipped with the order.", why: "Documentation arrives with the product, not after." },
];

function PipelineSection() {
  return (
    <section id="pipeline" className="py-16 lg:py-20 bg-editorial-text text-white">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3">The Quality Pipeline</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            8 stages every batch passes <span className="text-editorial-accent">before it reaches a bench</span>
          </h2>
          <p className="mt-3 text-white/70 max-w-2xl">
            Built for institutional buyers who need an answer to &ldquo;where did this come from and how do I know it&rsquo;s what it says?&rdquo;
          </p>
        </div>

        <ol className="space-y-4 list-none">
          {PIPELINE_STAGES.map((stage, i) => (
            <li key={stage.num} className="relative grid grid-cols-[auto_1fr] gap-4 sm:gap-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur p-5 sm:p-6">
              <div className="flex items-start">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-lg bg-editorial-accent text-white font-mono font-bold text-sm sm:text-base shadow-md">
                  {stage.num}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_1fr] gap-3 md:gap-6 items-start">
                <h3 className="font-serif text-xl font-bold text-white md:min-w-[120px]">{stage.title}</h3>
                <p className="text-sm text-white/85 leading-relaxed">
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-editorial-accent mb-1">What happens</span>
                  {stage.what}
                </p>
                <p className="text-sm text-white/70 leading-relaxed">
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-editorial-accent mb-1">Why it matters</span>
                  <span dangerouslySetInnerHTML={{ __html: stage.why }} />
                </p>
              </div>

              {i < PIPELINE_STAGES.length - 1 && (
                <div aria-hidden="true" className="absolute left-[37px] sm:left-[44px] -bottom-4 w-0.5 h-4 bg-editorial-accent/30" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ───────────────────────── Icons ─────────────────────────

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className} aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CrossIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className} aria-hidden="true">
      <path d="M6 6l12 12M6 18L18 6" />
    </svg>
  );
}

function JourneyIcon({ name }: { name: string }) {
  const props = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, "aria-hidden": true } as const;
  switch (name) {
    case "search": return <svg {...props}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>;
    case "cart": return <svg {...props}><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" /></svg>;
    case "form": return <svg {...props}><rect x="4" y="4" width="16" height="16" rx="2" /><line x1="9" y1="9" x2="15" y2="9" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="13" y2="17" /></svg>;
    case "phone": return <svg {...props}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z" /></svg>;
    case "truck": return <svg {...props}><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>;
    case "flask": return <svg {...props}><path d="M9 2v6.5L4 17a2 2 0 002 3h12a2 2 0 002-3l-5-8.5V2" /><line x1="9" y1="2" x2="15" y2="2" /></svg>;
    default: return null;
  }
}

// ───────────────────────── Page ─────────────────────────

export default function WhyPremioPage() {
  return (
    <>
      <Navigation variant="editorial" />

      {/* Hero + section nav */}
      <section className="pt-24 pb-10 lg:pt-32 lg:pb-14 bg-editorial-surface">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3">Why Premio Peptides</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15] max-w-3xl">
            Three ways to see what makes us different.
          </h1>
          <p className="mt-4 text-editorial-muted max-w-2xl">
            A side-by-side comparison, the customer journey, and the quality pipeline that runs behind every order.
            Each section is designed to be read on its own and shared.
          </p>

          <nav aria-label="Sections" className="mt-8 flex flex-wrap gap-3">
            <a href="#comparison" className="inline-flex items-center rounded-full border border-editorial-border bg-white px-4 py-2 text-sm font-medium text-editorial-text hover:border-editorial-accent/40 hover:text-editorial-accent transition-colors">
              Comparison
            </a>
            <a href="#journey" className="inline-flex items-center rounded-full border border-editorial-border bg-white px-4 py-2 text-sm font-medium text-editorial-text hover:border-editorial-accent/40 hover:text-editorial-accent transition-colors">
              Customer Journey
            </a>
            <a href="#pipeline" className="inline-flex items-center rounded-full border border-editorial-border bg-white px-4 py-2 text-sm font-medium text-editorial-text hover:border-editorial-accent/40 hover:text-editorial-accent transition-colors">
              Quality Pipeline
            </a>
          </nav>
        </div>
      </section>

      <ComparisonSection />
      <JourneySection />
      <PipelineSection />

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-editorial-text">Ready to order?</h2>
          <p className="mt-3 text-editorial-muted max-w-xl mx-auto">
            Browse the catalogue, add items to your basket, and we&rsquo;ll be in touch within 60 minutes to confirm your research details.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/compounds" className="inline-flex items-center justify-center rounded-lg bg-editorial-accent px-7 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors shadow-md">
              Browse the catalogue
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-lg border border-editorial-border bg-white px-7 py-3.5 text-sm font-medium text-editorial-text hover:bg-white/80 transition-colors">
              Contact our research team
            </Link>
          </div>

          {/* Share / screenshot hint */}
          <p className="mt-10 text-xs text-editorial-muted">
            Each section above is designed to stand alone — screenshot any panel for a deck, social post, or proposal.
          </p>
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
