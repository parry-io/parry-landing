// Email notifications for data-room activity (logins and document views).
// The email IS the monitoring record — there is no database.
import nodemailer, { type Transporter } from "nodemailer";

let cached: Transporter | null = null;

// Accept both the data-room var names and parry-core's (EMAIL_USER/EMAIL_PASS,
// SMTP_SERVER) so the exact same Parry Gmail SMTP credentials work unchanged.
function smtpCreds() {
  const user = process.env.SMTP_USER || process.env.EMAIL_USER || "";
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS || "";
  const host = process.env.SMTP_HOST || process.env.SMTP_SERVER || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 587);
  return { user, pass, host, port, configured: Boolean(user && pass) };
}

function getTransport(): Transporter {
  if (cached) return cached;
  const { user, pass, host, port, configured } = smtpCreds();
  if (configured) {
    cached = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // 465 = implicit TLS; 587 = STARTTLS
      auth: { user, pass },
    });
  } else {
    // No SMTP configured (e.g. local dev): don't actually send — log instead.
    cached = nodemailer.createTransport({ jsonTransport: true });
  }
  return cached;
}

function recipients(): string {
  return process.env.DATAROOM_NOTIFY_TO || "tomer@parry-io.com, yehonatan@parry-io.com";
}

// De-dupe noisy repeats (e.g. PDF range requests) per (type,user,doc) for 10 min.
const recent = new Map<string, number>();
const DEDUP_MS = 10 * 60 * 1000;

function shouldSend(key: string): boolean {
  const now = Date.now();
  const last = recent.get(key);
  if (last && now - last < DEDUP_MS) return false;
  recent.set(key, now);
  if (recent.size > 500) {
    for (const [k, t] of recent) if (now - t > DEDUP_MS) recent.delete(k);
  }
  return true;
}

export interface NotifyEvent {
  type: "login" | "view";
  user: { email: string; name: string };
  docTitle?: string;
  docId?: string;
  ip?: string;
  userAgent?: string;
}

export async function sendNotification(ev: NotifyEvent): Promise<void> {
  const key = `${ev.type}:${ev.user.email}:${ev.docId ?? ""}`;
  if (!shouldSend(key)) return;

  const when = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "Asia/Jerusalem",
  }).format(new Date());

  const isLogin = ev.type === "login";
  const subject = isLogin
    ? `Parry Data Room — login: ${ev.user.name}`
    : `Parry Data Room — viewed "${ev.docTitle}": ${ev.user.name}`;

  const body = [
    isLogin
      ? "A viewer signed in to the Parry data room."
      : "A viewer opened a document in the Parry data room.",
    "",
    `Who:    ${ev.user.name} <${ev.user.email}>`,
    ev.docTitle ? `Doc:    ${ev.docTitle}` : null,
    `When:   ${when} (Israel time)`,
    ev.ip ? `IP:     ${ev.ip}` : null,
    ev.userAgent ? `Agent:  ${ev.userAgent}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const { user, configured } = smtpCreds();
    await getTransport().sendMail({
      from:
        process.env.SMTP_FROM ||
        process.env.NOTIFICATIONS_FROM_EMAIL ||
        user ||
        "Parry Data Room <noreply@parry-io.com>",
      to: recipients(),
      subject,
      text: body,
    });
    if (!configured) {
      console.log(`[dataroom] notification (no SMTP configured):\n${subject}\n${body}`);
    }
  } catch (err) {
    // Never let a mail failure break the viewer's experience.
    console.error("[dataroom] failed to send notification:", err);
  }
}
