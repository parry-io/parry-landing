"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";
import { ShoppingCart, MessageSquareQuote, GitBranch, RotateCcw, LayoutGrid } from "lucide-react";

/* ───────── Positioning · integrated stage ─────────
 *  No heavy "container" around the cards — they float
 *  on the same surface as the rest of the site.
 *  Slab is more restrained, beams cleaner, mobile-first.
 * ─────────────────────────────────────────────────── */

const COMPETITORS = [
  { tag: "Sourcing",    name: "Tail-spend",  Icon: ShoppingCart       },
  { tag: "Negotiation", name: "Deal exec",   Icon: MessageSquareQuote },
  { tag: "Workflow",    name: "Orchestrate", Icon: GitBranch          },
  { tag: "Recovery",    name: "Savings",     Icon: RotateCcw          },
  { tag: "Suites",      name: "Enterprise",  Icon: LayoutGrid         },
];

export default function PositioningSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const sp = useSpring(scrollYProgress, { stiffness: 110, damping: 24, restDelta: 0.001 });

  // Phase tracker
  const phaseLabelIdx = useTransform(sp, (v) => {
    if (v < 0.20) return 0; // The landscape
    if (v < 0.45) return 1; // The layer above
    if (v < 0.78) return 2; // The connection
    return 3;               // The control (slab descends, locks above cards)
  });

  // Cards always visible, anchored on enter
  const cardOpacity = useTransform(sp, [0, 0.08], [0.6, 1]);
  const cardY = useTransform(sp, [0, 0.10], [10, 0]);

  // Parry slab — slides in, locks. No descent.
  const slabOpacity = useTransform(sp, [0.18, 0.42], [0, 1]);
  const slabY = useTransform(sp, [0, 0.18, 0.42], [-140, -140, 0]);
  const slabPowerOn = useTransform(sp, [0.78, 0.92], [0, 1]);

  // Beams fire in phase 3, stay visible
  const beamProgress = useTransform(sp, [0.48, 0.78], [0, 1]);
  const beamOpacity = useTransform(sp, [0.48, 0.58, 0.95, 1], [0, 1, 1, 0.9]);

  // Caption reveals last
  const captionOpacity = useTransform(sp, [0.85, 0.96], [0, 1]);
  const captionY = useTransform(sp, [0.85, 0.96], [10, 0]);

  return (
    <section ref={sectionRef} id="positioning" className="relative h-[150vh] bg-[var(--ink)]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-5 md:px-6 bg-[var(--ink)]">
        <div className="absolute inset-0 bg-graph opacity-25 pointer-events-none" />
        <div className="aurora-warm" />

        {/* Header */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto mb-6 md:mb-10 text-center">
          <h2 className="text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.1] tracking-tight font-medium text-[var(--fg)] max-w-[920px] mx-auto px-2">
            Procurement AI is crowded.{" "}
            <br className="md:hidden" />
            <span className="italic-display" style={{ color: "#e9c39c" }}>
              The layer above is empty.
            </span>
          </h2>
        </div>

        {/* Stage — open layout, no surrounding container */}
        <div className="relative z-10 w-full max-w-[1080px] mx-auto">
          <div className="relative w-full flex flex-col gap-0" style={{ height: "min(46vh, 380px)" }}>

            {/* TOP — Parry slab */}
            <motion.div
              className="relative rounded-xl md:rounded-2xl flex-shrink-0 overflow-hidden"
              style={{
                opacity: slabOpacity,
                y: slabY,
                height: 116,
                background:
                  "linear-gradient(95deg, rgba(91,141,239,0.18) 0%, rgba(139,123,240,0.14) 55%, rgba(212,163,115,0.14) 100%)",
                border: "1px solid rgba(91,141,239,0.45)",
                backdropFilter: "blur(14px)",
                boxShadow:
                  "0 24px 50px -16px rgba(91,141,239,0.45), 0 0 0 1px rgba(91,141,239,0.18) inset",
              }}
            >
              {/* Power-on glow */}
              <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  opacity: slabPowerOn,
                  background:
                    "linear-gradient(95deg, rgba(91,141,239,0.16) 0%, rgba(212,163,115,0.16) 50%, rgba(139,123,240,0.16) 100%)",
                }}
              />
              <div className="relative h-full px-4 md:px-7 flex items-center justify-between gap-3">
                <img src="/Parry_Logo.png" alt="Parry" className="h-8 md:h-10 w-auto flex-shrink-0" />
                <div className="text-right min-w-0">
                  <div className="font-mono text-[9px] md:text-[11px] tracking-[0.18em] md:tracking-[0.24em] uppercase text-[var(--fg)]">
                    Commercial control layer
                  </div>
                  <div className="mt-1 md:mt-1.5 font-mono text-[8.5px] md:text-[10.5px] tracking-[0.14em] md:tracking-[0.18em] uppercase text-[var(--fg-2)] truncate">
                    tail spend → negotiation → billing
                  </div>
                </div>
              </div>
              <motion.span
                aria-hidden
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(91,141,239,0.95), rgba(212,163,115,0.95), transparent)",
                  opacity: useTransform(slabPowerOn, [0, 1], [0.55, 1]),
                }}
              />
            </motion.div>

            {/* MIDDLE — beam space */}
            <div className="relative flex-1 min-h-[80px] max-h-[120px]">
              <svg
                viewBox="0 0 1080 200"
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="pos-beam" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="rgba(91,141,239,0)" />
                    <stop offset="35%" stopColor="rgba(91,141,239,0.95)" />
                    <stop offset="100%" stopColor="rgba(212,163,115,0.95)" />
                  </linearGradient>
                  <filter id="beam-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" />
                  </filter>
                </defs>
                {COMPETITORS.map((_, i) => {
                  const x = 108 + i * 206;
                  return (
                    <g key={i}>
                      <motion.line
                        x1={x} y1="200" x2={x} y2="0"
                        stroke="rgba(91,141,239,0.45)"
                        strokeWidth="7"
                        strokeLinecap="round"
                        filter="url(#beam-glow)"
                        style={{ pathLength: beamProgress, opacity: useTransform(beamOpacity, (v) => v * 0.55) }}
                      />
                      <motion.line
                        x1={x} y1="200" x2={x} y2="0"
                        stroke="url(#pos-beam)"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        style={{ pathLength: beamProgress, opacity: beamOpacity }}
                      />
                      <motion.circle
                        cx={x} r="2.5"
                        fill="#fff"
                        style={{
                          cy: useTransform(beamProgress, [0, 1], [200, 0]),
                          opacity: useTransform(beamProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]),
                          filter: "drop-shadow(0 0 6px rgba(91,141,239,0.9))",
                        }}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* BOTTOM — floating competitor cards, NO container */}
            <motion.div
              className="relative flex-shrink-0"
              style={{ opacity: cardOpacity, y: cardY }}
            >
              <div className="mb-3 md:mb-4 flex items-center justify-between">
                <span className="font-mono text-[9px] md:text-[10.5px] tracking-[0.18em] md:tracking-[0.22em] uppercase text-[var(--fg-3)]">
                  Procurement AI · today
                </span>
                <span className="font-mono text-[9px] md:text-[10px] tracking-[0.14em] md:tracking-[0.18em] uppercase text-[var(--fg-4)] hidden sm:block">
                  Each tool · one step
                </span>
              </div>

              {/* Desktop: 5 cols. Mobile: horizontal scroll */}
              <div className="md:grid md:grid-cols-5 md:gap-2.5 flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0 md:overflow-visible">
                {COMPETITORS.map((c, i) => (
                  <div
                    key={c.tag}
                    className="relative flex-shrink-0 w-[140px] md:w-auto h-[120px] md:h-[136px] rounded-lg border border-[var(--line-strong)] bg-[var(--surface-2)]/85 p-3 flex flex-col justify-between overflow-hidden backdrop-blur-sm"
                    style={{
                      boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset",
                    }}
                  >
                    <span
                      aria-hidden
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, rgba(255,255,255,0.10), transparent)",
                      }}
                    />
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-md border border-[var(--line-strong)] bg-[var(--surface)]">
                        <c.Icon size={11} strokeWidth={1.8} className="text-[var(--fg-2)]" />
                      </span>
                      <span className="font-mono text-[8.5px] md:text-[9.5px] tracking-[0.18em] md:tracking-[0.2em] uppercase text-[var(--fg-3)]">
                        {c.tag}
                      </span>
                    </div>
                    <span className="text-[0.95rem] md:text-[1.02rem] font-medium tracking-tight text-[var(--fg)] leading-[1.25]">
                      {c.name}
                    </span>
                    <BeamDot delay={i * 0.06} beamProgress={beamProgress} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Caption */}
        <motion.p
          style={{ opacity: captionOpacity, y: captionY }}
          className="relative z-10 mt-5 md:mt-6 text-center max-w-[680px] mx-auto text-[1.08rem] md:text-[1.2rem] text-[var(--fg-2)] leading-[1.55] px-4"
        >
          Most tools optimize one step.{" "}
          <span className="italic text-[var(--fg)]">Parry connects them</span> into one supplier-facing surface.
        </motion.p>

        {/* Progress hairline */}
        <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 w-[160px] md:w-[220px]">
          <div className="h-px bg-[var(--line)] relative">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--blue)] via-[var(--warm)] to-[var(--violet)]"
              style={{ scaleX: sp, transformOrigin: "left", width: "100%" }}
            />
          </div>
        </div>
      </div>

    </section>
  );
}

