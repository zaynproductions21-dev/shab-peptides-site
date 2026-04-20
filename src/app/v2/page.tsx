import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Dark Lab — Research Peptides UK | Shab Peptides",
  description:
    "Premium research peptides from the UK. Retatrutide, GLP-1 agonists and metabolic compounds with 99.9% purity and same-day dispatch.",
};

const products = [
  {
    name: "Retatrutide",
    category: "Triple Agonist",
    purity: 99.9,
    availability: "In Stock",
    description: "Novel triple incretin receptor agonist targeting GIP, GLP-1, and glucagon receptors.",
    cas: "2381089-83-2",
    large: true,
  },
  {
    name: "Semaglutide",
    category: "GLP-1 Agonist",
    purity: 99.8,
    availability: "In Stock",
    description: "Selective GLP-1 receptor agonist for metabolic research applications.",
    cas: "910463-68-2",
    large: true,
  },
  {
    name: "Tirzepatide",
    category: "Dual Agonist",
    purity: 99.9,
    availability: "In Stock",
    description: "Dual GIP and GLP-1 receptor agonist for advanced metabolic pathway research.",
    cas: "2023788-19-2",
    large: false,
  },
  {
    name: "BPC-157",
    category: "Metabolic Compound",
    purity: 99.7,
    availability: "In Stock",
    description: "Pentadecapeptide for tissue repair and regeneration research.",
    cas: "137525-51-0",
    large: false,
  },
  {
    name: "Survodutide",
    category: "Dual Agonist",
    purity: 99.8,
    availability: "Made to Order",
    description: "Glucagon and GLP-1 dual receptor agonist for metabolic disease research.",
    cas: "2375568-58-4",
    large: false,
  },
  {
    name: "Custom Synthesis",
    category: "Bespoke",
    purity: 100,
    availability: "Enquire",
    description: "Tailored peptide synthesis to your exact specifications.",
    cas: "—",
    large: false,
  },
];

const services = [
  {
    title: "High-Purity Supply",
    description: "Research-grade peptides with minimum 99% purity guaranteed across our catalogue.",
    span: "col-span-1",
  },
  {
    title: "Custom Synthesis",
    description: "Bespoke peptide synthesis from novel sequences to modified analogues.",
    span: "col-span-1",
  },
  {
    title: "Quality Certification",
    description: "HPLC chromatograms, mass spectrometry data, and amino acid analysis for every batch.",
    span: "col-span-1 md:col-span-2",
  },
  {
    title: "Express Delivery",
    description: "Same-day dispatch before 14:00 GMT with next-day UK delivery.",
    span: "col-span-1",
  },
  {
    title: "Technical Consultation",
    description: "Direct access to research scientists for compound selection and experimental design guidance.",
    span: "col-span-1",
  },
  {
    title: "Bulk Programmes",
    description: "Preferential pricing and dedicated management for institutional supply agreements.",
    span: "col-span-1 md:col-span-2",
  },
];

