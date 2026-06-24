import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/dataroom/auth";
import { FIRM_COOKIE, sanitizeFirmSlug } from "@/lib/dataroom/firm";

// Gate everything under /data-room except the entry page (which renders the
// login screen itself) and the auth endpoints.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Entry page: persist the ?firm= personalization in a cookie so it survives
  // the post-login reload (and lets the firm name show on the library too).
  if (pathname === "/data-room" || pathname === "/data-room/") {
    const res = NextResponse.next();
    const firm = sanitizeFirmSlug(req.nextUrl.searchParams.get("firm"));
    if (firm) {
      res.cookies.set(FIRM_COOKIE, firm, {
        path: "/data-room",
        maxAge: 60 * 60 * 12,
        sameSite: "lax",
      });
    }
    return res;
  }

  if (pathname.startsWith("/data-room/api/auth/")) {
    return NextResponse.next();
  }

  const session = await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value);
  if (session) return NextResponse.next();

  if (pathname.startsWith("/data-room/api/")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = req.nextUrl.clone();
  url.pathname = "/data-room";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/data-room/:path*"],
};
