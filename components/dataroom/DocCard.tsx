import React from "react";
import { FileText, ArrowUpRight, Clock } from "lucide-react";
import type { DataRoomDoc } from "@/lib/dataroom/docs";

export default function DocCard({ doc, available }: { doc: DataRoomDoc; available: boolean }) {
  const Inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="tag">
          <FileText size={12} strokeWidth={2} />
          {doc.category}
        </span>
        {available ? (
          <ArrowUpRight
            size={18}
            strokeWidth={2}
            className="text-[var(--fg-4)] transition-all duration-300 group-hover:text-[var(--blue-bright)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        ) : (
          <Clock size={16} strokeWidth={2} className="text-[var(--fg-4)]" />
        )}
      </div>

      <h3 className="font-display text-[1.5rem] leading-tight text-[var(--fg)] mt-4">{doc.title}</h3>
      <p className="text-[0.88rem] text-[var(--fg-3)] mt-1.5 leading-relaxed">{doc.description}</p>

      <div className="mt-4 pt-3 border-t border-[var(--line)] text-[0.72rem] font-mono uppercase tracking-wider text-[var(--fg-4)]">
        {available ? "PDF · Open to view" : "Coming soon"}
      </div>
    </>
  );

  if (!available) {
    return <div className="card p-5 opacity-55 select-none">{Inner}</div>;
  }

  return (
    <a
      href={`/data-room/api/doc/${doc.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="card p-5 group block hover:-translate-y-0.5"
    >
      {Inner}
    </a>
  );
}
