# Parry Data Room — Runbook

A password-protected investor data room at **`parry-io.com/data-room`**, built into
this landing repo. Per-person login, files served only to signed-in viewers, and an
email alert on every login and every document view. No database.

## How it works
- `/data-room` renders a **login** screen (not signed in) or the **document library** (signed in).
- Files live in **`/documents`** (NOT `/public`) and are streamed only through the
  authenticated route `app/data-room/api/doc/[id]` → they are never publicly reachable.
- Session = signed JWT in an httpOnly cookie (`lib/dataroom/auth.ts`); `middleware.ts` gates `/data-room/*`.
- Every login and view sends an email (`lib/dataroom/mailer.ts`) to the addresses in `DATAROOM_NOTIFY_TO`.

## Local dev
```bash
npm install
npm run dev          # http://localhost:3000/data-room
```
Demo login (local dev + Vercel Preview only — excluded from real production):
`demo@viola.vc` / `viola-demo-2026`.
Without SMTP env set, notification emails are printed to the server console.

## Add / remove a viewer
```bash
npm run dataroom:add-user -- partner@viola.vc "Partner Name"
```
Paste the printed entry into `PRODUCTION_USERS` in `lib/dataroom/users.ts`, commit, deploy.
Share the printed password with the viewer over a secure channel. To revoke: delete the entry + deploy.

## Add / replace a document
1. Drop the PDF in **`/documents`** (e.g. `parry-deck.pdf`).
2. Make sure it's listed in `lib/dataroom/docs.ts` (filenames: `parry-deck.pdf`,
   `parry-one-pager.pdf`, `parry-pnl.pdf`, `parry-competitive.pdf`).
3. Commit + deploy. Missing files show as "Coming soon" until added.

## Environment variables (set in Vercel: Production + Preview)
See `.env.example`. Required in production: `DATAROOM_SESSION_SECRET`.
For real emails: `SMTP_HOST/PORT/USER/PASS/FROM` (Gmail/Workspace App Password).

## Deploy
Pushing the branch triggers a **Vercel Preview** deployment automatically.
1. Open the preview URL → verify the marketing site is intact **and** `/preview-url/data-room` works.
2. If the build fails because the Vercel project's *Output Directory* is pinned to `out`
   (left over from the old static export), clear it to the default and redeploy.
3. Merge to `main` → production at `parry-io.com/data-room`.

## Security notes
- PDFs are never under `/public`; only signed-in viewers can fetch them.
- Passwords stored as bcrypt hashes only. Login is rate-limited per IP.
- The `demo@viola.vc` account is compiled out of real production (VERCEL_ENV=production); it stays available on Preview deployments for testing.
- The data-room pages are `noindex` (kept out of search engines).
