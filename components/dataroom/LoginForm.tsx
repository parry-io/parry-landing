"use client";

import React, { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/data-room/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        window.location.assign("/data-room");
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Sign-in failed. Please try again.");
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="dr-email" className="text-[0.75rem] text-[var(--fg-3)] font-mono uppercase tracking-wider">
          Email
        </label>
        <input
          id="dr-email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line-strong)] px-3.5 py-2.5 text-[var(--fg)] text-[0.95rem] outline-none transition-colors focus:border-[var(--blue)] placeholder:text-[var(--fg-4)]"
          placeholder="you@viola.vc"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="dr-password" className="text-[0.75rem] text-[var(--fg-3)] font-mono uppercase tracking-wider">
          Password
        </label>
        <input
          id="dr-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line-strong)] px-3.5 py-2.5 text-[var(--fg)] text-[0.95rem] outline-none transition-colors focus:border-[var(--blue)] placeholder:text-[var(--fg-4)]"
          placeholder="••••••••••••"
        />
      </div>

      {error && (
        <p className="text-[0.85rem] text-[var(--neg)] -mt-1" role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn-primary justify-center mt-1 disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Signing in…
          </>
        ) : (
          <>
            Enter the data room
            <ArrowRight size={16} strokeWidth={2.2} />
          </>
        )}
      </button>
    </form>
  );
}
