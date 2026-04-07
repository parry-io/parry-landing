"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--landing-bg)]/80 backdrop-blur-xl border-b border-[var(--landing-border)]/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <img
            src="/Parry_Logo.png"
            className="h-7 group-hover:rotate-12 transition-transform duration-300"
            alt="Parry"
          />
          <span className="text-base font-black tracking-tight uppercase text-[var(--landing-text-primary)]">
            Parry
          </span>
        </a>

        <a
          href="mailto:yehonatan@parry-io.com"
          className="text-sm font-semibold px-5 py-2 rounded-full text-white hover:opacity-90 transition-all glow-blue-subtle"
          style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1, #8b5cf6)" }}
        >
          Book a Demo
        </a>
      </div>
    </motion.nav>
  );
}
