import { NextResponse, type NextRequest } from "next/server";
import fs from "node:fs";
import { getSession } from "@/lib/dataroom/session";
import { getDoc, docFilePath, docExists } from "@/lib/dataroom/docs";
import { sendNotification } from "@/lib/dataroom/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  return (xff?.split(",")[0] || req.headers.get("x-real-ip") || "unknown").trim();
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  // Defense in depth: middleware already blocks unauthenticated requests here.
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const doc = getDoc(id);
  if (!doc || !docExists(doc)) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  // Log + notify on the primary request only — browsers issue extra byte-range
  // requests when rendering a PDF, which we don't want to double-count.
  const range = req.headers.get("range");
  if (!range || /^bytes=0-/.test(range)) {
    void sendNotification({
      type: "view",
      user: session,
      docId: doc.id,
      docTitle: doc.title,
      ip: clientIp(req),
      userAgent: req.headers.get("user-agent") || undefined,
    });
  }

  const data = await fs.promises.readFile(docFilePath(doc));
  return new NextResponse(new Uint8Array(data), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${doc.fileName}"`,
      "Content-Length": String(data.length),
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
