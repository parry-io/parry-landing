"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useSpring, useTransform } from "motion/react";
import { Search, ShieldAlert, CalendarClock, TrendingUp, ShieldCheck, Sparkles, Eye, Radar, MessageSquareQuote, Bot } from "lucide-react";

/* ───────── Live product preview ─────────
 * Animated "Parry scans a vendor" demo. Loops through fictional vendors.
 * Replaces text-heavy explainer sections with one impressive moment.
 * ────────────────────────────────────────── */

type Finding = {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  tier: "neg" | "amber" | "blue" | "pos";
  label: string;
  detail: string;
  value: string;
};

const VENDORS: { name: string; spend: string; findings: Finding[] }[] = [
  {
    name: "AcmeCloud · MSA-2023-1142",
    spend: "$2.4M / 36 mo",
    findings: [
      { Icon: ShieldAlert, tier: "neg",   label: "Billing drift",      detail: "actual vs. negotiated rate",  value: "+ $11,847" },
      { Icon: CalendarClock,tier: "amber", label: "Renewal exposure",  detail: "47 days · no leverage prep",  value: "+ 18% inc."  },
      { Icon: TrendingUp,   tier: "blue",  label: "Tier mis-class",    detail: "3 SKUs in wrong tier",        value: "− $4,210"   },
      { Icon: ShieldCheck,  tier: "pos",   label: "Recovery action",   detail: "queued · CFO approved",       value: "+ $312,400" },
    ],
  },
  {
    name: "Mercator Systems · Order #88241",
    spend: "$1.1M / 24 mo",
    findings: [
      { Icon: ShieldAlert, tier: "neg",   label: "Invoice anomaly",   detail: "duplicate line items",        value: "+ $4,205"   },
      { Icon: CalendarClock,tier: "amber", label: "Auto-renew flag",  detail: "21 days · uplift clause",     value: "+ 12% inc."  },
      { Icon: TrendingUp,   tier: "blue",  label: "Volume re-tier",   detail: "Q3 commit + 18%",             value: "− $7,840"   },
      { Icon: ShieldCheck,  tier: "pos",   label: "Negotiation deck", detail: "benchmarks ready",            value: "+ $148,200" },
    ],
  },
];

const TIER_COLORS: Record<Finding["tier"], { bg: string; border: string; fg: string }> = {
  neg:   { bg: "rgba(236,106,114,0.10)", border: "rgba(236,106,114,0.30)", fg: "var(--neg)" },
  amber: { bg: "rgba(233,182,89,0.10)",  border: "rgba(233,182,89,0.30)",  fg: "var(--amber)" },
  blue:  { bg: "rgba(91,141,239,0.10)",  border: "rgba(91,141,239,0.30)",  fg: "var(--blue-bright)" },
  pos:   { bg: "rgba(93,192,151,0.10)",  border: "rgba(93,192,151,0.30)",  fg: "var(--pos)" },
};

function useTyping(text: string, speed = 22) {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    let i = 0;
    const t = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return out;
}

