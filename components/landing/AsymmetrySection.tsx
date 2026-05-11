"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent, MotionValue } from "motion/react";
import { useEffect, useState } from "react";

/* ───────── Asymmetry · sticky-scroll stage ─────────
 *  Phases (sp = scrollYProgress, smoothed):
 *   0–0.18   Headline appears
 *   0.10–0.40 17% counter ticks up; subline fades in
 *   0.30–0.60 Divergence chart draws (vendor rising, buyer falling)
 *   0.55–0.85 Three forces cards fly in from beneath
 *   0.85–1.00 Outcome line + sources reveal
 * Clear typography. No blur, no cut fonts. Mobile-parity layout.
 * ─────────────────────────────────────────────────── */

export default function AsymmetrySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const sp = useSpring(scrollYProgress, { stiffness: 110, damping: 26, restDelta: 0.001 });

  // Everything is visible from sp=0. Only counters/paths animate with scroll.
  const headOpacity = useTransform(sp, [0, 1], [1, 1]);
  const headY = useTransform(sp, [0, 1], [0, 0]);

  const statOpacity = useTransform(sp, [0, 1], [1, 1]);
  const statY = useTransform(sp, [0, 1], [0, 0]);
  const statScale = useTransform(sp, [0, 1], [1, 1]);

  // 17 counter — ticks across early scroll
  const num = useMotionValue(0);
  useEffect(() => {
    const unsub = sp.on("change", (v) => {
      if (v < 0.05) num.set(0);
      else if (v > 0.35) num.set(17);
      else {
        const t = (v - 0.05) / 0.30;
        num.set(Math.round(t * 17));
      }
    });
    return () => unsub();
  }, [sp, num]);

  // Chart visible, lines draw with scroll
  const chartOpacity = useTransform(sp, [0, 1], [1, 1]);
  const chartY = useTransform(sp, [0, 1], [0, 0]);
  const vendorPath = useTransform(sp, [0.10, 0.55], [600, 0]);
  const buyerPath = useTransform(sp, [0.15, 0.60], [600, 0]);
  const labelsOpacity = useTransform(sp, [0.50, 0.65], [0, 1]);

  // Forces visible from start
  const forcesOpacity = useTransform(sp, [0, 1], [1, 1]);
  const forcesY = useTransform(sp, [0, 1], [0, 0]);

  // Outcome reveals near end
  const outcomeOpacity = useTransform(sp, [0.75, 0.90], [0, 1]);
  const outcomeY = useTransform(sp, [0.75, 0.90], [10, 0]);

  return (
    <section ref={sectionRef} id="asymmetry" className="relative h-[150vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6 bg-[var(--ink)]">
        <div aria-hidden className="absolute inset-0 bg-graph-fine opacity-40" />
        <div aria-hidden className="aurora-warm" />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
          {/* Left: headline + stat + forces */}
          <div className="relative">
            <motion.h2
              style={{ opacity: headOpacity, y: headY }}
              className="text-[clamp(2.1rem,3.8vw,3rem)] leading-[1.1] tracking-tight font-medium text-[var(--fg)] max-w-[500px]"
            >
              Sales has an AI stack.<br />
              Procurement has{" "}
              <span className="italic-display text-[var(--fg-2)]">spreadsheets.</span>
            </motion.h2>

            <motion.div
              style={{ opacity: statOpacity, y: statY, scale: statScale, transformOrigin: "left center" }}
              className="mt-8 flex items-baseline"
            >
              <span className="text-[var(--fg-2)] font-mono text-[0.78rem] mr-3 mb-3 tracking-[0.18em] uppercase">up to</span>
              <div
                className="flex items-baseline gap-2"
                style={{ overflow: "visible" }}
              >
                <span
                  className="font-display italic text-[clamp(4.5rem,12vw,9rem)] inline-block"
                  style={{
                    color: "#d4a373",
                    lineHeight: 1.15,
                    paddingRight: "0.18em",
                    paddingBottom: "0.08em",
                    overflow: "visible",
                  }}
                >
                  <motion.span style={{ display: "inline-block", overflow: "visible" }}>{num}</motion.span>
                </span>
                <span
                  className="font-display italic text-[clamp(1.6rem,4vw,3rem)]"
                  style={{ color: "#ec6a72", lineHeight: 1.15 }}
                >
                  %
                </span>
              </div>
            </motion.div>

            <motion.p
              style={{ opacity: statOpacity }}
              className="mt-1 text-[1.08rem] md:text-[1.18rem] text-[var(--fg-2)] leading-[1.45] max-w-[460px]"
            >
              of supplier spend leaks{" "}
              <span className="italic text-[var(--fg)]">through the cracks</span> every year.
            </motion.p>

            {/* Forces strip — appears late */}
            <motion.div
              style={{ opacity: forcesOpacity, y: forcesY }}
              className="mt-12 pt-7 border-t border-[var(--line)] grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3"
            >
              <ForceItem k="Technology" v="AI reads commercial documents at scale." color="var(--blue)" />
              <ForceItem k="Pressure" v="Finance demands hard-dollar savings." color="var(--warm)" />
              <ForceItem k="Complexity" v="Supplier sprawl, fragmented, dynamic." color="var(--violet)" />
            </motion.div>
          </div>

          {/* Right: chart */}
          <motion.div
            style={{ opacity: chartOpacity, y: chartY }}
            className="card p-5 md:p-7"
          >
            <div className="flex items-baseline justify-between mb-3">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--fg-3)]">
                Vendor vs. buyer · last decade
              </span>
              <motion.span style={{ opacity: outcomeOpacity }} className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--fg-3)]">
                WorldCC · Deloitte · McKinsey
              </motion.span>
            </div>
            <ScrollDrawnChart vendorPath={vendorPath} buyerPath={buyerPath} labelsOpacity={labelsOpacity} />
          </motion.div>
        </div>

        {/* Outcome */}
        <motion.p
          style={{ opacity: outcomeOpacity, y: outcomeY }}
          className="relative z-10 mt-12 text-center max-w-[760px] mx-auto text-[1.15rem] md:text-[1.3rem] text-[var(--fg)] leading-[1.5]"
        >
          The result: <span className="text-[var(--fg-2)] italic">unmanaged tail spend, weak renewals, and unchecked billing drift.</span>
        </motion.p>

        {/* Progress hairline */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[200px]">
          <div className="h-px bg-[var(--line)] relative">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--neg)] via-[var(--warm)] to-[var(--blue)]"
              style={{ scaleX: sp, transformOrigin: "left", width: "100%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ForceItem({ k, v, color }: { k: string; v: string; color: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span
        className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      />
      <div>
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--fg-3)]">{k}</span>
        <p className="mt-1 text-[0.88rem] text-[var(--fg)] leading-[1.45]">{v}</p>
      </div>
    </div>
  );
}

