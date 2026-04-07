"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";

const MODES = [
  { label: "Autonomous", desc: "Parry handles it end-to-end", color: "var(--landing-emerald)" },
  { label: "Co-pilot", desc: "Parry suggests, you decide", color: "var(--landing-accent)" },
  { label: "Supervised", desc: "Parry flags, you approve", color: "var(--landing-violet)" },
];

export default function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeMode, setActiveMode] = useState(0);

  // Cycle through modes
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveMode(m => (m + 1) % MODES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={ref} className="relative py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black leading-tight mb-4"
        >
          Your team doesn&apos;t work harder.
          <br />
          <span className="shimmer-text">They work with Parry.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[var(--landing-text-secondary)] mb-16"
        >
          Full autopilot. Or human approval on every decision. You choose.
        </motion.p>

        {/* Mode switcher animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="inline-flex flex-col items-center gap-6"
        >
          {/* Mode pills */}
          <div className="flex items-center gap-2 p-1.5 rounded-full glass-card">
            {MODES.map((mode, i) => (
              <button
                key={mode.label}
                onClick={() => setActiveMode(i)}
                className="relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-500"
                style={{
                  color: activeMode === i ? mode.color : "var(--landing-text-tertiary)",
                }}
              >
                {activeMode === i && (
                  <motion.div
                    layoutId="mode-bg"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `color-mix(in srgb, ${mode.color} 12%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${mode.color} 25%, transparent)`,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{mode.label}</span>
              </button>
            ))}
          </div>

          {/* Active mode description */}
          <motion.div
            key={activeMode}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: MODES[activeMode].color }}
            />
            <span className="text-sm" style={{ color: MODES[activeMode].color }}>
              {MODES[activeMode].desc}
            </span>
          </motion.div>

          {/* Visual: task flow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-3 mt-4"
          >
            {/* Tasks flowing through */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={`${activeMode}-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 * i, type: "spring", stiffness: 400 }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-mono"
                style={{
                  background: `color-mix(in srgb, ${MODES[activeMode].color} 10%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${MODES[activeMode].color} 20%, transparent)`,
                  color: MODES[activeMode].color,
                }}
              >
                {activeMode === 0 ? "✓" : activeMode === 1 ? (i < 3 ? "✓" : "?") : (i < 2 ? "✓" : "⏸")}
              </motion.div>
            ))}

            <span className="text-xs text-[var(--landing-text-tertiary)] ml-2">
              {activeMode === 0 && "all handled"}
              {activeMode === 1 && "3 auto · 2 review"}
              {activeMode === 2 && "2 auto · 3 pending"}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
