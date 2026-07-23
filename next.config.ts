import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

const IMMUTABLE = "public, max-age=31536000, immutable";
const WEEK_SWR = "public, max-age=604800, stale-while-revalidate=86400";

// URLs legadas do WordPress. Ficavam como pages chamando permanentRedirect(),
// o que o Next resolve durante o render: a resposta saía 200 com <meta refresh>,
// não 308. Declarados aqui, o redirect acontece na camada de roteamento e
// devolve 308 de verdade — que é o que o Google precisa para transferir o
// ranking da URL antiga e desindexá-la.
const legacyRedirects: Record<string, string> = {
  "/category/especialidades": "/",
  "/cirurgiadermatologica": "/cirurgia-dermatologica",
  "/cirurgia-dermatologica-copacabana": "/cirurgia-dermatologica",
  "/dermatiteatopica": "/blog/dermatite-atopica",
  "/dermatopediatria2": "/dermatopediatria",
  "/dr-miguelceccarelli": "/equipe/dr-miguel-ceccarelli",
  "/elementor-pagina-de-destino-277": "/",
  "/elementor-pagina-de-destino-289": "/",
  "/english": "/en",
  "/especialista": "/equipe/dr-diego-galvez",
  "/estetica": "/dermatologia-estetica",
  "/hidradenite2-2": "/hidradenite",
  "/psoriase-2": "/psoriase",
  "/psoriase-3": "/psoriase",
  "/servico": "/cirurgia-dermatologica",
  "/site-clinica-qara-2": "/",
  "/unha": "/unhas",
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(legacyRedirects).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },

  // Substitui os headers que viviam no Worker Cloudflare e em public/_headers.
  // /_next/static já recebe cache imutável do próprio Next, então só public/ precisa de regra.
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/fonts/:path*", headers: [{ key: "Cache-Control", value: IMMUTABLE }] },
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: WEEK_SWR }] },
    ];
  },
};

export default nextConfig;
