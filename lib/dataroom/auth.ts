// Session token helpers for the Parry Data Room.
// Edge-safe: only uses `jose` (no bcrypt, no next/headers) so it can be
// imported from middleware as well as Node route handlers.
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "dr_session";
export const SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours

export interface SessionUser {
  email: string;
  name: string;
}

function secretKey(): Uint8Array | null {
  const s = process.env.DATAROOM_SESSION_SECRET;
  if (s && s.length >= 16) return new TextEncoder().encode(s);
  // Dev fallback so the room runs locally without configuration.
  if (process.env.NODE_ENV !== "production") {
    return new TextEncoder().encode("dev-insecure-dataroom-secret-change-me");
  }
  // Fail closed in production if the secret is missing.
  return null;
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  const key = secretKey();
  if (!key) throw new Error("DATAROOM_SESSION_SECRET is not configured");
  return await new SignJWT({ name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.email)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(key);
}

export async function verifySessionToken(
  token: string | undefined | null,
): Promise<SessionUser | null> {
  if (!token) return null;
  const key = secretKey();
  if (!key) return null;
  try {
    const { payload } = await jwtVerify(token, key);
    if (!payload.sub) return null;
    return {
      email: payload.sub,
      name: typeof payload.name === "string" ? payload.name : payload.sub,
    };
  } catch {
    return null;
  }
}
