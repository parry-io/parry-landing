import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Parry — AI Procurement Intelligence | Stop Negotiating Blind",
  description: "Parry is the AI reasoning layer for enterprise procurement. From vendor benchmarking to billing verification — multiple AI agents manage your entire procurement value chain autonomously.",
  keywords: "AI procurement, vendor management, procurement AI, vendor intelligence, procurement automation, enterprise AI, billing verification, spend management, vendor benchmarking, procurement back office",
  authors: [{ name: "Parry" }],
  openGraph: {
    type: "website",
    url: "https://www.parry-io.com",
    title: "Parry — Stop Negotiating Blind",
    description: "The AI reasoning layer for the entire procurement value chain — from vendor benchmarking to billing verification.",
    siteName: "Parry",
    images: [{ url: "https://www.parry-io.com/Parry_Logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parry — Stop Negotiating Blind",
    description: "AI procurement intelligence that sees what everyone else misses.",
    images: ["https://www.parry-io.com/Parry_Logo.png"],
  },
  icons: { icon: "/Parry_Logo.png", apple: "/Parry_Logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans`}>{children}</body>
    </html>
  );
}