function VendorWindow({ idx }: { idx: number }) {
  const v = VENDORS[idx];
  const typed = useTyping(v.name, 18);
  const [revealed, setRevealed] = useState(0);
  const [recovered, setRecovered] = useState(0);

  useEffect(() => {
    setRevealed(0);
    setRecovered(0);
    const total = v.findings.length;
    const stamps = Array.from({ length: total }, (_, i) =>
      setTimeout(() => setRevealed((r) => r + 1), 1100 + i * 700)
    );
    return () => stamps.forEach(clearTimeout);
  }, [idx, v.findings.length]);

  // Animate $ recovered up after final finding is shown
  useEffect(() => {
    if (revealed < v.findings.length) return;
    const target = parseInt(v.findings[v.findings.length - 1].value.replace(/[^\d]/g, ""), 10);
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setRecovered(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [revealed, v.findings]);

  return (
    <div className="relative card-elevated overflow-hidden">
      {/* Background grid that energizes during scan */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(91,141,239,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(91,141,239,0.16) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      {/* Soft radar wash on entry */}
      <motion.div
        key={`wash-${idx}`}
        aria-hidden
        initial={{ opacity: 0.45 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 40% at 30% 50%, rgba(91,141,239,0.20), transparent 70%)",
        }}
      />
      {/* Sweep beam crossing the window once per vendor cycle */}
      <motion.div
        key={`sweep-${idx}`}
        aria-hidden
        initial={{ x: "-30%" }}
        animate={{ x: "130%" }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 w-[24%] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(91,141,239,0.18) 50%, transparent 100%)",
          filter: "blur(8px)",
        }}
      />

      {/* Window chrome */}
      <div className="relative flex items-center justify-between px-4 md:px-5 py-3 border-b border-[var(--line)] bg-[var(--surface-3)]/60 backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        {/* Live activity waveform */}
        <LiveWaveform />
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--pos)] animate-[pulse-soft_1.6s_ease-in-out_infinite]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--fg-3)]">live</span>
        </span>
      </div>

      {/* Body */}
      <div className="relative grid md:grid-cols-[1.4fr_1fr] divide-y md:divide-y-0 md:divide-x divide-[var(--line)]">
        {/* Left: vendor scan */}
        <div className="p-5 md:p-7 min-h-[360px] relative">
          <div className="flex items-center gap-3 mb-1">
            <Search size={13} strokeWidth={1.8} className="text-[var(--blue)]" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--fg-3)]">
              vendor scan
            </span>
          </div>
          <div className="font-display italic text-[1.6rem] md:text-[1.8rem] leading-[1.1] text-[var(--fg)]">
            {typed}
            <span className="inline-block w-[2px] h-[0.85em] align-middle ml-[2px] bg-[var(--blue)] animate-[blink-soft_1s_step-end_infinite]" />
          </div>
          <div className="mt-1 text-[0.82rem] text-[var(--fg-3)] font-mono">
            {v.spend}
          </div>

          {/* Findings list */}
          <div className="mt-7 space-y-2.5 relative">
            {v.findings.map((f, i) => {
              const visible = i < revealed;
              const c = TIER_COLORS[f.tier];
              return (
                <motion.div
                  key={`${idx}-${i}`}
                  initial={{ opacity: 0, x: -16, scale: 0.97 }}
                  animate={visible ? { opacity: 1, x: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex items-center gap-3 rounded-lg px-3.5 py-2.5 overflow-hidden"
                  style={{
                    background: c.bg,
                    border: `1px solid ${c.border}`,
                  }}
                >
                  {/* Impact ripple on appear */}
                  {visible && (
                    <motion.span
                      aria-hidden
                      initial={{ scaleX: 0, opacity: 0.5 }}
                      animate={{ scaleX: 1, opacity: 0 }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      className="absolute inset-y-0 left-0 right-0 origin-left rounded-lg"
                      style={{ background: c.fg, opacity: 0.06 }}
                    />
                  )}
                  <span
                    className="relative inline-flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0"
                    style={{ background: c.bg, border: `1px solid ${c.border}` }}
                  >
                    <f.Icon size={13} strokeWidth={1.8} className="text-[var(--fg)]" />
                  </span>
                  <div className="relative min-w-0 flex-1">
                    <div className="text-[0.88rem] font-medium tracking-tight" style={{ color: c.fg }}>
                      {f.label}
                    </div>
                    <div className="text-[0.74rem] text-[var(--fg-3)] truncate">{f.detail}</div>
                  </div>
                  <span className="relative font-mono text-[0.82rem] tabular-nums flex-shrink-0" style={{ color: c.fg }}>
                    {f.value}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right: recovery */}
        <div className="relative p-5 md:p-7 flex flex-col justify-between bg-[var(--surface-2)]/40 overflow-hidden">
          {/* Glow ring behind counter */}
          <div
            aria-hidden
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(93,192,151,0.18) 0%, rgba(212,163,115,0.08) 40%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={13} strokeWidth={1.8} className="text-[var(--warm-bright)]" />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--fg-3)]">
                recovery · ytd
              </span>
            </div>
            <motion.div
              key={`rec-${idx}`}
              initial={{ scale: 0.96, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 relative inline-block"
            >
              <span
                className="font-display italic text-transparent bg-clip-text tabular-nums text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.05] inline-block"
                style={{
                  backgroundImage:
                    "linear-gradient(95deg, #5dc097 0%, #d4a373 60%, #5dc097 100%)",
                  backgroundSize: "200% auto",
                  animation: "gradient-pan 6s linear infinite",
                  paddingRight: "0.12em",
                  paddingBottom: "0.08em",
                }}
              >
                ${recovered.toLocaleString()}
              </span>
            </motion.div>
            <p className="mt-2 text-[0.82rem] text-[var(--fg-3)] leading-[1.5]">
              auto-quantified.{" "}
              <span className="italic text-[var(--fg-2)]">enforced over term.</span>
            </p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { k: "Contracts", v: "127" },
              { k: "Suppliers", v: "412" },
              { k: "Coverage",  v: "98%" },
            ].map((s) => (
              <div key={s.k} className="rounded-md border border-[var(--line)] bg-[var(--surface)]/70 p-2.5">
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--fg-3)]">
                  {s.k}
                </div>
                <div className="mt-1 font-mono text-[0.95rem] font-semibold text-[var(--fg)] tabular-nums">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scan line at the very top of body */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-[44px] h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(91,141,239,0.6), transparent)",
        }}
      />
    </div>
  );
}

