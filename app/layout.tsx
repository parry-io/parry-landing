import React from "react";
import "./globals.css";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata = {
  title: "Parry — The Execution Layer for Enterprise Procurement",
  description:
    "Parry is the AI execution and control layer above the procurement stack. We unify contracts, pricing, invoices, and supplier history into one coherent view — and turn every supplier interaction into protected commercial value.",
  keywords:
    "AI procurement, supplier intelligence, billing assurance, vendor management, procurement AI, contract intelligence, tail spend automation, autonomous deal execution, commercial control layer, procurement execution",
  authors: [{ name: "Parry" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.parry-io.com" },
  openGraph: {
    type: "website",
    url: "https://www.parry-io.com",
    title: "Parry — The Execution Layer for Enterprise Procurement",
    description:
      "One layer connecting contracts, pricing, invoices, and supplier history. From tail spend to billing assurance — every supplier interaction, under control.",
    siteName: "Parry",
    images: [{ url: "https://www.parry-io.com/Parry_Logo.png" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parry — The Execution Layer for Enterprise Procurement",
    description:
      "Doing for spend what systems of record did for revenue.",
    images: ["https://www.parry-io.com/Parry_Logo.png"],
  },
  icons: { icon: "/Parry_Logo.png", apple: "/Parry_Logo.png" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Parry",
      url: "https://www.parry-io.com",
      logo: "https://www.parry-io.com/Parry_Logo.png",
      description:
        "Parry is the AI execution and control layer above enterprise procurement. We unify contracts, pricing, invoices, and supplier history — turning every supplier interaction into protected commercial value.",
      foundingDate: "2024",
      address: { "@type": "PostalAddress", addressLocality: "Tel Aviv", addressCountry: "IL" },
      contactPoint: { "@type": "ContactPoint", email: "yehonatan@parry-io.com", contactType: "sales" },
    },
    {
      "@type": "SoftwareApplication",
      name: "Parry",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "The AI execution layer for enterprise procurement — unified commercial intelligence across contracts, pricing, invoices, and supplier history. From tail spend through live negotiation to billing assurance.",
      offers: {
        "@type": "Offer",
        category: "Enterprise",
        availability: "https://schema.org/LimitedAvailability",
      },
      featureList: [
        "Unified commercial intelligence",
        "Live supplier negotiation support",
        "Billing assurance & drift detection",
        "Tail spend automation",
        "Renewal leverage timing",
        "Autonomous deal execution",
      ],
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
