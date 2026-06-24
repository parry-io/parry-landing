#!/usr/bin/env node
// Generate a data-room viewer entry (bcrypt hash) + a strong password.
//
//   npm run dataroom:add-user -- <email> "<Full Name>" [password]
//
// Paste the printed entry into PRODUCTION_USERS in lib/dataroom/users.ts,
// then commit + deploy. The plaintext password is shown ONCE — share it
// with the viewer over a secure channel.
import bcrypt from "bcryptjs";
import { randomInt } from "node:crypto";

const [, , email, name, providedPw] = process.argv;

if (!email || !name) {
  console.error('\nUsage: npm run dataroom:add-user -- <email> "<Full Name>" [password]\n');
  process.exit(1);
}

function generatePassword() {
  // Unambiguous alphabet (no 0/O, 1/l/I).
  const alphabet = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let raw = "";
  for (let i = 0; i < 20; i++) raw += alphabet[randomInt(alphabet.length)];
  return raw.match(/.{1,5}/g).join("-");
}

const password = providedPw || generatePassword();
const passwordHash = bcrypt.hashSync(password, 10);

console.log("\n── Add to PRODUCTION_USERS in lib/dataroom/users.ts ──────────────\n");
console.log(
  `  { email: ${JSON.stringify(email.trim().toLowerCase())}, name: ${JSON.stringify(
    name,
  )}, passwordHash: ${JSON.stringify(passwordHash)} },`,
);
console.log("\n── Credentials to share with the viewer (shown once) ─────────────\n");
console.log(`  Email:    ${email.trim().toLowerCase()}`);
console.log("  Password: [REDACTED - do not print secrets to logs]");
console.log("");
