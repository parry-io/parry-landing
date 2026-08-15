import React from "react";
import type { Metadata } from "next";
import { DocPage, Meta, P, Ul } from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Careers — Parry",
  description:
    "Open positions at Parry.io Ltd., with full job descriptions. Small team, Tel Aviv, enterprise procurement AI.",
  alternates: { canonical: "https://www.parry-io.com/careers" },
  robots: { index: true, follow: true },
};

type Role = {
  id: string;
  title: string;
  team: string;
  location: string;
  type: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
};

/**
 * Set to [] when nothing is open — the page then states that plainly rather
 * than advertising a role that does not exist. Every role listed here must be
 * one we would actually hire for today.
 */
const OPEN_ROLES: Role[] = [
  {
    id: "founding-engineer",
    title: "Founding Engineer",
    team: "Engineering",
    location: "Tel Aviv (hybrid)",
    type: "Full-time",
    about:
      "Parry reads a company's contracts, invoices and supplier correspondence, works out what is being overpaid, and runs the negotiation to fix it. You would be the first engineering hire, working directly with the founder across the whole system — ingestion, the analysis pipeline, the retrieval layer, and the product surface that a procurement lead actually reads.",
    responsibilities: [
      "Own features end to end, from the data model through the API to the screen.",
      "Work on the document pipeline: extraction, classification, deduplication, and the commercial reasoning built on top of it.",
      "Improve retrieval quality against a real evaluation harness, not by impression.",
      "Hold the production system: instrumentation, alerting, and the on-call response when something breaks.",
      "Review changes, and keep the change-management and security controls the company is audited against intact.",
    ],
    requirements: [
      "4+ years building production backend systems, with real ownership of what you shipped.",
      "Strong Python and SQL. Comfortable in a typed TypeScript frontend when the feature needs it.",
      "Experience with PostgreSQL at a level beyond ORM defaults — indexes, transactions, and why a query is slow.",
      "You write tests that would fail if the behaviour regressed, and you can tell when a test is not doing that.",
      "Direct, evidence-led communication. You would rather be corrected early than be right late.",
    ],
    niceToHave: [
      "Applied LLM work: evaluation, retrieval, prompt and pipeline design under cost and latency constraints.",
      "Google Cloud, Terraform, or GitHub Actions at a level where you have debugged them.",
      "Procurement, finance, or contract-heavy domain experience.",
      "Having worked somewhere with a real compliance regime — SOC 2, ISO 27001 — and understanding why the controls exist.",
    ],
  },
];

export default function CareersPage() {
  return (
    <DocPage
      title="Careers"
      meta={
        <>
          <Meta label="Last Updated" value="August 16, 2026" />
          <Meta label="Location" value="Tel Aviv, Israel" />
          <Meta label="Contact" value="careers@parry-io.com" />
        </>
      }
    >
      <div className="mb-12 space-y-4">
        <P>
          Parry is a small team in Tel Aviv building the execution layer for enterprise
          procurement. We work on a system where being wrong is expensive — the product tells a
          CFO how much money was left on the table — so we care a great deal about evidence,
          precision, and saying what is actually true.
        </P>
        <P>
          To apply, email{" "}
          <a className="text-[var(--landing-accent-bright)] hover:underline" href="mailto:careers@parry-io.com">
            careers@parry-io.com
          </a>{" "}
          with the role in the subject line and anything that shows how you work — code, writing,
          a system you designed. A CV is fine; a CV alone tells us less.
        </P>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-[var(--landing-text-primary)] mb-6">
        Open positions
      </h2>

      {OPEN_ROLES.length === 0 ? (
        <P>
          We have no open positions at the moment. If you think you should be working here anyway,
          write to{" "}
          <a className="text-[var(--landing-accent-bright)] hover:underline" href="mailto:careers@parry-io.com">
            careers@parry-io.com
          </a>{" "}
          and tell us why.
        </P>
      ) : (
        OPEN_ROLES.map((role) => (
          <section
            key={role.id}
            id={role.id}
            className="mb-12 scroll-mt-24 border border-[var(--landing-border)]/50 rounded-lg p-6"
          >
            <h3 className="text-xl md:text-2xl font-bold text-[var(--landing-text-primary)] mb-2">
              {role.title}
            </h3>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-[var(--landing-text-tertiary)] mb-5">
              <span>{role.team}</span>
              <span>{role.location}</span>
              <span>{role.type}</span>
            </div>

            <p className="text-[15px] mb-5">{role.about}</p>

            <h4 className="text-base font-semibold text-[var(--landing-text-primary)] mt-6 mb-2">
              What you would do
            </h4>
            <Ul>
              {role.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </Ul>

            <h4 className="text-base font-semibold text-[var(--landing-text-primary)] mt-6 mb-2">
              What we are looking for
            </h4>
            <Ul>
              {role.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </Ul>

            <h4 className="text-base font-semibold text-[var(--landing-text-primary)] mt-6 mb-2">
              Nice to have
            </h4>
            <Ul>
              {role.niceToHave.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </Ul>

            <div className="mt-7">
              <a
                href={`mailto:careers@parry-io.com?subject=${encodeURIComponent(role.title)}`}
                className="inline-block text-sm font-semibold px-4 py-2 rounded border border-[var(--landing-accent)]/50 text-[var(--landing-accent-bright)] hover:bg-[var(--landing-accent)]/10 transition-colors"
              >
                Apply for {role.title}
              </a>
            </div>
          </section>
        ))
      )}

      <section className="mt-12 pt-8 border-t border-[var(--landing-border)]/50">
        <h2 className="text-xl font-bold text-[var(--landing-text-primary)] mb-4">
          How we hire
        </h2>
        <Ul>
          <li>A conversation with the founder about what you have built and what you want to build.</li>
          <li>A technical discussion on a real problem from our system — no whiteboard puzzles.</li>
          <li>A paid work sample, scoped to about a day.</li>
          <li>References, and an offer.</li>
        </Ul>
        <p className="text-[15px] mt-4">
          New employees sign an employment agreement covering confidentiality and intellectual
          property, complete a documented onboarding process including security training, and are
          issued a managed, encrypted device.
        </p>
      </section>
    </DocPage>
  );
}
