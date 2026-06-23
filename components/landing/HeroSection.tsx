"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from "motion/react";
import { ArrowUpRight, ArrowDown } from "lucide-react";

/* ───────── Hero · sticky cinematic stage ─────────
 * Pinned for ~200vh. Content morphs through phases as you scroll:
 *   0–20%   eyebrow + headline appear
 *   15–45%  subhead + CTAs appear
 *   40–100% architecture diagram fades in, then mouse-parallax takes over
 * Clear typography (no blur), no cut fonts.
 * ─────────────────────────────────────────────── */

const PILLARS = ["Understand", "Detect", "Support", "Automate", "Enforce"];
const STACK = ["Point solutions", "Workflow", "Systems of record", "Communications"];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const sp = useSpring(scrollYProgress, { stiffness: 110, damping: 26, restDelta: 0.001 });

  // Phase A visible from start; fades out as we cross 45-65% toward Phase B
  const headlineY = useTransform(sp, [0, 0.45, 0.65], [0, 0, -16]);
  const headlineOpacity = useTransform(sp, [0, 0.45, 0.65], [1, 1, 0]);
  const subheadOpacity = useTransform(sp, [0, 0.45, 0.65], [1, 1, 0]);
  const ctaOpacity = useTransform(sp, [0, 0.45, 0.65], [1, 1, 0]);

  // Diagram phase — overlaps slightly with Phase A so no blank gap
  const diagramOpacity = useTransform(sp, [0.4, 0.62], [0, 1]);
  const diagramY = useTransform(sp, [0.4, 0.62], [30, 0]);
  const diagramScale = useTransform(sp, [0.4, 0.75], [0.96, 1]);

  // Diagram caption appears late
  const diagramCaptionOpacity = useTransform(sp, [0.7, 0.85], [0, 1]);

  return (
    <section ref={sectionRef} className="relative h-[140vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6 bg-[var(--ink)]">
        {/* Background scenery */}
        <div aria-hidden className="absolute inset-0 bg-graph opacity-60" />
        <div aria-hidden className="aurora" />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(7,8,13,0.7) 90%)",
          }}
        />

        {/* Phase A — headline + cta */}
        <motion.div
          style={{ opacity: useTransform(sp, [0, 0.55, 0.72], [1, 1, 0]) }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none"
        >
          <motion.h1
            style={{ y: headlineY, opacity: headlineOpacity }}
            className="text-center mx-auto max-w-[1040px] text-[clamp(2.6rem,7vw,6rem)] leading-[1.02] tracking-tight font-medium text-[var(--fg)]"
          >
            <span className="block">The execution layer for</span>
            <span
              className="block italic-display text-[1.06em] text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(96deg, #f5f5f7 0%, #d4a373 45%, #88a8f8 75%, #f5f5f7 100%)",
                backgroundSize: "200% auto",
                animation: "gradient-pan 12s linear infinite",
              }}
            >
              enterprise procurement.
            </span>
          </motion.h1>

          <motion.p
            style={{ opacity: subheadOpacity }}
            className="mt-8 text-center max-w-[600px] mx-auto text-[1.15rem] md:text-[1.3rem] text-[var(--fg-2)] leading-[1.5]"
          >
            Unify contracts, pricing, invoices, and supplier history into one commercial control layer.
          </motion.p>

          <motion.div
            style={{ opacity: ctaOpacity }}
            className="mt-10 flex items-center justify-center gap-3 pointer-events-auto"
          >
            <a href="mailto:yehonatan@parry-io.com" className="btn-primary">
              Book a demo
              <ArrowUpRight size={17} strokeWidth={2.2} />
            </a>
            <a href="#asymmetry" className="btn-ghost group">
              See it work
              <ArrowDown size={15} strokeWidth={2.2} className="group-hover:translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </motion.div>

        {/* Phase B — diagram emerges */}
        <motion.div
          style={{ opacity: diagramOpacity, y: diagramY, scale: diagramScale }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
        >
          <ControlLayerStage sp={sp} />
          <motion.p
            style={{ opacity: diagramCaptionOpacity }}
            className="mt-8 text-center max-w-[660px] mx-auto text-[1.05rem] md:text-[1.15rem] text-[var(--fg-2)] leading-[1.55]"
          >
            <span className="italic text-[var(--fg)]">One layer above the stack.</span>{" "}
            Connecting contracts, pricing, invoices, and supplier history into one coherent view.
          </motion.p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: useTransform(sp, [0, 0.05, 0.92, 1], [0.6, 0.6, 0.6, 0]) }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5 text-[var(--fg-3)]"
          >
            <span className="text-[9.5px] font-mono tracking-[0.22em] uppercase">scroll</span>
            <ArrowDown size={13} strokeWidth={1.4} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* Control layer diagram (mouse-parallax preserved, integrated into sticky stage) */
