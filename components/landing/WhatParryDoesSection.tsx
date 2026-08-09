import React from "react";

/* ───────── "What Parry does" · plain-language identity band ─────────
 * Exists for Google's OAuth brand verification, which rejected the app twice:
 *   1. "Your homepage does not explain the purpose of your app."
 *   2. "The app name 'Parry' configured for your OAuth consent screen does not
 *       match the app name on your homepage."
 *
 * Both had the same root cause: the homepage led with positioning copy
 * ("The execution layer for enterprise procurement") and never plainly said
 * "Parry is X, and it does Y." The name appeared only in the nav chip and
 * footer, and the one section that did explain the product sat ~5,700px down
 * behind five full-viewport sticky stages, where a reviewer never reached it.
 *
 * So this band sits IMMEDIATELY after the hero, states the product name as a
 * heading, and describes the functionality in ordinary words. Like
 * GoogleDataSection it is a plain server component with NO scroll-gated
 * motion — do not add `whileInView` / `initial={{opacity:0}}`, and do not move
 * it further down the page. Both would recreate the rejection.
 * ─────────────────────────────────────────────────────────────────── */

const DOES: { title: string; body: string }[] = [
  {
    title: "Reads the paperwork you already have",
    body: "Import contracts, quotes, and pricing schedules from Google Drive or by upload, and connect the supplier email threads where the real terms get agreed.",
  },
  {
    title: "Extracts the commercial terms",
    body: "Unit prices, renewal and termination dates, notice periods, escalators, committed volumes — pulled out of the documents and attached to the supplier record.",
  },
  {
    title: "Tells you when the terms are broken",
    body: "Flags invoices billed above the contracted rate, warns before a contract auto-renews, and drafts the supplier reply for a person to review and send.",
  },
];

export default function WhatParryDoesSection() {
  return (
    <section id="what-parry-does" className="relative py-20 md:py-24 px-6 bg-[var(--ink)] scroll-mt-24">
      <div aria-hidden className="absolute inset-0 bg-graph opacity-20 pointer-events-none" />

      <div className="relative max-w-[900px] mx-auto">
        <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[var(--fg-3)]">
          What the product does
        </span>
        <h2 className="mt-3 text-[clamp(1.7rem,3.2vw,2.4rem)] leading-[1.2] tracking-tight font-medium text-[var(--fg)]">
          Parry is an AI procurement platform for finance and procurement teams.
        </h2>
        <p className="mt-5 text-[1.02rem] md:text-[1.08rem] text-[var(--fg-2)] leading-[1.65] max-w-[760px]">
          Companies sign supplier contracts and then lose track of what they agreed to. The prices,
          renewal dates, and commitments end up buried in PDFs and email threads that nobody rereads
          — so invoices drift above the contracted rate and contracts auto-renew on the supplier&rsquo;s
          terms. Parry reads those documents and threads, pulls the commercial terms out of them, and
          puts them somewhere a buyer can act on.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {DOES.map(({ title, body }, i) => (
            <div
              key={title}
              className="rounded-[var(--radius)] border border-[var(--line-strong)] bg-[var(--surface-2)]/40 p-5"
            >
              <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--fg-4)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-[0.98rem] font-medium text-[var(--fg)] leading-snug">
                {title}
              </h3>
              <p className="mt-2 text-[0.9rem] text-[var(--fg-2)] leading-[1.6]">{body}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-[0.92rem] text-[var(--fg-3)] leading-[1.65]">
          Connecting Google Drive or Gmail is optional and is how the documents and threads get in.{" "}
          <a
            href="#google-data"
            className="text-[var(--blue-bright)] underline underline-offset-2 hover:text-[var(--fg)] transition-colors"
          >
            See exactly what Parry does with Google user data
          </a>
          , or read the{" "}
          <a
            href="/privacy"
            className="text-[var(--blue-bright)] underline underline-offset-2 hover:text-[var(--fg)] transition-colors"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="/terms"
            className="text-[var(--blue-bright)] underline underline-offset-2 hover:text-[var(--fg)] transition-colors"
          >
            Terms of Service
          </a>
          .
        </p>
      </div>
    </section>
  );
}