export default function LiveDemoSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const sp = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  // Vendor index follows scroll progress (no auto-cycle that "sticks")
  const vendorMv = useTransform(sp, (v) => {
    // Map progress to vendor index, with hold zones so each vendor breathes
    const t = Math.max(0, Math.min(0.999, v));
    return Math.min(VENDORS.length - 1, Math.floor(t * VENDORS.length));
  });
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const unsub = vendorMv.on("change", (v) => setIdx(Math.round(v)));
    return () => unsub();
  }, [vendorMv]);

  return (
    <section ref={ref} id="system" className="relative h-[170vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-8 bg-[var(--ink)]">
        <div className="absolute inset-0 bg-graph opacity-30 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative w-full">
        <div className="text-center max-w-[680px] mx-auto mb-8 md:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.05] tracking-tight font-medium text-[var(--fg)]"
          >
            Five moves.{" "}
            <span className="italic-display text-[var(--fg-2)]">One window.</span>
          </motion.h2>
        </div>

        {/* Demo + vendor tabs */}
        <div className="relative">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {VENDORS.map((v, i) => (
              <button
                key={v.name}
                onClick={() => setIdx(i)}
                className={`relative px-3.5 py-1.5 rounded-full text-[0.72rem] font-mono tracking-[0.05em] transition-all duration-300 ${
                  idx === i
                    ? "text-[var(--fg)]"
                    : "text-[var(--fg-3)] hover:text-[var(--fg-2)]"
                }`}
              >
                {idx === i && (
                  <motion.span
                    layoutId="vendor-tab-bg"
                    className="absolute inset-0 rounded-full bg-[var(--surface-2)] border border-[var(--line-strong)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{v.name.split(" · ")[0]}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <VendorWindow idx={idx} />
            </motion.div>
          </AnimatePresence>

          {/* Capability strip — five verbs synced to demo cycle */}
          <CapabilityStrip vendorIdx={idx} />
        </div>
      </div>
      </div>
    </section>
  );
}

const CAPS = [
  { Icon: Eye,                label: "Understand", note: "the supplier base",        accent: "var(--blue)" },
  { Icon: Radar,              label: "Detect",     note: "the leakage",              accent: "var(--neg)" },
  { Icon: MessageSquareQuote, label: "Support",    note: "the negotiation",          accent: "var(--violet)" },
  { Icon: Bot,                label: "Automate",   note: "the workflow",             accent: "var(--blue-bright)" },
  { Icon: ShieldCheck,        label: "Enforce",    note: "the savings",              accent: "var(--pos)" },
];

function CapabilityStrip({ vendorIdx }: { vendorIdx: number }) {
  const [pulseIdx, setPulseIdx] = useState(0);
  useEffect(() => {
    setPulseIdx(0);
    const stamps = CAPS.map((_, i) =>
      setTimeout(() => setPulseIdx((p) => Math.max(p, i + 1)), 700 + i * 1400)
    );
    return () => stamps.forEach(clearTimeout);
  }, [vendorIdx]);

  return (
    <div className="mt-6 grid grid-cols-5 gap-2 md:gap-3">
      {CAPS.map((c, i) => {
        const isOn = pulseIdx > i;
        return (
          <div
            key={c.label}
            className="relative rounded-lg border px-3 py-3 transition-all duration-500"
            style={{
              borderColor: isOn ? `color-mix(in srgb, ${c.accent} 40%, transparent)` : "var(--line)",
              background: isOn ? `color-mix(in srgb, ${c.accent} 5%, transparent)` : "transparent",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <c.Icon
                size={13}
                strokeWidth={1.8}
                style={{ color: isOn ? c.accent : "var(--fg-4)", transition: "color 400ms ease" }}
              />
              <motion.span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{
                  background: c.accent,
                  boxShadow: isOn ? `0 0 8px ${c.accent}` : "none",
                  opacity: isOn ? 1 : 0.2,
                }}
                animate={isOn ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
            </div>
            <div
              className="font-display italic text-[1.1rem] leading-[1]"
              style={{ color: isOn ? "var(--fg)" : "var(--fg-3)", transition: "color 400ms ease" }}
            >
              {c.label}.
            </div>
            <div
              className="mt-1 text-[0.72rem] text-[var(--fg-3)]"
              style={{ opacity: isOn ? 0.85 : 0.5, transition: "opacity 400ms ease" }}
            >
              {c.note}
            </div>
          </div>
        );
      })}
    </div>
  );
}


/* ───────── Live activity waveform ─────────
 * Animated bars that pulse like an audio waveform
 * — gives the window an "alive" feel.
 * ─────────────────────────────────────────── */
function LiveWaveform() {
  const BARS = 22;
  return (
    <div className="hidden sm:flex items-center gap-[3px] h-4">
      {Array.from({ length: BARS }).map((_, i) => {
        const phase = (i / BARS) * Math.PI * 2;
        return (
          <motion.span
            key={i}
            className="w-[2px] rounded-full bg-[var(--blue)]"
            animate={{
              height: [
                `${20 + Math.sin(phase) * 30 + 30}%`,
                `${20 + Math.sin(phase + Math.PI / 2) * 30 + 50}%`,
                `${20 + Math.sin(phase + Math.PI) * 30 + 25}%`,
                `${20 + Math.sin(phase + Math.PI * 1.5) * 30 + 60}%`,
                `${20 + Math.sin(phase) * 30 + 30}%`,
              ],
              opacity: [0.35, 0.85, 0.45, 0.95, 0.35],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.04,
            }}
            style={{ minHeight: 3 }}
          />
        );
      })}
    </div>
  );
}
