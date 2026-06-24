import React from "react";
import { getSession } from "@/lib/dataroom/session";
import { getDocs, docExists } from "@/lib/dataroom/docs";
import LoginForm from "@/components/dataroom/LoginForm";
import Header from "@/components/dataroom/Header";
import DocCard from "@/components/dataroom/DocCard";

export const dynamic = "force-dynamic";

export default async function DataRoomPage() {
  const session = await getSession();
  if (!session) return <LoginScreen />;

  const docs = getDocs().map((d) => ({ doc: d, available: docExists(d) }));

  return (
    <>
      <Header userName={session.name} />
      <main className="relative pt-[var(--navbar-height)] min-h-screen bg-graph-fine overflow-hidden">
        <div className="aurora" aria-hidden />
        <div className="relative max-w-[1100px] mx-auto px-6 pt-16 pb-24">
          <span className="section-eyebrow">Investor Data Room</span>
          <h1 className="font-display text-[2.75rem] md:text-[3.5rem] leading-[1.05] text-[var(--fg)] mt-4">
            Parry <span className="italic-display text-[var(--fg-2)]">for</span> Viola
          </h1>
          <p className="text-[var(--fg-2)] text-[1.05rem] mt-4 max-w-xl leading-relaxed">
            Welcome, {session.name}. Below are the confidential materials for our round.
            Each document opens in your browser.
          </p>

          <div className="hairline my-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {docs.map(({ doc, available }) => (
              <DocCard key={doc.id} doc={doc} available={available} />
            ))}
          </div>

          <p className="mt-16 text-[0.78rem] text-[var(--fg-4)] font-mono">
            Confidential — prepared for Viola. Please do not distribute.
          </p>
        </div>
      </main>
    </>
  );
}

function LoginScreen() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 bg-graph overflow-hidden">
      <div className="aurora" aria-hidden />
      <div className="relative w-full max-w-md">
        <div className="flex flex-col items-center text-center mb-8">
          <img src="/Parry_Logo.png" alt="Parry" className="h-10 w-auto mb-5" />
          <span className="section-eyebrow">Investor Data Room</span>
          <h1 className="font-display text-[2.4rem] leading-tight text-[var(--fg)] mt-3">
            Welcome
          </h1>
          <p className="text-[var(--fg-3)] text-[0.95rem] mt-2 max-w-xs">
            Confidential materials prepared for <span className="text-[var(--fg-2)]">Viola</span>. Please sign in.
          </p>
        </div>

        <div className="card-elevated p-7">
          <LoginForm />
        </div>

        <p className="text-center text-[0.74rem] text-[var(--fg-4)] font-mono mt-6">
          Access is monitored. For the intended recipient only.
        </p>
      </div>
    </main>
  );
}
