import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy | Premio Peptides",
  description:
    "Cookie policy for Premio Peptides. How we use cookies and similar technologies on premiopeptides.co.uk, and how to manage your preferences.",
};

export default function CookiesPage() {
  return (
    <>
      <Navigation variant="editorial" />

      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3">Legal</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15]">
            Cookie Policy
          </h1>
          <p className="mt-4 text-sm text-editorial-muted">Last updated: 25 April 2026</p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-editorial-muted leading-relaxed space-y-8">

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">What Are Cookies</h2>
              <p>Cookies are small text files stored on your device when you visit a website. They are widely used to make websites work efficiently, provide information to site owners, and improve the user experience. This policy explains what cookies Premio Peptides (premiopeptides.co.uk) uses and why.</p>
              <p className="mt-2">Premio Peptides is a trading name of <strong className="text-editorial-text">BELL RED LIMITED</strong> (Company Number 12841067), 16 Neptune Street, Tipton, England, DY4 8JF.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">Cookies We Use</h2>

              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-editorial-border bg-editorial-surface p-5">
                  <h3 className="text-base font-bold text-editorial-text mb-2">Strictly Necessary Cookies</h3>
                  <p className="text-sm">These cookies are essential for the website to function. They enable core features such as page navigation, secure areas, and shopping basket functionality. The website cannot function properly without these cookies. They do not require consent under UK law.</p>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead><tr className="border-b border-editorial-border"><th className="text-left py-2 pr-4 text-editorial-text">Cookie</th><th className="text-left py-2 pr-4 text-editorial-text">Purpose</th><th className="text-left py-2 text-editorial-text">Duration</th></tr></thead>
                      <tbody>
                        <tr className="border-b border-editorial-border/50"><td className="py-2 pr-4 font-mono">session_id</td><td className="py-2 pr-4">Maintains your session</td><td className="py-2">Session</td></tr>
                        <tr><td className="py-2 pr-4 font-mono">cookie_consent</td><td className="py-2 pr-4">Stores your cookie preferences</td><td className="py-2">1 year</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="rounded-xl border border-editorial-border bg-editorial-surface p-5">
                  <h3 className="text-base font-bold text-editorial-text mb-2">Analytics Cookies</h3>
                  <p className="text-sm">These cookies help us understand how visitors use our website by collecting information about page visits, traffic sources, and user behaviour. All data is anonymised and aggregated. We use this information to improve our website and services.</p>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead><tr className="border-b border-editorial-border"><th className="text-left py-2 pr-4 text-editorial-text">Cookie</th><th className="text-left py-2 pr-4 text-editorial-text">Purpose</th><th className="text-left py-2 text-editorial-text">Duration</th></tr></thead>
                      <tbody>
                        <tr className="border-b border-editorial-border/50"><td className="py-2 pr-4 font-mono">_ga</td><td className="py-2 pr-4">Google Analytics — distinguishes users</td><td className="py-2">2 years</td></tr>
                        <tr><td className="py-2 pr-4 font-mono">_ga_*</td><td className="py-2 pr-4">Google Analytics — maintains session state</td><td className="py-2">2 years</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="rounded-xl border border-editorial-border bg-editorial-surface p-5">
                  <h3 className="text-base font-bold text-editorial-text mb-2">Functional Cookies</h3>
                  <p className="text-sm">These cookies enable enhanced functionality and personalisation, such as remembering your preferences and providing features you have requested. They may be set by us or by third-party providers whose services we have added to our pages.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">Managing Your Cookie Preferences</h2>
              <p>You can control and manage cookies through your browser settings. Most browsers allow you to:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>View what cookies are stored and delete them individually</li>
                <li>Block third-party cookies</li>
                <li>Block cookies from specific websites</li>
                <li>Block all cookies</li>
                <li>Delete all cookies when you close your browser</li>
              </ul>
              <p className="mt-2">Blocking or deleting cookies may affect the functionality of this website. Strictly necessary cookies cannot be disabled without impairing core site features.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">Third-Party Cookies</h2>
              <p>Some cookies on our site are placed by third-party services that appear on our pages. We do not control these cookies. For information on how these third parties use your data, please review their respective privacy policies. We use third-party services including Google Analytics for website analytics.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">Changes to This Policy</h2>
              <p>We may update this cookie policy from time to time. Changes will be posted on this page with an updated date. We recommend reviewing this page periodically.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">More Information</h2>
              <p>For more information about cookies and how to manage them, visit <a href="https://www.allaboutcookies.org" className="text-editorial-accent hover:text-editorial-accent-dark transition-colors" target="_blank" rel="noopener noreferrer">allaboutcookies.org</a>. For questions about our use of cookies, contact us at <a href="mailto:info@premiopeptides.co.uk" className="text-editorial-accent hover:text-editorial-accent-dark transition-colors">info@premiopeptides.co.uk</a>.</p>
            </div>

          </div>
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
