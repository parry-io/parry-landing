import React from "react";

/* ───────── Google user data · OAuth verification disclosure ─────────
 * This section exists to satisfy Google's OAuth app-homepage requirements:
 * the homepage must "fully describe your app's functionality" and "explain
 * with transparency the purpose for which your app requests user data".
 * A prior brand-verification submission was rejected because the homepage
 * did not do this.
 *
 * Deliberately a server component with NO scroll-gated motion: every other
 * section on this page starts at opacity 0 and reveals on scroll, which
 * means a reviewer (or an automated fetch) can miss it. This one is plain,
 * always-rendered text. Do not add `whileInView` / `initial={{opacity:0}}`
 * here — that is the whole point of the section.
 *
 * The scope table must stay in sync with the scopes actually requested:
 *   backend/services/gmail_service.py   — gmail.readonly, gmail.send, userinfo.email
 *   backend/services/oauth_google.py    — drive.readonly
 * and with Privacy Policy §9.5. If a scope changes in one place, change it
 * in all three or the verification submission will be inconsistent.
 * ─────────────────────────────────────────────────────────────────── */

const SCOPES: { scope: string; label: string; use: string }[] = [
  {
    scope: "drive.readonly",
    label: "Google Drive — read-only",
    use: "Reads the contract, quote, and pricing documents you choose to import, so Parry can extract terms, renewal dates, and committed pricing into your deal record. Parry cannot create, modify, or delete anything in your Drive.",
  },
  {
    scope: "gmail.readonly",
    label: "Gmail — read-only",
    use: "Reads supplier email threads to identify active negotiations and extract quoted prices, terms, and deadlines into the deal they belong to.",
  },
  {
    scope: "gmail.send",
    label: "Gmail — send",
    use: "Sends supplier replies and follow-ups from your address — only messages you have reviewed and approved. Parry does not send mail on your behalf without that approval.",
  },
  {
    scope: "userinfo.email",
    label: "Email address",
    use: "Identifies which mailbox or Drive account is connected, so the connection can be labelled and disconnected later.",
  },
];

const LIMITED_USE = [
  "We use Google user data only to provide and improve the user-facing features described above.",
  "We do not sell Google user data, and we do not transfer or use it for advertising or credit-worthiness purposes.",
  "We do not allow humans to read Google user data, except with your affirmative consent, for security investigations or to comply with applicable law, or where the data has been aggregated and anonymised.",
  "We do not use Google user data to develop, improve, or train generalised AI or ML models.",
];

export default function GoogleDataSection() {
  return (
    <section
      id="google-data"
      className="relative py-24 md:py-28 px-6 bg-[var(--ink)] scroll-mt-24"
    >
      <div aria-hidden className="absolute inset-0 bg-graph opacity-20 pointer-events-none" />

      <div className="relative max-w-[900px] mx-auto">
        <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[var(--fg-3)]">
          Data &amp; permissions
        </span>
        <h2 className="mt-3 text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-medium text-[var(--fg)]">
          How Parry uses Google user data
        </h2>

        <p className="mt-6 text-[1.02rem] md:text-[1.08rem] text-[var(--fg-2)] leading-[1.65]">
          Parry is a procurement platform for finance and procurement teams. It reads the
          contracts, quotes, and supplier email threads a company already has, extracts the
          commercial terms buried in them — prices, renewal dates, escalators, committed
          volumes — and uses that to flag overbilling, surface renewals before they auto-renew,
          and draft the supplier replies a buyer sends back.
        </p>
        <p className="mt-4 text-[1.02rem] md:text-[1.08rem] text-[var(--fg-2)] leading-[1.65]">
          Connecting a Google account is optional. It is how you get contracts out of Google
          Drive and negotiation threads out of Gmail without forwarding or re-uploading them by
          hand. If you connect one, Parry requests these scopes and uses them only as described:
        </p>

        <div className="mt-8 overflow-x-auto rounded-[var(--radius)] border border-[var(--line-strong)]">
          <table className="w-full text-left border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-[var(--surface-2)]/60">
                <th className="p-4 text-[0.8rem] font-medium text-[var(--fg)] align-top w-[34%]">
                  Permission requested
                </th>
                <th className="p-4 text-[0.8rem] font-medium text-[var(--fg)] align-top">
                  What Parry does with it
                </th>
              </tr>
            </thead>
            <tbody>
              {SCOPES.map(({ scope, label, use }) => (
                <tr key={scope} className="border-t border-[var(--line)] align-top">
                  <td className="p-4">
                    <div className="text-[0.92rem] font-medium text-[var(--fg)]">{label}</div>
                    <code className="mt-1 block font-mono text-[0.72rem] text-[var(--fg-3)] break-all">
                      {scope}
                    </code>
                  </td>
                  <td className="p-4 text-[0.92rem] text-[var(--fg-2)] leading-[1.6]">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-12 text-[1.15rem] font-medium text-[var(--fg)]">
          Limited Use disclosure
        </h3>
        <p className="mt-3 text-[0.95rem] text-[var(--fg-2)] leading-[1.65]">
          Parry&rsquo;s use of information received from Google APIs adheres to the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--blue-bright)] underline underline-offset-2 hover:text-[var(--fg)] transition-colors"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements. Specifically:
        </p>
        <ul className="mt-4 space-y-2.5">
          {LIMITED_USE.map((line) => (
            <li key={line} className="flex gap-3 text-[0.95rem] text-[var(--fg-2)] leading-[1.6]">
              <span
                aria-hidden
                className="mt-[0.55em] shrink-0 w-1 h-1 rounded-full bg-[var(--blue)]"
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <h3 className="mt-12 text-[1.15rem] font-medium text-[var(--fg)]">
          Storage, retention, and revoking access
        </h3>
        <p className="mt-3 text-[0.95rem] text-[var(--fg-2)] leading-[1.65]">
          Documents and email content retrieved from Google are stored inside your
          organisation&rsquo;s own tenant, encrypted at rest, hosted in the European Union, and
          retained for the window set in your agreement. OAuth tokens are encrypted at rest with
          application-managed keys. You can disconnect a Google account at any time from Parry&rsquo;s
          integration settings, or revoke Parry&rsquo;s access directly at{" "}
          <a
            href="https://myaccount.google.com/permissions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--blue-bright)] underline underline-offset-2 hover:text-[var(--fg)] transition-colors"
          >
            myaccount.google.com/permissions
          </a>
          . Revoking access stops all further reads immediately.
        </p>

        <p className="mt-8 text-[0.9rem] text-[var(--fg-3)] leading-[1.65]">
          Full detail is in the{" "}
          <a
            href="/privacy#section-9"
            className="text-[var(--blue-bright)] underline underline-offset-2 hover:text-[var(--fg)] transition-colors"
          >
            Privacy Policy, section 9.5
          </a>{" "}
          and the{" "}
          <a
            href="/terms"
            className="text-[var(--blue-bright)] underline underline-offset-2 hover:text-[var(--fg)] transition-colors"
          >
            Terms of Service
          </a>
          . Privacy questions:{" "}
          <a
            href="mailto:privacy@parry-io.com"
            className="text-[var(--blue-bright)] underline underline-offset-2 hover:text-[var(--fg)] transition-colors"
          >
            privacy@parry-io.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
