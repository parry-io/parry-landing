import React from "react";

/* ───────── Stealth homepage (SCRUM-1021) ─────────
 * The marketing site is being rebuilt; until it ships, the homepage is a
 * single "coming soon" screen, and the Google user-data disclosure lives at
 * /google-data.
 *
 * ⚠️ BEFORE the SCRUM-297 data-access submission to Google, restore a plain
 * one-sentence description of the product under the <h1>. Google reads the
 * homepage's first viewport; a homepage that does not say what the app does
 * is exactly what the 2026-08-04 and 2026-08-09 rejections cited. Suggested
 * line: "An AI procurement platform that reads your contracts, invoices, and
 * supplier emails, and catches overbilling and missed renewals."
 * Keep "Parry" in the <h1> and the /privacy link on this page either way.
 * ──────────────────────────────────────────────── */

const ACCESS_HREF = "mailto:yehonatan@parry-io.com?subject=Parry%20early%20access";

export default function LandingPage() {
  return (
    <main className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 bg-[var(--ink)] text-[var(--fg)] antialiased overflow-hidden">
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
      <p className="relative mt-5 text-[1.05rem] md:text-[1.15rem] text-[var(--fg-2)]">Coming soon.</p>
      <a href={ACCESS_HREF} className="btn-primary relative mt-9">
        Request access
      </a>
      <nav
        aria-label="Legal"
        className="absolute bottom-7 left-0 right-0 flex justify-center gap-6 text-[0.78rem] text-[var(--fg-3)]"
      >
        <a href="/privacy" className="hover:text-[var(--fg)] transition-colors">Privacy</a>
        <a href="/terms" className="hover:text-[var(--fg)] transition-colors">Terms</a>
        <a href="/google-data" className="hover:text-[var(--fg)] transition-colors">Google data</a>
      </nav>
    </main>
  );
}
