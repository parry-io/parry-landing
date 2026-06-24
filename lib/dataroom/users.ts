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
  // Example (replace with real Viola people):
  // { email: "partner@viola.vc", name: "Viola Partner", passwordHash: "$2b$10$..." },
];

// ── Dev-only demo account. Excluded from production builds entirely so these
//    credentials can never be used against the live room. ─────────────────────
const DEV_USERS: DataRoomUser[] =
  process.env.NODE_ENV === "production"
    ? []
    : [
        {
          email: "demo@viola.vc",
          name: "Viola (Demo)",
          passwordHash: bcrypt.hashSync("viola-demo-2026", 10),
        },
      ];

export function getUsers(): DataRoomUser[] {
  return [...PRODUCTION_USERS, ...DEV_USERS];
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
