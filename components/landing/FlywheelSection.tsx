"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

/* ───────── Flywheel · sticky-scroll stage ─────────
 *  Phases:
 *   0–0.15  Headline appears
 *   0.10–0.45 Wheel scales in
 *   0.35–0.95 Hub toggles & nodes light in sequence
 *   0.75–1.00 Tagline reveals
 * Clear typography, no blur on content.
 * ─────────────────────────────────────────────── */

const NODES = ["Negotiation", "Pricing", "Memory", "Renewal", "Workflow"];

function CompoundStat({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="flex flex-col items-start text-left">
      <span className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-[var(--fg-3)]">
        {label}
      </span>
      <span className="mt-1 font-mono text-[1.15rem] md:text-[1.35rem] font-semibold text-[var(--fg)] tabular-nums leading-none">
        {value}
      </span>
      <span className="mt-1 font-mono text-[9.5px] tracking-[0.05em] text-[var(--pos)]">
        ↑ {delta}
      </span>
    </div>
  );
}

export default function FlywheelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const sp = useSpring(scrollYProgress, { stiffness: 110, damping: 26, restDelta: 0.001 });

  // Headline + wheel visible from start; only nodes light up with scroll
  const headOpacity = useTransform(sp, [0, 1], [1, 1]);
  const headY = useTransform(sp, [0, 1], [0, 0]);

  const wheelOpacity = useTransform(sp, [0, 1], [1, 1]);
  const wheelScale = useTransform(sp, [0, 1], [1, 1]);

  const taglineOpacity = useTransform(sp, [0.65, 0.85], [0, 1]);
  const taglineY = useTransform(sp, [0.65, 0.85], [10, 0]);

  // Active node lights based on scroll progress (and cycles if user lingers)
  const activeNodeIdx = useTransform(sp, (v) => {
    const t = Math.min(1, Math.max(0, v));
    return Math.min(NODES.length - 1, Math.floor(t * NODES.length * 0.9));
  });
  const [activeNode, setActiveNode] = useState(-1);
  useEffect(() => {
    const unsub = activeNodeIdx.on("change", (v) => setActiveNode(Math.round(v)));
    return () => unsub();
  }, [activeNodeIdx]);

  // Hub label toggles based on time inside the section
  const [hub, setHub] = useState<"execution" | "data">("execution");
  useEffect(() => {
    const t = setInterval(() => setHub((s) => (s === "execution" ? "data" : "execution")), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={sectionRef} id="flywheel" className="relative h-[140vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6 bg-[var(--ink)]">
        <div aria-hidden className="absolute inset-0 bg-graph opacity-30" />
        <div aria-hidden className="aurora-warm" />

        <div className="relative z-10 w-full max-w-[1100px] mx-auto text-center flex flex-col items-center">
          <motion.h2
            style={{ opacity: headOpacity, y: headY }}
            className="text-[clamp(2.3rem,5vw,4rem)] leading-[1.05] tracking-tight font-medium text-[var(--fg)] max-w-[820px] mx-auto"
          >
            Execution creates data. Data{" "}
            <span className="italic-display text-[var(--fg-2)]">sharpens</span> execution.
          </motion.h2>

          <motion.p
            style={{ opacity: headOpacity }}
            className="mt-4 text-[1.05rem] md:text-[1.15rem] text-[var(--fg-3)] max-w-[480px] mx-auto"
          >
            The longer it runs, the harder it is to leave.
          </motion.p>

          <motion.div
            style={{ opacity: wheelOpacity, scale: wheelScale }}
            className="mt-10 md:mt-12 aspect-square w-full max-w-[520px] md:max-w-[540px]"
          >
            <Wheel activeNode={activeNode} hub={hub} />
          </motion.div>

          <motion.div
            style={{ opacity: taglineOpacity, y: taglineY }}
            className="mt-8 flex items-baseline justify-center gap-6 md:gap-10"
          >
            <CompoundStat label="Vendors" value="412" delta="+18 this qtr" />
            <span className="hidden md:block w-px h-7 bg-[var(--line)]" />
            <CompoundStat label="Signals" value="2.4k" delta="+14% MoM" />
            <span className="hidden md:block w-px h-7 bg-[var(--line)]" />
            <CompoundStat label="Recovery" value="$4.1M" delta="+$612k" />
          </motion.div>
        </div>

        {/* Progress */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[200px]">
          <div className="h-px bg-[var(--line)] relative">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--blue)] via-[var(--warm)] to-[var(--pos)]"
              style={{ scaleX: sp, transformOrigin: "left", width: "100%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Wheel({ activeNode, hub }: { activeNode: number; hub: "execution" | "data" }) {
  return (
    <svg viewBox="0 0 540 540" className="w-full h-full" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="fly-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(91,141,239,0.55)" />
          <stop offset="50%" stopColor="rgba(212,163,115,0.55)" />
          <stop offset="100%" stopColor="rgba(139,123,240,0.55)" />
        </linearGradient>
        <radialGradient id="fly-hub-glow">
          <stop offset="0%" stopColor="rgba(91,141,239,0.45)" />
          <stop offset="60%" stopColor="rgba(91,141,239,0.05)" />
          <stop offset="100%" stopColor="rgba(91,141,239,0)" />
        </radialGradient>
        <filter id="fly-glow">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      <motion.circle
        cx="270" cy="270" r="220"
        fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 8"
        animate={{ rotate: 360 }}
        transition={{ rotate: { duration: 90, repeat: Infinity, ease: "linear" } }}
        style={{ transformOrigin: "270px 270px" }}
      />
      <circle cx="270" cy="270" r="160" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <motion.circle
        cx="270" cy="270" r="160"
        fill="none" stroke="url(#fly-ring)" strokeWidth="1.6" strokeDasharray="4 7"
        animate={{ rotate: -360 }}
        transition={{ rotate: { duration: 60, repeat: Infinity, ease: "linear" } }}
        style={{ transformOrigin: "270px 270px" }}
      />

      <circle cx="270" cy="270" r="130" fill="url(#fly-hub-glow)" />
      <circle cx="270" cy="270" r="60" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
      <circle cx="270" cy="270" r="52" fill="rgba(7,8,13,0.78)" stroke="rgba(91,141,239,0.32)" strokeWidth="0.5" />

      <text x="270" y="265" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="9" letterSpacing="2.4" fill="rgba(255,255,255,0.45)">
        FLYWHEEL
      </text>
      <motion.text
        key={hub}
        x="270" y="290" textAnchor="middle"
        fontFamily="var(--font-display), serif" fontStyle="italic" fontSize="26"
        fill="rgba(245,245,247,0.96)"
        initial={{ opacity: 0, y: -3 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {hub}
      </motion.text>

      {NODES.map((n, i) => {
        const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
        const nx = 270 + Math.cos(angle) * 220;
        const ny = 270 + Math.sin(angle) * 220;
        const isOn = activeNode >= i;
        const isCurrent = activeNode === i;
        return (
          <g key={n} transform={`translate(${nx}, ${ny})`}>
            <motion.path
              d={`M ${270 - nx} ${270 - ny} Q ${(270 - nx) * 0.5 - 25} ${(270 - ny) * 0.5 + 25} 0 0`}
              fill="none"
              stroke={isOn ? "rgba(91,141,239,0.55)" : "rgba(255,255,255,0.07)"}
              strokeWidth="1"
              strokeDasharray="3 5"
              animate={{ pathLength: isOn ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            />
            <motion.circle
              r={isCurrent ? 12 : 7}
              fill={isOn ? "rgba(91,141,239,0.22)" : "rgba(255,255,255,0.025)"}
              stroke={isOn ? "rgba(91,141,239,0.85)" : "rgba(255,255,255,0.15)"}
              strokeWidth="1"
              animate={{ scale: isCurrent ? 1.08 : 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.circle
              r="3"
              fill={isOn ? "#88a8f8" : "rgba(255,255,255,0.45)"}
              animate={{ opacity: isCurrent ? [0.6, 1, 0.6] : isOn ? 0.9 : 0.5 }}
              transition={{ duration: 1.4, repeat: isCurrent ? Infinity : 0, ease: "easeInOut" }}
            />
            <text
              x={Math.cos(angle) * 32}
              y={Math.sin(angle) * 32 + 4}
              textAnchor={Math.cos(angle) > 0.5 ? "start" : Math.cos(angle) < -0.5 ? "end" : "middle"}
              fontFamily="var(--font-sans), sans-serif" fontSize="13"
              fontWeight={isOn ? "500" : "400"}
              fill={isOn ? "#f5f5f7" : "rgba(245,245,247,0.62)"}
              style={{ transition: "fill 400ms ease, font-weight 400ms ease" }}
            >
              {n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
