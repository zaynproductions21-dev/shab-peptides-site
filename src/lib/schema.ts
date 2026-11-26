/**
 * Shared structured data.
 *
 * WHY THIS EXISTS. Seven pages each hand-rolled their own `faqSchema`, and none
 * of them attributed the answers to anybody. The GEO gate reported "no
 * authority signal" on /faq — 30,669 characters and 16 Q&As with nothing saying
 * who stands behind them — while the homepage passed only because it happens to
 * emit an Organization and a TechArticle with an author.
 *
 * WHY THE FIRM AND NOT A PERSON. Premio is deliberately excluded from the
 * portfolio's named-author byline, and that is the right call: a research
 * chemical supplier is not credible because of who signed the page, but because
 * of what can be independently checked — the legal entity, the batch record,
 * the certificate of analysis. So authority here is artefact-based.
 *
 * BELL RED LIMITED, company 12841067, is already published in sixteen places on
 * this site, and /certificates-of-analysis and /batch-verifier already exist.
 * Nothing new is asserted here; it is wired up so a machine can follow it.
 */

export const SITE_URL = 'https://premiopeptides.co.uk';
export const ORG_ID = `${SITE_URL}#organization`;

/**
 * The legal entity. Carries BOTH an `identifier` and a `sameAs` to the
 * Companies House record: either alone satisfies a corroboration check, and
 * having both means neither a schema consumer nor our own gate has to guess.
 */
export const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Premio Peptides',
  legalName: 'BELL RED LIMITED',
  url: SITE_URL,
  description:
    'UK research-grade peptide supplier with 99%+ purity guarantee and same-day dispatch.',
  foundingDate: '2020-08-27',
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'GB-COH',
    name: 'Companies House company number',
    value: '12841067',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '16 Neptune Street',
    addressLocality: 'Tipton',
    postalCode: 'DY4 8JF',
    addressCountry: 'GB',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@premiopeptides.co.uk',
    contactType: 'customer service',
    availableLanguage: 'English',
    areaServed: 'GB',
  },
  sameAs: [
    'https://find-and-update.company-information.service.gov.uk/company/12841067',
  ],
};

export type Faq = { question: string; answer: string };

/**
 * FAQPage schema with the answers attributed to the firm.
 *
 * Build this from the SAME array the page renders. Passing a separate list is
 * how schema ends up promising an answer the page does not show — the defect
 * this programme has spent weeks clearing across nineteen sites. Google also
 * expects FAQPage markup to match content visible on the page.
 *
 * Pair it with `orgSchema` on the page, or the `author` reference points at an
 * `@id` that is not defined anywhere in the document.
 */
export function faqPageSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}
