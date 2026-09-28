import React from "react";
import GoogleDataSection from "../components/landing/GoogleDataSection";

/* ───────── Stealth homepage (SCRUM-1021) ─────────
 * The marketing site is being rebuilt; until it ships, the homepage is a
 * plain private-beta page. It is deliberately a static server component
 * with no scroll-gated motion.
 *
 * Three things on this page are load-bearing for Google OAuth verification
 * (SCRUM-297) and must survive any edit — Google reads the first viewport:
 *   1. The product name "Parry" inside the <h1>.
 *   2. A plain-language description of what the software does, visible
 *      without scrolling (the paragraph under the h1).
 *   3. The #google-data Limited Use section and the /privacy link.
 * Dropping any one of them recreates the 2026-08-09 rejection.
 * ──────────────────────────────────────────────── */

const FOOTER_LINKS: { href: string; label: string }[] = [
  { href: "#google-data", label: "Google data" },
  { href: "/status", label: "Status" },
  { href: "/trust", label: "Trust" },
  { href: "/sla", label: "SLA" },
  { href: "/changelog", label: "Changelog" },
  { href: "/careers", label: "Careers" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

const ACCESS_HREF = "mailto:yehonatan@parry-io.com?subject=Parry%20early%20access";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[var(--ink)] text-[var(--fg)] antialiased overflow-x-clip">
      <main className="relative">
        {/* The whole visible page: one screen. The Google data section below
            the fold is for OAuth verification, not for visitors. */}
        <section className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 45% 40% at 50% 45%, rgba(4,74,247,0.18) 0%, transparent 70%)",
            }}
          />
          <img src="/Parry_Logo.png" alt="" className="relative h-14 w-auto" />
          <h1 className="relative mt-7 text-[clamp(3rem,8vw,5.5rem)] leading-none tracking-tight font-medium">
            Parry
          </h1>
          <p className="relative mt-6 max-w-[520px] text-[1.05rem] md:text-[1.15rem] leading-[1.55] text-[var(--fg-2)]">
            An AI procurement platform that reads your contracts, invoices, and supplier emails,
            and catches overbilling and missed renewals.
          </p>
          <p className="relative mt-3 text-[0.9rem] text-[var(--fg-3)]">
            In private beta. A new site is on its way.
          </p>
          <a href={ACCESS_HREF} className="btn-primary relative mt-9">
            Request access
          </a>
          <nav
            aria-label="Legal"
            className="absolute bottom-7 left-0 right-0 flex justify-center gap-6 text-[0.78rem] text-[var(--fg-3)]"
          >
            <a href="/privacy" className="hover:text-[var(--fg)] transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-[var(--fg)] transition-colors">Terms</a>
            <a href="#google-data" className="hover:text-[var(--fg)] transition-colors">How Parry uses Google data</a>
          </nav>
        </section>

        <GoogleDataSection />
      </main>

      <footer className="relative border-t border-[var(--line)] py-7 px-6">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <img src="/Parry_Logo.png" alt="" className="h-5 w-auto" />
            <span className="text-[0.84rem] text-[var(--fg)] font-medium">Parry</span>
            <span className="text-[0.76rem] text-[var(--fg-3)] ml-2">
              &copy; {new Date().getFullYear()}
            </span>
          </div>
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.76rem] text-[var(--fg-3)]"
          >
            <span className="font-mono uppercase tracking-[0.16em]">Tel Aviv</span>
            <a href="mailto:yehonatan@parry-io.com" className="hover:text-[var(--fg)] transition-colors">
              yehonatan@parry-io.com
            </a>
            {FOOTER_LINKS.map(({ href, label }) => (
              <a key={href} href={href} className="hover:text-[var(--fg)] transition-colors">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
