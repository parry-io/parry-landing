// Authorised viewers for the Parry Data Room.
//
// Passwords are stored ONLY as bcrypt hashes — never in plaintext.
// Add a real viewer with:  npm run dataroom:add-user <email> "<Full Name>"
// then paste the printed entry into PRODUCTION_USERS below and deploy.
//
// No database: this list is the source of truth.
import bcrypt from "bcryptjs";

export interface DataRoomUser {
  email: string;
  name: string;
  passwordHash: string;
}

// ── Real viewers (used in every environment, including production). ──────────
// Fill via `npm run dataroom:add-user`. Emails are matched case-insensitively.
const PRODUCTION_USERS: DataRoomUser[] = [
  { email: "tomerbar44@gmail.com", name: "Tomer Bar", passwordHash: "$2b$10$NzBP4lil0tMFC05CWlBY8OGq.VkqCrhQfMF4JbnDkm1hlmw0T6WgG" },
  { email: "omryb@viola.vc", name: "Omry", passwordHash: "$2b$10$72eZMh7SvNTd8dfaRP.1xe7YFvBcl7BrIsSqFGUZ2SOQjwPvIF9Ya" },
  { email: "tala@viola.vc", name: "Tala", passwordHash: "$2b$10$SYgsmYw1O2EShrJaOyz13u1IlP3LagANbFgMMSjfLKcRXJvksMM7O" },
];

// ── Demo account for local dev + Vercel Preview only. Excluded from real
//    production (VERCEL_ENV === "production") so these credentials can never be
//    used against the live room. ──────────────────────────────────────────────
const DEMO_USERS: DataRoomUser[] =
  process.env.VERCEL_ENV === "production"
    ? []
    : [
        {
          email: "demo@viola.vc",
          name: "Viola (Demo)",
          passwordHash: bcrypt.hashSync("viola-demo-2026", 10),
        },
      ];

export function getUsers(): DataRoomUser[] {
  return [...PRODUCTION_USERS, ...DEMO_USERS];
}

export function findUser(email: string): DataRoomUser | undefined {
  const normalized = email.trim().toLowerCase();
  return getUsers().find((u) => u.email.toLowerCase() === normalized);
}

/** Verify an email + password pair. Returns the user on success, else null. */
export async function verifyCredentials(
  email: string,
  password: string,
): Promise<DataRoomUser | null> {
  const user = findUser(email);
  if (!user) {
    // Constant-ish work even when the user is unknown, to blunt timing probes.
    await bcrypt.compare(password, "$2b$10$invalidinvalidinvalidinvalidinvalidinvalidinv");
    return null;
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  return ok ? user : null;
}