function ScrollDrawnChart({
  vendorPath,
  buyerPath,
  labelsOpacity,
}: {
  vendorPath: MotionValue<number>;
  buyerPath: MotionValue<number>;
  labelsOpacity: MotionValue<number>;
}) {
  return (
    <svg viewBox="0 0 800 260" className="w-full h-auto">
      <defs>
        <linearGradient id="hi-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(91,141,239,0.35)" />
          <stop offset="100%" stopColor="rgba(91,141,239,1)" />
        </linearGradient>
        <linearGradient id="lo-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(236,106,114,0.35)" />
          <stop offset="100%" stopColor="rgba(236,106,114,1)" />
        </linearGradient>
      </defs>

      <line x1="40" y1="130" x2="780" y2="130" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" strokeDasharray="2 3" />

      <motion.path
        d="M 40 132 Q 260 124 420 92 T 780 36"
        fill="none" stroke="url(#hi-line)" strokeWidth="2.2"
        strokeDasharray="600"
        style={{ strokeDashoffset: vendorPath }}
      />
      <motion.path
        d="M 40 128 Q 260 140 420 168 T 780 224"
        fill="none" stroke="url(#lo-line)" strokeWidth="2.2"
        strokeDasharray="600"
        style={{ strokeDashoffset: buyerPath }}
      />

      <motion.g style={{ opacity: labelsOpacity }}>
        <circle cx="780" cy="36" r="4.5" fill="#88a8f8" />
        <text x="766" y="22" textAnchor="end" fontFamily="var(--font-mono),monospace" fontSize="11" fontWeight="600" fill="#88a8f8">
          Vendor · AI-armed
        </text>
        <circle cx="780" cy="224" r="4.5" fill="#ec6a72" />
        <text x="766" y="244" textAnchor="end" fontFamily="var(--font-mono),monospace" fontSize="11" fontWeight="600" fill="#ec6a72">
          Buyer · alone
        </text>
      </motion.g>
    </svg>
  );
}
