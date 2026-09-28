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
  title: "Parry — AI procurement platform (private beta)",
  description:
    "Parry is an AI procurement platform that reads your contracts, invoices, and supplier email threads, extracts the commercial terms, and catches overbilling and renewals before they cost you. Now in private beta.",
  keywords:
    "AI procurement, supplier intelligence, billing assurance, vendor management, procurement AI, contract intelligence, tail spend automation, autonomous deal execution, commercial control layer, procurement execution",
  authors: [{ name: "Parry" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.parry-io.com" },
  openGraph: {
    type: "website",
    url: "https://www.parry-io.com",
    title: "Parry — AI procurement platform (private beta)",
    description:
      "Parry is an AI procurement platform that reads your contracts, invoices, and supplier email threads, extracts the commercial terms, and catches overbilling and renewals before they cost you. Now in private beta.",
    siteName: "Parry",
    images: [{ url: "https://www.parry-io.com/Parry_Logo.png" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parry — AI procurement platform (private beta)",
    description:
      "Parry is an AI procurement platform that reads your contracts, invoices, and supplier email threads, extracts the commercial terms, and catches overbilling and renewals before they cost you. Now in private beta.",
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
        "Parry is an AI procurement platform that reads your contracts, invoices, and supplier email threads, extracts the commercial terms, and catches overbilling and renewals before they cost you. Now in private beta.",
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
        "Parry is an AI procurement platform that reads your contracts, invoices, and supplier email threads, extracts the commercial terms, and catches overbilling and renewals before they cost you. Now in private beta.",
      offers: {
        "@type": "Offer",
        category: "Enterprise",
        availability: "https://schema.org/LimitedAvailability",
      },
      featureList: [
        "Contract and invoice term extraction",
        "Overbilling detection against contract terms",
        "Renewal and notice-window tracking",
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
