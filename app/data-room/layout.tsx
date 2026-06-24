import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parry — Investor Data Room",
  description: "Confidential investor materials.",
  robots: { index: false, follow: false },
};

export default function DataRoomLayout({ children }: { children: React.ReactNode }) {
  return <div className="landing-page min-h-screen antialiased">{children}</div>;
}
