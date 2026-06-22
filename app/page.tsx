"use client";

import React from "react";
import LandingNav from "../components/landing/LandingNav";
import CursorGlow from "../components/landing/CursorGlow";
import SmoothScroll from "../components/landing/SmoothScroll";
import HeroSection from "../components/landing/HeroSection";
import AsymmetrySection from "../components/landing/AsymmetrySection";
import LiveDemoSection from "../components/landing/LiveDemoSection";
import FlywheelSection from "../components/landing/FlywheelSection";
import PositioningSection from "../components/landing/PositioningSection";
import IntegrationSection from "../components/landing/IntegrationSection";
import GoogleDataUseSection from "../components/landing/GoogleDataUseSection";
import ClosingSection from "../components/landing/ClosingSection";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[var(--ink)] text-[var(--fg)] antialiased overflow-x-clip">
      <SmoothScroll />
      <CursorGlow />
      <LandingNav />

      <main className="relative">
        <HeroSection />
        <AsymmetrySection />
        <LiveDemoSection />
        <FlywheelSection />
        <PositioningSection />
        <IntegrationSection />
        <GoogleDataUseSection />
        <ClosingSection />
      </main>

      <footer className="relative border-t border-[var(--line)] py-7 px-6">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <img src="/Parry_Logo.png" alt="" className="h-5 w-auto" />
            <span className="text-[0.84rem] text-[var(--fg)] font-medium">Parry</span>
            <span className="text-[0.76rem] text-[var(--fg-3)] ml-2">
              &copy; {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex items-center gap-6 text-[0.76rem] text-[var(--fg-3)]">
            <span className="font-mono uppercase tracking-[0.16em]">Tel Aviv</span>
            <a href="mailto:yehonatan@parry-io.com" className="hover:text-[var(--fg)] transition-colors">
              yehonatan@parry-io.com
            </a>
            <a href="/privacy" className="hover:text-[var(--fg)] transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
