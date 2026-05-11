"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--ink)]/72 backdrop-blur-xl border-b border-[var(--line)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 h-[var(--navbar-height)] flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <img
              src="/Parry_Logo.png"
              alt=""
              className="h-6 w-auto transition-transform duration-500 group-hover:scale-105"
            />
            <span className="text-[0.98rem] font-medium tracking-tight text-[var(--fg)]">
              Parry
            </span>
          </a>

          <div className="hidden md:flex items-center gap-7 text-[0.82rem] text-[var(--fg-3)]">
            <a href="#asymmetry" className="hover:text-[var(--fg)] transition-colors">Problem</a>
            <a href="#system" className="hover:text-[var(--fg)] transition-colors">Product</a>
            <a href="#positioning" className="hover:text-[var(--fg)] transition-colors">Above the stack</a>
          </div>

          <a
            href="mailto:yehonatan@parry-io.com"
            className="btn-primary !text-[0.78rem] !py-1.5 !px-3.5 md:!text-[0.85rem] md:!py-2 md:!px-4"
          >
            Book a demo
            <ArrowUpRight size={14} strokeWidth={2.2} />
          </a>
        </div>
      </motion.nav>

      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-[var(--navbar-height)] left-0 right-0 z-50 h-px origin-left bg-gradient-to-r from-[var(--blue)] via-[var(--warm)] to-[var(--violet)] opacity-50"
      />
    </>
  );
}
