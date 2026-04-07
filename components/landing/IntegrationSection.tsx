"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

const INTEGRATIONS = [
  "Tipalti", "Zip", "NetSuite", "SAP", "Gmail",
  "Google Drive", "Outlook", "OneDrive", "Slack", "Teams",
];

const SCROLL_ITEMS = [...INTEGRATIONS, ...INTEGRATIONS];

export default function IntegrationSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Manual scroll animation — more reliable than CSS @keyframes
  useEffect(() => {
    if (!mounted) return;
    const track = trackRef.current;
    if (!track) return;

    let pos = 0;
    let raf: number;
    const speed = 0.5; // px per frame

    const animate = () => {
      pos += speed;
      // Reset when first half has scrolled out
      const halfWidth = track.scrollWidth / 2;
      if (pos >= halfWidth) pos = 0;
      track.style.transform = `translateX(-${pos}px)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
  }, [mounted]);

  return (
    <section className="relative py-20 md:py-28 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-black leading-tight mb-3"
        >
          Works where you already work.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-base text-[var(--landing-text-secondary)]"
        >
          No new tools. No migration. Just results.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[var(--landing-bg)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[var(--landing-bg)] to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="overflow-hidden">
          <div ref={trackRef} className="flex items-center gap-12 md:gap-16 w-max py-4 will-change-transform">
            {SCROLL_ITEMS.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="shrink-0 text-lg md:text-xl font-semibold text-[var(--landing-text-tertiary)] hover:text-[var(--landing-text-secondary)] transition-colors duration-300 select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
