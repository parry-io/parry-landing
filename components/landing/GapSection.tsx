"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import AnimatedCounter from "./AnimatedCounter";

export default function GapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 px-6 overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, rgba(239,68,68,0.5) 0%, transparent 70%)" }} />
      </motion.div>

      <div ref={ref} className="max-w-4xl mx-auto text-center relative z-10">
        {/* The number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-6xl md:text-8xl lg:text-9xl font-black font-mono text-[var(--landing-red)]">
            $<AnimatedCounter target={400} duration={2000} />B
          </span>
        </motion.div>

        {/* One devastating line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl md:text-3xl text-[var(--landing-text-secondary)] max-w-2xl mx-auto mb-4 leading-relaxed font-light"
        >
          Leaking from vendor relationships
          <br />
          <span className="text-[var(--landing-text-primary)] font-semibold">no one has the bandwidth to manage.</span>
        </motion.p>

        {/* The uncomfortable question */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-base md:text-lg text-[var(--landing-text-tertiary)] mb-16 max-w-lg mx-auto"
        >
          How much of it is yours?
        </motion.p>

        {/* McKinsey — credibility anchor */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="text-xs text-[var(--landing-text-tertiary)] max-w-lg mx-auto italic"
        >
          &ldquo;Companies with advanced procurement models enjoy 5 percentage points higher EBITDA margins.&rdquo;
          <span className="not-italic ml-1">— McKinsey</span>
        </motion.p>
      </div>
    </section>
  );
}
