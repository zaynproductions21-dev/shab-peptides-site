/**
 * Artefact-based E-E-A-T for Premio Peptides.
 *
 * Every other brand in the portfolio carries a named Person as its authority
 * signal. Premio deliberately does not — a research-chemical supplier is not
 * credible because of who signs the page, it is credible because of what can
 * be independently checked: the batch record, the analytical method, the
 * accreditation of the lab that ran it, and the legal entity behind it.
 *
 * So the authority signal here is documentary rather than personal:
 *   - Companies House registration (already in sameAs — a real third-party
 *     record anyone can pull, which is what makes it worth more than a claim)
 *   - a named, reproducible test battery run on every batch
 *   - a stated numeric threshold that a CoA either meets or does not
 *   - reviewedBy pointing at the Organization, not a person
 *
 * Every fact below is already asserted elsewhere on the site (see
 * /certificates-of-analysis and /quality). Nothing here is new marketing, and
 * the testing laboratory is deliberately not named because the site does not
 * name it publicly.
 */

export const COMPANY = {
  legalName: 'BELL RED LIMITED',
  tradingName: 'Premio Peptides',
  companyNumber: '12841067',
  companiesHouse: 'https://find-and-update.company-information.service.gov.uk/company/12841067',
} as const

export const PURITY_THRESHOLD = '99%'
export const REVIEWED = '8 September 2026'

/** The four tests run on every batch before release. */
export const TEST_BATTERY = [
  {
    name: 'HPLC analysis',
    what: 'High-performance liquid chromatography separates and quantifies every component in the sample to establish a purity percentage. Premio Peptides’ minimum accepted threshold is 99%, confirmed on each batch, and the chromatogram itself is included in the Certificate of Analysis rather than summarised.',
  },
  {
    name: 'Mass spectrometry (ESI-MS)',
    what: 'Electrospray ionisation mass spectrometry confirms the molecular weight of the compound against its expected value. This is the check that catches a correctly-pure sample of the wrong molecule.',
  },
  {
    name: 'Amino acid analysis',
    what: 'The peptide is broken into its constituent amino acids and their ratios measured, confirming the sequence and stoichiometry — that the peptide was synthesised as specified rather than merely synthesised cleanly.',
  },
  {
    name: 'Endotoxin testing',
    what: 'Bacterial endotoxin screening, which has returned below detectable limits on all batches to date. Results are recorded on the Certificate of Analysis for the specific batch rather than as a general assurance.',
  },
] as const

/** What a buyer can check on the document itself. */
export const COA_CONTENTS = [
  'Batch reference number, unique to the production run',
  'HPLC purity percentage with the full chromatogram',
  'Mass spectrometry molecular weight confirmation',
  'Testing laboratory name and its ISO accreditation details',
] as const

/**
 * Organization node carrying the checkable identifiers.
 * `identifier` makes the company number machine-readable rather than something
 * an engine has to scrape out of footer text.
 */
export const verifiedOrganization = {
  '@type': 'Organization',
  '@id': 'https://premiopeptides.co.uk/#organization',
  name: COMPANY.tradingName,
  legalName: COMPANY.legalName,
  url: 'https://premiopeptides.co.uk',
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'UK Companies House company number',
    value: COMPANY.companyNumber,
  },
  sameAs: [COMPANY.companiesHouse],
} as const

/**
 * The testing methodology as a citable technical document.
 *
 * reviewedBy points at the Organization. Schema.org permits either a Person or
 * an Organization there, which is exactly the affordance a brand without a
 * personal byline needs — the claim is still attributed to an accountable,
 * registered entity rather than to nobody.
 */
export const verificationMethodSchema = {
  '@type': 'TechArticle',
  '@id': 'https://premiopeptides.co.uk/#verification-method',
  headline: 'How every Premio Peptides batch is verified',
  description:
    'The four-test analytical battery run on every batch before release — HPLC, ESI-MS, amino acid analysis and endotoxin testing — and the 99% minimum purity threshold applied to each.',
  about: 'Analytical verification of research peptide purity and identity',
  inLanguage: 'en-GB',
  dateModified: '2026-09-08',
  author: { '@id': 'https://premiopeptides.co.uk/#organization' },
  reviewedBy: { '@id': 'https://premiopeptides.co.uk/#organization' },
  publisher: { '@id': 'https://premiopeptides.co.uk/#organization' },
  mainEntityOfPage: 'https://premiopeptides.co.uk/certificates-of-analysis',
} as const
