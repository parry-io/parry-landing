"use client";

import React, { useState } from "react";
import { LogOut } from "lucide-react";

export default function Header({ userName }: { userName: string }) {
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      await fetch("/data-room/api/auth/logout", { method: "POST" });
    } catch {
      /* ignore — we redirect regardless */
    }
    window.location.assign("/data-room");
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--ink)]/72 backdrop-blur-xl border-b border-[var(--line)]">
      <div className="max-w-[1100px] mx-auto px-6 h-[var(--navbar-height)] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/Parry_Logo.png" alt="Parry" className="h-6 w-auto" />
          <span className="text-[0.98rem] font-medium tracking-tight text-[var(--fg)]">Parry</span>
          <span className="text-[var(--fg-4)]">/</span>
          <span className="text-[0.85rem] text-[var(--fg-3)] font-mono uppercase tracking-wider">Data Room</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-[0.82rem] text-[var(--fg-3)]">{userName}</span>
          <button
            onClick={logout}
            disabled={loading}
            className="btn-ghost !py-1.5 !px-3 !text-[0.8rem] disabled:opacity-60"
          >
            <LogOut size={14} strokeWidth={2} />
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
