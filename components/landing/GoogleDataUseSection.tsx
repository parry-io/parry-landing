"use client";

import React from "react";

/* ───────── What Parry does · Google data use ─────────
 * Plain-language explanation of the app's purpose and how it uses
 * Google account data (Gmail, Drive). Required for Google OAuth
 * verification: the homepage must clearly state the app's purpose
 * and how it uses Google user data. Keep this section public and on
 * the root URL (do not gate behind auth).
 * ───────────────────────────────────────────────────── */

const USES = [
  {
    scope: "Gmail — read (gmail.readonly)",
    why: "to detect active contract and supplier email threads, read their content, and extract deal terms, pricing, and negotiation context.",
  },
  {
    scope: "Gmail — send (gmail.send)",
    why: "to send the negotiation replies and follow-ups that you review and approve, on your behalf.",
  },
  {
    scope: "Google Drive — read-only (drive.readonly)",
    why: "to read the specific contract documents you choose to analyze.",
  },
];

export default function GoogleDataUseSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 md:py-28 px-6 bg-[var(--ink)] overflow-hidden"
    >
      <div className="max-w-[820px] mx-auto">
        <div>
          <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[var(--fg-3)]">
            What Parry does
          </span>
          <h2 className="mt-3 text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-medium text-[var(--fg)]">
            The AI layer that runs your{" "}
            <span className="italic text-[var(--fg-2)]">contract negotiations.</span>
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-[var(--fg-2)]">
            Parry is an AI assistant for procurement, sales, and legal teams. It reads your
            incoming contract and supplier emails, understands the terms and risks, and drafts
            the negotiation replies your team reviews and sends — turning every supplier
            interaction into protected commercial value, without the inbox grind.
          </p>

          <h3 className="mt-12 text-[1.15rem] font-medium text-[var(--fg)]">
            How Parry uses your Google account data
          </h3>
          <p className="mt-3 text-[0.98rem] leading-relaxed text-[var(--fg-2)]">
            When you connect your Google account, Parry requests access only to deliver the
            features above:
          </p>
          <ul className="mt-5 space-y-4">
            {USES.map((u) => (
              <li key={u.scope} className="flex gap-3">
                <span className="mt-2 inline-block w-1 h-1 shrink-0 rounded-full bg-[var(--blue)]" />
                <span className="text-[0.98rem] leading-relaxed text-[var(--fg-2)]">
                  <span className="font-medium text-[var(--fg)]">{u.scope}</span> — {u.why}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-[0.92rem] leading-relaxed text-[var(--fg-3)]">
            Parry uses data received from Google APIs only to provide these
            contract-negotiation and deal-management features. Parry&rsquo;s use of information
            received from Google APIs adheres to the{" "}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[var(--fg)] transition-colors"
            >
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements. We never use Gmail or Drive data for
            advertising, and we never sell it. See our{" "}
            <a href="/privacy" className="underline hover:text-[var(--fg)] transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
