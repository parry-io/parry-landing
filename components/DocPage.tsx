import React from "react";

/**
 * Shared shell for the standing document pages (/trust, /sla, /changelog,
 * /careers). The nav, footer and prose helpers were duplicated verbatim in
 * app/privacy/page.tsx and app/terms/page.tsx; four more copies would have made
 * five places to fix a footer link. Those two pages are left untouched here —
 * folding them in is a separate change with its own review surface.
 */

export function DocPage({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
}) {
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
              {title}
            </h1>
            {meta ? (
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[var(--landing-text-tertiary)]">
                {meta}
              </div>
            ) : null}
          </header>
          {children}
        </article>
      </main>

      <DocFooter />
    </div>
  );
}

export function DocFooter() {
  return (
    <footer className="border-t border-[var(--landing-border)]/50 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-[var(--landing-text-tertiary)]">
          &copy; {new Date().getFullYear()} Parry
        </span>
        <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-[var(--landing-text-tertiary)]">
          <span>Tel Aviv</span>
          <a href="/trust" className="hover:text-[var(--landing-text-secondary)] transition-colors">Trust</a>
          <a href="/sla" className="hover:text-[var(--landing-text-secondary)] transition-colors">SLA</a>
          <a href="/changelog" className="hover:text-[var(--landing-text-secondary)] transition-colors">Changelog</a>
          <a href="/careers" className="hover:text-[var(--landing-text-secondary)] transition-colors">Careers</a>
          <a href="/privacy" className="hover:text-[var(--landing-text-secondary)] transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-[var(--landing-text-secondary)] transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}

export function Meta({ label, value }: { label: string; value: string }) {
  return (
    <span>
      <strong className="text-[var(--landing-text-secondary)]">{label}:</strong> {value}
    </span>
  );
}

export function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
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

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-semibold text-[var(--landing-text-primary)] mt-6 mb-2">
      {children}
    </h3>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px]">{children}</p>;
}

export function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc pl-6 space-y-2 text-[15px] marker:text-[var(--landing-accent)]">
      {children}
    </ul>
  );
}

export function Table({
  head,
  children,
}: {
  head: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-[14px] border border-[var(--landing-border)]/50 border-collapse">
        <thead>
          <tr className="bg-[var(--landing-border)]/20">
            {head.map((h) => (
              <th
                key={h}
                className="p-3 text-left font-semibold text-[var(--landing-text-primary)] border-b border-[var(--landing-border)]/50"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--landing-border)]/30">{children}</tbody>
      </table>
    </div>
  );
}

export function Td({ children }: { children: React.ReactNode }) {
  return <td className="p-3 align-top">{children}</td>;
}

export function TdKey({ children }: { children: React.ReactNode }) {
  return (
    <td className="p-3 align-top font-medium text-[var(--landing-text-primary)]">{children}</td>
  );
}
