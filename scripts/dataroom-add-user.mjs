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
import { appendFileSync } from "node:fs";

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

const emailNorm = email.trim().toLowerCase();
const password = providedPw || generatePassword();
const passwordHash = bcrypt.hashSync(password, 10);

const entry = `  { email: ${JSON.stringify(emailNorm)}, name: ${JSON.stringify(
  name,
)}, passwordHash: ${JSON.stringify(passwordHash)} },`;

console.log("\n── Add to PRODUCTION_USERS in lib/dataroom/users.ts ──────────────\n");
console.log(entry);

// The plaintext password is written to a gitignored local file rather than
// printed — printing a secret to stdout/logs is flagged as clear-text logging.
// Open the file, share the password over a secure channel, then delete it.
const outFile = "dataroom-credentials.local.txt";
appendFileSync(
  outFile,
  `Email:    ${emailNorm}\nPassword: ${password}\n\nusers.ts entry:\n${entry}\n${"-".repeat(60)}\n`,
);
console.log(`\n── Credentials written to ./${outFile} (gitignored) ─────────────`);
console.log("   Open it to copy the password, share it securely, then delete the file.\n");
