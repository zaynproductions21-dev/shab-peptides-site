import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getFAQs, type FAQItem } from "@/data/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Research Peptides UK | Premio Peptides",
  description:
    "Answers to common questions about buying research peptides in the UK. Purity, certificates of analysis, legality, dispatch, pricing, and more from Premio Peptides.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently Asked Questions | Research Peptides UK | Premio Peptides",
    description: "Common questions about UK research peptides — purity, legality, COAs, delivery, pricing.",
    url: "/faq",
    type: "website",
  },
};

const hubFaqs: FAQItem[] = [
  { question: "Who is the best peptide supplier in the UK?", answer: "The best UK peptide supplier should offer high-purity research compounds with comprehensive third-party testing, reliable delivery, and excellent customer service. Key factors include certificates of analysis for each batch, proper storage conditions, and transparent business practices. Premio Peptides stands out as a leading supplier, providing extensively tested research peptides with same-day UK dispatch when ordered by 2pm. We specialise in neuropeptides, growth hormone research compounds, and longevity peptides, all backed by rigorous purity documentation. Our commitment to quality and researcher support has established us amongst the top suppliers in the UK market. Contact us to discuss your specific research requirements.", keyword: "best peptide supplier uk", internalLink: "/compounds" },
  { question: "Where can I buy peptides in the UK?", answer: "You can purchase research peptides in the UK from specialised biotechnology suppliers who provide compounds exclusively for laboratory research purposes. Reputable suppliers offer third-party tested peptides with certificates of analysis, ensuring purity and quality for scientific studies. Premio Peptides is a trusted UK-based supplier offering an extensive range of research peptides including BPC-157, TB-500, Semax, and growth hormone compounds. We provide same-day dispatch across the UK with orders placed before 2pm, plus comprehensive documentation for each batch. All peptides are strictly for research use only and require appropriate laboratory facilities. Browse our catalogue to find the specific compounds needed for your research.", keyword: "buy peptides uk", internalLink: "/compounds" },
  { question: "What is Semax?", answer: "Semax is a synthetic neuropeptide originally developed in Russia, derived from adrenocorticotropic hormone (ACTH). This seven-amino acid peptide is extensively studied for its potential nootropic and neuroprotective properties in laboratory settings. Research indicates Semax may influence cognitive function, neuroplasticity, and stress response mechanisms, making it valuable for neuroscience research. The compound is particularly interesting to researchers studying memory formation, learning processes, and brain injury recovery models. Semax is available in various forms for research purposes, including nasal spray formulations for specific study protocols. As a research chemical, it requires proper laboratory handling and is exclusively intended for scientific investigation. Premio Peptides supplies high-purity Semax with full documentation for UK researchers.", keyword: "semax", internalLink: "/compounds/semax" },
  { question: "Where can I buy Semax in the UK?", answer: "Semax can be purchased in the UK from authorised research chemical suppliers who specialise in neuropeptides for laboratory use. As a research-only compound, it's essential to source from reputable suppliers providing certificates of analysis and proper documentation. Premio Peptides offers high-quality Semax for UK researchers, including both standard and nasal spray formulations. We provide comprehensive third-party testing results and maintain strict quality control standards. Our Semax is stored under optimal conditions and dispatched with temperature-controlled packaging to preserve peptide integrity. Same-day UK delivery is available for orders placed before 2pm. Remember, Semax is strictly for research purposes and requires appropriate laboratory facilities and protocols for handling.", keyword: "buy semax uk", internalLink: "/compounds/semax" },
  { question: "What are the top selling peptide drugs for research?", answer: "The most popular research peptides currently include BPC-157 for tissue repair studies, TB-500 for wound healing research, and GHK-Cu for anti-aging investigations. Growth hormone research compounds like CJC-1295 and Ipamorelin are highly sought after for metabolic studies. Neuropeptides such as Semax and Selank lead cognitive research applications, whilst Melanotan compounds remain popular for pigmentation studies. Thymosin Alpha-1 is frequently used in immune system research, and longevity peptides like Epithalon attract significant scientific interest. The demand varies based on current research trends and emerging therapeutic targets. Premio Peptides stocks all these leading research compounds with full certificates of analysis and same-day UK dispatch. Our extensive catalogue serves diverse research needs across biotechnology and pharmaceutical development.", keyword: "top selling peptides", internalLink: "/compounds" },
  { question: "Are research peptides safe?", answer: "Research peptides are designed exclusively for laboratory use and require proper handling protocols within appropriate scientific facilities. Safety depends entirely on correct storage, handling procedures, and adherence to research guidelines. These compounds undergo rigorous purity testing but are not intended for human consumption or therapeutic use outside controlled research environments. Proper personal protective equipment, sterile techniques, and waste disposal procedures are essential. Researchers should have appropriate training and follow institutional safety protocols. Premio Peptides provides comprehensive safety data sheets and handling guidelines with all products, plus certificates of analysis confirming purity levels. We emphasise that our peptides are strictly for qualified researchers conducting legitimate scientific studies. Always consult your institution's safety officer before beginning peptide research.", keyword: "research peptides safe", internalLink: "/guidelines" },
  { question: "What are research peptides?", answer: "Research peptides are short chains of amino acids used exclusively for scientific investigation and laboratory studies. These synthetic or naturally-derived compounds serve as valuable tools for understanding biological processes, protein interactions, and potential therapeutic mechanisms. Research peptides enable scientists to study cellular signalling, receptor binding, and physiological responses in controlled laboratory environments. They're crucial for drug development, biotechnology research, and advancing medical knowledge. Common applications include neuroscience studies, tissue repair research, metabolic investigations, and anti-aging compound development. Premio Peptides supplies a comprehensive range of research peptides with third-party purity testing and detailed documentation. Each compound comes with certificates of analysis ensuring quality standards for scientific use. Our peptides support diverse research fields from cognitive studies to longevity research.", keyword: "research peptides", internalLink: "/compounds" },
  { question: "How much do research peptides cost in the UK?", answer: "Research peptide prices in the UK vary significantly based on compound complexity, purity levels, and quantity ordered. Basic peptides typically range from £30-80 for standard research quantities, whilst complex neuropeptides or growth factors may cost £80-200 or more. Factors affecting pricing include synthesis difficulty, raw material costs, and testing requirements. Bulk orders and institutional accounts often receive preferential pricing structures. Premio Peptides offers competitive UK pricing with transparent costs and no hidden fees. We provide detailed quotes for larger research projects and offer institutional accounts with purchase order facilities. Our pricing reflects the high purity standards and comprehensive testing each batch receives. Contact us for specific pricing on your required compounds and quantities.", keyword: "research peptides cost uk", internalLink: "/institutional" },
  { question: "Do I need a licence to buy research peptides in the UK?", answer: "Generally, no specific licence is required to purchase research peptides in the UK for legitimate scientific research purposes. However, buyers must demonstrate they have appropriate laboratory facilities and genuine research applications. Suppliers typically verify institutional affiliations or research credentials before supplying peptides. Some compounds may have additional regulatory considerations, so it's important to check specific requirements. Research institutions often have their own procurement procedures and ethical approval processes. Premio Peptides works with qualified researchers and institutions, providing proper documentation and certificates of analysis. We maintain compliance with UK regulations and may request verification of research credentials. Individual researchers should also check their institutional policies regarding peptide procurement and use. Contact us to discuss specific requirements for your research application.", keyword: "licence buy peptides uk", internalLink: "/compliance" },
  { question: "What are the top 5 peptide companies in the UK?", answer: "The UK's leading peptide companies focus on research-grade compounds with rigorous quality control and reliable service. Key factors distinguishing top suppliers include third-party testing, certificates of analysis, proper storage facilities, and knowledgeable customer support. Premio Peptides ranks amongst the premier UK suppliers, offering extensive catalogues of neuropeptides, growth hormone compounds, and longevity research peptides. We distinguish ourselves through same-day dispatch, comprehensive documentation, and institutional account services. Other notable characteristics of leading suppliers include competitive pricing, bulk ordering capabilities, and regulatory compliance. The best companies maintain consistent stock availability and provide detailed product information. When selecting a supplier, prioritise those offering full transparency, proper storage conditions, and genuine commitment to supporting legitimate research. Contact Premio Peptides to experience our industry-leading service standards.", keyword: "top peptide companies uk", internalLink: "/about" },
  { question: "Where can I buy Semax nasal spray in the UK?", answer: "Semax nasal spray for research purposes can be purchased from specialised UK suppliers focusing on neuropeptides and research chemicals. This formulation is particularly useful for studies examining nasal administration routes and bioavailability research. Premio Peptides supplies research-grade Semax nasal spray with comprehensive certificates of analysis and proper documentation. Our formulation maintains peptide stability whilst providing convenient administration for laboratory protocols. We ensure proper storage and dispatch conditions to preserve product integrity during delivery. Same-day UK shipping is available for orders placed before 2pm. The nasal spray format is exclusively for research use and requires appropriate laboratory facilities. Researchers should follow proper handling protocols and institutional guidelines. Contact us to discuss specific concentrations and volumes required for your research applications.", keyword: "semax nasal spray uk", internalLink: "/compounds/semax" },
  { question: "Why are peptides important in research?", answer: "Peptides are crucial research tools because they provide precise ways to study biological processes, cellular signalling, and therapeutic mechanisms. Their specific amino acid sequences allow researchers to target particular receptors or pathways, making them invaluable for understanding disease processes and potential treatments. Peptides bridge the gap between basic amino acids and complex proteins, offering manageable molecules for detailed study. They're essential for drug development, enabling scientists to test therapeutic concepts before developing larger pharmaceutical compounds. Research applications span neuroscience, tissue repair, metabolism, and anti-aging studies. Premio Peptides supports this vital research by providing high-purity compounds with comprehensive documentation. Our extensive catalogue enables diverse scientific investigations from cognitive enhancement studies to longevity research. Quality peptides accelerate scientific discovery and therapeutic development across multiple disciplines.", keyword: "peptides research importance", internalLink: "/quality" },
  { question: "What can lab peptides be used for in research?", answer: "Laboratory peptides serve diverse research applications across multiple scientific disciplines. In neuroscience, compounds like Semax and Selank help investigate cognitive function and neuroprotection mechanisms. Tissue repair research utilises peptides such as BPC-157 and TB-500 to study wound healing and regenerative processes. Growth hormone research employs CJC-1295 and Ipamorelin for metabolic and anti-aging investigations. Cosmetic research uses peptides like GHK-Cu to examine skin health and anti-aging properties. Immunology studies benefit from compounds like Thymosin Alpha-1 for immune system research. Longevity research incorporates Epithalon and other peptides to investigate cellular aging processes. Premio Peptides supplies all these research applications with high-purity compounds and comprehensive documentation. Our catalogue supports diverse scientific investigations from basic biological research to advanced therapeutic development.", keyword: "lab peptides research", internalLink: "/compounds" },
  { question: "Where to buy research chemicals in the UK?", answer: "Research chemicals in the UK should be purchased from licensed suppliers specialising in laboratory-grade compounds with proper documentation and quality assurance. Reputable suppliers provide certificates of analysis, maintain appropriate storage conditions, and serve qualified research institutions. Premio Peptides is a leading UK supplier of research peptides and biotechnology compounds, offering extensive quality control and same-day dispatch services. We specialise in neuropeptides, growth factors, and longevity research compounds, all backed by third-party testing. Our institutional account services support universities and research facilities with purchase order capabilities and bulk pricing. When selecting suppliers, prioritise those demonstrating regulatory compliance, transparent business practices, and genuine commitment to scientific research. Always verify that suppliers provide proper documentation and maintain professional standards. Contact us to discuss your specific research chemical requirements.", keyword: "buy research chemicals uk", internalLink: "/compounds" },
  { question: "Can you sell peptides for research purposes?", answer: "Yes, selling peptides for legitimate research purposes is legal in the UK, provided suppliers comply with relevant regulations and maintain appropriate business practices. Suppliers must ensure products are clearly labelled for research use only and sold exclusively to qualified researchers or institutions. Proper documentation including certificates of analysis, safety data sheets, and batch records must accompany all sales. Premio Peptides operates as a licensed UK supplier, maintaining full regulatory compliance whilst serving the research community. We verify research credentials and provide comprehensive documentation with every order. Our business model focuses exclusively on supporting legitimate scientific research through high-quality peptide compounds. Suppliers must also maintain proper storage facilities, quality control systems, and customer verification procedures. Contact us to learn more about our research supply services and institutional account options.", keyword: "sell peptides research", internalLink: "/compliance" },
  { question: "Where can I buy research peptides in the UK?", answer: "Research peptides in the UK are available from specialised biotechnology suppliers who focus exclusively on laboratory-grade compounds for scientific use. These suppliers must provide proper documentation, maintain quality standards, and serve qualified research institutions. Premio Peptides is a premier UK supplier offering comprehensive catalogues of neuropeptides, growth hormone compounds, and longevity research peptides. We provide same-day dispatch for orders placed before 2pm, complete certificates of analysis, and institutional account services. Our facility maintains optimal storage conditions and rigorous quality control procedures. When selecting suppliers, ensure they offer third-party testing, transparent business practices, and genuine research focus. Avoid suppliers making therapeutic claims or targeting non-research markets. Contact Premio Peptides to discuss your specific research requirements and institutional account options.", keyword: "buy research peptides uk", internalLink: "/compounds" },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: hubFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default async function FAQPage() {
  // Also fetch CMS FAQs for any additional questions
  const cmsFaqs = await getFAQs();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://premiopeptides.co.uk/" },
      { "@type": "ListItem", position: 2, name: "FAQ", item: "https://premiopeptides.co.uk/faq" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Navigation variant="editorial" />

      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3">Support</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15]">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-editorial-muted">
            {hubFaqs.length} questions answered about buying research peptides in the UK. Can&rsquo;t find what you need? <a href="/contact" className="text-editorial-accent hover:text-editorial-accent-dark transition-colors">Contact us</a>.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-5">
          {hubFaqs.map((faq) => (
            <div key={faq.question} className="rounded-xl border border-editorial-border bg-editorial-surface p-6">
              <h2 className="font-serif text-base font-bold text-editorial-text">{faq.question}</h2>
              <p className="mt-3 text-sm text-editorial-muted leading-relaxed">{faq.answer}</p>
              {faq.internalLink && (
                <Link href={faq.internalLink} className="mt-3 inline-block text-xs font-medium text-editorial-accent hover:text-editorial-accent-dark transition-colors">
                  Learn more &rarr;
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CMS FAQs if any additional ones exist */}
      {cmsFaqs.length > 0 && (
        <section className="py-12 lg:py-16 bg-editorial-surface">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-xl font-bold text-editorial-text mb-6">More Questions</h2>
            <div className="space-y-4">
              {cmsFaqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-editorial-border bg-white p-6">
                  <h3 className="font-serif text-base font-bold text-editorial-text">{faq.question}</h3>
                  <p className="mt-3 text-sm text-editorial-muted leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-editorial-muted mb-4">Still have questions? Our team responds within 2-4 business hours.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/contact" className="inline-flex items-center justify-center rounded-lg bg-editorial-accent px-7 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors shadow-sm">Contact Us</a>
            <a href="/compounds" className="inline-flex items-center justify-center rounded-lg border border-editorial-border px-7 py-3.5 text-sm font-medium text-editorial-text hover:bg-editorial-surface transition-colors">Browse Peptides</a>
          </div>
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
