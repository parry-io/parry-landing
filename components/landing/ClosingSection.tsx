"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";

/* ───────── Closing · sticky-scroll stage ─────────
 *  Phases:
 *   0–0.20  Headline appears
 *   0.18–0.45 Subhead fades
 *   0.40–0.70 CTA scales in
 *   0.70–1.0  Contact line settles
 * ─────────────────────────────────────────────── */

export default function ClosingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const sp = useSpring(scrollYProgress, { stiffness: 110, damping: 26, restDelta: 0.001 });

  // Phased reveal — visible enough at sp=0 to never be blank, polished progression
  const headOpacity = useTransform(sp, [0, 0.15], [0.65, 1]);
  const headY = useTransform(sp, [0, 0.25], [18, 0]);
  const headScale = useTransform(sp, [0, 0.5], [0.97, 1]);

  const subOpacity = useTransform(sp, [0.15, 0.40], [0, 1]);
  const subY = useTransform(sp, [0.15, 0.40], [14, 0]);

  const ctaOpacity = useTransform(sp, [0.30, 0.55], [0, 1]);
  const ctaScale = useTransform(sp, [0.30, 0.65], [0.92, 1]);
  const ctaY = useTransform(sp, [0.30, 0.55], [10, 0]);

  const contactOpacity = useTransform(sp, [0.55, 0.75], [0, 1]);
  const contactY = useTransform(sp, [0.55, 0.75], [6, 0]);

  // Aurora drift with scroll
  const auroraY = useTransform(sp, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={sectionRef} className="relative h-[120vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6 bg-[var(--ink)]">
        <motion.div aria-hidden style={{ y: auroraY }} className="absolute inset-0 pointer-events-none">
          <div className="aurora" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-graph opacity-25" />

        <div className="relative z-10 w-full max-w-[1100px] mx-auto text-center">
          <motion.h2
            style={{ opacity: headOpacity, y: headY, scale: headScale }}
            className="text-[clamp(2.6rem,6vw,5.2rem)] leading-[1.04] tracking-tight font-medium text-[var(--fg)] max-w-[920px] mx-auto"
          >
            Bring your supplier base{" "}
            <span
              className="italic-display text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(96deg, #f5f5f7 0%, #88a8f8 50%, #d4a373 100%)",
                backgroundSize: "200% auto",
                animation: "gradient-pan 12s linear infinite",
              }}
            >
              into focus.
            </span>
          </motion.h2>

          <motion.p
            style={{ opacity: subOpacity, y: subY }}
            className="mt-6 text-[1.15rem] md:text-[1.3rem] text-[var(--fg-2)] max-w-[580px] mx-auto leading-[1.55]"
          >
            A 30-minute walkthrough on your contracts, your invoices, your leakage.
          </motion.p>

          <motion.div
            style={{ opacity: ctaOpacity, scale: ctaScale, y: ctaY }}
            className="mt-10 flex items-center justify-center gap-3"
          >
            <a href="mailto:yehonatan@parry-io.com" className="btn-primary !text-[1rem] !py-3 !px-6">
              Request a working session
              <ArrowUpRight size={18} strokeWidth={2.2} />
            </a>
          </motion.div>

          <motion.p
            style={{ opacity: contactOpacity, y: contactY }}
            className="mt-7 text-[0.82rem] text-[var(--fg-3)]"
          >
            <a href="mailto:yehonatan@parry-io.com" className="hover:text-[var(--fg)] transition-colors">
              yehonatan@parry-io.com
            </a>
            <span className="mx-3 text-[var(--fg-4)]">·</span>
            <span className="font-mono uppercase tracking-[0.16em]">Tel Aviv</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