function ControlLayerStage({ sp }: { sp: MotionValue<number> }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 90, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 90, damping: 18 });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => { mx.set(0); my.set(0); };
    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my]);

  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % PILLARS.length), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      ref={stageRef}
      style={{ perspective: 1200, rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className="relative w-full max-w-[1080px] mx-auto"
    >
      <div
        aria-hidden
        className="absolute -inset-x-20 inset-y-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(55% 50% at 50% 35%, rgba(91,141,239,0.22) 0%, transparent 60%), radial-gradient(40% 35% at 50% 80%, rgba(212,163,115,0.10) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <svg viewBox="0 0 1080 360" className="relative w-full h-auto">
        <defs>
          <linearGradient id="hero-band" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(91,141,239,0.20)" />
            <stop offset="55%" stopColor="rgba(139,123,240,0.16)" />
            <stop offset="100%" stopColor="rgba(212,163,115,0.13)" />
          </linearGradient>
          <linearGradient id="hero-band-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(91,141,239,0.6)" />
            <stop offset="100%" stopColor="rgba(212,163,115,0.6)" />
          </linearGradient>
          <linearGradient id="hero-stream" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(91,141,239,0)" />
            <stop offset="50%" stopColor="rgba(91,141,239,0.85)" />
            <stop offset="100%" stopColor="rgba(212,163,115,0.95)" />
          </linearGradient>
          <filter id="hero-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Parry band */}
        <g style={{ transform: "translateZ(40px)" } as React.CSSProperties}>
          <rect x="40" y="22" width="1000" height="78" rx="14"
            fill="url(#hero-band)" stroke="url(#hero-band-stroke)" strokeWidth="1" />
          <text x="60" y="46" fontFamily="var(--font-mono), monospace" fontSize="10" letterSpacing="2.4" fill="rgba(255,255,255,0.5)">
            PARRY · CONTROL LAYER
          </text>
          {PILLARS.map((p, i) => {
            const x = 122 + i * 192;
            const isOn = active === i;
            return (
              <g key={p} transform={`translate(${x}, 72)`}>
                <motion.circle
                  cx="0" cy="0" r="5.5"
                  fill={isOn ? "#88a8f8" : "rgba(91,141,239,0.45)"}
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: isOn ? 1.4 : 1, opacity: isOn ? 1 : 0.55 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  filter="url(#hero-glow)"
                />
                {isOn && (
                  <motion.circle
                    cx="0" cy="0" r="5.5"
                    fill="none" stroke="#88a8f8" strokeWidth="1"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 3.4, opacity: 0 }}
                    transition={{ duration: 1.6, ease: "easeOut" }}
                  />
                )}
                <text x="0" y="22" textAnchor="middle"
                  fontFamily="var(--font-sans), sans-serif" fontSize="12" fontWeight="500"
                  fill={isOn ? "#f5f5f7" : "rgba(245,245,247,0.7)"}
                  style={{ transition: "fill 400ms ease" }}>
                  {p}
                </text>
              </g>
            );
          })}
        </g>

        {/* Streams */}
        <g style={{ transform: "translateZ(15px)" } as React.CSSProperties}>
          {STACK.map((_, i) => {
            const x = 165 + i * 244;
            return (
              <g key={`s-${i}`}>
                <line x1={x} y1="240" x2={x} y2="102" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <line x1={x} y1="240" x2={x} y2="102"
                  stroke="url(#hero-stream)" strokeWidth="1.8" strokeDasharray="5 14"
                  style={{ animation: `data-flow ${2.4 + i * 0.3}s ${i * 0.35}s linear infinite` }} />
              </g>
            );
          })}
        </g>

        {/* Stack blocks */}
        <g>
          {STACK.map((s, i) => {
            const x = 60 + i * 244;
            return (
              <g key={s}>
                <rect x={x} y="240" width="220" height="100" rx="10"
                  fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <text x={x + 18} y="266" fontFamily="var(--font-mono), monospace" fontSize="9.5" letterSpacing="1.5" fill="rgba(255,255,255,0.36)">
                  L{String(i + 1).padStart(2, "0")}
                </text>
                <text x={x + 18} y="298" fontFamily="var(--font-sans), sans-serif" fontSize="14" fontWeight="500" fill="rgba(245,245,247,0.92)">
                  {s}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </motion.div>
  );
}
