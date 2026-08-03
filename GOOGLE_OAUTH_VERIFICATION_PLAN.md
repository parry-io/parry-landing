# Google OAuth Verification Plan — Parry

**Owner:** Tomer · **Created:** 2026-08-03 · **Prod project:** `parry-prod-396a` (project number `828596526097`)

Goal: the Google consent screen for Parry shows the Parry logo, shows a verified app name, and
does **not** show the "Google hasn't verified this app" interstitial — before Fiverr connects
Google Drive.

---

## 0. Read this first — the honest timeline

There are **two separate Google gates**, and they are often confused. They fix different things:

| Gate | What it fixes | What it costs | How long |
|---|---|---|---|
| **Brand verification** | Logo appears on the consent screen; app name/domain shown as yours | Free | Days — this is the one previously **rejected** |
| **Full app verification** (incl. **CASA Tier 2**) | Removes the "unverified app" interstitial; lifts the 100-user cap | ~$500–$1,000/yr to a lab | **Weeks** — 2–8 weeks total |

**The consequence for the Fiverr timeline:** brand verification alone gets the Parry logo onto the
consent screen. It does **not** remove the "Google hasn't verified this app" warning. That warning
is removed only by full app verification, which for Parry's scopes requires a CASA Tier 2 letter of
validation from an authorized lab.

> **If Fiverr connects Drive in the next few weeks, they will still see the interstitial.**
> Plan for it: either start CASA immediately (§4) and accept the wait, or brief Fiverr that they
> will click through "Advanced → Go to Parry (unsafe)" during the pilot. Under the 100-user cap an
> unverified production app still works — the warning is cosmetic, not a block.

---

## 1. Current state

### Scopes Parry actually requests

Verified against `origin/main` in parry-core, not assumed:

| Scope | Source | Google classification |
|---|---|---|
| `https://www.googleapis.com/auth/drive.readonly` | `backend/services/oauth_google.py:26` | **Restricted** |
| `https://www.googleapis.com/auth/gmail.readonly` | `backend/services/gmail_service.py:84` | **Restricted** |
| `https://www.googleapis.com/auth/gmail.send` | `backend/services/gmail_service.py:85` | Sensitive |
| `https://www.googleapis.com/auth/userinfo.email` | `backend/services/gmail_service.py:86` | Non-sensitive |

Two restricted scopes ⇒ **CASA Tier 2 is mandatory**. There is no way around it short of dropping
both `drive.readonly` and `gmail.readonly`.

### What was wrong, and what this PR fixed

The previous brand-verification rejection reason was that the homepage does not explain the app's
purpose. Google's App Homepage requirements state a homepage must "Fully describe your apps
functionality to users" and "Explain with transparency the purpose for which your app requests
user data." The live homepage described Parry only in abstract positioning language ("The execution
layer for enterprise procurement") and never mentioned Google Drive at all.

| Item | Before | After this PR |
|---|---|---|
| Homepage explains what the app does with Google data | ❌ no mention of Drive anywhere | ✅ `#google-data` section with a per-scope table |
| Limited Use disclosure on homepage | ❌ | ✅ |
| Privacy policy linked from homepage | ✅ footer | ✅ footer + in-section |
| Privacy policy covers Google data | ✅ already §9.5 | ✅ unchanged |
| Terms of Service page | ❌ **did not exist** | ✅ `/terms` |
| Consent-screen logo asset | ❌ 2193×2737, 1.79 MB — fails spec twice | ✅ `public/parry-oauth-logo-120.png`, 120×120, 6.9 KB |

Everything below is a **console action only Tomer can do.** Nothing here is code.

---

## 2. Brand verification resubmission

Console: **APIs & Services → OAuth consent screen → Branding**
(`https://console.cloud.google.com/auth/branding?project=parry-prod-396a`)

### 2.1 Wait for the homepage change to be live

Brand verification reads the live site. **Merge and deploy this PR first**, then confirm all three
URLs load publicly in an incognito window before clicking anything in the console:

