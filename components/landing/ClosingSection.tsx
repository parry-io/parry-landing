"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function ClosingSection() {
  return (
    <section className="relative py-32 md:py-44 px-6">
      <div className="max-w-4xl mx-auto">
        {/* CTA */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-4"
          >
            See what you&apos;re{" "}
            <span className="shimmer-text">missing.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-lg text-[var(--landing-text-secondary)] mb-10"
          >
            From benchmarking to billing — we cover what others can&apos;t. Let us show you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <a
              href="mailto:yehonatan@parry-io.com"
              className="group relative inline-flex items-center gap-3 px-12 py-6 rounded-full text-white font-bold text-lg transition-all active:scale-[0.97] overflow-hidden"
              style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1, #8b5cf6)" }}
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="absolute inset-0 rounded-full glow-blue" />
              <span className="relative z-10 flex items-center gap-3">
                Book a Demo
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-sm text-[var(--landing-text-tertiary)] mt-6"
          >
            <a href="mailto:yehonatan@parry-io.com" className="text-[var(--landing-accent)] hover:text-[var(--landing-accent-bright)] transition-colors">
              yehonatan@parry-io.com
            </a>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-xs text-[var(--landing-text-tertiary)] mt-10"
          >
            Currently partnering with select Fortune 500 enterprises.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
