// Per-firm personalization driven by a query param: /data-room?firm=viola
// The site stays fund-neutral by default; a firm's personalized link makes it
// feel tailored to them without implying the room exists only for one fund.

export const FIRM_COOKIE = "dr_firm";

// Known firms get a curated display name; anything else is title-cased safely.
const KNOWN: Record<string, string> = {
  viola: "Viola",
};

/** Normalize a raw query value to a safe slug (letters/digits/space/hyphen). */
export function sanitizeFirmSlug(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const slug = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 40)
    .trim();
  return slug || null;
}

/** Human-readable firm name for display, or null when no firm is set. */
export function firmDisplayName(raw: string | null | undefined): string | null {
  const slug = sanitizeFirmSlug(raw);
  if (!slug) return null;
  if (KNOWN[slug]) return KNOWN[slug];
  return slug
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}