- `https://www.parry-io.com/` — scroll to the "How Parry uses Google user data" section
- `https://www.parry-io.com/privacy`
- `https://www.parry-io.com/terms`

### 2.2 Upload the logo

| Requirement | Google's spec | Our asset |
|---|---|---|
| Dimensions | "Image should be square and 120px by 120px for the best display results" | 120 × 120 ✅ |
| Format | "Supported image formats include JPG, PNG, and BMP" | PNG ✅ |
| File size | "Image should not be larger than 1MB" | 6.9 KB ✅ |

Upload **`public/parry-oauth-logo-120.png`** from this repo (also live at
`https://www.parry-io.com/parry-oauth-logo-120.png` once deployed).

Do **not** upload `Parry_Logo.png` — it is 2193×2737 portrait and 1.79 MB, and fails both the
square requirement and the 1 MB limit.

The glyph is centred so it survives the circular crop Google applies on some surfaces (content
radius 58.7 px against a 60 px crop radius).

### 2.3 Fill the app information fields

| Field | Value |
|---|---|
| App name | `Parry` (already set) |
| User support email | `tomer@parry-io.com` (already set) |
| App logo | `parry-oauth-logo-120.png` |
| Application home page | `https://www.parry-io.com` |
| Application privacy policy link | `https://www.parry-io.com/privacy` |
| Application terms of service link | `https://www.parry-io.com/terms` |
| Developer contact information | `tomer@parry-io.com` |

⚠️ The privacy policy URL here **must be character-identical** to the one linked on the homepage.
Google checks this. Use `https://www.parry-io.com/privacy` in both — with the `www.`, no trailing
slash.

### 2.4 Authorized domains

Add `parry-io.com` under **Authorized domains**.

