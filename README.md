# Parry Landing Page

Static marketing site for [www.parry-io.com](https://www.parry-io.com).

## Stack

- **Next.js 15** with static export (`output: "export"`)
- **Tailwind CSS 4** for styling
- **Motion** (formerly Framer Motion) for animations
- **Pure static HTML** — no server, no auth, no API

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is in `out/` — deploy this folder to any static host (Vercel, Firebase Hosting, Cloudflare Pages, etc.).

## Deploy to Vercel

1. Connect this repo to Vercel
2. Framework: Next.js (auto-detected)
3. Build output: automatic
4. Add `www.parry-io.com` as custom domain

## Structure

```
app/
├── layout.tsx          # SEO meta tags, fonts, structured data
├── page.tsx            # Landing page (all sections)
├── globals.css         # Design tokens, animations
└── privacy/page.tsx    # Privacy policy (if needed)

components/landing/     # All section components
public/
├── Parry_Logo.png
├── robots.txt          # Google crawl rules
├── sitemap.xml         # Google sitemap
└── llms.txt            # LLM discoverability
```

## SEO & Discoverability

- `robots.txt` — allows full crawling
- `sitemap.xml` — page listing for Google
- `llms.txt` — LLM search engines (ChatGPT, Perplexity, Claude)
- JSON-LD structured data (Organization + SoftwareApplication)
- Open Graph + Twitter Card meta tags
- Semantic HTML with proper heading hierarchy
