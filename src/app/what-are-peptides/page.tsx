import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { orgSchema, faqPageSchema, SITE_URL } from "@/lib/schema";

/**
 * "What are peptides" — the largest uncovered query in the category.
 *
 * Measured 26 Nov 2026 via DataForSEO's AI keyword data for the UK:
 *
 *   what are peptides             4,783   <- 57% of the whole category
 *   peptides uk                   1,381
 *   bpc-157                         672
 *   are peptides legal in the uk    434
 *   tb-500                          252
 *   buy peptides uk                 242   <- the transactional query is 3%
 *
 * Nothing on this site answered the first one. Google's AI answers for it were
 * being satisfied by YouTube, the BBC and Superdrug's online doctor, while
 * Premio — rank 1 among peptide suppliers with 7 of ~24 citations — was absent
 * from the definitional conversation entirely.
 *
 * WHAT THIS PAGE DELIBERATELY DOES NOT DO. Two adjacent queries, "are peptides
 * safe" (119) and "peptide side effects" (130), are consumer-health questions.
 * They are 3% of category volume and they are the 3% this firm must not answer:
 * /compliance states that a substance becomes a medicinal product when it is
 * presented as treating or preventing a condition, and that Premio does not
 * present any compound that way. Answering them as health guidance would
 * contradict the site's own legal posture and invite exactly the MHRA scrutiny
 * that page warns about. Superdrug's online doctor can have them.
 *
 * So this page is definitional and analytical: what the molecule is, how it is
 * made, how purity is established, how it is handled, and where UK research use
 * sits legally. Every legal statement below is the framing already approved on
 * /compliance, not a new assertion.
 */

export const metadata: Metadata = {
  title: "What Are Peptides? A Research Scientist's Guide | Premio Peptides UK",
  description:
    "What peptides are, how they differ from proteins, how research peptides are synthesised, and how purity is verified by HPLC and mass spectrometry. Supplied for in vitro laboratory research only.",
  alternates: { canonical: `${SITE_URL}/what-are-peptides` },
};

const faqs = [
  {
    question: "What is a peptide?",
    answer:
      "A peptide is a short chain of amino acids joined by peptide bonds — the same covalent linkage that builds proteins. Each bond forms when the carboxyl group of one amino acid reacts with the amino group of the next, releasing a molecule of water. The sequence of those amino acids determines the molecule's shape and how it behaves, which is why a peptide is always specified by its sequence rather than by its formula alone.",
  },
  {
    question: "How is a peptide different from a protein?",
    answer:
      "Length, and nothing more fundamental than that. The conventional boundary sits at around 50 amino acids: chains shorter than that are called peptides, longer ones proteins. The distinction is a matter of scientific convention rather than chemistry — both are built from the same amino acids using the same bond. Shorter chains tend to be more conformationally flexible, which is part of why they are studied separately.",
  },
  {
    question: "How are research peptides manufactured?",
    answer:
      "Almost all are made by solid-phase peptide synthesis. The chain is assembled one residue at a time on an insoluble resin support, with each amino acid's reactive groups temporarily blocked by protecting groups so that only the intended bond can form. The finished chain is cleaved from the resin, deprotected, and purified — usually by preparative reverse-phase HPLC. Synthesis is why a research peptide can be produced to a defined sequence and purity rather than extracted from tissue.",
  },
  {
    question: "What does 99% purity mean on a certificate of analysis?",
    answer:
      "It means that 99% of the peptide-related material in the vial is the target sequence, as measured by reverse-phase HPLC with the peak area integrated across the chromatogram. It is a statement about the proportion of the correct molecule against related impurities such as truncated chains and deletion sequences. Identity is confirmed separately by mass spectrometry, which checks the observed molecular weight against the theoretical weight for the sequence. Purity and identity are two different tests and a certificate should carry both.",
  },
  {
    question: "Why are research peptides supplied as a freeze-dried powder?",
    answer:
      "Lyophilisation removes water by sublimation under vacuum, and water is what drives most of the degradation pathways that affect peptides — hydrolysis of the backbone and oxidation of residues such as cysteine, methionine and tryptophan. A lyophilised peptide stored at -20°C or below is stable for far longer than the same peptide in solution. It is reconstituted immediately before use, which is why reconstitution volume and solvent choice are recorded as part of the experiment.",
  },
  {
    question: "Are research peptides legal to buy in the UK?",
    answer:
      "Research-use-only compounds can be purchased legally in the UK for legitimate scientific purposes, provided they are handled in appropriate settings by qualified individuals and in line with institutional guidelines. Most synthetic peptides are not controlled substances under the Misuse of Drugs Act 1971, and they are not licensed medicinal products under the Human Medicines Regulations 2012. That does not place them outside regulation: a substance becomes a medicinal product when it is presented as treating, preventing or diagnosing a condition, so legal status depends on intended use and how a compound is marketed. Premio Peptides does not provide legal advice; researchers should consult their institution's compliance or ethics team before ordering.",
  },
  {
    question: "Can research peptides be used in humans or animals?",
    answer:
      "No. Every compound Premio Peptides supplies is designated for in vitro research, laboratory analysis and scientific study only. They are not sterile pharmaceutical preparations, are not approved for clinical, veterinary or human use, and must not be administered to any living organism outside a formally approved, institutionally governed research protocol.",
  },
];

