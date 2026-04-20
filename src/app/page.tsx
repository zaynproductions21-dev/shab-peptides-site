import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";

const differentiators = [
  {
    title: "Specialised Expertise",
    description:
      "Our team of research scientists brings decades of combined experience in peptide chemistry, ensuring every compound meets the exacting standards your research demands.",
  },
  {
    title: "Same-Day Dispatch",
    description:
      "Orders placed before 14:00 GMT are dispatched the same working day. Temperature-controlled packaging ensures compound integrity throughout transit.",
  },
  {
    title: "Guaranteed Purity",
    description:
      "Every batch undergoes rigorous HPLC and mass spectrometry analysis. We guarantee a minimum 99.9% purity with full certificates of analysis provided.",
  },
  {
    title: "UK-Based Reliability",
    description:
      "Headquartered in the United Kingdom with full regulatory compliance. Shorter delivery times, reduced import complexity, and dedicated UK-based support.",
  },
];

const products = [
  {
    name: "Retatrutide",
    category: "Triple Agonist",
    purity: "99.9%",
    availability: "In Stock",
    description:
      "A novel triple incretin receptor agonist targeting GIP, GLP-1, and glucagon receptors. Available in 5mg and 10mg research-grade vials.",
    cas: "2381089-83-2",
    image: "https://images.pexels.com/photos/9259962/pexels-photo-9259962.jpeg?auto=compress&cs=tinysrgb&w=800",
    imageAlt: "Research peptide vials arranged in a laboratory rack",
  },
  {
    name: "Semaglutide",
    category: "GLP-1 Agonist",
    purity: "99.8%",
    availability: "In Stock",
    description:
      "Selective GLP-1 receptor agonist for metabolic research applications. Supplied lyophilised with full analytical documentation.",
    cas: "910463-68-2",
    image: "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&w=800",
    imageAlt: "Close-up of laboratory vials containing research compounds",
  },
  {
    name: "Tirzepatide",
    category: "Dual Agonist",
    purity: "99.9%",
    availability: "In Stock",
    description:
      "Dual GIP and GLP-1 receptor agonist for advanced metabolic pathway research. High-purity lyophilised powder.",
    cas: "2023788-19-2",
    image: null,
    imageAlt: null,
  },
  {
    name: "BPC-157",
    category: "Metabolic Compound",
    purity: "99.7%",
    availability: "In Stock",
    description:
      "Pentadecapeptide for tissue repair and regeneration research. Available in multiple quantities for laboratory use.",
    cas: "137525-51-0",
    image: null,
    imageAlt: null,
  },
  {
    name: "Survodutide",
    category: "Dual Agonist",
    purity: "99.8%",
    availability: "Made to Order",
    description:
      "Glucagon and GLP-1 dual receptor agonist for metabolic disease research. Synthesised to order with guaranteed specifications.",
    cas: "2375568-58-4",
    image: null,
    imageAlt: null,
  },
  {
    name: "Custom Synthesis",
    category: "Bespoke",
    purity: "To Specification",
    availability: "Enquire",
    description:
      "Tailored peptide synthesis to your exact specifications. Discuss your requirements with our research team for a custom quotation.",
    cas: "—",
    image: null,
    imageAlt: null,
  },
];

