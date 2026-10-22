import React from "react";

/**
 * The nav and footer every standing page shares with the homepage (public/home.html):
 * same logo, same five section links, same "Book a demo" pill, same footer line.
 * Section links land on the homepage by hash (/#product), which home.html turns into a
 * scroll to that scene; /#book opens its booking form.
 */

const SECTIONS: [string, string][] = [
  ["platform", "The platform"],
  ["product", "The product"],
  ["industries", "Industries"],
  ["why", "Why Parry"],
  ["mri", "Spend MRI"],
];

const FOOTER_LINKS: [string, string][] = [
  ["/trust", "Trust"],
  ["/privacy", "Privacy"],
  ["/terms", "Terms"],
  ["/google-data", "Google data"],
  ["/status", "Status"],
  ["/sla", "SLA"],
  ["/changelog", "Changelog"],
  ["/careers", "Careers"],
];

export function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Main">
      <a className="site-mark" href="/" aria-label="Parry, home">
        <img src="/brand/parry-logo-horizontal.svg" alt="Parry" />
      </a>
      <div className="site-links">
        {SECTIONS.map(([hash, label]) => (
          <a key={hash} href={`/#${hash}`}>
            {label}
          </a>
        ))}
      </div>
      <a className="site-cta" href="/#book">
        Book a demo
      </a>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>Parry · New York · © {new Date().getFullYear()}</span>
      <span className="site-footer-links">
        {FOOTER_LINKS.map(([href, label]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </span>
    </footer>
  );
}
