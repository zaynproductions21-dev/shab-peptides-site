import type { Metadata } from "next";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Clinical — Research Peptides UK | Shab Peptides",
  description:
    "Premium research peptides from the UK. Retatrutide, GLP-1 agonists and metabolic compounds with 99.9% purity and same-day dispatch.",
};

const products = [
  { name: "Retatrutide", category: "Triple Agonist", purity: "99.9%", cas: "2381089-83-2", availability: "In Stock", mol: "4813.45", thumb: "https://images.pexels.com/photos/9259962/pexels-photo-9259962.jpeg?auto=compress&cs=tinysrgb&w=800", thumbAlt: "Peptide vials in a laboratory rack" },
  { name: "Semaglutide", category: "GLP-1 Agonist", purity: "99.8%", cas: "910463-68-2", availability: "In Stock", mol: "4113.58", thumb: "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&w=800", thumbAlt: "Close-up of laboratory research vials" },
  { name: "Tirzepatide", category: "Dual Agonist", purity: "99.9%", cas: "2023788-19-2", availability: "In Stock", mol: "4813.45", thumb: "https://images.pexels.com/photos/32532049/pexels-photo-32532049.jpeg?auto=compress&cs=tinysrgb&w=800", thumbAlt: "Medical injection pen for peptide research" },
  { name: "BPC-157", category: "Metabolic Compound", purity: "99.7%", cas: "137525-51-0", availability: "In Stock", mol: "1419.54", thumb: "https://images.pexels.com/photos/7581586/pexels-photo-7581586.jpeg?auto=compress&cs=tinysrgb&w=800", thumbAlt: "Medical syringe and pharmaceutical supplies" },
  { name: "Survodutide", category: "Dual Agonist", purity: "99.8%", cas: "2375568-58-4", availability: "Made to Order", mol: "3949.42", thumb: "https://images.pexels.com/photos/8851791/pexels-photo-8851791.jpeg?auto=compress&cs=tinysrgb&w=800", thumbAlt: "Pharmaceutical compound in laboratory" },
  { name: "Custom Synthesis", category: "Bespoke", purity: "To Spec", cas: "—", availability: "Enquire", mol: "—", thumb: null, thumbAlt: null },
];

const qualityStages = [
  { step: "01", title: "Synthesis", description: "Solid-phase peptide synthesis under controlled conditions" },
  { step: "02", title: "Purification", description: "Preparative HPLC purification to specification" },
  { step: "03", title: "Analysis", description: "HPLC and mass spectrometry identity confirmation" },
  { step: "04", title: "Certification", description: "Certificate of analysis with full chromatographic data" },
  { step: "05", title: "Packaging", description: "Lyophilisation and inert gas packaging for stability" },
  { step: "06", title: "Dispatch", description: "Temperature-controlled same-day shipping" },
];

