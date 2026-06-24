// Server-side session access (uses next/headers — NOT for middleware/edge).
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken, type SessionUser } from "./auth";

export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}
