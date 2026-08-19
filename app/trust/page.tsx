import React from "react";
import type { Metadata } from "next";
import { DocPage, Meta, Section, H3, P, Ul, Table, Td, TdKey } from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Trust & Security — Parry",
  description:
    "How the Parry platform works, what data it processes, where that data lives, and the security controls that protect it.",
  alternates: { canonical: "https://www.parry-io.com/trust" },
  robots: { index: true, follow: true },
};

export default function TrustPage() {
  return (
    <DocPage
      title="Trust & Security"
      meta={
        <>
          <Meta label="Last Updated" value="August 16, 2026" />
          <Meta label="Owner" value="Tomer Bar, Security Officer" />
          <Meta label="Review cadence" value="Annual" />
        </>
      }
    >
      <Section n="1" title="What Parry is">
        <P>
          Parry is an AI execution and control layer for enterprise procurement. It ingests a
          customer&rsquo;s contracts, order forms, invoices and supplier correspondence, extracts the
          commercial terms, identifies risk and savings opportunities, and drafts and tracks
          supplier negotiations.
        </P>
        <P>
          Parry.io Ltd. is an Israeli company (registration number 517334017) registered at
          Ein Harod 4/2, Tel Aviv-Yafo, Israel.
        </P>
      </Section>

      <Section n="2" title="The system and its boundary">
        <P>
          The system covered by this page, and by our SOC 2 examination, consists of:
        </P>
        <Ul>
          <li>
            <strong>The Parry application</strong> — the web application at{" "}
            <strong>app.parry-io.com</strong>, its API, its background workers, and the databases
            behind them.
          </li>
          <li>
            <strong>The supporting infrastructure</strong> — the Google Cloud project that hosts
            it, defined and changed through infrastructure-as-code.
          </li>
        </Ul>
        <P>
          The following are <strong>outside</strong> that boundary: the marketing website you are
          reading now, internal demonstration environments, and the browser extension for live
          call assistance.
        </P>
      </Section>

      <Section n="3" title="What data Parry processes">
        <Table head={["Category", "Examples", "Where it is stored"]}>
          <tr>
            <TdKey>Customer commercial documents</TdKey>
            <Td>Contracts, order forms, invoices, renewal notices</Td>
            <Td>Cloud Storage and PostgreSQL, EU region</Td>
          </tr>
          <tr>
            <TdKey>Derived commercial data</TdKey>
            <Td>Extracted terms, pricing, supplier entities, findings</Td>
            <Td>PostgreSQL and a graph database</Td>
          </tr>
          <tr>
            <TdKey>User identity</TdKey>
            <Td>Name, work email, organisation membership, role</Td>
            <Td>Held by our identity provider; Parry stores no passwords</Td>
          </tr>
          <tr>
            <TdKey>Integration credentials</TdKey>
            <Td>OAuth tokens for connected mail and storage accounts</Td>
            <Td>Encrypted at the field level before they reach the database</Td>
          </tr>
          <tr>
            <TdKey>Operational telemetry</TdKey>
            <Td>Audit logs, error traces, performance metrics</Td>
            <Td>Cloud Logging, an append-only audit table, and Sentry</Td>
          </tr>
        </Table>
      </Section>

      <Section n="4" title="Where data lives">
        <P>
          <strong>All customer data is stored and processed in the European Union.</strong> The
          application, its databases, its workers and its object storage run in Google Cloud&rsquo;s{" "}
          <strong>europe-west3 (Frankfurt)</strong> region. Backups remain in the same region.
        </P>
        <H3>Where inference runs</H3>
        <P>
          Parry uses large language models to read and reason about documents. Inference is the
          one part of the pipeline whose location is not automatically the same as storage, so it
          is worth stating precisely rather than folding into the sentence above.
        </P>
        <P>
          <strong>Inference runs in the European Union.</strong> Model calls are routed to the
          provider&rsquo;s EU multi-region endpoint, in the same jurisdiction as the data at rest.
        </P>
        <Table head={["Mode", "Where inference runs", "If no EU provider is available"]}>
          <tr>
            <TdKey>EU residency</TdKey>
            <Td>EU-resident inference endpoints only.</Td>
            <Td>
              Parry <strong>refuses to process</strong> rather than routing outside the EU — the
              control fails closed, never open.
            </Td>
          </tr>
          <tr>
            <TdKey>Standard</TdKey>
            <Td>
              The provider&rsquo;s global endpoint, which carries no residency guarantee.
            </Td>
            <Td>Not applicable — no residency restriction is applied.</Td>
          </tr>
        </Table>
        <P>
          The residency control is enforced in code rather than by configuration convention: when
          it is on, every non-EU provider is filtered out of the routing chain before a request is
          made, and a request left with no eligible provider raises an error instead of falling
          back to one outside the EU.
        </P>
        <P>
          <strong>If your organisation requires contractually guaranteed EU-only processing, raise
          it before you sign.</strong> We will state in writing which mode your deployment runs in
          and what we can and cannot guarantee, rather than have you discover it later.
        </P>
        <P>
          Document text sent for inference is transient. It is not retained by the model provider
          and is not used to train models, under the terms of our agreement with them.
        </P>
      </Section>

      <Section n="5" title="Security controls">
        <H3>Encryption</H3>
        <Ul>
          <li>
            <strong>In transit:</strong> TLS 1.3 between customers and the platform, with HSTS
            preloaded. Database connections accept encrypted connections only.
          </li>
          <li>
            <strong>At rest:</strong> AES-256 on all storage and database volumes.
          </li>
          <li>
            <strong>Field level:</strong> OAuth tokens and other sensitive fields are encrypted by
            the application before they are written, so they are unreadable even with database
            access.
          </li>
        </Ul>

        <H3>Access and tenant isolation</H3>
        <Ul>
          <li>
            Authentication is delegated to a dedicated identity provider. Parry never stores
            customer passwords.
          </li>
          <li>
            Every request is authorised against the caller&rsquo;s organisation, and the database
            enforces row-level security independently of the application — a query that omits the
            tenant context returns nothing rather than everything.
          </li>
          <li>
            Production access is restricted to authorised personnel with multi-factor
            authentication. Changes to production access raise an alert.
          </li>
        </Ul>

        <H3>Network</H3>
        <Ul>
          <li>A web application firewall with the OWASP core rule set in front of the platform.</li>
          <li>Per-IP rate limiting on the API, and automated blocking of known scanning tools.</li>
          <li>
            The application backend is not reachable from the public internet directly; the
            database has no public IP address at all.
          </li>
        </Ul>

        <H3>Software development</H3>
        <Ul>
          <li>
            Every production change goes through a pull request with review, a linked change
            ticket, and cryptographically signed commits.
          </li>
          <li>
            Automated tests, static analysis, dependency scanning, container scanning and secret
            scanning all run before a change can merge, and a failure blocks the merge.
          </li>
          <li>Deployment to production is a deliberate, separately authorised action.</li>
        </Ul>

        <H3>Monitoring and resilience</H3>
        <Ul>
          <li>Append-only audit logging with tamper detection on every security-relevant action.</li>
          <li>Alerting on availability, authentication anomalies and access changes.</li>
          <li>
            The primary database runs with a synchronous standby in a second availability zone,
            with point-in-time recovery and 35 days of retained backups.
          </li>
        </Ul>
      </Section>

      <Section n="6" title="Sub-processors">
        <P>
          These providers process customer data on our behalf. Each is under a data processing
          agreement, and the list is reviewed at least annually.
        </P>
        <Table head={["Provider", "Purpose", "Region"]}>
          <tr><TdKey>Google Cloud</TdKey><Td>Hosting, database, storage, logging</Td><Td>EU (europe-west3)</Td></tr>
          <tr><TdKey>Anthropic (via Google Vertex AI)</TdKey><Td>Language-model inference over document text</Td><Td>EU (Vertex EU multi-region)</Td></tr>
          <tr><TdKey>Google Vertex AI</TdKey><Td>Language-model inference (primary and only route)</Td><Td>EU (Vertex EU multi-region)</Td></tr>
          <tr><TdKey>WorkOS</TdKey><Td>Authentication, single sign-on, multi-factor</Td><Td>United States</Td></tr>
          <tr><TdKey>Voyage AI</TdKey><Td>Text embeddings for retrieval</Td><Td>United States</Td></tr>
          <tr><TdKey>Neo4j Aura</TdKey><Td>Managed graph database for supplier relationships</Td><Td>EU</Td></tr>
          <tr><TdKey>Stripe</TdKey><Td>Billing</Td><Td>United States</Td></tr>
          <tr><TdKey>Sentry</TdKey><Td>Error monitoring (scrubbed traces)</Td><Td>United States</Td></tr>
        </Table>
        <P>
          Transfers outside the EEA rely on the European Commission&rsquo;s Standard Contractual
          Clauses. Full detail is in our{" "}
          <a className="text-[var(--landing-accent-bright)] hover:underline" href="/privacy">
            Privacy Policy
          </a>
          .
        </P>
      </Section>

      <Section n="7" title="Compliance">
        <Ul>
          <li>
            <strong>SOC 2</strong> — an examination is in progress with Kost Forer Gabbay &amp;
            Kasierer, a member firm of Ernst &amp; Young Global Limited, covering the Security and
            Confidentiality trust services criteria. A confirmation letter is available to
            customers and prospects on request.
          </li>
          <li>
            <strong>GDPR</strong> — Parry acts as a data processor under Article 28 for customer
            data. We offer a data processing agreement, maintain records of processing, and
            support data subject access and erasure requests.
          </li>
          <li>
            <strong>Penetration testing</strong> — the platform is tested by an independent
            external party on an annual basis.
          </li>
        </Ul>
      </Section>

      <Section n="8" title="Data retention and deletion">
        <P>
          Customer data is retained for the life of the customer agreement. On termination, or on
          a documented request, customer confidential information is disposed of according to our
          data disposal procedure. Individual erasure requests are handled through the same
          mechanism and cover derived data, not only the original document.
        </P>
      </Section>

      <Section n="9" title="Reporting a security issue">
        <P>
          If you believe you have found a vulnerability, email{" "}
          <a className="text-[var(--landing-accent-bright)] hover:underline" href="mailto:security@parry-io.com">
            security@parry-io.com
          </a>
          . We will acknowledge within one business day. Please give us a reasonable opportunity to
          remediate before any public disclosure. We do not pursue legal action against researchers
          who act in good faith and do not access, modify or destroy customer data.
        </P>
        <P>
          For availability commitments and support response targets, see our{" "}
          <a className="text-[var(--landing-accent-bright)] hover:underline" href="/sla">
            Service Level Agreement
          </a>
          .
        </P>
      </Section>
    </DocPage>
  );
}