const PHASES = [
  { label: "The landscape" },
  { label: "The layer above" },
  { label: "The connection" },
  { label: "The control" },
];

function PhaseLabel({ phaseLabelIdx }: { phaseLabelIdx: MotionValue<number> }) {
  return (
    <div className="mt-3 md:mt-4 relative h-4 md:h-5 max-w-[280px] mx-auto">
      {PHASES.map((p, i) => {
        const opacity = useTransform(phaseLabelIdx, (v) => (Math.round(v) === i ? 1 : 0));
        return (
          <motion.div
            key={i}
            style={{ opacity }}
            className="absolute inset-0 flex items-center justify-center gap-1.5 md:gap-2 font-mono text-[9px] md:text-[10px] tracking-[0.18em] md:tracking-[0.22em] uppercase text-[var(--fg-3)]"
          >
            <span className="inline-block w-2 md:w-3 h-px bg-[var(--fg-3)]" />
            <span>{`0${i + 1} · ${p.label}`}</span>
            <span className="inline-block w-2 md:w-3 h-px bg-[var(--fg-3)]" />
          </motion.div>
        );
      })}
    </div>
  );
}

function BeamDot({
  delay,
  beamProgress,
}: {
  delay: number;
  beamProgress: MotionValue<number>;
}) {
  const opacity = useTransform(beamProgress, [delay, delay + 0.05], [0, 1]);
  return (
    <motion.span
      aria-hidden
      className="absolute -top-1 left-1/2 -translate-x-1/2 inline-block w-2 h-2 rounded-full"
      style={{
        background: "var(--blue-bright)",
        boxShadow: "0 0 14px var(--blue), 0 0 4px var(--blue-bright)",
        opacity,
      }}
    />
  );
}

