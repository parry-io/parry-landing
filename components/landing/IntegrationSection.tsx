"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

/* ───────── Integrations · "Lives where you live" ─────────
 * Lightweight marquee showing the tools Parry plugs into.
 * ─────────────────────────────────────────────────────── */

const INTEGRATIONS = [
  "NetSuite", "SAP", "Coupa", "Workday", "Tipalti", "Zip",
  "Slack", "Teams", "Gmail", "Outlook", "Notion", "DocuSign",
];

export default function IntegrationSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const track = trackRef.current;
    if (!track) return;
    let pos = 0;
    let raf: number;
    const animate = () => {
      pos += 0.4;
      const half = track.scrollWidth / 2;
      if (pos >= half) pos -= half;
      track.style.transform = `translate3d(-${pos}px, 0, 0)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [mounted]);

  const items = [...INTEGRATIONS, ...INTEGRATIONS];

  return (
    <section className="relative py-24 md:py-28 px-6 bg-[var(--ink)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[var(--fg-3)]">
            Lives where you live
          </span>
          <h2 className="mt-3 text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-medium text-[var(--fg)] max-w-[680px] mx-auto">
            Plugs into the tools{" "}
            <span className="italic text-[var(--fg-2)]">you already use.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative marquee-mask"
        >
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex items-center gap-6 md:gap-9 w-max py-2 will-change-transform"
            >
              {items.map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-full border border-[var(--line)] bg-[var(--surface-2)]/50 backdrop-blur-sm"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-[var(--blue)]" />
                  <span className="text-[1rem] md:text-[1.05rem] font-medium tracking-tight text-[var(--fg-2)] select-none">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