const faqSchema = faqPageSchema(faqs);

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "What Are Peptides? A Research Scientist's Guide",
  description:
    "What peptides are, how they differ from proteins, how research peptides are synthesised, and how purity is established.",
  url: `${SITE_URL}/what-are-peptides`,
  author: { "@id": orgSchema["@id"] },
  publisher: { "@id": orgSchema["@id"] },
  about: { "@type": "Thing", name: "Peptides" },
  isAccessibleForFree: true,
};

export default function WhatArePeptidesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navigation variant="editorial" />

      {/* Hero — never animated, this is the LCP element */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-editorial-accent-dark uppercase tracking-wider mb-3">
            Research Reference
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15]">
            What Are Peptides?
          </h1>
          <p className="mt-6 text-base text-editorial-muted leading-relaxed max-w-3xl">
            A peptide is a short chain of amino acids joined by peptide bonds. That one sentence
            answers the question, but it leaves out everything that matters to a researcher
            choosing one: how the chain is built, how its purity is established, and how it has to
            be handled to stay intact.
          </p>
        </div>
      </section>

      {/* The molecule */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">
            The molecule itself
          </h2>
          <div className="text-sm text-editorial-muted leading-relaxed space-y-4">
            <p>
              Amino acids each carry an amino group at one end and a carboxyl group at the other. A
              peptide bond forms when the carboxyl group of one reacts with the amino group of the
              next, releasing a molecule of water. Repeat that and you get a chain with a defined
              direction — an N-terminus at one end, a C-terminus at the other — which is why a
              sequence is always written in that order and never reversed.
            </p>
            <p>
              The order of residues is the whole specification. Two peptides can share an identical
              molecular formula and behave entirely differently because the sequence differs, so a
              research peptide is identified by its sequence rather than its formula. That is also
              why mass spectrometry alone cannot confirm you have the right molecule: it confirms
              the mass, and several sequences can share one.
            </p>
            <p>
              The boundary with proteins is a convention rather than a chemical fact. Chains of
              roughly fifty amino acids or fewer are called peptides; longer ones are proteins.
              Nothing changes at the fiftieth residue — the same bond, the same amino acids. Shorter
              chains are simply more conformationally flexible, and that flexibility is part of what
              makes them a distinct subject of study.
            </p>
          </div>
        </div>
      </section>

      {/* Synthesis */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">
            How a research peptide is made
          </h2>
          <div className="text-sm text-editorial-muted leading-relaxed space-y-4">
            <p>
              Research peptides are synthesised rather than extracted. The dominant method is
              solid-phase peptide synthesis, in which the chain is assembled one residue at a time
              while anchored to an insoluble resin bead. Because the growing chain stays attached to
              the solid support, excess reagents and by-products can simply be washed away between
              steps — which is what makes the process practical at all.
            </p>
            <p>
              Each amino acid arrives with its reactive side groups temporarily blocked by
              protecting groups, so only the intended bond can form. A cycle removes the protecting
              group from the chain&apos;s free end, couples the next residue, washes, and repeats.
              After the final residue, the chain is cleaved from the resin, fully deprotected, and
              purified — typically by preparative reverse-phase HPLC.
            </p>
            <p>
              Synthesis has a consequence worth understanding: every coupling step is slightly less
              than perfect, so a finished batch always contains related impurities alongside the
              target sequence. Truncated chains and deletion sequences are the usual ones. This is
              precisely why purity is quoted as a figure rather than assumed, and why the figure
              needs a method attached to it.
            </p>
          </div>
        </div>
      </section>

      {/* Purity */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">
            What purity means, and how it is established
          </h2>
          <div className="text-sm text-editorial-muted leading-relaxed space-y-4">
            <p>
              A purity figure on its own is not information. &ldquo;99%&rdquo; means something only
              once you know what was measured and how. On a Premio certificate of analysis it means
              that 99% of the peptide-related material in the vial is the target sequence, measured
              by reverse-phase HPLC with the peak area integrated across the chromatogram.
            </p>
            <p>
              Identity is a separate test. Mass spectrometry compares the observed molecular weight
              against the theoretical weight calculated from the sequence; agreement confirms you
              have a molecule of the right mass. Purity without identity, or identity without
              purity, leaves a real gap — which is why a certificate should carry both, along with
              the batch number the figures belong to.
            </p>
            <p>
              Premio publishes its certificates rather than describing them. Every batch is tested
              by a third-party laboratory, and the result for the specific batch in your vial can be
              looked up directly.
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/certificates-of-analysis"
              className="inline-flex items-center justify-center rounded-lg bg-editorial-accent-dark px-7 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent transition-colors shadow-sm"
            >
              View certificates of analysis
            </Link>
            <Link
              href="/batch-verifier"
              className="inline-flex items-center justify-center rounded-lg border border-editorial-border px-7 py-3.5 text-sm font-medium text-editorial-text hover:bg-editorial-surface transition-colors"
            >
              Verify a batch number
            </Link>
          </div>
        </div>
      </section>

      {/* Handling */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">
            Why they arrive as a powder
          </h2>
          <div className="text-sm text-editorial-muted leading-relaxed space-y-4">
            <p>
              Research peptides ship lyophilised — freeze-dried under vacuum so that water
              sublimates directly from solid to vapour. Water is what drives most peptide
              degradation: hydrolysis of the backbone, and oxidation of residues such as cysteine,
              methionine and tryptophan. Removing it is the single most effective thing that can be
              done for shelf life.
            </p>
            <p>
              A lyophilised peptide held at -20&deg;C or below is stable for far longer than the
              same peptide in solution, where thirty days is a reasonable working limit. Vials
              should reach room temperature before opening, or condensation carries moisture
              straight back in. Reconstitution volume and solvent composition are recorded as part
              of the experiment, because the concentration you calculate depends on both.
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/guidelines"
              className="inline-flex items-center justify-center rounded-lg bg-editorial-accent-dark px-7 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent transition-colors shadow-sm"
            >
              Handling and storage guidelines
            </Link>
            <Link
              href="/reconstitution-calculator"
              className="inline-flex items-center justify-center rounded-lg border border-editorial-border px-7 py-3.5 text-sm font-medium text-editorial-text hover:bg-editorial-surface transition-colors"
            >
              Reconstitution calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Legal position */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">
            Where UK research use sits legally
          </h2>
          <div className="text-sm text-editorial-muted leading-relaxed space-y-4">
            <p>
              Research peptides occupy a legally nuanced position. Most synthetic peptides are not
              controlled substances under the Misuse of Drugs Act 1971, and they are not licensed
              medicinal products under the Human Medicines Regulations 2012. That does not place
              them outside regulation.
            </p>
            <p>
              Under UK law a substance becomes a medicinal product when it is presented as treating,
              preventing or diagnosing a condition — or when it functions as one. Legal status
              therefore depends on intended use, on how a compound is marketed, and on who is
              buying it. Research-use-only compounds can be purchased legally in the UK for
              legitimate scientific purposes, provided they are handled in appropriate settings by
              qualified individuals and in line with institutional guidelines.
            </p>
            <p>
              Premio Peptides does not provide legal advice, and nothing here is a substitute for
              it. Researchers at universities, private laboratories or commercial R&amp;D operations
              should consult their institution&apos;s compliance or ethics team before ordering.
            </p>
          </div>

          <div className="mt-8 rounded-lg bg-editorial-accent/5 border border-editorial-accent/15 p-4">
            <p className="text-sm text-editorial-text leading-relaxed">
              <strong className="font-semibold">For laboratory research only.</strong> Every
              compound Premio Peptides supplies is designated for in vitro research, laboratory
              analysis and scientific study. Not for human or veterinary consumption. Not for
              clinical use or self-administration. This classification carries legal and ethical
              weight — it is not a disclaimer inserted for form.
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/compliance"
              className="inline-flex items-center justify-center rounded-lg border border-editorial-border px-7 py-3.5 text-sm font-medium text-editorial-text hover:bg-editorial-surface transition-colors"
            >
              Read the full compliance position
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ — questions are h3 so they register as question-shaped headings,
          and answers are always in the DOM, never behind a toggle. */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-editorial-accent-dark uppercase tracking-wider mb-3">
            Common Questions
          </p>
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">
            Peptides, answered directly
          </h2>
          <div className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-serif text-xl font-bold text-editorial-text mb-3">
                  {faq.question}
                </h3>
                <p className="text-sm text-editorial-muted leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onward */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">
            Browse the catalogue
          </h2>
          <p className="text-sm text-editorial-muted leading-relaxed mb-8 max-w-3xl">
            Thirteen research peptides, each dispatched with a batch-specific third-party
            certificate of analysis.
          </p>
          <Link
            href="/compounds"
            className="inline-flex items-center justify-center rounded-lg bg-editorial-accent-dark px-7 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent transition-colors shadow-sm"
          >
            View all compounds
          </Link>
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
