import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

// The investor data room runs as its own service on Cloud Run (project
// rising-ocean-484208-i7, europe-west1). We proxy /data-room/* to it so it's
// served under parry-io.com/data-room with no subdomain. basePath on that
// service keeps its assets under /data-room/_next, which this rewrite covers.
const DATA_ROOM_ORIGIN = "https://parry-dataroom-534595816078.europe-west1.run.app";

const nextConfig: NextConfig = {
  // NOTE: previously `output: "export"` (pure static). Dropped so rewrites work;
  // marketing pages still pre-render (SSG) and the security headers now apply.
  images: {
    unoptimized: true,
  },
  rewrites: async () => ({
    beforeFiles: [
      { source: "/data-room", destination: `${DATA_ROOM_ORIGIN}/data-room` },
      { source: "/data-room/:path*", destination: `${DATA_ROOM_ORIGIN}/data-room/:path*` },
    ],
  }),
  headers: async () => [
    {
      source: "/(.*)",
      headers: securityHeaders,
    },
  ],
};

export default nextConfig;
