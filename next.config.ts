import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // NOTE: previously `output: "export"` (pure static). Dropped so the
  // /data-room routes (auth, file serving, email) can run as serverless
  // functions on Vercel. Marketing pages still pre-render (SSG) — no visible
  // change — and the security headers below now actually take effect.
  images: {
    unoptimized: true,
  },
  // Ensure the private /documents folder is bundled with the file-serving route.
  outputFileTracingIncludes: {
    "/data-room/api/doc/[id]": ["./documents/**/*"],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: securityHeaders,
    },
  ],
};

export default nextConfig;
