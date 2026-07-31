import type { MetadataRoute } from "next";

// Decisão deliberada: o allow geral inclui os crawlers de IA (GPTBot, ClaudeBot,
// PerplexityBot, Google-Extended etc.). Ser citável em respostas de ChatGPT,
// Gemini e AI Overviews é canal de aquisição para a clínica — o conteúdo é
// educativo e feito para ser encontrado. Não adicionar bloqueios por bot sem
// decisão explícita do negócio. public/llms.txt resume a entidade para esses
// mesmos crawlers.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://clinicaqara.com.br/sitemap.xml" };
}
