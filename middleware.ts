import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/dataroom/auth";

// Gate everything under /data-room except the entry page (which renders the
// login screen itself) and the auth endpoints.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname === "/data-room" ||
    pathname === "/data-room/" ||
    pathname.startsWith("/data-room/api/auth/")
  ) {
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
