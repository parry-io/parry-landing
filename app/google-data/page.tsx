import React from "react";
import type { Metadata } from "next";
import GoogleDataSection from "../../components/landing/GoogleDataSection";

/* The Google user-data disclosure lives on its own page while the homepage
 * is in stealth (SCRUM-1021). Before the SCRUM-297 data-access submission,
 * the homepage must again describe the product in its first viewport — see
 * the note in app/page.tsx and GOOGLE_OAUTH_VERIFICATION_PLAN.md. */

export const metadata: Metadata = {
  title: "How Parry uses Google user data — Parry",
  description:
    "What Parry does with Gmail and Google Drive data, the scopes it requests, and its Limited Use commitments.",
  alternates: { canonical: "https://www.parry-io.com/google-data" },
  robots: { index: true, follow: true },
};

export default function GoogleDataPage() {
  return (
    <div className="relative min-h-screen bg-[var(--ink)] text-[var(--fg)] antialiased overflow-x-clip">
      <header className="relative px-6 py-6">
        <div className="max-w-[900px] mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5" aria-label="Parry home">
            <img src="/Parry_Logo.png" alt="" className="h-6 w-auto" />
            <span className="text-[1rem] font-medium tracking-tight">Parry</span>
          </a>
          <nav aria-label="Legal" className="flex gap-6 text-[0.8rem] text-[var(--fg-3)]">
            <a href="/privacy" className="hover:text-[var(--fg)] transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-[var(--fg)] transition-colors">Terms</a>
          </nav>
        </div>
      </header>
      <main>
        <GoogleDataSection />
      </main>
    </div>
  );
}
