"use client";

import React, { useEffect, useState } from "react";
import LandingNav from "../components/landing/LandingNav";
import CursorGlow from "../components/landing/CursorGlow";
import HeroSection from "../components/landing/HeroSection";
import GapSection from "../components/landing/GapSection";
import ProductSection from "../components/landing/ProductSection";
import BrainSection from "../components/landing/BrainSection";
import SavingsSection from "../components/landing/SavingsSection";
import TeamSection from "../components/landing/TeamSection";
import IntegrationSection from "../components/landing/IntegrationSection";
import ClosingSection from "../components/landing/ClosingSection";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="landing-page landing-grid-bg min-h-screen" />
    );
  }

  return (
    <div className="landing-page landing-grid-bg min-h-screen antialiased overflow-x-hidden selection:bg-blue-500/30 selection:text-white">
      <CursorGlow />
      <LandingNav />
      <main>
        <HeroSection />
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--landing-border)] to-transparent" />
        <GapSection />
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--landing-accent)]/20 to-transparent" />
        <BrainSection />
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--landing-accent)]/20 to-transparent" />
        <ProductSection />
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--landing-emerald)]/20 to-transparent" />
        <SavingsSection />
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--landing-accent)]/20 to-transparent" />
        <TeamSection />
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--landing-border)] to-transparent" />
        <IntegrationSection />
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--landing-border)] to-transparent" />
        <ClosingSection />
      </main>

      <footer className="border-t border-[var(--landing-border)]/50 py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <img src="/Parry_Logo.png" className="h-4" alt="Parry" />
            <span className="text-xs text-[var(--landing-text-tertiary)]">
              &copy; {new Date().getFullYear()} Parry
            </span>
          </div>
          <div className="flex items-center gap-5 text-xs text-[var(--landing-text-tertiary)]">
            <span>Tel Aviv</span>
            <a href="/privacy" className="hover:text-[var(--landing-text-secondary)] transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
