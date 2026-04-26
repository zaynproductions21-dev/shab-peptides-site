import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Bell Peptides",
  description:
    "Privacy policy for Bell Peptides, a trading name of BELL RED LIMITED. How we collect, use, and protect your personal data under UK GDPR.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation variant="editorial" />

      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3">Legal</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15]">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-editorial-muted">Last updated: 25 April 2026</p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-editorial-muted leading-relaxed space-y-8">

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">1. Who We Are</h2>
              <p>Bell Peptides is a trading name of <strong className="text-editorial-text">BELL RED LIMITED</strong>, a company registered in England and Wales (Company Number 12841067). Our registered address is 16 Neptune Street, Tipton, England, DY4 8JF.</p>
              <p className="mt-2">For the purposes of the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018, BELL RED LIMITED is the data controller. If you have any questions about this policy or how we handle your data, contact us at <a href="mailto:research@bellpeptides.co.uk" className="text-editorial-accent hover:text-editorial-accent-dark transition-colors">research@bellpeptides.co.uk</a>.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">2. What Data We Collect</h2>
              <p>We may collect and process the following personal data:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li><strong className="text-editorial-text">Identity data:</strong> Full name, title, job title</li>
                <li><strong className="text-editorial-text">Contact data:</strong> Email address, telephone number, institution or organisation name, postal address</li>
                <li><strong className="text-editorial-text">Order data:</strong> Products ordered, order history, payment references</li>
                <li><strong className="text-editorial-text">Technical data:</strong> IP address, browser type, operating system, pages visited, time on site</li>
                <li><strong className="text-editorial-text">Communication data:</strong> Enquiry form submissions, email correspondence, support requests</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">3. How We Collect Your Data</h2>
              <p>We collect data when you:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Place an order or create an account on our website</li>
                <li>Submit an enquiry or contact form</li>
                <li>Subscribe to emails or correspondence</li>
                <li>Browse our website (via cookies and similar technologies)</li>
                <li>Communicate with us by email, phone, or other means</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">4. How We Use Your Data</h2>
              <p>We use your personal data for the following purposes:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>To process and fulfil your orders</li>
                <li>To respond to enquiries and provide customer support</li>
                <li>To send order confirmations, dispatch notifications, and certificates of analysis</li>
                <li>To manage institutional accounts and invoicing</li>
                <li>To comply with legal and regulatory obligations</li>
                <li>To improve our website and services</li>
              </ul>
              <p className="mt-2">We process your data on the following lawful bases under UK GDPR: performance of a contract (Article 6(1)(b)), legitimate interests (Article 6(1)(f)), and compliance with legal obligations (Article 6(1)(c)).</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">5. Data Sharing</h2>
              <p>We do not sell your personal data to third parties. We may share your data with:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li><strong className="text-editorial-text">Payment processors:</strong> To process transactions securely</li>
                <li><strong className="text-editorial-text">Courier services:</strong> To fulfil deliveries</li>
                <li><strong className="text-editorial-text">IT service providers:</strong> For website hosting and email services</li>
                <li><strong className="text-editorial-text">Professional advisors:</strong> Accountants, lawyers, where required</li>
                <li><strong className="text-editorial-text">Law enforcement or regulators:</strong> Where required by law</li>
              </ul>
              <p className="mt-2">All third-party processors are contractually bound to handle your data in accordance with UK GDPR requirements.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">6. Data Retention</h2>
              <p>We retain personal data for as long as necessary to fulfil the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements. Order records and certificates of analysis are retained for a minimum of six years in line with HMRC requirements. You may request deletion of your data at any time, subject to our legal obligations.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">7. Your Rights</h2>
              <p>Under UK GDPR, you have the right to:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Access your personal data</li>
                <li>Rectify inaccurate data</li>
                <li>Request erasure of your data</li>
                <li>Restrict processing of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time (where consent is the lawful basis)</li>
              </ul>
              <p className="mt-2">To exercise any of these rights, contact us at <a href="mailto:research@bellpeptides.co.uk" className="text-editorial-accent hover:text-editorial-accent-dark transition-colors">research@bellpeptides.co.uk</a>. We will respond within one month. You also have the right to lodge a complaint with the Information Commissioner&rsquo;s Office (ICO) at <a href="https://ico.org.uk" className="text-editorial-accent hover:text-editorial-accent-dark transition-colors" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">8. Cookies</h2>
              <p>Our website uses cookies to improve your browsing experience. For full details on the cookies we use and how to manage them, see our <a href="/cookies" className="text-editorial-accent hover:text-editorial-accent-dark transition-colors">Cookie Policy</a>.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">9. Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.</p>
            </div>

            <div className="rounded-xl border border-editorial-border bg-editorial-surface p-6">
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">10. Contact Us</h2>
              <p>If you have any questions about this privacy policy or our data practices, contact us:</p>
              <div className="mt-3 space-y-1 text-sm">
                <p><strong className="text-editorial-text">BELL RED LIMITED</strong> (trading as Bell Peptides)</p>
                <p>16 Neptune Street, Tipton, England, DY4 8JF</p>
                <p>Company Number: 12841067</p>
                <p>Email: <a href="mailto:research@bellpeptides.co.uk" className="text-editorial-accent">research@bellpeptides.co.uk</a></p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