export default function V2Page() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <Navigation variant="dark" />

      {/* Hero — Full Bleed Dark */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* Scientific Grid Background */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary-light">
              UK-Based
            </span>
            <span className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary-light">
              Same-Day Dispatch
            </span>
            <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold-light">
              99.9% Purity
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            The UK&rsquo;s Most Reliable<br />
            Source for{" "}
            <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
              Research Peptides
            </span>
          </h1>

          <p className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Premium retatrutide, GLP-1 agonists and metabolic research compounds
            with guaranteed purity and same-day dispatch.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center rounded-lg bg-primary px-6 py-3.5 text-sm font-medium text-white hover:bg-primary-light transition-colors shadow-lg shadow-primary/25"
            >
              Request Research Quote
            </a>
            <a
              href="#quality"
              className="inline-flex items-center rounded-lg border border-zinc-700 px-6 py-3.5 text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:border-zinc-600 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mr-2" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download Quality Certificates
            </a>
          </div>

          {/* Glowing stats bar */}
          <div className="mt-16 grid grid-cols-3 max-w-lg mx-auto gap-8">
            {[
              { value: "99.9%", label: "Purity" },
              { value: "<24h", label: "Delivery" },
              { value: "100%", label: "Tested" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold font-mono text-primary-light">{stat.value}</p>
                <p className="mt-1 text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-16 lg:py-24 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Specialised Expertise", description: "Decades of combined experience in peptide chemistry and research compound development.", accent: "primary" },
              { title: "Same-Day Dispatch", description: "Orders before 14:00 GMT dispatched same day in temperature-controlled packaging.", accent: "secondary" },
              { title: "Guaranteed Purity", description: "HPLC and mass spectrometry analysis on every batch. Minimum 99.9% purity.", accent: "lab-green" },
              { title: "UK-Based Reliability", description: "Full regulatory compliance, shorter delivery times, dedicated UK support.", accent: "gold" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 transition-colors"
              >
                <div className={`h-1 w-8 rounded-full mb-4 ${
                  item.accent === "primary" ? "bg-primary" :
                  item.accent === "secondary" ? "bg-secondary" :
                  item.accent === "lab-green" ? "bg-lab-green" :
                  "bg-gold"
                }`} />
                <h3 className="text-base font-semibold text-zinc-100">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Compounds — Bento Grid */}
      <section id="compounds" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white text-center">
            Research Compounds
          </h2>
          <p className="mt-4 text-zinc-500 text-center max-w-xl mx-auto">
            High-purity peptides with comprehensive certificates of analysis and full technical documentation.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product.name}
                className={`rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-primary/30 transition-colors ${
                  product.large ? "lg:col-span-2 lg:row-span-1" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-mono text-primary-light uppercase tracking-wider">
                    {product.category}
                  </span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    product.availability === "In Stock"
                      ? "bg-lab-green/10 text-lab-green-light border border-lab-green/20"
                      : product.availability === "Made to Order"
                        ? "bg-gold/10 text-gold-light border border-gold/20"
                        : "bg-primary/10 text-primary-light border border-primary/20"
                  }`}>
                    {product.availability}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{product.name}</h3>
                <p className="mt-2 text-sm text-zinc-500 leading-relaxed">{product.description}</p>

                {/* Purity Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-zinc-500">Purity</span>
                    <span className="font-mono text-primary-light">{product.purity === 100 ? "Spec" : `${product.purity}%`}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                      style={{ width: `${product.purity}%` }}
                    />
                  </div>
                </div>

                <p className="mt-3 text-xs font-mono text-zinc-600">CAS: {product.cas}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance — Dark with Progress Bars */}
      <section id="quality" className="py-16 lg:py-24 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Quality Assurance Protocol
              </h2>
              <p className="mt-4 text-zinc-400 leading-relaxed">
                Every compound undergoes our rigorous multi-stage quality control process
                before release. Industry-leading instrumentation verifies identity, purity,
                and stability.
              </p>

              <div className="mt-8 space-y-6">
                {[
                  { name: "HPLC Purity Analysis", level: 99.9, colour: "from-primary to-primary-light" },
                  { name: "Mass Spectrometry Verification", level: 100, colour: "from-secondary to-secondary-light" },
                  { name: "Amino Acid Composition", level: 99.5, colour: "from-lab-green to-lab-green-light" },
                  { name: "Endotoxin Screening", level: 100, colour: "from-gold to-gold-light" },
                ].map((test) => (
                  <div key={test.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-zinc-300">{test.name}</span>
                      <span className="text-sm font-mono text-zinc-400">{test.level}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${test.colour} transition-all duration-1000`}
                        style={{ width: `${test.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
              <div className="grid grid-cols-2 gap-8">
                {[
                  { value: "99.9%", label: "Minimum Purity", glow: "text-primary-light" },
                  { value: "100%", label: "Batch Tested", glow: "text-secondary-light" },
                  { value: "<0.1%", label: "Impurity Threshold", glow: "text-lab-green-light" },
                  { value: "24h", label: "Certificate Turnaround", glow: "text-gold-light" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className={`text-3xl font-bold font-mono ${stat.glow}`}>{stat.value}</p>
                    <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Logos Strip */}
      <section className="py-10 border-y border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium text-zinc-600 uppercase tracking-widest mb-6">
            Trusted by Leading Research Institutions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {[
              "University Research Labs",
              "Pharmaceutical R&D",
              "Biotechnology Firms",
              "Clinical Research Organisations",
              "Government Laboratories",
            ].map((name) => (
              <span key={name} className="text-sm font-medium text-zinc-700">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white text-center">
            Solving Research Challenges
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { problem: "Inconsistent purity between batches", solution: "Rigorous batch-to-batch consistency testing with full analytical data for every order." },
              { problem: "Lengthy international shipping delays", solution: "UK-based fulfilment with same-day dispatch, eliminating customs delays entirely." },
              { problem: "Inadequate technical documentation", solution: "Comprehensive certificates of analysis, handling guides, and direct scientist access." },
            ].map((item) => (
              <div key={item.problem} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                <p className="text-sm font-medium text-red-400/80 line-through decoration-red-400/30 mb-3">{item.problem}</p>
                <p className="text-sm text-zinc-300 leading-relaxed">{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services — Bento Layout */}
      <section id="services" className="py-16 lg:py-24 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white text-center mb-12">
            Research Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div
                key={service.title}
                className={`rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 hover:border-primary/20 transition-colors ${service.span}`}
              >
                <h3 className="text-base font-semibold text-zinc-100">{service.title}</h3>
                <p className="mt-2 text-sm text-zinc-500 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 lg:p-12">
            <h2 className="text-3xl font-bold tracking-tight text-white text-center">
              The Shab Peptides Advantage
            </h2>
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { stat: "0", suffix: " Days", label: "Import Delays" },
                { stat: "100", suffix: "%", label: "Batch Testing" },
                { stat: "<24", suffix: "h", label: "Delivery Time" },
                { stat: "1", suffix: "", label: "Point of Contact" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="text-4xl font-bold font-mono text-primary-light">
                    {item.stat}<span className="text-2xl">{item.suffix}</span>
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 lg:py-24 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Request a Research Quote
              </h2>
              <p className="mt-4 text-zinc-400 leading-relaxed">
                Submit your requirements and receive a detailed quotation within
                one working day.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { label: "info@shabpeptides.co.uk", detail: "Email" },
                  { label: "Response within 1 working day", detail: "Turnaround" },
                  { label: "United Kingdom", detail: "Location" },
                ].map((item) => (
                  <div key={item.detail} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
                      <span className="text-xs font-mono text-primary-light">{item.detail.slice(0, 2)}</span>
                    </div>
                    <span className="text-sm text-zinc-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <QuoteForm variant="dark" />
            </div>
          </div>
        </div>
      </section>

      <Footer variant="dark" />
    </div>
  );
}
