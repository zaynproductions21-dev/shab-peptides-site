import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import CartProvider from "@/components/CartProvider";
import Analytics2 from "@/components/Analytics";
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
        <Analytics2 />
        {/*
            AI-engine referral beacon. Reports which assistant sent a visit to
            publishos /api/ai-referral. Stores NOTHING on the device - no cookie, no
            localStorage, no sessionStorage - so it carries no PECR consent duty. The
            reload guard reads Navigation Timing rather than writing a flag.
            Source of truth: publishos public/ai-referral.js. */}
        <script
          id="ai-referral"
          dangerouslySetInnerHTML={{ __html: `!function(){var C="cl_mo71hxje",E="https://www.publishos.co.uk/api/ai-referral",H=[[/(^|\.)chatgpt\.com$/i,"ChatGPT"],[/(^|\.)chat\.openai\.com$/i,"ChatGPT"],[/(^|\.)openai\.com$/i,"ChatGPT"],[/(^|\.)perplexity\.ai$/i,"Perplexity"],[/(^|\.)gemini\.google\.com$/i,"Gemini"],[/(^|\.)copilot\.microsoft\.com$/i,"Copilot"],[/(^|\.)claude\.ai$/i,"Claude"],[/(^|\.)meta\.ai$/i,"Meta AI"],[/(^|\.)you\.com$/i,"You.com"],[/(^|\.)grok\.com$/i,"Grok"]],P=[[/chatgpt|openai/i,"ChatGPT"],[/perplexity/i,"Perplexity"],[/gemini|bard/i,"Gemini"],[/copilot/i,"Copilot"],[/claude|anthropic/i,"Claude"],[/grok/i,"Grok"]];function d(){try{var p=new URLSearchParams(location.search),k=["utm_source","ref","source"];for(var i=0;i<k.length;i++){var v=p.get(k[i]);if(v)for(var j=0;j<P.length;j++)if(P[j][0].test(v))return P[j][1]}}catch(e){}if(document.referrer)try{var h=new URL(document.referrer).hostname;for(var n=0;n<H.length;n++)if(H[n][0].test(h))return H[n][1]}catch(e){}return null}function f(){try{var n=performance.getEntriesByType("navigation")[0];if(n&&n.type)return n.type==="navigate"}catch(e){}return true}function s(g){try{fetch(E,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({clientId:C,url:location.origin+location.pathname+location.search,referrer:document.referrer||""}),keepalive:!0,mode:"cors"})["catch"](function(){})}catch(e){}}var g=d();if(!g)return;window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:"ai_referral",ai_engine:g,ai_landing_path:location.pathname});if(f())s(g);}();` }}
        />
      </body>
    </html>
  );
}
