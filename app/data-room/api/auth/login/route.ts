import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verifyCredentials } from "@/lib/dataroom/users";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/dataroom/auth";
import { checkRateLimit } from "@/lib/dataroom/ratelimit";
import { sendNotification } from "@/lib/dataroom/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  return (xff?.split(",")[0] || req.headers.get("x-real-ip") || "unknown").trim();
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);

  const rl = checkRateLimit(`login:${ip}`);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
    );
  }

  let email = "";
  let password = "";
  try {
    const body = await req.json();
    email = String(body.email ?? "");
    password = String(body.password ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const user = await verifyCredentials(email, password);
  if (!user) {
    return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
  }

  const token = await createSessionToken({ email: user.email, name: user.name });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/data-room",
    maxAge: SESSION_MAX_AGE,
  });

  // Fire-and-forget notification — never block the login on email.
  void sendNotification({
    type: "login",
    user: { email: user.email, name: user.name },
    ip,
    userAgent: req.headers.get("user-agent") || undefined,
  });

  return NextResponse.json({ ok: true });
}
