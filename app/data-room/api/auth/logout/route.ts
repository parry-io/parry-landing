import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/dataroom/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/data-room",
    maxAge: 0,
  });
  return NextResponse.json({ ok: true });
}
