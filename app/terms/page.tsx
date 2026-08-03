import React from "react";
import type { Metadata } from "next";

/* Terms of Service — published so the OAuth consent screen has a stable,
 * same-domain Terms URL alongside the Privacy Policy, and so the homepage
 * "How Parry uses Google user data" section can link to it.
 *
 * These terms are the baseline public terms for the website and for
 * evaluation/pilot access. Negotiated enterprise agreements (MSA + DPA)
 * take precedence for paying customers — see section 1.
 * NOTE: reviewed by counsel before being relied on contractually. */

export const metadata: Metadata = {
  title: "Terms of Service — Parry",
  description:
    "The terms governing access to and use of Parry.io Ltd.'s website, web application, and integrations.",
  alternates: { canonical: "https://www.parry-io.com/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="landing-page landing-grid-bg min-h-screen antialiased selection:bg-blue-500/30 selection:text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--landing-bg)]/80 backdrop-blur-xl border-b border-[var(--landing-border)]/50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <img
              src="/Parry_Logo.png"
              className="h-7 group-hover:rotate-12 transition-transform duration-300"
              alt="Parry"
            />
            <span className="text-base font-black tracking-tight uppercase text-[var(--landing-text-primary)]">
              Parry
            </span>
          </a>
          <a
            href="/"
            className="text-sm font-semibold text-[var(--landing-text-secondary)] hover:text-[var(--landing-text-primary)] transition-colors"
          >
            ← Back to home
          </a>
        </div>
      </nav>

      <main className="pt-28 pb-20 px-6">
        <article className="max-w-3xl mx-auto text-[var(--landing-text-secondary)] leading-relaxed">
          <header className="mb-12 pb-8 border-b border-[var(--landing-border)]/50">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--landing-text-primary)] mb-4">
              Terms of Service
            </h1>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[var(--landing-text-tertiary)]">
              <span><strong className="text-[var(--landing-text-secondary)]">Last Updated:</strong> August 3, 2026</span>
              <span><strong className="text-[var(--landing-text-secondary)]">Effective Date:</strong> August 3, 2026</span>
              <span><strong className="text-[var(--landing-text-secondary)]">Version:</strong> 1.0</span>
            </div>
          </header>

          <Section n="1" title="Who These Terms Apply To">
            <P>
              These Terms of Service (&ldquo;Terms&rdquo;) govern access to and use of the website at
              parry-io.com, the Parry web application, the Parry Chrome extension, and any
              integrations Parry provides (together, the &ldquo;Services&rdquo;). The Services are provided
              by <strong>Parry.io Ltd.</strong>, an Israeli company registered at Ein Harod 4/2,
              Tel Aviv-Yafo, Israel (company number 517334017) (&ldquo;Parry&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;).
            </P>
            <P>
              Parry is a business-to-business service. By accessing the Services you confirm you are
              doing so on behalf of an organisation and that you have authority to bind that
              organisation to these Terms.
            </P>
            <P>
              <strong>Precedence.</strong> Where your organisation has signed a separate written
              agreement with Parry — a master services agreement, order form, or data processing
              addendum — that agreement governs and prevails over these Terms to the extent of any
              conflict. These Terms apply in full to website visitors, evaluation access, pilots,
              and trials where no such agreement is in place.
            </P>
          </Section>

          <Section n="2" title="What the Services Do">
            <P>
              Parry reads contracts, quotes, invoices, and supplier correspondence that your
              organisation provides or grants access to; extracts commercial terms from them; and
              presents analysis, alerts, and drafted supplier communications back to your users.
            </P>
            <P>
              Parry produces <strong>drafts and recommendations</strong>. Except where your
              organisation has explicitly enabled and configured automated actions, a user reviews
              and approves each outbound communication before it is sent. You remain responsible
              for every commercial decision, communication, and commitment made through or informed
              by the Services.
            </P>
          </Section>

          <Section n="3" title="Accounts and Access">
            <Ul>
              <li>Accounts are provisioned to named individuals and must not be shared.</li>
              <li>You are responsible for keeping credentials secure and for activity under your accounts.</li>
              <li>You must notify us promptly at <a className="text-[var(--landing-accent-bright)] hover:underline" href="mailto:security@parry-io.com">security@parry-io.com</a> of any suspected unauthorised access.</li>
              <li>We may suspend access where necessary to protect the Services, other customers, or to comply with law.</li>
            </Ul>
          </Section>

          <Section n="4" title="Your Data">
            <P>
              Your organisation retains all rights in the contracts, documents, messages, and other
              content it submits to or connects with the Services (&ldquo;Customer Data&rdquo;). You grant
              Parry a limited licence to host, process, and transmit Customer Data solely to provide
              and support the Services.
            </P>
            <P>
              We do <strong>not</strong> use Customer Data to train our own AI models or those of any
              third-party model provider. Handling of personal data is described in the{" "}
              <a className="text-[var(--landing-accent-bright)] hover:underline" href="/privacy">Privacy Policy</a>,
              which forms part of these Terms.
            </P>
            <P>
              You are responsible for ensuring you have the right to submit Customer Data to the
              Services, including any consents or notices required from third parties whose
              information appears in contracts or correspondence you connect.
            </P>
          </Section>

          <Section n="5" title="Third-Party Integrations, Including Google">
            <P>
              The Services can connect to third-party systems at your instruction — including Google
              Workspace (Gmail and Google Drive), Microsoft, and document and finance platforms.
              Connecting an integration is optional and is initiated by your users.
            </P>
            <P>
              When you connect a Google account, Parry requests only the scopes needed to provide the
              features described on our{" "}
              <a className="text-[var(--landing-accent-bright)] hover:underline" href="/#google-data">homepage</a>{" "}
              and in <a className="text-[var(--landing-accent-bright)] hover:underline" href="/privacy#section-9">Privacy Policy section 9.5</a>.
              Parry&rsquo;s use of information received from Google APIs adheres to the{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--landing-accent-bright)] hover:underline"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements. You may disconnect an integration at any time
              from Parry&rsquo;s settings, or revoke Parry&rsquo;s access at{" "}
              <a
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--landing-accent-bright)] hover:underline"
              >
                myaccount.google.com/permissions
              </a>.
            </P>
            <P>
              Third-party systems are operated by their providers under their own terms. We are not
              responsible for their availability, and an integration may stop working if a provider
              changes or withdraws its API.
            </P>
          </Section>

          <Section n="6" title="Acceptable Use">
            <P>You must not, and must not permit anyone to:</P>
            <Ul>
              <li>Use the Services in breach of applicable law, or to infringe anyone&rsquo;s rights.</li>
              <li>Submit content you are not authorised to submit, or connect an account you do not control.</li>
              <li>Probe, scan, or attempt to breach the Services or circumvent access controls, except under a security testing engagement agreed with us in writing.</li>
              <li>Reverse engineer, decompile, or attempt to derive the source code or models underlying the Services.</li>
              <li>Resell, sublicense, or provide the Services to third parties as a bureau service.</li>
              <li>Use the Services to send unsolicited bulk email or to impersonate any person.</li>
              <li>Introduce malware, or use the Services in a way that degrades them for others.</li>
            </Ul>
          </Section>

          <Section n="7" title="AI-Generated Output">
            <P>
              The Services use large language models. Output may be incomplete or incorrect, and can
              misread a contract term. Output is <strong>not</strong> legal, tax, accounting, or
              financial advice, and must not be relied on as the sole basis for a commercial or legal
              decision. Verify extracted terms against the underlying document before acting on them.
            </P>
          </Section>

          <Section n="8" title="Fees">
            <P>
              Fees, billing periods, and payment terms are set out in the order form or written
              agreement covering your organisation&rsquo;s subscription. Where access is provided for
              evaluation, pilot, or trial purposes without an order form, it is provided free of
              charge and may be withdrawn at any time.
            </P>
          </Section>

          <Section n="9" title="Intellectual Property">
            <P>
              Parry and its licensors own all rights in the Services, including software, models,
              interfaces, and documentation, and in any improvements to them. Nothing in these Terms
              transfers ownership of the Services to you. Feedback you give us may be used without
              restriction or obligation.
            </P>
          </Section>

          <Section n="10" title="Confidentiality">
            <P>
              Each party may receive non-public information from the other. The receiving party will
              protect it with at least reasonable care, use it only to perform under these Terms, and
              disclose it only to personnel and advisers bound by equivalent obligations, or where
              legally compelled.
            </P>
          </Section>

          <Section n="11" title="Availability and Support">
            <P>
              We aim to keep the Services available and to give reasonable notice of planned
              maintenance, but except where an order form or agreement states a service level, the
              Services are provided without a committed uptime guarantee. Support channels and
              response targets, where applicable, are set out in that agreement.
            </P>
          </Section>

          <Section n="12" title="Warranties and Disclaimers">
            <P>
              We warrant that we will provide the Services with reasonable skill and care. Except as
              expressly stated in these Terms or a signed agreement, the Services are provided
              &ldquo;as is&rdquo; and we disclaim all other warranties to the maximum extent permitted by law,
              including implied warranties of merchantability, fitness for a particular purpose, and
              non-infringement. We do not warrant that the Services will be uninterrupted, error-free,
              or that output will be accurate or complete.
            </P>
          </Section>

          <Section n="13" title="Limitation of Liability">
            <P>
              To the maximum extent permitted by law, neither party is liable for indirect,
              incidental, special, consequential, or punitive damages, or for lost profits, revenue,
              or anticipated savings, however caused.
            </P>
            <P>
              Each party&rsquo;s total aggregate liability arising out of or relating to these Terms is
              limited to the greater of (a) the fees paid or payable by your organisation to Parry in
              the twelve months preceding the event giving rise to the claim, and (b) US$1,000.
            </P>
            <P>
              Nothing in these Terms limits liability that cannot be limited by law, including for
              death or personal injury caused by negligence, fraud, or fraudulent misrepresentation.
            </P>
          </Section>

          <Section n="14" title="Indemnity">
            <P>
              You will defend and indemnify Parry against third-party claims arising from Customer
              Data you submitted, from your use of the Services in breach of section 6, or from your
              lack of rights or consents to submit Customer Data.
            </P>
          </Section>

          <Section n="15" title="Term, Suspension, and Termination">
            <P>
              These Terms apply for as long as you access the Services. Either party may terminate an
              unpaid evaluation or trial at any time. Subscriptions terminate as set out in the
              applicable agreement.
            </P>
            <P>
              On termination, access ends and Customer Data is deleted in line with the retention
              windows in the{" "}
              <a className="text-[var(--landing-accent-bright)] hover:underline" href="/privacy#section-6">Privacy Policy, section 6</a>{" "}
              and any agreed post-termination export period. Sections 4, 9, 10, 12, 13, 14, and 16
              survive termination.
            </P>
          </Section>

          <Section n="16" title="Governing Law and Disputes">
            <P>
              These Terms are governed by the laws of the State of Israel, without regard to
              conflict-of-laws rules. The competent courts of Tel Aviv-Yafo have exclusive
              jurisdiction, save that either party may seek injunctive relief in any court of
              competent jurisdiction to protect its intellectual property or confidential
              information. The United Nations Convention on Contracts for the International Sale of
              Goods does not apply.
            </P>
          </Section>

          <Section n="17" title="Changes to These Terms">
            <P>
              We may update these Terms. The &ldquo;Last Updated&rdquo; date reflects the most recent revision.
              Material changes will be notified through a prominent notice on parry-io.com, an
              in-product notice, or direct notification to account administrators. Continued use of
              the Services after a change takes effect constitutes acceptance of the updated Terms.
            </P>
          </Section>

          <Section n="18" title="General">
            <Ul>
              <li><strong>Assignment</strong> — neither party may assign these Terms without the other&rsquo;s consent, except to a successor in a merger, acquisition, or sale of substantially all assets.</li>
              <li><strong>Severability</strong> — if any provision is held unenforceable, the rest remains in force.</li>
              <li><strong>No waiver</strong> — failure to enforce a provision is not a waiver of it.</li>
              <li><strong>Force majeure</strong> — neither party is liable for delay or failure caused by events beyond its reasonable control.</li>
              <li><strong>Entire agreement</strong> — these Terms, the Privacy Policy, and any signed agreement are the entire agreement between the parties on this subject.</li>
            </Ul>
          </Section>

          <Section n="19" title="Contact">
            <Ul>
              <li><strong>General and legal</strong>: <a className="text-[var(--landing-accent-bright)] hover:underline" href="mailto:yehonatan@parry-io.com">yehonatan@parry-io.com</a></li>
              <li><strong>Privacy</strong>: <a className="text-[var(--landing-accent-bright)] hover:underline" href="mailto:privacy@parry-io.com">privacy@parry-io.com</a></li>
              <li><strong>Security</strong>: <a className="text-[var(--landing-accent-bright)] hover:underline" href="mailto:security@parry-io.com">security@parry-io.com</a></li>
              <li><strong>Mail</strong>: Parry.io Ltd., Ein Harod 4/2, Tel Aviv-Yafo, Israel</li>
            </Ul>
          </Section>

          <p className="mt-16 pt-8 border-t border-[var(--landing-border)]/50 text-center text-xs text-[var(--landing-text-tertiary)] italic">
            Parry.io Ltd. — Terms of Service v1.0 — Last Updated August 3, 2026
          </p>
        </article>
      </main>

      <footer className="border-t border-[var(--landing-border)]/50 py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <img src="/Parry_Logo.png" className="h-4" alt="Parry" />
            <span className="text-xs text-[var(--landing-text-tertiary)]">
              &copy; {new Date().getFullYear()} Parry
            </span>
          </div>
          <div className="flex items-center gap-5 text-xs text-[var(--landing-text-tertiary)]">
            <span>Tel Aviv</span>
            <a href="/privacy" className="hover:text-[var(--landing-text-secondary)] transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-[var(--landing-text-secondary)] transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section id={`section-${n}`} className="mb-12 scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--landing-text-primary)] mb-5 flex items-baseline gap-3">
        <span className="text-[var(--landing-accent)] tabular-nums">{n}.</span>
        <span>{title}</span>
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px]">{children}</p>;
}

function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc pl-6 space-y-2 text-[15px] marker:text-[var(--landing-accent)]">
      {children}
    </ul>
  );
}
