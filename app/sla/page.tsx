import React from "react";
import type { Metadata } from "next";
import { DocPage, Meta, Section, H3, P, Ul, Table, Td, TdKey } from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Service Level Agreement — Parry",
  description:
    "Parry's availability commitment, measurement method, support response targets, incident communication and service credits.",
  alternates: { canonical: "https://www.parry-io.com/sla" },
  robots: { index: true, follow: true },
};

export default function SlaPage() {
  return (
    <DocPage
      title="Service Level Agreement"
      meta={
        <>
          <Meta label="Effective Date" value="August 16, 2026" />
          <Meta label="Version" value="1.0" />
          <Meta label="Applies to" value="app.parry-io.com and the Parry API" />
        </>
      }
    >
      <Section n="1" title="Availability commitment">
        <P>
          Parry commits to a <strong>Monthly Uptime Percentage of at least 99.5%</strong> for the
          Parry application and API.
        </P>
        <P>
          99.5% allows approximately 3 hours 39 minutes of unavailability in a 30-day month. This
          commitment applies to customers on a paid subscription and forms part of the customer
          agreement.
        </P>
      </Section>

      <Section n="2" title="How uptime is measured">
        <P>
          Monthly Uptime Percentage is calculated per calendar month as:
        </P>
        <P>
          <code className="text-[var(--landing-text-primary)]">
            (total minutes in the month − Downtime minutes) ÷ total minutes in the month × 100
          </code>
        </P>
        <H3>Definitions</H3>
        <Ul>
          <li>
            <strong>Downtime</strong> — a period in which the service returns errors, or fails to
            respond, to requests that would otherwise succeed, as observed by our external
            availability monitoring.
          </li>
          <li>
            <strong>Measurement</strong> — availability is measured by an independent external
            monitor that requests the service on a fixed interval from outside our infrastructure.
            Two consecutive failed checks open a Downtime period; the first successful check closes
            it.
          </li>
        </Ul>
        <H3>Exclusions</H3>
        <P>The following do not count as Downtime:</P>
        <Ul>
          <li>
            <strong>Scheduled maintenance</strong>, announced at least 48 hours in advance and
            performed outside 08:00–20:00 Central European Time on business days.
          </li>
          <li>Factors outside our reasonable control, including a customer&rsquo;s own network or equipment.</li>
          <li>Failures of a third-party service the customer has connected to Parry, on that third party&rsquo;s side.</li>
          <li>Suspension of an account for non-payment or for breach of the customer agreement.</li>
          <li>Use of beta or preview features that are labelled as such.</li>
        </Ul>
      </Section>

      <Section n="3" title="Support response targets">
        <P>
          Support is available by email at{" "}
          <a className="text-[var(--landing-accent-bright)] hover:underline" href="mailto:support@parry-io.com">
            support@parry-io.com
          </a>{" "}
          during business hours, 09:00–18:00 Israel Standard Time, Sunday to Thursday, excluding
          Israeli public holidays. Severity 1 incidents are handled outside those hours.
        </P>
        <Table head={["Severity", "Definition", "First response", "Update cadence"]}>
          <tr>
            <TdKey>1 — Critical</TdKey>
            <Td>The service is unavailable, or customer data is at risk, for all users</Td>
            <Td>2 hours, 24×7</Td>
            <Td>Every 4 hours until resolved</Td>
          </tr>
          <tr>
            <TdKey>2 — High</TdKey>
            <Td>A core function is unusable and there is no workaround</Td>
            <Td>1 business day</Td>
            <Td>Daily</Td>
          </tr>
          <tr>
            <TdKey>3 — Normal</TdKey>
            <Td>A function is impaired, or a workaround exists</Td>
            <Td>2 business days</Td>
            <Td>As progress is made</Td>
          </tr>
          <tr>
            <TdKey>4 — Low</TdKey>
            <Td>Question, documentation issue, or feature request</Td>
            <Td>5 business days</Td>
            <Td>As progress is made</Td>
          </tr>
        </Table>
        <P>
          First-response targets are the time to a substantive human reply, not an automated
          acknowledgement.
        </P>
      </Section>

      <Section n="4" title="Incident communication">
        <P>
          When an incident affects availability, we notify each customer&rsquo;s designated
          administrative contact <strong>by email</strong>. Email is the committed channel.
        </P>
        <Ul>
          <li>Severity 1 and 2 incidents are notified within 30 minutes of confirmation.</li>
          <li>Updates follow the cadence in section 3 until the incident is resolved.</li>
          <li>
            A root cause analysis is provided for every Severity 1 incident within five business
            days of resolution.
          </li>
        </Ul>
      </Section>

      <Section n="5" title="Service credits">
        <P>
          If Monthly Uptime Percentage falls below the commitment, an affected customer may request
          a service credit against the following month&rsquo;s fees.
        </P>
        <Table head={["Monthly Uptime Percentage", "Service credit"]}>
          <tr><TdKey>Below 99.5% but at or above 99.0%</TdKey><Td>10% of the monthly fee</Td></tr>
          <tr><TdKey>Below 99.0% but at or above 95.0%</TdKey><Td>25% of the monthly fee</Td></tr>
          <tr><TdKey>Below 95.0%</TdKey><Td>50% of the monthly fee</Td></tr>
        </Table>
        <P>
          Credits must be requested within 30 days of the end of the affected month, by email to
          support, and are the sole and exclusive remedy for any failure to meet this commitment.
        </P>
      </Section>

      <Section n="6" title="Data durability and recovery">
        <P>
          Independently of availability, Parry maintains the following recovery objectives for
          customer data:
        </P>
        <Table head={["Objective", "Target"]}>
          <tr><TdKey>Recovery Point Objective (RPO)</TdKey><Td>1 hour — point-in-time recovery is continuously available</Td></tr>
          <tr><TdKey>Recovery Time Objective (RTO)</TdKey><Td>4 hours for a full restore of the primary datastore</Td></tr>
          <tr><TdKey>Backup retention</TdKey><Td>35 days of automated daily backups</Td></tr>
          <tr><TdKey>Redundancy</TdKey><Td>Synchronous standby in a second availability zone</Td></tr>
        </Table>
        <P>
          Recovery procedures are documented and tested at least annually. See{" "}
          <a className="text-[var(--landing-accent-bright)] hover:underline" href="/trust">
            Trust &amp; Security
          </a>{" "}
          for the wider control environment.
        </P>
      </Section>

      <Section n="7" title="Changes to this agreement">
        <P>
          We may update this SLA. Where a change reduces a commitment, we give affected customers
          at least 30 days&rsquo; notice by email before it takes effect. The version and effective
          date at the top of this page always reflect the current agreement.
        </P>
      </Section>
    </DocPage>
  );
}
