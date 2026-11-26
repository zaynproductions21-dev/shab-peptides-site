import type { Metadata } from "next";
import { orgSchema, faqPageSchema } from "@/lib/schema";
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
  { question: "Who is the best peptide supplier in the UK?", answer: "There is no official ranking, so treat anyone calling itself the best peptide supplier in the UK with suspicion and check the things you can verify yourself. Ask for a certificate of analysis carrying the batch number printed on the vial, not a generic specimen document. Look up the trading entity: Premio Peptides is BELL RED LIMITED, company 12841067, registered in England and based in Tipton. Check that purity is stated as a figure and tested by an independent laboratory rather than asserted in marketing copy. Ours is 99%+, every batch certificate is published, and the batch verifier lets you read it before you order rather than after.", keyword: "best peptide supplier uk", internalLink: "/compounds" },
  { question: "Where can I buy peptides in the UK?", answer: "You can buy peptides in the UK from suppliers that sell them for laboratory research only, which is the legal basis on which they are supplied here rather than a formality. Premio Peptides is a distributor based in Tipton, West Midlands: the compounds are made by third-party manufacturers and we supply them with that manufacturer's independent certificate of analysis. The catalogue holds around thirty compounds, including BPC-157, TB-500, Semax, Selank, Tesamorelin, Ipamorelin and CJC-1295, priced between £130 and £199.99. Orders placed before 2pm are dispatched the same working day on a tracked service, free over £175.", keyword: "buy peptides uk", internalLink: "/compounds" },
  { question: "What is Semax?", answer: "Semax is a synthetic peptide developed in Russia in the 1980s from the ACTH(4-7) fragment of adrenocorticotropic hormone, with a Pro-Gly-Pro tail added to slow enzymatic breakdown. Its sequence is Met-Glu-His-Phe-Pro-Gly-Pro, seven amino acids, CAS 80714-61-0. Laboratory work examines it in connection with BDNF expression, neuroplasticity and stress response, which is why it appears in memory, learning and ischaemia model studies. It holds no marketing authorisation in the UK, so outside Russia and Ukraine it exists as a research compound rather than a medicine. Premio stocks Semax as a lyophilised 20mg vial at 99%+ purity, £199.99, with the batch certificate published.", keyword: "semax", internalLink: "/compounds/semax" },
  { question: "Where can I buy Semax in the UK?", answer: "To buy Semax in the UK you need a supplier selling it for research use, which is how it is lawfully supplied here. There is no authorisation or registration scheme for research chemical suppliers, so the paperwork is the only thing that tells you anything. Premio supplies Semax as a lyophilised 20mg vial, 99%+ purity, CAS 80714-61-0, at £199.99. Every batch carries an independent certificate of analysis you can look up by batch number before ordering. It ships in temperature-controlled packaging, dispatched the same working day on orders placed before 2pm. Semax is supplied for laboratory research only and never for human use.", keyword: "buy semax uk", internalLink: "/compounds/semax" },
  { question: "What are the top selling peptide drugs for research?", answer: "The top selling peptides for research divide fairly cleanly by field. Recovery and tissue repair work uses BPC-157 and TB-500, which Premio also supplies as a combined stack. Growth hormone research uses CJC-1295 No DAC, Ipamorelin and Tesamorelin. Cognitive studies use Semax and Selank. Longevity work uses Epithalon, NAD+ and Glutathione; skin and hair research uses GHK-Cu; immunology uses Thymosin Alpha-1 and KPV; mitochondrial work uses MOTS-c and SS-31. The lines Premio features most are Retatrutide, the GHK-Cu Glow Stack, the BPC-157 and TB-500 stack, and the NAD+, PT-141, Tesamorelin and MOTS-c pens. All thirty list purity, CAS number and sequence.", keyword: "top selling peptides", internalLink: "/compounds" },
  { question: "Are research peptides safe?", answer: "Asking whether research peptides are safe usually means one of two different questions. If you mean safe to handle in a laboratory, that depends on your own controls: reconstitution under sterile technique, correct storage, gloves and eye protection, and waste disposal under COSHH and your institution's chemical waste policy, with a Safety Data Sheet on file and accessible to everyone working with the compound. If you mean safe to take, we cannot answer that and will not: nothing Premio supplies is tested, labelled or sold for human or veterinary use, and no claim about human exposure is made anywhere on this site. Purity is documented per batch. Toxicology is not.", keyword: "research peptides safe", internalLink: "/guidelines" },
  { question: "What are research peptides?", answer: "Research peptides are short chains of amino acids, usually between three and fifty residues, synthesised for laboratory study rather than clinical use. Because a peptide's sequence determines which receptor or binding site it engages, they let a researcher interrogate one pathway at a time instead of perturbing a whole system and inferring backwards. That is why they sit between simple amino acids and full proteins as experimental tools. Typical uses are cell signalling and receptor binding assays, tissue repair and wound healing models, metabolic and mitochondrial studies, and neuroscience work on memory and neuroprotection. Premio stocks around thirty, each listed with purity, CAS number, molecular weight and sequence, and each batch independently tested.", keyword: "research peptides", internalLink: "/compounds" },
  { question: "How much do research peptides cost in the UK?", answer: "What research peptides cost in the UK depends on how hard the compound is to synthesise, the vial size and the purity grade required, so the honest answer is a range rather than a single figure. On Premio's catalogue prices run from £130 to £199.99 per vial: BPC-157 is £130 for 10mg, most single compounds including Semax, TB-500, Epithalon and Thymosin Alpha-1 are £199.99, and the pre-filled pens are £149.99 to £199. Standard UK delivery is free over £175. Institutional pricing is tiered from 5g per compound, with volume discounts applied per line item, payable by purchase order on 30-day terms.", keyword: "research peptides cost uk", internalLink: "/institutional" },
  { question: "Do I need a licence to buy research peptides in the UK?", answer: "You do not need a licence to buy research peptides in the UK, and no such licence exists to be had. There is no registration or authorisation scheme for research chemical suppliers or for their customers, so a supplier describing itself as licensed is describing something that does not exist. What governs the sale is purpose: these compounds are supplied for laboratory research only, and presenting one as treating or preventing a condition would make it a medicinal product under the Human Medicines Regulations 2012, a different legal regime entirely. Placing an order with Premio Peptides confirms the compounds will be used solely for lawful research purposes, and we do not supply buyers who cannot confirm a legitimate research purpose.", keyword: "licence buy peptides uk", internalLink: "/compliance" },
  { question: "What are the top 5 peptide companies in the UK?", answer: "We are not going to rank the top peptide companies in the UK, because any such list written by one of them is marketing rather than information. Five checks separate a real supplier from a reseller with a stock photo. One: a named legal entity you can find at Companies House, ours being BELL RED LIMITED, company 12841067. Two: a certificate of analysis matching the batch number on the vial you receive, not a specimen. Three: purity stated as a figure and tested independently. Four: a UK address and a stated dispatch time specific enough to hold them to. Five: no therapeutic or dosing claims anywhere on the site, since a supplier hinting at human use is telling you how seriously it treats the law.", keyword: "top peptide companies uk", internalLink: "/about" },
  { question: "Where can I buy Semax nasal spray in the UK?", answer: "Semax nasal spray is sold in Russia and Ukraine as a licensed medicine, which is why people search for it, but in the UK it holds no marketing authorisation and cannot lawfully be supplied as one. Premio does not sell a nasal spray. We supply Semax as a lyophilised 20mg vial at 99%+ purity, CAS 80714-61-0, £199.99, with the independent certificate of analysis for that batch published and searchable by batch number. Intranasal delivery is a recognised research route and our reconstitution calculator will work out the volumes, but preparing any formulation is the researcher's own responsibility under their own protocols. Buying a spray marketed for human use from an overseas pharmacy is a different transaction with different law attached, and not one we advise on.", keyword: "semax nasal spray uk", internalLink: "/compounds/semax" },
  { question: "Why are peptides important in research?", answer: "The importance of peptides in research comes down to specificity. A peptide's amino acid sequence determines which receptor or binding site it engages, so a researcher can interrogate a single pathway rather than flooding a system and inferring backwards from the result. That makes them useful for mapping signalling cascades, for testing a therapeutic hypothesis cheaply before committing to a full protein or small-molecule programme, and for building cell and animal models that isolate one mechanism. They are also short enough to synthesise to a known sequence and verify analytically, which matters more than it sounds: a result is only as good as the certainty that what is in the vial matches the label. That is why per-batch purity documentation is not administrative overhead.", keyword: "peptides research importance", internalLink: "/quality" },
  { question: "What can lab peptides be used for in research?", answer: "Lab peptides are used across most areas of biological research, and Premio's catalogue maps onto them fairly directly. Neuroscience uses Semax and Selank in cognition and neuroprotection models. Tissue repair work uses BPC-157 and TB-500 for wound healing and regeneration. Growth hormone research uses CJC-1295 No DAC, Ipamorelin and Tesamorelin in metabolic studies. Skin and hair research uses GHK-Cu. Immunology uses Thymosin Alpha-1 and KPV. Mitochondrial studies use MOTS-c and SS-31. Reproductive and hormonal work uses Kisspeptin-10, Oxytocin and PT-141. Longevity research uses Epithalon, NAD+ and Glutathione. Each is listed with its CAS number, molecular weight, sequence and storage conditions, and each batch is tested independently before dispatch.", keyword: "lab peptides research", internalLink: "/compounds" },
  { question: "Where to buy research chemicals in the UK?", answer: "The thing worth checking is documentation. Buy from suppliers who publish a batch-specific certificate of analysis from an independent laboratory, and who state plainly that compounds are supplied for laboratory research only. Premio Peptides does not manufacture anything: compounds are produced by third-party manufacturers, and every batch we dispatch carries its own independent certificate of analysis, which you can look up by batch number before ordering. We stock neuropeptides, growth factors and longevity research compounds, with institutional accounts for purchase orders and bulk pricing.", keyword: "buy research chemicals uk", internalLink: "/compounds" },
  { question: "Can you sell peptides for research purposes?", answer: "Yes. Supplying peptides for laboratory research is lawful in the UK. There is no supplier licence for research chemicals \u2014 what matters is that compounds are labelled for research use only, are not presented or marketed for human use, and are dispatched with documentation identifying the batch. Premio Peptides does not manufacture: compounds come from third-party manufacturers, and each batch ships with an independent certificate of analysis. Placing an order is your confirmation that the compounds will be used solely for lawful research purposes, and we do not supply buyers who cannot confirm that.", keyword: "sell peptides research", internalLink: "/compliance" },
  { question: "Where can I buy research peptides in the UK?", answer: "To buy research peptides in the UK, use a supplier that sells for laboratory use only and publishes the paperwork to back it up. Premio Peptides is a UK distributor in Tipton, West Midlands, trading as BELL RED LIMITED, company 12841067. We hold around thirty compounds at 99%+ purity, each with an independent certificate of analysis searchable by batch number before you order. Dispatch is same-day before 2pm, tracked, in temperature-controlled packaging, free over £175, with purchase order and 30-day invoice terms available on institutional accounts. Two things to avoid anywhere: therapeutic or dosing claims, which signal a seller aiming at human use, and a certificate of analysis carrying no batch number.", keyword: "buy research peptides uk", internalLink: "/compounds" },
];

// Attributed to the firm via the shared helper. This page carries 16 Q&As and
// 30,000+ characters and said nothing about who stands behind the answers, so
// the GEO gate reported no authority signal on it. Premio is deliberately
// excluded from the named-author byline, so authority here is the legal entity
// — BELL RED LIMITED, company 12841067 — which a reader can actually check.
const faqSchema = faqPageSchema(hubFaqs);

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
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