Prerequisite: the domain must be verified in
[Google Search Console](https://search.google.com/search-console) **by an account that is an owner
or editor on `parry-prod-396a`**. Sign in to Search Console as `tomer@parry-io.com` and confirm
`parry-io.com` shows as a verified property. If it does not, verify it via DNS TXT record before
touching the console — an unverified domain is an automatic rejection.

### 2.5 Submit

Click **Verify Branding**. Status becomes either *Ready to publish* or *Need to fix issues*.

> ⏱️ **7-day publish window.** If you do not publish within 7 days of approval, the status flips to
> *Need to re-verify* and you start over. Publish immediately on approval.

Note: changing the app name, logo, or any application URL on an already-verified app re-triggers
verification. Get these right once.

---

## 3. Scope justifications — paste-ready

> 🔒 **Gated on §2.** These go in **Data access → "Prepare for verification"**, which stays
> **locked until brand verification passes**. You cannot submit scope justifications, or start CASA,
> in parallel with branding — branding is strictly first. This is the single biggest driver of the
> end-to-end timeline, which is why §2 should go out the day this PR deploys.

Google wants a specific user-facing feature per scope, not a general product description. Drafted
below; edit only if a feature description stops being true.

### 3.1 `drive.readonly`

> Parry is a procurement platform used by finance and procurement teams to manage supplier
> contracts. Customers store their executed contracts, supplier quotes, and pricing schedules in
> Google Drive. Parry requests `drive.readonly` so that a user can select those specific documents
> from within Parry and import them for analysis, instead of downloading each file and re-uploading
> it by hand.
>
> Once imported, Parry extracts the commercial terms from the document — contracted unit prices,
> renewal and termination dates, notice periods, price-escalation clauses, and committed volumes —
> and attaches them to the supplier record in the customer's Parry workspace. Those extracted terms
> power the product's core user-facing features: alerting a buyer when an invoice is billed above
> the contracted rate, warning them before a contract auto-renews, and giving them the contract
> position when they negotiate.
>
> Read-only is the narrowest scope that supports this. Parry never creates, modifies, moves, or
> deletes anything in a user's Drive, and requests no write capability. Access is limited to the
> files the user chooses to import. The feature is unavailable without this scope: there is no
> other way for a user to bring a Drive-hosted contract into Parry without manual re-upload, which
> is the specific friction the integration removes.

### 3.2 `gmail.readonly`

> Supplier negotiation happens over email. The current price a supplier has offered, the terms
> they have conceded, and the deadline they have set exist only in an email thread — not in any
> system of record. Parry requests `gmail.readonly` to read the supplier threads associated with a
> user's active deals so it can extract those commercial terms and keep the deal record current.
>
> Concretely, this powers three user-facing features: (1) detecting that a supplier thread relates
> to an active contract or renewal and linking it to that deal; (2) extracting quoted prices,
> proposed terms, and stated deadlines from the thread into the deal timeline the user sees;
> (3) giving the user a briefing of where a negotiation stands before they reply or take a call.
>
> Read-only is the minimum scope for this. Parry does not modify, label, archive, or delete any
> message. We request `gmail.readonly` rather than `gmail.metadata` because the commercial terms
> are in the message body — headers and labels alone carry none of the information the feature
> depends on. We do not request `gmail.modify` or `mail.google.com`, as no feature requires
> mutating the mailbox.

### 3.3 `gmail.send`

> Parry drafts the replies a buyer sends back to a supplier — a counter-offer, a request for a
> revised quote, a renewal notice. `gmail.send` is requested so that once the user has reviewed and
> approved a draft inside Parry, it is sent from their own address and lands in the existing thread
> the supplier is already reading, rather than arriving from an unfamiliar third-party address that
> would break the negotiation thread and be likely to be filtered.
>
> Messages are addressed only to the supplier contacts already associated with the deal; Parry does
> not email anyone outside them. By default the workspace operates in a draft-and-approve mode in
> which a user reviews every message before it is sent. A customer administrator may raise their
> workspace's autonomy setting so that approved negotiation workflows send without per-message
> review; this is off by default and is configured by the customer, not by Parry.
>
> `gmail.send` is the narrowest scope that permits sending: it grants no ability to read, modify, or
> delete existing messages. We deliberately do not request `gmail.compose` or `gmail.modify`.

### 3.4 `userinfo.email`

> Requested to identify which Google account has been connected, so the connection can be labelled
> in Parry's integration settings and the correct account can be disconnected later. A user may
> connect more than one mailbox; without the address, the connections are indistinguishable in the
> UI. It is not used for any other purpose.

### 3.5 If Google asks "why not a narrower scope?"

Have this ready — it is the most common follow-up:

> We reviewed narrower alternatives for each scope and adopted them where they exist.
> For Drive we request `drive.readonly` rather than `drive`, taking no write access.
> For Gmail we request `gmail.readonly` rather than `gmail.modify` or `mail.google.com`.
> `gmail.metadata` was evaluated and is insufficient — the contractual terms the product extracts
> are in message bodies, which that scope does not expose. For sending we request `gmail.send`
> alone, which cannot read or alter the mailbox.
>
> We evaluated `drive.file` (per-file picker consent) as an alternative to `drive.readonly`.
> [DECISION NEEDED — see §7.1.]

---

## 4. CASA Tier 2

Triggered by `drive.readonly` and `gmail.readonly`. Required before the "unverified app"
interstitial can be removed and before the 100-user cap is lifted.

### 4.1 How it works

1. **Notification** — Google emails you a CASA notification when your verification submission
   reaches the security-assessment stage. **You cannot start before this email arrives** — the labs
   require it as an input. Submit for verification (§2, §3) first.
2. **Scan** — run an application security testing (AST) scan against Parry and remediate failures.
3. **Submit** — upload to the lab's portal: the CASA notification email, AST configuration file(s),
   AST scan results as plain `.txt`, and optionally any existing certifications.
4. **Letter of Validation (LOV)** — the lab issues it to Google, and verification proceeds.

Tier 2 means the lab validates *your* scan results — assessors do not need access to Parry's source
code or infrastructure. That is what keeps it cheap relative to a full pentest.

⚠️ **Self-scanning is deprecated.** You can still run the self-scan to check readiness, but it will
not satisfy the requirement — a lab-verified scan is mandatory. Budget for a lab.

### 4.2 Authorized assessor labs

Per the App Defense Alliance list (last updated 2026-06-26):

TAC Security · Bishop Fox · KPMG · Leviathan Security · NCC Group · NetSentries Technologies ·
Orange Cyberdefense South Africa · Prescient Security LLC · DEKRA

Note: ADA has **paused onboarding new labs** during its migration to the Linux Foundation, so this
list is unlikely to grow before Parry's assessment.

**Suggested approach:** get quotes from **TAC Security**, **NetSentries**, and **Prescient
Security** — these are the volume players on the self-serve Tier 2 track and price at the low end.
Bishop Fox, KPMG, and NCC Group are enterprise pentest firms; they will quote far higher for the
same letter.

### 4.3 Cost and timeline

| Item | Figure |
|---|---|
| Lab-verified Tier 2, self-serve track | ~**$500–$1,000**, typically annual |
| Legacy / enterprise assessor track | $15,000–$75,000 — avoid; same LOV |
| Assessment duration once testing begins | 1–3 weeks |
| End-to-end Google verification | **2–8 weeks** |
| Renewal | **Annual** — budget for it every year |

### 4.4 Start it now

The long pole is Google's queue, not the lab. Sequencing that minimises wall-clock time:

The steps are **serial, not parallel** — branding gates Data access, which gates the CASA
notification, which gates the lab. Nothing downstream can be pulled forward, so the only lever you
have is not losing days at each handoff.

1. Merge + deploy this PR **today**.
2. Submit brand verification (§2) the same day. **Everything else is blocked behind this.**
3. Record the demo video (§5) **now, while branding is in review** — this is the one genuinely
   parallelisable task, and having it ready means §3 goes out the hour branding clears.
4. On branding approval: publish within the 7-day window (§2.5), then immediately open
   **Data access → Prepare for verification** and paste the §3 justifications.
5. The moment the CASA notification email arrives, request quotes from all three labs the same day.
6. Run the deprecated self-scan while waiting, purely to find and fix failures before the lab sees
   them. A clean first submission is what turns 8 weeks into 3.

---

## 5. Demo video

Required for restricted-scope verification. Google's stated requirements:

- Shows the **end-to-end flow of the app including the OAuth grant process**.
- Shows **the same application submitted for verification**, matching app name and branding.
- Shows the **complete OAuth consent screen with the exact requested scopes**, legible, **in
  English**.
- Shows **the app functionality that uses each OAuth scope**.
- Hosted publicly — YouTube unlisted is accepted. Do not put it behind a login.

### Suggested shot list

| # | Shot | Proves |
|---|---|---|
| 1 | Browser at `https://www.parry-io.com`, scroll to "How Parry uses Google user data" | Homepage matches submission |
| 2 | Sign in to Parry, land on the dashboard | Same app, same branding |
| 3 | Settings → Integrations → click **Connect Google Drive** | Start of grant flow |
| 4 | **Full consent screen, held still for 3+ seconds**, URL bar and scope text legible | Exact scopes requested |
| 5 | Grant consent, return to Parry, connection shows as connected | Grant completes |
| 6 | Pick a contract from Drive → import → extracted terms appear on the deal | `drive.readonly` in use |
| 7 | Open a deal with a supplier email thread; show extracted price/terms from the email | `gmail.readonly` in use |
| 8 | Open a drafted reply, click approve/send, show it sent from the user's address | `gmail.send` in use |
| 9 | Settings → disconnect the Google account | Revocation path |

Screen recording, no edits or cuts across the consent screen, 3–5 minutes. Do not blur the consent
screen. Use a real account with real (non-confidential) data — reviewers reject obviously mocked
flows.

⚠️ Shots 6–8 must show features that **actually work in prod today**. Verify each path end-to-end
before recording; a video showing a feature that errors is a rejection.

---

## 6. Recommendation — publish the DEV app to production

**Recommendation: yes, do it.** It is a one-click change and it kills the recurring dev disconnects.

### The problem

The dev OAuth app is in **Testing** publishing status. Google's documented behaviour:

> "A Google Cloud Platform project with an OAuth consent screen configured for an external user
> type and a publishing status of 'Testing' is issued a refresh token expiring in **7 days**"

That is the root cause of the dev environment losing its Google connection every week. It is not a
Parry bug and no amount of token-refresh code fixes it — the tokens are issued pre-expired by
design.

### The tradeoff

| | Testing (today) | In production, unverified (proposed) |
|---|---|---|
| Refresh token lifetime | **7 days** — weekly reconnects | Standard, long-lived ✅ |
| User cap | 100 test users, each added by hand | 100 users, no manual allowlist ✅ |
| Consent screen warning | "unverified app" interstitial | "unverified app" interstitial — **unchanged** |
| Verification required to flip | No | **No** — publishing ≠ verifying |
| Risk | — | Low, see below |

The key point: **publishing to production does not require verification.** You can publish an
unverified app; it simply keeps showing the interstitial and stays under the 100-user cap. You are
trading nothing away.

### Risks, honestly

- **The interstitial stays.** Publishing does not remove it. Only full verification does. Dev users
  will keep clicking "Advanced → Go to Parry (unsafe)". Acceptable for a dev environment.
- **The app becomes reachable by anyone with the client ID**, not just allowlisted testers. Mitigate
  by keeping Parry's own application-level auth as the real gate — Google consent is not the access
  control. Confirm the dev environment still requires a Parry login before any Drive/Gmail data is
  reachable.
- **Google may email about the unverified app** requesting verification for the sensitive scopes.
  Informational; it does not break the app under the cap.
- **Don't confuse the projects.** This change is for the **dev** project only. Do not flip anything
  on `parry-prod-396a` outside the steps in §2.

### How

Dev project console → **APIs & Services → OAuth consent screen → Audience** → **Publish app** →
confirm. Existing testers keep working; new tokens issued after the flip are long-lived. Users with
an already-expired token reconnect once, and then stop having to.

---

## 7. Decisions needed from Tomer

### 7.1 `drive.file` vs `drive.readonly`

Google will likely ask why Parry does not use `drive.file`, which grants access only to files the
user picks through Google's own file picker and is **not** a restricted scope.

**If `drive.file` is workable, it removes the CASA requirement for Drive entirely** — though CASA
would still be triggered by `gmail.readonly`, so it does not remove CASA overall. The real benefit
is a materially easier review.

The cost is a product change: Drive import would have to go through Google's Picker UI, and Parry
would lose access to a file it was not explicitly handed — background re-scanning of a Drive folder
would stop working.

**Needs your call.** If Drive import is already a user-picks-a-file flow, switching is cheap and
worth it. If anything scans a folder on a schedule, it is not viable. Either way, §3.5 needs the
placeholder replaced with the real answer before submission.

### 7.2 Who owns the CASA remediation work

The lab will return findings. Someone has to fix them and re-scan. Given the SOC 2 work already
done, most controls likely pass — but budget engineering time for the tail.

### 7.3 Brief Fiverr on the interstitial

Per §0, Fiverr will see the "unverified app" screen if they connect before CASA completes. Decide
now whether to (a) brief them to click through, or (b) hold the Drive connection until verification
lands. This is a commercial call, not a technical one.

---

## 8. Sources

- [App Homepage requirements](https://support.google.com/cloud/answer/13807376)
- [Verification requirements](https://support.google.com/cloud/answer/13464321)
- [Manage OAuth App Branding](https://support.google.com/cloud/answer/15549049)
- [Restricted scopes](https://support.google.com/cloud/answer/13464325)
- [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy)
- [Using OAuth 2.0 to access Google APIs](https://developers.google.com/identity/protocols/oauth2)
- [CASA Tier 2 process](https://appdefensealliance.dev/casa/tier-2/tier2-overview)
- [CASA authorized assessors](https://appdefensealliance.dev/casa/casa-assessors)
