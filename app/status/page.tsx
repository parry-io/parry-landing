import React from "react";
import type { Metadata } from "next";
import { DocPage, Meta, Section, P, Ul, Table, Td, TdKey } from "@/components/DocPage";

export const metadata: Metadata = {
  title: "System Status — Parry",
  description:
    "Current operational status of the Parry platform, measured availability, and the incident record.",
  alternates: { canonical: "https://www.parry-io.com/status" },
  robots: { index: true, follow: true },
};

/**
 * Deliberately a static page, not a live dashboard.
 *
 * A live status page needs a data source the browser can reach, which for us
 * would mean exposing a Cloud Monitoring read path to the public internet — a
 * new attack surface, on the marketing site, to display a number that changes
 * a few times a year. The honest trade for a company this size is a page that
 * states the commitment, the last measured figure with its measurement window,
 * and the incident record, updated when either changes.
 *
 * Email is the committed notification channel (see /sla §4). This page is a
 * public record, not the alerting mechanism, and it says so.
 */

const MEASURED = {
  uptime: "99.9919%",
  windowStart: "8 August 2026",
  windowEnd: "16 August 2026",
  monitor: "external HTTP check against app.parry-io.com every 5 minutes, SSL validated",
};

type Incident = {
  date: string;
  severity: string;
  summary: string;
  duration: string;
  resolution: string;
};

/** Empty is a legitimate state and the page renders it honestly. */
const INCIDENTS: Incident[] = [];

export default function StatusPage() {
  return (
    <DocPage
      title="System Status"
      meta={
        <>
          <Meta label="Last Updated" value="16 August 2026" />
          <Meta label="Scope" value="app.parry-io.com and the Parry API" />
        </>
      }
    >
      <div className="mb-10 flex items-center gap-3 rounded-lg border border-[var(--landing-border)]/50 p-5">
        <span
          aria-hidden="true"
          className="inline-block h-3 w-3 shrink-0 rounded-full bg-emerald-400"
        />
        <div>
          <p className="text-lg font-semibold text-[var(--landing-text-primary)]">
            All systems operational
          </p>
          <p className="text-[14px] text-[var(--landing-text-tertiary)]">
            No open incident. Last reviewed 16 August 2026.
          </p>
        </div>
      </div>

      <Section n="1" title="Measured availability">
        <Table head={["Measure", "Value"]}>
          <tr>
            <TdKey>Committed availability</TdKey>
            <Td>
              99.5% monthly — see the{" "}
              <a className="text-[var(--landing-accent-bright)] hover:underline" href="/sla">
                Service Level Agreement
              </a>
            </Td>
          </tr>
          <tr>
            <TdKey>Measured availability</TdKey>
            <Td>
              <strong>{MEASURED.uptime}</strong>
            </Td>
          </tr>
          <tr>
            <TdKey>Measurement window</TdKey>
            <Td>
              {MEASURED.windowStart} – {MEASURED.windowEnd}
            </Td>
          </tr>
          <tr>
            <TdKey>How it is measured</TdKey>
            <Td>{MEASURED.monitor}</Td>
          </tr>
        </Table>
        <P>
          The measurement window begins on the date continuous external monitoring was
          established. We publish the window rather than an all-time figure, because a
          percentage without a window is not a measurement.
        </P>
      </Section>

      <Section n="2" title="Incident record">
        {INCIDENTS.length === 0 ? (
          <>
            <P>
              <strong>No incidents have been recorded.</strong> This page has recorded incidents
              since 16 August 2026; an empty record means none has occurred in that period, not
              that none is tracked.
            </P>
            <P>
              Every Severity 1 and 2 incident is published here with its date, duration and
              resolution, and a root cause analysis is provided for every Severity 1 incident
              within five business days.
            </P>
          </>
        ) : (
          <Table head={["Date", "Severity", "Summary", "Duration", "Resolution"]}>
            {INCIDENTS.map((i) => (
              <tr key={i.date + i.summary}>
                <TdKey>{i.date}</TdKey>
                <Td>{i.severity}</Td>
                <Td>{i.summary}</Td>
                <Td>{i.duration}</Td>
                <Td>{i.resolution}</Td>
              </tr>
            ))}
          </Table>
        )}
      </Section>

      <Section n="3" title="How you will hear about an incident">
        <P>
          <strong>Email is the committed channel.</strong> If an incident affects availability, we
          notify each customer&rsquo;s designated administrative contact by email — within 30
          minutes of confirmation for Severity 1 and 2 — and keep updating on the cadence in the
          SLA until it is resolved.
        </P>
        <P>
          This page is the public record of what happened. Do not treat it as the alert: it is
          updated alongside the email, not instead of it.
        </P>
        <Ul>
          <li>Scheduled maintenance is announced by email at least 48 hours in advance.</li>
          <li>
            To change who receives incident notifications for your organisation, email{" "}
            <a
              className="text-[var(--landing-accent-bright)] hover:underline"
              href="mailto:support@parry-io.com"
            >
              support@parry-io.com
            </a>
            .
          </li>
        </Ul>
      </Section>

      <Section n="4" title="Underlying resilience">
        <P>
          Availability is not only monitored; it is designed for. The primary database runs with a
          synchronous standby in a second availability zone, point-in-time recovery is
          continuously available, and 35 days of automated backups are retained.
        </P>
        <P>
          Recovery is tested, not assumed. The most recent restore drill —{" "}
          <strong>16 August 2026</strong> — recovered the primary datastore to an arbitrary
          point in time in <strong>9.6 minutes against a 60-minute objective</strong>. The wider
          control environment is described in{" "}
          <a className="text-[var(--landing-accent-bright)] hover:underline" href="/trust">
            Trust &amp; Security
          </a>
          .
        </P>
      </Section>
    </DocPage>
  );
}
