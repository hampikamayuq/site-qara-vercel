import type { MetadataRoute } from "next";
import { articles, isoDate } from "./blog/articles";

// lastModified por rota: data da última mudança substantiva de conteúdo, não a
// do deploy. Rota nova entra aqui com a data de publicação; ao revisar o
// conteúdo de uma página, atualize a data dela — sinais de frescor consistentes
// importam para o Google e para os crawlers de IA.
const ROUTE_UPDATED: Record<string, string> = {
  "": "2026-07-22",
  "/dermatologia-clinica": "2026-07-22",
  "/cirurgia-dermatologica": "2026-07-22",
  "/cancer-de-pele": "2026-07-22",
  "/cirurgia-controle-de-margens": "2026-07-22",
  "/biopsia": "2026-07-22",
  "/cabelo": "2026-07-22",
  "/unhas": "2026-07-22",
  "/doencas-inflamatorias": "2026-07-22",
  "/dermatopediatria": "2026-07-22",
  "/dermatologia-estetica": "2026-07-22",
  "/psoriase": "2026-07-22",
  "/hidradenite": "2026-07-22",
  "/vitiligo": "2026-07-22",
  "/dermatite-atopica": "2026-07-22",
  "/acne": "2026-07-31",
  "/melasma": "2026-07-31",
  "/rosacea": "2026-07-31",
  "/transplante-capilar": "2026-07-31",
  "/toxina-botulinica": "2026-07-31",
  "/preenchimento": "2026-07-31",
  "/en": "2026-07-22",
  "/es": "2026-07-22",
  "/equipe": "2026-07-22",
  "/equipe/dr-diego-galvez": "2026-07-22",
  "/equipe/dr-miguel-ceccarelli": "2026-07-22",
  "/equipe/dra-diana-stohmann": "2026-07-22",
  "/equipe/dra-manuela-pedretti": "2026-07-22",
  "/equipe/dr-fabricio-de-andrade": "2026-07-22",
  "/blog": "2026-07-31",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://clinicaqara.com.br";
  const languages = { "pt-BR": base, en: `${base}/en`, es: `${base}/es`, "x-default": base };
  return [
    ...Object.entries(ROUTE_UPDATED).map(([route, updated]) => ({
      url: `${base}${route}`,
      lastModified: new Date(updated),
      changeFrequency: route === "/blog" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : .8,
      ...(["", "/en", "/es"].includes(route) ? { alternates: { languages } } : {}),
    })),
    ...articles.map(article => ({
      url: `${base}/blog/${article.slug}`,
      lastModified: new Date(isoDate(article.date)),
      changeFrequency: "monthly" as const,
      priority: .7,
    })),
  ];
}