export default function V3Page() {
  return (
    <div className="bg-white min-h-screen">
      <Navigation variant="minimal" />

      {/* Hero — Centered Text, No Image */}
      <section className="pt-32 pb-20 lg:pt-44 lg:pb-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-6">
            Research Peptides — United Kingdom
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-charcoal leading-[1.05]">
            The UK&rsquo;s Most Reliable Source for Research Peptides
          </h1>
          <p className="mt-8 text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Premium retatrutide, GLP-1 agonists and metabolic research compounds
            with guaranteed purity and same-day dispatch.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center rounded-lg bg-primary px-6 py-3.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
            >
              Request Research Quote
            </a>
            <a
              href="#quality"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors"
            >
              Download Quality Certificates
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="ml-1.5" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Trust Line */}
      <div className="border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center gap-8 text-xs text-gray-400 uppercase tracking-widest">
            <span>UK-Based</span>
            <span className="text-gray-200">|</span>
            <span>Same-Day Dispatch</span>
            <span className="text-gray-200">|</span>
            <span>99.9% Purity Guaranteed</span>
          </div>
        </div>
      </div>

      {/* Differentiators — Minimal */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              { title: "Specialised Expertise", description: "Decades of combined experience in peptide chemistry, ensuring compounds meet the exacting standards your research demands." },
              { title: "Same-Day Dispatch", description: "Orders placed before 14:00 GMT dispatched same working day. Temperature-controlled packaging ensures compound integrity." },
              { title: "Guaranteed Purity", description: "Rigorous HPLC and mass spectrometry analysis on every batch. Minimum 99.9% purity with full certificates of analysis." },
              { title: "UK-Based Reliability", description: "Full regulatory compliance, shorter delivery times, reduced import complexity, and dedicated UK-based support." },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-base font-semibold text-charcoal">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-Width Lab Image Strip */}
      <div className="relative h-64 md:h-80 lg:h-96 w-full">
        <Image
          src="https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Laboratory equipment and instruments used in peptide research"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      </div>

      {/* Compounds — Scientific Table */}
      <section id="compounds" className="py-20 lg:py-28 border-t border-gray-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-charcoal">
            Research Compound Catalogue
          </h2>
          <p className="mt-3 text-sm text-gray-500 max-w-xl">
            All compounds supplied with certificates of analysis. Custom synthesis available upon request.
          </p>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 pr-4 text-xs font-medium text-gray-400 uppercase tracking-wider w-10"></th>
                  <th className="text-left py-3 pr-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Compound</th>
                  <th className="text-left py-3 pr-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Classification</th>
                  <th className="text-left py-3 pr-4 text-xs font-medium text-gray-400 uppercase tracking-wider font-mono">CAS No.</th>
                  <th className="text-right py-3 pr-4 text-xs font-medium text-gray-400 uppercase tracking-wider font-mono">MW (g/mol)</th>
                  <th className="text-right py-3 pr-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Purity</th>
                  <th className="text-right py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.name} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 pr-3">
                      {product.thumb ? (
                        <div className="relative h-8 w-8 rounded overflow-hidden shrink-0">
                          <Image
                            src={product.thumb}
                            alt={product.thumbAlt || product.name}
                            fill
                            className="object-cover"
                            sizes="32px"
                          />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded bg-gray-100" />
                      )}
                    </td>
                    <td className="py-4 pr-4 font-medium text-charcoal">{product.name}</td>
                    <td className="py-4 pr-4 text-gray-500">{product.category}</td>
                    <td className="py-4 pr-4 font-mono text-gray-400 text-xs">{product.cas}</td>
                    <td className="py-4 pr-4 text-right font-mono text-gray-400 text-xs">{product.mol}</td>
                    <td className="py-4 pr-4 text-right">
                      <span className="font-mono text-primary">{product.purity}</span>
                    </td>
                    <td className="py-4 text-right">
                      <span className={`text-xs ${
                        product.availability === "In Stock" ? "text-lab-green" :
                        product.availability === "Made to Order" ? "text-gold" :
                        "text-gray-400"
                      }`}>
                        {product.availability}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Quality — Horizontal Timeline */}
      <section id="quality" className="py-20 lg:py-28 border-t border-gray-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-charcoal">
            Quality Control Process
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            Every compound follows our six-stage quality assurance protocol before dispatch.
          </p>

          {/* Timeline */}
          <div className="mt-12 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-5 left-0 right-0 h-px bg-gray-200" />

            <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-4">
              {qualityStages.map((stage) => (
                <div key={stage.step} className="relative">
                  <div className="flex md:flex-col items-start md:items-center gap-3 md:gap-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-white text-xs font-bold text-primary font-mono relative z-10">
                      {stage.step}
                    </div>
                    <div className="md:mt-4 md:text-center">
                      <h3 className="text-sm font-semibold text-charcoal">{stage.title}</h3>
                      <p className="mt-1 text-xs text-gray-400 leading-relaxed">{stage.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="py-10 border-y border-gray-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {[
              "University Research Labs",
              "Pharmaceutical R&D",
              "Biotechnology Firms",
              "Clinical Research Organisations",
              "Government Laboratories",
            ].map((name) => (
              <span key={name} className="text-xs font-medium text-gray-300 uppercase tracking-wider">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points — Minimal */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-charcoal">
            Common Challenges We Solve
          </h2>
          <div className="mt-10 space-y-6">
            {[
              { problem: "Inconsistent purity between batches", solution: "Rigorous batch-to-batch consistency testing with full analytical data provided for every order." },
              { problem: "Lengthy international shipping delays", solution: "UK-based fulfilment with same-day dispatch and next-day delivery, eliminating customs delays." },
              { problem: "Inadequate technical documentation", solution: "Comprehensive certificates of analysis, handling guides, and direct access to research scientists." },
            ].map((item) => (
              <div key={item.problem} className="flex flex-col sm:flex-row gap-4 sm:gap-8 py-4 border-b border-gray-100">
                <p className="text-sm text-gray-400 sm:w-64 shrink-0">{item.problem}</p>
                <p className="text-sm text-charcoal leading-relaxed">{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services — Clean List */}
      <section id="services" className="py-20 lg:py-28 border-t border-gray-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-charcoal">
            Services
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {[
              { title: "High-Purity Peptide Supply", description: "Research-grade peptides with minimum 99% purity guaranteed across our catalogue." },
              { title: "Custom Synthesis", description: "Bespoke peptide synthesis from novel sequences to modified analogues, tailored to your specifications." },
              { title: "Quality Certification", description: "HPLC chromatograms, mass spectrometry data, and amino acid analysis for every batch." },
              { title: "Express Delivery", description: "Temperature-controlled same-day dispatch before 14:00 GMT with next-day UK delivery." },
              { title: "Technical Consultation", description: "Direct scientist access for compound selection, solubility, storage, and experimental design." },
              { title: "Bulk Research Programmes", description: "Preferential pricing and dedicated management for ongoing institutional supply agreements." },
            ].map((service) => (
              <div key={service.title} className="border-l-2 border-gray-100 pl-4 hover:border-primary transition-colors">
                <h3 className="text-sm font-semibold text-charcoal">{service.title}</h3>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-20 lg:py-28 border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-charcoal">
            The Shab Peptides Advantage
          </h2>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { stat: "0 Days", label: "Import Delays" },
              { stat: "100%", label: "Batch Testing" },
              { stat: "<24h", label: "UK Delivery" },
              { stat: "Dedicated", label: "Account Manager" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-2xl font-bold text-primary font-mono">{item.stat}</p>
                <p className="mt-1 text-xs text-gray-400 uppercase tracking-wider">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 lg:py-28 border-t border-gray-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-charcoal">
              Request a Research Quote
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              Submit your requirements. Response within one working day.
            </p>
          </div>
          <QuoteForm variant="minimal" />
        </div>
      </section>

      <Footer variant="minimal" />
    </div>
  );
}
