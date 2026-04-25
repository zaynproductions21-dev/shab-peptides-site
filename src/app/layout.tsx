import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
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
  metadataBase: new URL("https://shab-peptides-site.vercel.app"),
  title: {
    default: "Best Peptide Supplier UK | Research Grade | Bio Peptides",
    template: "%s | Bio Peptides",
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
    "Bio Peptides",
  ],
  openGraph: {
    title: "Best Peptide Supplier UK | Research Grade | Bio Peptides",
    description:
      "UK's fastest research peptide supplier. Third-party tested compounds with certificates of analysis and same-day dispatch.",
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: "Bio Peptides",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Peptide Supplier UK | Research Grade | Bio Peptides",
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
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
