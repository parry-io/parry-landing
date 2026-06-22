import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Parry",
  description:
    "How Parry.io Ltd. collects, uses, shares, and protects personal data across parry-core, parry-realtime, parry-io.com, and the Parry Chrome extension.",
  alternates: { canonical: "https://www.parry-io.com/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[var(--landing-text-tertiary)]">
              <span><strong className="text-[var(--landing-text-secondary)]">Last Updated:</strong> May 29, 2026</span>
              <span><strong className="text-[var(--landing-text-secondary)]">Effective Date:</strong> May 29, 2026</span>
              <span><strong className="text-[var(--landing-text-secondary)]">Version:</strong> 1.0</span>
            </div>
          </header>

          <Section n="1" title="Introduction">
            <P>
              Parry.io Ltd. (&ldquo;Parry&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is an Israeli company registered at Ein Harod 4/2, Tel Aviv-Yafo, Israel (company number 517334017). We provide AI-powered contract intelligence (&ldquo;parry-core&rdquo;) and real-time call-advice (&ldquo;parry-realtime&rdquo;) services to business customers.
            </P>
            <P>
              This Privacy Policy explains how we collect, use, share, and protect personal data in connection with our services, our website at parry-io.com, and the Parry Chrome extension.
            </P>
            <P>
              If you are a user of our services through a customer organization (your employer or another business), please also refer to that organization&rsquo;s own privacy notice — they determine the purposes for which your personal data is processed when using Parry.
            </P>
          </Section>

          <Section n="2" title="Scope of This Policy">
            <P>This Privacy Policy applies to:</P>
            <Ul>
              <li>The Parry website at <strong>parry-io.com</strong>.</li>
              <li>The <strong>Parry web application</strong> (parry-core dashboard and related services).</li>
              <li>The <strong>Parry Chrome extension</strong> distributed via the Chrome Web Store (subject to additional terms in Section 16 — Real-Time Agent Annex).</li>
              <li>Direct communications with Parry (email, sales inquiries, support).</li>
            </Ul>
            <P>
              For most of our services, Parry acts as a <strong>Data Processor under GDPR Article 28</strong> on behalf of our business customers (who are the Data Controllers). Where we collect data directly from end users (e.g., website visitors, contact-form submissions), we act as a Data Controller for that limited processing.
            </P>
          </Section>

          <Section n="3" title="Information We Collect">
            <H3>3.1 Information you provide to us directly</H3>
            <Ul>
              <li><strong>Account information</strong> when you register or are invited to use Parry: name, business email address, organization name, role/title.</li>
              <li><strong>Authentication data</strong>: credentials managed by our identity provider (WorkOS); supported sign-in methods include Google SAML, SSO, and SAML 2.0 federation.</li>
              <li><strong>Communications</strong>: messages you send us through support, sales, or contact forms, including any documents or files you attach.</li>
            </Ul>

            <H3>3.2 Information we process on behalf of our customers (as Processor)</H3>
            <Ul>
              <li><strong>For parry-core</strong>: contract documents and associated metadata that customers upload or grant access to; deal participant identities and contact information embedded in those contracts; derived analyses generated by Parry&rsquo;s AI components.</li>
              <li><strong>For parry-realtime</strong>: voice-derived transcripts of calls the customer records and processes through the service; metadata about call participants (names, times, durations); AI-generated advice content produced during or after the call.</li>
              <li><strong>Configuration data</strong>: tenant settings, user entitlements, integration configurations.</li>
            </Ul>
            <P>We do <strong>not</strong> collect or process special-category personal data (GDPR Art. 9) by design.</P>

            <H3>3.3 Information collected automatically</H3>
            <Ul>
              <li><strong>Usage and telemetry data</strong>: pages visited, features used, performance and error metrics, session timing.</li>
              <li><strong>Technical data</strong>: IP address, browser type and version, device type, operating system, language preferences, referring URLs.</li>
              <li><strong>Cookies and similar technologies</strong>: see Section 12.</li>
            </Ul>

            <H3>3.4 Information from third parties</H3>
            <Ul>
              <li><strong>From your organization&rsquo;s identity provider</strong>, when you sign in using Google SAML, Microsoft Entra, Okta, or another SSO/SAML provider — typically your name, email, and group memberships.</li>
              <li><strong>From integrated services</strong>, where your organization has authorized Parry to access calendars, CRMs, or document repositories on its behalf.</li>
            </Ul>
          </Section>

          <Section n="4" title="How We Use Information (Purposes of Processing)">
            <P>We use the information described above to:</P>
            <ol className="list-decimal pl-6 space-y-2 my-4 marker:text-[var(--landing-accent)]">
              <li><strong>Provide and operate the services</strong> — process contracts, generate analyses, deliver real-time advice, manage user accounts and entitlements.</li>
              <li><strong>Improve and secure the services</strong> — detect and prevent abuse, fraud, and security incidents; investigate technical issues; monitor performance.</li>
              <li><strong>Communicate with you</strong> — respond to support requests, send service-related notices, provide product updates (transactional only by default).</li>
              <li><strong>Comply with legal obligations</strong> — respond to lawful requests from competent authorities, meet our contractual and regulatory obligations.</li>
              <li><strong>Service improvement</strong> — analyze aggregated, anonymized, or synthetic data to improve our services.</li>
            </ol>
            <P>We do <strong>not</strong> use customer-scoped data to train our own AI models or those of any third-party LLM provider (see Section 9).</P>
          </Section>

          <Section n="5" title="Legal Basis for Processing (GDPR)">
            <P>Where the General Data Protection Regulation applies, we rely on the following legal bases:</P>
            <Ul>
              <li><strong>Performance of a contract</strong> (Art. 6(1)(b)) — to provide the services to our customers and their users.</li>
              <li><strong>Legitimate interests</strong> (Art. 6(1)(f)) — to operate, secure, improve, and protect our services, where our interests are not overridden by your rights.</li>
              <li><strong>Compliance with a legal obligation</strong> (Art. 6(1)(c)) — to meet applicable laws and regulatory obligations.</li>
              <li><strong>Consent</strong> (Art. 6(1)(a)) — where required by law (e.g., certain cookies or marketing communications), with the right to withdraw at any time.</li>
            </Ul>
            <P>When acting as a Processor on behalf of a customer, the customer is responsible for determining and demonstrating the lawful basis for processing of the personal data they entrust to us.</P>
          </Section>

          <Section n="6" title="Data Retention">
            <P>We retain personal data only for as long as necessary to fulfill the purposes for which it was collected and to meet our contractual, legal, and regulatory obligations.</P>

            <H3>6.1 Retention by data category</H3>
            <div className="overflow-x-auto my-4 rounded-lg border border-[var(--landing-border)]/50">
              <table className="w-full text-sm">
                <thead className="bg-[var(--landing-border)]/20">
                  <tr>
                    <th className="text-left p-3 font-semibold text-[var(--landing-text-primary)]">Data category</th>
                    <th className="text-left p-3 font-semibold text-[var(--landing-text-primary)]">Default retention window</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--landing-border)]/50">
                  <Row a="Customer-scoped data (contracts, transcripts, analyses)" b="For the duration of the customer's subscription, plus the post-termination period defined in the customer agreement (default 30 days), after which data is deleted." />
                  <Row a="Account data (name, email, role)" b="For the duration of the user's active account, plus 90 days after deactivation." />
                  <Row a="Authentication and security logs" b="12 months minimum (longer if required by law or for incident response)." />
                  <Row a="Operational and audit logs" b="12 months minimum." />
                  <Row a="Support communications" b="24 months after closure." />
                  <Row a="Telemetry and analytics (technical, non-identifying)" b="13 months." />
                  <Row a="Backups" b="Defined retention window per backup category; expired backups are irreversibly deleted." />
                </tbody>
              </table>
            </div>

            <H3>6.2 Customer-directed retention</H3>
            <P>Customers can configure shorter retention windows for their tenant by contractual agreement. We will honor any reduced retention window agreed in writing.</P>

            <H3>6.3 Right to erasure</H3>
            <P>You can request deletion of your personal data by contacting us using the details in Section 13. Requests are processed within 30 days where legally feasible. Where the data is processed on behalf of a customer, we will forward the request to that customer (the Data Controller) without undue delay.</P>

            <H3>6.4 Backup retention</H3>
            <P>Production backups follow a defined retention window after which data is irreversibly deleted by our cloud provider. Backups containing personal data subject to a deletion request will be allowed to expire from the backup retention window rather than be individually restored to extract that data.</P>
          </Section>

          <Section n="7" title="Sharing with Third Parties (Subprocessors)">
            <P>We share personal data only with the parties listed below, each of whom has executed appropriate data protection terms with us and is bound to use the data only as instructed.</P>

            <H3>7.1 Direct subprocessors</H3>
            <div className="overflow-x-auto my-4 rounded-lg border border-[var(--landing-border)]/50">
              <table className="w-full text-sm">
                <thead className="bg-[var(--landing-border)]/20">
                  <tr>
                    <th className="text-left p-3 font-semibold text-[var(--landing-text-primary)]">Subprocessor</th>
                    <th className="text-left p-3 font-semibold text-[var(--landing-text-primary)]">Purpose</th>
                    <th className="text-left p-3 font-semibold text-[var(--landing-text-primary)]">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--landing-border)]/50">
                  <SubRow a="Google Cloud Platform" b="Production hosting, databases, object storage, identity-aware access" c="EU (europe-west3, Frankfurt)" />
                  <SubRow a="Google Vertex AI" b="LLM inference (Google Gemini family and supported third-party models)" c="EU regions where available" />
                  <SubRow a="Amazon Web Services — AWS Bedrock" b="LLM inference (Anthropic Claude family)" c="EU regions" />
                  <SubRow a="Anthropic" b="LLM inference (direct API, secondary path; also a sub-processor of AWS for Bedrock-hosted models)" c="US/EU per provider" />
                  <SubRow a="Voyage AI" b="Text embeddings (parry-core only)" c="US" />
                  <SubRow a="Deepgram" b="Speech-to-text transcription (parry-realtime only)" c="US/EU" />
                  <SubRow a="Google Workspace" b="Corporate productivity (Parry-internal; not customer scoped data unless explicitly shared)" c="EU" />
                  <SubRow a="WorkOS" b="Identity provider and SSO/MFA" c="US (data processing under EU SCCs)" />
                </tbody>
              </table>
            </div>
            <P>Each subprocessor processes personal data only under our documented instructions and is contractually bound by data protection and security obligations equivalent to those in this Policy. Bespoke countersigned Data Processing Addenda with each direct subprocessor are being executed in parallel under our SOC 2 Type I engagement (initiated May 2026).</P>

            <H3>7.2 Sub-processors of subprocessors (4th/Nth parties)</H3>
            <P>Each direct subprocessor is required by its DPA with Parry to impose materially equivalent data protection obligations on its own subcontractors. We rely on each subprocessor&rsquo;s independent SOC 2 Type II and/or ISO 27001 attestations as the assurance mechanism for their vendor management program.</P>

            <H3>7.3 Other recipients</H3>
            <Ul>
              <li><strong>Service providers</strong> (e.g., legal counsel, accountants) bound by confidentiality and professional-licensing obligations.</li>
              <li><strong>Legal disclosures</strong> required by court order, subpoena, or regulatory request, where we are legally compelled to disclose.</li>
              <li><strong>In connection with a business transition</strong> (merger, acquisition, financing), subject to confidentiality and equivalent privacy commitments.</li>
            </Ul>

            <H3>7.4 No sale, no behavioral advertising</H3>
            <P>We do <strong>not</strong> sell personal data, do <strong>not</strong> share personal data for cross-context behavioral advertising, and do <strong>not</strong> allow advertising tracking through our services.</P>

            <H3>7.5 Notification of changes to subprocessors</H3>
            <P>We will notify customers of material changes to our subprocessor list through updates to this Policy, with reasonable advance notice where commercially feasible. Customers may also subscribe to direct notification through their account.</P>
          </Section>

          <Section n="8" title="International Data Transfers">
            <P>Our default production environment is located in the European Union (Google Cloud europe-west3 — Frankfurt; AWS EU regions). Where personal data is transferred outside the EU/EEA, we rely on appropriate transfer mechanisms including:</P>
            <Ul>
              <li>The <strong>EU Standard Contractual Clauses</strong> (SCCs, 2021 modules) incorporated into our subprocessors&rsquo; data processing terms.</li>
              <li><strong>Adequacy decisions</strong> of the European Commission, where applicable.</li>
              <li>Supplementary technical and contractual measures including encryption in transit and at rest, access controls, and rights to challenge legal requests.</li>
            </Ul>
            <P>A list of the specific transfer mechanism applied to each subprocessor relationship is available on request.</P>
          </Section>

          <Section n="9" title="Limited Use, Data Minimization, and AI Model Use">
            <H3>9.1 Data minimization</H3>
            <P>We collect and process only the personal data necessary to provide the services. Access to personal data within Parry is limited to authorized personnel on a least-privilege, need-to-know basis.</P>

            <H3>9.2 No training on customer data</H3>
            <P>Customer-scoped data is <strong>not</strong> used to train Parry&rsquo;s own AI models or any third-party LLM provider&rsquo;s models. This commitment is enforced contractually with each LLM provider:</P>
            <Ul>
              <li><strong>Anthropic</strong> — commercial customer data is not used to train Anthropic models (per Anthropic Commercial Terms).</li>
              <li><strong>AWS Bedrock</strong> — provider-side training on customer prompts is contractually disallowed; inference is stateless by design.</li>
              <li><strong>Google Vertex AI</strong> — customer prompts and outputs are not used to train Google&rsquo;s foundation models (per Vertex AI generative AI data governance).</li>
            </Ul>

            <H3>9.3 Zero data retention for inference</H3>
            <P>Where supported by the provider, we configure third-party LLM inference for zero data retention so that prompts and outputs are not persisted on the provider&rsquo;s side beyond the duration required to complete the inference request. Customer-specific zero-data-retention configurations across the LLM stack can be enabled on request as part of engagement scoping.</P>

            <H3>9.4 Chrome Web Store — Limited Use</H3>
            <P>Where the Parry Chrome extension accesses data covered by the Chrome Web Store User Data Policy:</P>
            <Ul>
              <li>Use of that data is <strong>limited to providing or improving user-facing features</strong> that are prominent in the extension&rsquo;s user experience.</li>
              <li>We do <strong>not</strong> transfer that data for advertising, credit-worthiness, or for any purpose unrelated to providing the user-facing features.</li>
              <li>We do <strong>not</strong> allow humans to read that data, except (a) with the user&rsquo;s affirmative consent, (b) for security investigations, (c) to comply with applicable law, or (d) where the data has been aggregated and used for internal operations in accordance with the Chrome Web Store policies.</li>
            </Ul>

            <H3>9.5 Google API Services &mdash; Limited Use (Gmail &amp; Drive)</H3>
            <P>When you connect a Google account, Parry requests the following OAuth scopes solely to provide its contract-negotiation and deal-management features:</P>
            <Ul>
              <li><strong>Gmail read (gmail.readonly)</strong> &mdash; to detect active contract and supplier email threads, read their content, and extract deal terms, pricing, and negotiation context.</li>
              <li><strong>Gmail send (gmail.send)</strong> &mdash; to send the negotiation replies and follow-ups that you review and approve, on your behalf.</li>
              <li><strong>Google Drive read-only (drive.readonly)</strong> &mdash; to read the specific contract documents you choose to analyze.</li>
            </Ul>
            <P>Parry&rsquo;s use of information received from Google APIs adheres to the{" "}
              <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--fg)] transition-colors">Google API Services User Data Policy</a>, including the Limited Use requirements. Specifically:</P>
            <Ul>
              <li>We use Google user data <strong>only</strong> to provide and improve the user-facing features described above.</li>
              <li>We do <strong>not</strong> sell Google user data, and we do <strong>not</strong> transfer or use it for advertising or credit-worthiness purposes.</li>
              <li>We do <strong>not</strong> allow humans to read Google user data, except (a) with your affirmative consent, (b) for security investigations or to comply with applicable law, or (c) where the data has been aggregated and anonymized.</li>
              <li>We do <strong>not</strong> use Google user data to develop, improve, or train generalized AI or ML models.</li>
            </Ul>
          </Section>

          <Section n="10" title="Security">
            <P>We implement administrative, technical, and physical safeguards designed to protect personal data against unauthorized access, alteration, disclosure, or destruction. These include:</P>
            <Ul>
              <li><strong>Encryption at rest</strong> with managed keys (Google Cloud CMEK, AWS KMS) for all customer-scoped data stores; OAuth and integration tokens encrypted at rest with application-managed keys stored in Google Secret Manager.</li>
              <li><strong>Encryption in transit</strong> using TLS 1.2 or above on all external and internal endpoints.</li>
              <li><strong>Multi-tenant logical isolation</strong> at every layer — client_id scoping at every query, per-tenant event channels, per-client storage partitioning, RBAC enforcement, end-to-end tenant context propagation.</li>
              <li><strong>Identity and access</strong> — single sign-on (WorkOS) with mandatory multi-factor authentication for all production access via Identity-Aware Proxy.</li>
              <li><strong>Least-privilege access</strong> to customer-scoped data, with quarterly access reviews and named-personnel records.</li>
              <li><strong>Centralized logging</strong> and continuous monitoring of authentication events, administrative actions, and security signals.</li>
              <li><strong>Secure software development lifecycle</strong> — peer-reviewed pull requests, automated SAST and dependency scanning, secret scanning, container-image scanning, GCP Security Command Center.</li>
              <li><strong>Defined remediation SLAs</strong> for vulnerabilities by CVSS severity (Critical 48 hours, High 7 days, Medium 30 days, Low 90 days).</li>
            </Ul>
            <P>We are in an active <strong>SOC 2 Type I engagement with EY</strong> (initiated May 2026); SOC 2 Type II will follow. Reports will be made available under NDA on request once issued.</P>
            <P>No security control or program can guarantee absolute security. We will notify affected customers and individuals of confirmed security incidents involving personal data as required by applicable law and contract.</P>
          </Section>

          <Section n="11" title="Your Rights">
            <H3>11.1 GDPR / UK GDPR rights (EU/EEA and UK residents)</H3>
            <P>You have the right to:</P>
            <Ul>
              <li><strong>Access</strong> personal data we hold about you.</li>
              <li><strong>Rectify</strong> inaccurate or incomplete personal data.</li>
              <li><strong>Erase</strong> personal data (&ldquo;right to be forgotten&rdquo;) where applicable conditions are met.</li>
              <li><strong>Restrict processing</strong> in certain circumstances.</li>
              <li><strong>Data portability</strong> — receive a copy of your data in a structured, commonly used machine-readable format.</li>
              <li><strong>Object</strong> to processing based on legitimate interests.</li>
              <li><strong>Withdraw consent</strong> at any time, where processing is based on consent.</li>
              <li><strong>Lodge a complaint</strong> with a supervisory authority in your EU/EEA Member State or with the UK Information Commissioner&rsquo;s Office.</li>
            </Ul>
            <P>Where Parry acts as a Data Processor on behalf of a customer, requests to exercise your rights should generally be directed to that customer first; we will assist them in fulfilling those requests as required by our DPAs.</P>

            <H3>11.2 California rights (CCPA / CPRA)</H3>
            <P>California residents have the right to:</P>
            <Ul>
              <li><strong>Know</strong> what personal information we collect, the sources, the purposes, and to whom we disclose it.</li>
              <li><strong>Delete</strong> personal information we have collected (subject to exceptions).</li>
              <li><strong>Correct</strong> inaccurate personal information.</li>
              <li><strong>Opt out</strong> of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information — Parry does not sell personal information and does not share it for cross-context behavioral advertising.</li>
              <li><strong>Limit the use</strong> of sensitive personal information.</li>
              <li><strong>Non-discrimination</strong> for exercising your rights.</li>
            </Ul>
            <P>To exercise these rights, contact us as described in Section 13.</P>

            <H3>11.3 Verification</H3>
            <P>We may request additional information to verify your identity before fulfilling a rights request, to protect against unauthorized access.</P>
          </Section>

          <Section n="12" title="Cookies and Tracking">
            <P>We use cookies and similar technologies only as necessary to operate the services:</P>
            <Ul>
              <li><strong>Strictly necessary cookies</strong> — authentication state, session integrity, security.</li>
              <li><strong>Functional cookies</strong> — user preferences (language, UI state).</li>
              <li><strong>Performance/analytics cookies</strong> — aggregated usage metrics to operate and improve the services.</li>
            </Ul>
            <P>We do <strong>not</strong> use advertising cookies and do <strong>not</strong> allow third-party advertising trackers on parry-io.com or in the Parry Chrome extension.</P>
            <P>Where required by applicable law, we will request consent before placing non-essential cookies and provide controls to manage cookie preferences.</P>
          </Section>

          <Section n="13" title="Contact Us">
            <P>For privacy-related questions, requests, or to exercise your rights:</P>
            <Ul>
              <li><strong>Privacy contact</strong>: <a className="text-[var(--landing-accent-bright)] hover:underline" href="mailto:privacy@parry-io.com">privacy@parry-io.com</a></li>
              <li><strong>Acting Data Protection lead</strong>: <a className="text-[var(--landing-accent-bright)] hover:underline" href="mailto:yehonatan@parry-io.com">yehonatan@parry-io.com</a> (Yehonatan Blubstein, Founder &amp; CEO)</li>
              <li><strong>Mail</strong>: Parry.io Ltd., Ein Harod 4/2, Tel Aviv-Yafo, Israel</li>
            </Ul>
            <P>We respond to verifiable privacy requests within 30 days where legally feasible (and within the timeline required by applicable law). For GDPR-related supervisory complaints, you may also contact your local supervisory authority.</P>
            <P>A formal Data Protection Officer will be designated if and when our scale or contractual obligations trigger the GDPR Article 37 threshold.</P>
          </Section>

          <Section n="14" title="Children's Privacy">
            <P>Parry is a business-to-business service and is not directed to, marketed to, or intended for use by children under 16 (or the equivalent minimum age in the applicable jurisdiction). We do not knowingly collect personal data from children. If you believe a child has provided personal data to us, please contact us and we will take appropriate steps to delete it.</P>
          </Section>

          <Section n="15" title="Changes to This Policy">
            <P>We may update this Privacy Policy from time to time. The &ldquo;Last Updated&rdquo; date at the top reflects the most recent revision. Material changes will be communicated through one or more of:</P>
            <Ul>
              <li>A prominent notice on parry-io.com.</li>
              <li>An update to the in-product privacy notice.</li>
              <li>Direct notification to account administrators.</li>
            </Ul>
            <P>Where consent is the legal basis for processing, we will obtain renewed consent for changes that materially expand the purposes for which personal data is used.</P>
            <P>A change log of material revisions is maintained internally and is available on request.</P>
          </Section>

          <Section n="16" title="Real-Time Agent Annex (Chrome Extension)">
            <P>This Annex applies specifically to the Parry Real-Time Agent (parry-realtime) and the associated Chrome extension.</P>

            <H3>16.1 What the extension accesses</H3>
            <P>The Parry Real-Time Agent accesses the following data only when actively engaged by the user during a call session:</P>
            <Ul>
              <li><strong>Audio stream from the meeting</strong> — to generate speech-to-text transcription via Deepgram.</li>
              <li><strong>Meeting metadata</strong> — participant names where displayed in the meeting interface, meeting times.</li>
              <li><strong>User-provided context</strong> — anything the user explicitly enters or attaches to the session.</li>
            </Ul>
            <P>The extension does <strong>not</strong> read browser content outside the active meeting context. Permissions are declared in the extension manifest and reviewed by Google at every Chrome Web Store submission.</P>

            <H3>16.2 Chrome Web Store User Data Policy / Limited Use</H3>
            <P>Our use of any data accessed by the Chrome extension complies with the Chrome Web Store User Data Policy, including the Limited Use requirements:</P>
            <Ul>
              <li>Use of the data is limited to providing or improving the user-facing real-time advice and transcription features.</li>
              <li>Data is not transferred or sold for advertising, credit-worthiness, or unrelated purposes.</li>
              <li>Human review of the data is limited as described in Section 9.4.</li>
            </Ul>

            <H3>16.3 Transcripts and AI advice</H3>
            <Ul>
              <li>Transcripts and AI-generated advice are stored under the customer&rsquo;s tenant, subject to the customer&rsquo;s configured retention.</li>
              <li>Where the customer enables zero-data-retention for inference, prompts and outputs are not persisted at the LLM provider beyond the duration of the inference request.</li>
              <li>End-of-session deletion controls are available to the customer.</li>
            </Ul>

            <H3>16.4 Version of this Annex</H3>
            <P>This Annex is versioned and dated independently for clarity. Current version: <strong>1.0</strong>, dated <strong>May 29, 2026</strong>.</P>
          </Section>

          <p className="mt-16 pt-8 border-t border-[var(--landing-border)]/50 text-center text-xs text-[var(--landing-text-tertiary)] italic">
            Parry.io Ltd. — Privacy Policy v1.0 — Last Updated May 29, 2026
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

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-semibold text-[var(--landing-text-primary)] mt-6 mb-2">
      {children}
    </h3>
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

function Row({ a, b }: { a: string; b: string }) {
  return (
    <tr>
      <td className="p-3 align-top font-medium text-[var(--landing-text-primary)] whitespace-normal w-1/3">{a}</td>
      <td className="p-3 align-top">{b}</td>
    </tr>
  );
}

function SubRow({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <tr>
      <td className="p-3 align-top font-medium text-[var(--landing-text-primary)]">{a}</td>
      <td className="p-3 align-top">{b}</td>
      <td className="p-3 align-top text-[var(--landing-text-tertiary)] whitespace-nowrap">{c}</td>
    </tr>
  );
}
