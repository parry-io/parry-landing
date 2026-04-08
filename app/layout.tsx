import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Parry — AI Procurement Intelligence | Stop Negotiating Blind",
  description: "Parry is the AI reasoning layer for enterprise procurement. From vendor benchmarking to billing verification — multiple AI agents manage your entire procurement value chain autonomously.",
  keywords: "AI procurement, vendor management, procurement AI, vendor intelligence, procurement automation, enterprise AI, billing verification, spend management, vendor benchmarking, procurement back office",
  authors: [{ name: "Parry" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.parry-io.com" },
  openGraph: {
    type: "website",
    url: "https://www.parry-io.com",
    title: "Parry — Stop Negotiating Blind",
    description: "The AI reasoning layer for the entire procurement value chain — from vendor benchmarking to billing verification.",
    siteName: "Parry",
    images: [{ url: "https://www.parry-io.com/Parry_Logo.png" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parry — Stop Negotiating Blind",
    description: "AI procurement intelligence that sees what everyone else misses.",
    images: ["https://www.parry-io.com/Parry_Logo.png"],
  },
  icons: { icon: "/Parry_Logo.png", apple: "/Parry_Logo.png" },
};

// JSON-LD structured data for Google + LLM discovery
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Parry",
      url: "https://www.parry-io.com",
      logo: "https://www.parry-io.com/Parry_Logo.png",
      description: "Parry is the AI reasoning layer for enterprise procurement. Multiple autonomous AI agents manage the entire vendor value chain — from benchmarking and negotiation through billing verification.",
      foundingDate: "2024",
      founders: [
        { "@type": "Person", name: "Yehonatan Blobstein", jobTitle: "CEO & Co-Founder" },
        { "@type": "Person", name: "Tomer Bar", jobTitle: "CTO & Co-Founder" },
      ],
      address: { "@type": "PostalAddress", addressLocality: "Tel Aviv", addressCountry: "IL" },
      contactPoint: { "@type": "ContactPoint", email: "yehonatan@parry-io.com", contactType: "sales" },
    },
    {
      "@type": "SoftwareApplication",
      name: "Parry",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "AI-powered procurement intelligence platform. Autonomous agents manage the full vendor lifecycle — from sourcing and benchmarking through billing verification and collections.",
      offers: { "@type": "Offer", category: "Enterprise", availability: "https://schema.org/LimitedAvailability" },
      featureList: [
        "Autonomous vendor management",
        "Multi-agent AI reasoning",
        "Vendor benchmarking",
        "Billing verification",
        "Back-office automation",
        "Real-time procurement intelligence",
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} font-sans`}>{children}</body>
    </html>
  );
}