const services = [
  {
    step: "01",
    title: "High-Purity Peptide Supply",
    description:
      "Research-grade peptides synthesised to the highest standards, with minimum 99% purity guaranteed across our entire catalogue.",
  },
  {
    step: "02",
    title: "Custom Synthesis",
    description:
      "Bespoke peptide synthesis tailored to your precise research requirements, from novel sequences to modified analogues.",
  },
  {
    step: "03",
    title: "Quality Certification",
    description:
      "Comprehensive certificates of analysis including HPLC chromatograms, mass spectrometry data, and amino acid analysis.",
  },
  {
    step: "04",
    title: "Express Delivery",
    description:
      "Temperature-controlled same-day dispatch for orders placed before 14:00 GMT, with next-day delivery across the United Kingdom.",
  },
  {
    step: "05",
    title: "Technical Consultation",
    description:
      "Direct access to our research scientists for guidance on compound selection, solubility, storage, and experimental design.",
  },
  {
    step: "06",
    title: "Bulk Research Programmes",
    description:
      "Preferential pricing and dedicated account management for ongoing research programmes and institutional supply agreements.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navigation variant="light" />

      {/* Hero Section — Editorial Split */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  UK-Based
                </span>
                <span className="inline-flex items-center rounded-full bg-lab-green/10 px-3 py-1 text-xs font-medium text-lab-green">
                  Same-Day Dispatch
                </span>
                <span className="inline-flex items-center rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                  99.9% Purity
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal leading-[1.1]">
                The UK&rsquo;s Most Reliable Source for{" "}
                <span className="text-primary">Research Peptides</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                Premium retatrutide, GLP-1 agonists and metabolic research compounds
                with guaranteed purity and same-day dispatch.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
                >
                  Request Research Quote
                </a>
                <a
                  href="#quality"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3.5 text-sm font-medium text-charcoal hover:bg-gray-50 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mr-2" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Download Quality Certificates
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl border border-gray-200 overflow-hidden relative">
                <Image
                  src="https://images.pexels.com/photos/9259964/pexels-photo-9259964.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Research peptide vials in a laboratory setting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-white shadow-lg border border-gray-100 p-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Purity Rating</p>
                <p className="text-2xl font-bold text-primary font-mono">99.9%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              UK-Based
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Same-Day Dispatch
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-lab-green">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              99.9% Purity Guaranteed
            </span>
          </div>
        </div>
      </section>

      {/* UVP — 4 Differentiators */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-charcoal">
              Why Researchers Choose Shab Peptides
            </h2>
            <p className="mt-4 text-gray-600">
              Four pillars that distinguish us as the UK&rsquo;s preferred peptide supplier
              for academic and pharmaceutical research.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="relative rounded-xl border border-gray-200 bg-white p-6 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-semibold text-charcoal">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Compounds */}
      <section id="compounds" className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-charcoal">
              Featured Research Compounds
            </h2>
            <p className="mt-4 text-gray-600">
              Our catalogue of high-purity peptides, each accompanied by comprehensive
              certificates of analysis and technical documentation.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.name}
                className="rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow"
              >
                {product.image && (
                  <div className="relative h-40 w-full">
                    <Image
                      src={product.image}
                      alt={product.imageAlt || product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="mt-1 text-lg font-semibold text-charcoal">
                        {product.name}
                      </h3>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        product.availability === "In Stock"
                          ? "bg-lab-green/10 text-lab-green"
                          : product.availability === "Made to Order"
                            ? "bg-gold/10 text-gold"
                            : "bg-primary/10 text-primary"
                      }`}
                    >
                      {product.availability}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="inline-flex items-center rounded bg-gold/10 px-1.5 py-0.5 font-medium text-gold">
                        {product.purity}
                      </span>
                      <span className="text-gray-500">Purity</span>
                    </span>
                    <span className="text-gray-400">|</span>
                    <span className="font-mono text-gray-500">
                      CAS: {product.cas}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section id="quality" className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-charcoal">
                Uncompromising Quality Assurance
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Every peptide we supply undergoes a rigorous multi-stage quality control
                process. Our analytical laboratory employs industry-leading instrumentation
                to verify identity, purity, and stability before release.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  {
                    title: "HPLC Analysis",
                    description: "High-performance liquid chromatography confirms purity exceeding 99% for all standard compounds.",
                  },
                  {
                    title: "Mass Spectrometry",
                    description: "ESI-MS verification of molecular weight and structural identity for every batch produced.",
                  },
                  {
                    title: "Amino Acid Analysis",
                    description: "Quantitative amino acid composition analysis ensures correct sequence and stoichiometry.",
                  },
                  {
                    title: "Endotoxin Testing",
                    description: "LAL testing confirms endotoxin levels below detectable limits for sensitive research applications.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lab-green/10">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-lab-green">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-charcoal">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/8532848/pexels-photo-8532848.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Scientist conducting laboratory research and quality analysis"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-gray-200 p-8">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "99.9%", label: "Minimum Purity" },
                    { value: "100%", label: "Batch Tested" },
                    { value: "<0.1%", label: "Impurity Threshold" },
                    { value: "24h", label: "Certificate Turnaround" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-3xl font-bold text-primary font-mono">{stat.value}</p>
                      <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Research Institutions */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
            Trusted by Leading Research Institutions
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {[
              "University Research Labs",
              "Pharmaceutical R&D",
              "Biotechnology Firms",
              "Clinical Research Organisations",
              "Government Laboratories",
            ].map((name) => (
              <span
                key={name}
                className="text-sm font-medium text-gray-400"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Point Solutions */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-charcoal">
              Solutions for Common Research Challenges
            </h2>
            <p className="mt-4 text-gray-600">
              We understand the frustrations researchers face when sourcing peptides.
              Our service is designed to eliminate these obstacles.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                problem: "Inconsistent purity between batches",
                solution:
                  "Rigorous batch-to-batch consistency testing with full analytical data provided for every order.",
              },
              {
                problem: "Lengthy international shipping delays",
                solution:
                  "UK-based fulfilment with same-day dispatch and next-day delivery, eliminating customs delays entirely.",
              },
              {
                problem: "Inadequate technical documentation",
                solution:
                  "Comprehensive certificates of analysis, handling guides, and direct access to our research scientists.",
              },
            ].map((item) => (
              <div
                key={item.problem}
                className="rounded-xl border border-gray-200 p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-400" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <p className="text-sm font-medium text-gray-500">
                    {item.problem}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-lab-green" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services — Numbered Steps */}
      <section id="services" className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-charcoal">
              Our Research Services
            </h2>
            <p className="mt-4 text-gray-600">
              A comprehensive suite of services designed to support every stage of your
              peptide research programme.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.step} className="flex gap-4">
                <span className="text-3xl font-bold text-primary/20 font-mono leading-none">
                  {service.step}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-charcoal">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-primary/5 border border-primary/10 p-8 lg:p-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-charcoal">
                The Shab Peptides Advantage
              </h2>
              <p className="mt-4 text-gray-600">
                What sets us apart from international peptide suppliers.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { stat: "0", suffix: " Days", label: "Import Delays", detail: "UK-based means no customs hold-ups" },
                { stat: "100", suffix: "%", label: "Batch Testing", detail: "Every single batch fully analysed" },
                { stat: "<24", suffix: "h", label: "Delivery Time", detail: "Next-day UK delivery as standard" },
                { stat: "1", suffix: "", label: "Point of Contact", detail: "Dedicated account manager for your institution" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="text-4xl font-bold text-primary font-mono">
                    {item.stat}<span className="text-2xl">{item.suffix}</span>
                  </p>
                  <p className="mt-1 text-sm font-semibold text-charcoal">{item.label}</p>
                  <p className="mt-1 text-xs text-gray-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Quote Form */}
      <section id="contact" className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-charcoal">
                Request a Research Quote
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Submit your requirements and our research team will prepare a
                detailed quotation within one working day. For urgent enquiries,
                contact us directly.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">info@shabpeptides.co.uk</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">Response within 1 working day</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary" stroke="currentColor" strokeWidth="2">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">United Kingdom</span>
                </div>
              </div>
            </div>
            <div>
              <QuoteForm variant="light" />
            </div>
          </div>
        </div>
      </section>

      <Footer variant="light" />
    </>
  );
}
