"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import AnimatedCounter from "./AnimatedCounter";

export default function ProductSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const [phase, setPhase] = useState(0); // 0=waiting, 1=scanning, 2=done

  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isInView]);

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm text-[var(--landing-text-tertiary)] uppercase tracking-widest font-mono mb-6"
        >
          What happens when Parry meets a new vendor
        </motion.p>

        {/* The dramatic result */}
        <div className="min-h-[200px] flex flex-col items-center justify-center">
          {phase === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-[var(--landing-accent)] animate-pulse" />
              <span className="text-lg text-[var(--landing-text-tertiary)] font-mono">
                Analyzing...
              </span>
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="space-y-8"
            >
              {/* Results grid */}
              <div className="grid grid-cols-3 gap-8 md:gap-16">
                {[
                  { value: 4, label: "risks detected", color: "var(--landing-red)" },
                  { value: 2, label: "billing gaps", color: "var(--landing-amber)" },
                  { value: 1, label: "action plan", color: "var(--landing-emerald)" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.2 }}
                    className="text-center"
                  >
                    <div className="text-4xl md:text-6xl font-black font-mono mb-2" style={{ color: item.color }}>
                      <AnimatedCounter target={item.value} duration={1000} />
                    </div>
                    <p className="text-xs md:text-sm text-[var(--landing-text-tertiary)]">{item.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Blurred savings — curiosity */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="pt-6 border-t border-[var(--landing-border)]/20"
              >
                <span className="text-sm text-[var(--landing-text-tertiary)] blur-[4px] select-none">
                  Estimated recovery: $312,400 annually
                </span>
                <a href="mailto:yehonatan@parry-io.com" className="text-xs text-[var(--landing-accent)] font-mono ml-3">
                  see yours →
                </a>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Time */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-[var(--landing-text-tertiary)] mt-8"
        >
          <span className="text-3xl md:text-4xl font-black font-mono text-[var(--landing-text-primary)]">60</span>
          <span className="text-sm ml-2">seconds. One vendor. Full picture.</span>
        </motion.p>
      </div>
    </section>
  );
}
