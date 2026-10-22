import React from "react";

import { SiteFooter, SiteNav } from "./SiteChrome";

/**
 * Shared shell for every standing page (/trust, /sla, /status, /changelog, /careers,
 * /privacy, /terms, /google-data): the homepage's nav and footer around one readable
 * column, in the same ivory / ink / green brand as the homepage.
 */

export function DocPage({
  title,
  meta,
  children,
}: {
  title?: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="doc-page">
      <SiteNav />
      <main className="doc-main">
        <article className="doc-article">
          {title ? (
            <header className="doc-head">
              <h1>{title}</h1>
              {meta ? <div className="doc-meta">{meta}</div> : null}
            </header>
          ) : null}
          {children}
        </article>
      </main>
      <SiteFooter />
    </div>
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
