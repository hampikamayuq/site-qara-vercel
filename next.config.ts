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
//
// A lista foi conferida contra o sitemap_index.xml do WordPress em produção.
// O site antigo acumulou páginas duplicadas ao longo dos anos (várias com
// "[Duplicated]" no title), então vários caminhos apontam para a mesma página
// nova de propósito: consolidar concentra o sinal em vez de dividi-lo.
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
  "/estetica": "/dermatologia-estetica",
  "/hidradenite3": "/hidradenite",
  "/psoriase22": "/psoriase",
  "/psoriase-3": "/psoriase",
  "/site-clinica-qara-2": "/",
  "/unha": "/unhas",
  // O WordPress serve /feed (RSS). O site novo não tem feed; manda para o blog
  // para não quebrar quem estiver inscrito.
  "/feed": "/blog",
  // Estes quatro respondem 404 no WordPress hoje, mas ficam como seguro: são
  // gratuitos e cobrem backlinks antigos de uma estrutura de URL anterior.
  "/especialista": "/equipe/dr-diego-galvez",
  "/hidradenite2-2": "/hidradenite",
  "/psoriase-2": "/psoriase",
  "/servico": "/cirurgia-dermatologica",
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
