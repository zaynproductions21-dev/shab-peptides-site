import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import CartProvider from "@/components/CartProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://premiopeptides.co.uk"),
  title: {
    default: "Best Peptide Supplier UK | Research Grade | Premio Peptides",
    template: "%s | Premio Peptides",
  },
  description:
    "UK's fastest research peptide supplier. Order by 2pm, ships today. Third-party tested compounds with certificates of analysis. 99%+ purity verified.",
  keywords: [
    "research peptides UK",
    "peptide supplier",
    "buy peptides UK",
    "BPC-157 UK",
    "TB-500 UK",
    "GHK-Cu UK",
    "metabolic research compounds",
    "high purity peptides",
    "Premio Peptides",
  ],
  openGraph: {
    title: "Best Peptide Supplier UK | Research Grade | Premio Peptides",
    description:
      "UK's fastest research peptide supplier. Third-party tested compounds with certificates of analysis and same-day dispatch.",
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: "Premio Peptides",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Peptide Supplier UK | Research Grade | Premio Peptides",
    description: "UK's fastest research peptide supplier. 99%+ purity. Same-day dispatch.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NRFW3QTF');`,
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NRFW3QTF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Premio Peptides",
              url: "https://premiopeptides.co.uk",
              description: "UK research-grade peptide supplier. 99%+ purity, same-day dispatch, third-party CoA.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://premiopeptides.co.uk/compounds?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
