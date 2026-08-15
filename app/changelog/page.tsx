import React from "react";
import type { Metadata } from "next";
import { DocPage, Meta, P } from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Changelog — Parry",
  description:
    "What changed in the Parry platform, by date. Significant changes are also communicated to customers by email.",
  alternates: { canonical: "https://www.parry-io.com/changelog" },
  robots: { index: true, follow: true },
};

type Entry = {
  date: string;
  significant?: boolean;
  items: { title: string; body: string }[];
};

/**
 * Customer-visible changes only. Internal refactors, test and CI work do not
 * appear here — the rule for what qualifies as a "significant" change, and how
 * it is communicated, is in the customer notification policy.
 */
const ENTRIES: Entry[] = [
  {
    date: "August 14, 2026",
    items: [
      {
        title: "More reliable document analysis",
        body:
          "A contract whose analysis failed can now be re-submitted straight from chat instead of appearing stuck, and a failed run no longer produces an empty deal record with no supplier or value.",
      },
      {
        title: "Duplicate uploads caught earlier",
        body:
          "Uploading the same document twice — from any entry point — is now detected before a second analysis is dispatched, so you are not billed twice for the same work and the pipeline does not fork.",
      },
    ],
  },
  {
    date: "August 12, 2026",
    significant: true,
    items: [
      {
        title: "Original documents are always kept",
        body:
          "Every route that accepts a document — upload, batch upload, chat, email scan, and connected cloud storage — now stores the original file and records that it did. Previously some routes read a document for context and discarded it, so the source was not available to open later.",
      },
      {
        title: "Erasure now covers draft revisions",
        body:
          "A GDPR erasure request now removes draft revision history along with the rest of the record, and the disposition is recorded in the register.",
      },
    ],
  },
  {
    date: "August 11, 2026",
    significant: true,
    items: [
      {
        title: "Open the contract behind a finding",
        body:
          "The source document can now be opened and downloaded from the deal view and from an approval card. If Parry prices a clause, you can read that clause.",
      },
      {
        title: "Contracts dropped into chat run the full pipeline",
        body:
          "A contract attached in chat now goes through the same analysis as any other intake path — findings, opportunity, and supplier context — rather than being read for context and discarded.",
      },
      {
        title: "Deal detail reads as a statement",
        body:
          "The deal screen was rebuilt to read as an audited record: figures in a single ink colour, plain-language event descriptions instead of internal event keys, and empty fields that say what is actually missing.",
      },
    ],
  },
  {
    date: "August 9, 2026",
    items: [
      {
        title: "Batch upload survives a refresh",
        body:
          "Refreshing the page during a batch upload no longer loses the batch, and a batch where nothing was actionable now says so explicitly instead of appearing to have failed.",
      },
      {
        title: "Clearer opportunity pipeline",
        body:
          "Pipeline stage tiles are readable against the light theme, and each stage action now states what it will do before you take it.",
      },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <DocPage
      title="Changelog"
      meta={
        <>
          <Meta label="Last Updated" value="August 16, 2026" />
          <Meta label="Scope" value="Customer-visible changes to the Parry platform" />
        </>
      }
    >
      <div className="mb-10 space-y-4">
        <P>
          This page records changes to the Parry platform that affect what customers see or do.
          Changes marked <strong className="text-[var(--landing-accent-bright)]">significant</strong>{" "}
          are additionally communicated by email to each customer&rsquo;s designated contact, in
          line with our customer notification policy.
        </P>
        <P>
          Availability incidents are not recorded here — those are posted on the status page and
          covered by our{" "}
          <a className="text-[var(--landing-accent-bright)] hover:underline" href="/sla">
            Service Level Agreement
          </a>
          .
        </P>
      </div>

      {ENTRIES.map((entry) => (
        <section key={entry.date} className="mb-12 scroll-mt-24">
          <div className="flex flex-wrap items-baseline gap-3 mb-5 pb-3 border-b border-[var(--landing-border)]/40">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--landing-text-primary)]">
              {entry.date}
            </h2>
            {entry.significant ? (
              <span className="text-[11px] uppercase tracking-[0.14em] font-semibold px-2 py-0.5 rounded border border-[var(--landing-accent)]/40 text-[var(--landing-accent-bright)]">
                Significant — customers notified
              </span>
            ) : null}
          </div>
          <div className="space-y-5">
            {entry.items.map((item) => (
              <div key={item.title}>
                <h3 className="text-lg font-semibold text-[var(--landing-text-primary)] mb-1">
                  {item.title}
                </h3>
                <p className="text-[15px]">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </DocPage>
  );
}