/* ───────── Trust band ───────── */

const TRACTION = [
  { tag: "In signing",      line: "Public company" },
  { tag: "Legal review",    line: "Two enterprises" },
  { tag: "Advanced engage", line: "Top Israeli bank" },
];

const INTEGRATIONS = [
  "NetSuite", "SAP", "Coupa", "Workday", "Tipalti", "Zip",
  "Slack", "Teams", "Gmail", "Outlook", "Notion", "DocuSign",
];

function TrustBand() {
  return (
    <div className="relative px-5 md:px-6 pb-20 md:pb-32">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid md:grid-cols-3 gap-px bg-[var(--line)] rounded-2xl overflow-hidden border border-[var(--line)]">
          {TRACTION.map((t, i) => (
            <motion.div
              key={t.tag}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[var(--surface)] p-6 md:p-7"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--fg-3)]">
                  {t.tag}
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--pos)] animate-[pulse-soft_2s_ease-in-out_infinite]" />
              </div>
              <div className="text-[1.1rem] md:text-[1.2rem] font-medium tracking-tight text-[var(--fg)]">
                {t.line}
              </div>
              <div className="mt-4 h-px bg-gradient-to-r from-[var(--warm)]/40 via-[var(--warm)]/15 to-transparent" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 md:mt-10 flex items-baseline justify-between gap-4 flex-wrap"
        >
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--fg-3)]">
            Lives where you live
          </span>
          <Marquee />
        </motion.div>
      </div>
    </div>
  );
}

function Marquee() {
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
      pos += 0.35;
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
    <div className="relative flex-1 max-w-[800px] marquee-mask overflow-hidden">
      <div ref={trackRef} className="flex items-center gap-6 md:gap-8 w-max py-1 will-change-transform">
        {items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="shrink-0 text-[0.88rem] md:text-[0.92rem] font-medium tracking-tight text-[var(--fg-2)] select-none"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
