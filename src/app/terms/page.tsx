import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Premio Peptides",
  description:
    "Terms and conditions for purchasing research peptides from Premio Peptides, a trading name of BELL RED LIMITED. Research use only.",
};

export default function TermsPage() {
  return (
    <>
      <Navigation variant="editorial" />

      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3">Legal</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15]">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-editorial-muted">Last updated: 25 April 2026</p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-editorial-muted leading-relaxed space-y-8">

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">1. About These Terms</h2>
              <p>These terms of service (&ldquo;Terms&rdquo;) govern your use of the Premio Peptides website (premiopeptides.co.uk) and any purchase of products from us. Premio Peptides is a trading name of <strong className="text-editorial-text">BELL RED LIMITED</strong>, registered in England and Wales (Company Number 12841067), with its registered address at 16 Neptune Street, Tipton, England, DY4 8JF.</p>
              <p className="mt-2">By placing an order or using this website, you agree to be bound by these Terms. If you do not agree, you must not use our website or purchase our products.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">2. Research Use Only</h2>
              <p>All products sold by Premio Peptides are intended strictly for in vitro laboratory research, scientific study, and educational purposes only. They are <strong className="text-editorial-text">not</strong> intended for:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Human or veterinary administration</li>
                <li>Clinical trials (unless separately authorised)</li>
                <li>Diagnostic or therapeutic use</li>
                <li>Food, cosmetic, or household use</li>
                <li>Any form of self-administration</li>
              </ul>
              <p className="mt-2">By placing an order, you confirm that all products will be used solely for lawful research purposes. Premio Peptides reserves the right to refuse or cancel any order where there is reasonable doubt about the intended research use.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">3. Eligibility</h2>
              <p>You must be at least 18 years of age to purchase from Premio Peptides. Orders are accepted from researchers, scientists, academics, and institutions conducting legitimate laboratory or scientific research. We may request verification of institutional affiliation or research purpose before processing an order.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">4. Orders and Pricing</h2>
              <p>All prices are listed in GBP and are exclusive of VAT unless stated otherwise. We reserve the right to change prices at any time without notice, although changes will not affect orders already confirmed.</p>
              <p className="mt-2">An order is confirmed when we send you an order confirmation email. We reserve the right to refuse or cancel any order at our discretion, including where we suspect non-research use, fraud, or where stock is unavailable.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">5. Payment</h2>
              <p>Payment must be received before dispatch unless you hold an approved institutional account with invoice terms. We accept major credit and debit cards and bank transfer. Institutional clients may pay by purchase order subject to credit approval — see our <a href="/institutional" className="text-editorial-accent hover:text-editorial-accent-dark transition-colors">Institutional Accounts</a> page for details.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">6. Dispatch and Delivery</h2>
              <p>Orders placed before 2pm on working days (Monday to Friday, excluding UK public holidays) are dispatched the same day. Delivery is via tracked courier, typically next working day within the UK. We do not currently ship internationally.</p>
              <p className="mt-2">For full delivery information, see our <a href="/delivery" className="text-editorial-accent hover:text-editorial-accent-dark transition-colors">Delivery &amp; Returns</a> page.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">7. Quality and Certificates of Analysis</h2>
              <p>All products are supplied with a batch-specific certificate of analysis (CoA) produced by an independent, accredited third-party laboratory. CoAs confirm compound identity and purity via HPLC and mass spectrometry analysis. Our minimum accepted purity threshold is 98%.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">8. Returns and Refunds</h2>
              <p>Due to the nature of research compounds and the requirement to maintain chain of custody, we cannot accept returns of opened or used products. If you receive a product that is damaged, incorrect, or does not match its certificate of analysis, contact us within 7 days of delivery at <a href="mailto:info@premiopeptides.co.uk" className="text-editorial-accent">info@premiopeptides.co.uk</a> with your order reference and a description of the issue. We will investigate and, where appropriate, offer a replacement or refund.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">9. Limitation of Liability</h2>
              <p>Premio Peptides (BELL RED LIMITED) shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use our products. Our total liability in respect of any order shall not exceed the value of that order. Products are supplied for research use only, and we accept no responsibility for use outside this scope.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">10. Intellectual Property</h2>
              <p>All content on this website — including text, images, logos, and design — is the property of BELL RED LIMITED or its licensors and is protected by UK and international copyright law. You may not reproduce, distribute, or commercially exploit any content without our prior written consent.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">11. Governing Law</h2>
              <p>These Terms are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these Terms or your use of our website or products shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
            </div>

            <div className="rounded-xl border border-editorial-border bg-editorial-surface p-6">
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">12. Contact</h2>
              <div className="space-y-1 text-sm">
                <p><strong className="text-editorial-text">BELL RED LIMITED</strong> (trading as Premio Peptides)</p>
                <p>16 Neptune Street, Tipton, England, DY4 8JF</p>
                <p>Company Number: 12841067</p>
                <p>Email: <a href="mailto:info@premiopeptides.co.uk" className="text-editorial-accent">info@premiopeptides.co.uk</a></p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
