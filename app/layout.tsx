import React from "react";
import "./globals.css";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const TITLE = "Parry · Commercial AI for enterprise procurement";
const DESCRIPTION =
  "Parry is the commercial AI intelligence, execution and autonomous platform for enterprise procurement. It connects to your ERP, P2P and repositories in a few clicks, builds one source of truth per vendor, and negotiates, renews and validates spend within your rules.";

export const metadata = {
  metadataBase: new URL("https://www.parry-io.com"),
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "AI procurement, procurement AI, commercial AI, autonomous procurement, supplier management, contract extraction, AI negotiation, procure-to-pay validation, spend analysis, renewal management",
  authors: [{ name: "Parry" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.parry-io.com" },
  openGraph: {
    type: "website",
    url: "https://www.parry-io.com",
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Parry",
    images: [{ url: "https://www.parry-io.com/og.jpg", width: 1200, height: 630, alt: "Parry" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["https://www.parry-io.com/og.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/brand/favicon-transparent.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/brand/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.parry-io.com/#org",
      name: "Parry",
      alternateName: "Parry-io",
      url: "https://www.parry-io.com/",
      logo: "https://www.parry-io.com/brand/parry-symbol.png",
      description: DESCRIPTION,
      address: { "@type": "PostalAddress", addressLocality: "New York", addressCountry: "US" },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.parry-io.com/#site",
      url: "https://www.parry-io.com/",
      name: "Parry",
      publisher: { "@id": "https://www.parry-io.com/#org" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans-tight">{children}</body>
    </html>
  );
}
