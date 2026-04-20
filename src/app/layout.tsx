import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Research Peptides UK — 99.9% Purity | Shab Peptides",
  description:
    "The UK's most reliable source for research peptides. Premium retatrutide, GLP-1 agonists and metabolic research compounds with guaranteed purity and same-day dispatch.",
  keywords: [
    "research peptides UK",
    "retatrutide",
    "GLP-1 agonists",
    "metabolic research compounds",
    "peptide synthesis",
    "high purity peptides",
    "Shab Peptides",
  ],
  openGraph: {
    title: "Research Peptides UK — 99.9% Purity | Shab Peptides",
    description:
      "Premium research peptides with guaranteed purity and same-day dispatch from the UK.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
