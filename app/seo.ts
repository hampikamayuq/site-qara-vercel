import { clinicContact } from "./clinic-links";

// Fatos de SEO no nível do site. Módulo de dados, sem componente — mesmo papel
// de clinic-links.ts. Precisa continuar server-only: se um arquivo "use client"
// importar daqui, o nó da clínica entra no bundle e passa a contar no orçamento
// de performance (tests/performance-budget.test.mjs).

export const SITE_URL = "https://clinicaqara.com.br";

// @id estáveis para que os blocos JSON-LD de uma página se refiram à mesma
// entidade em vez de cada um declarar a sua.
export const CLINIC_ID = `${SITE_URL}/#clinic`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// hreflang só para páginas que realmente existem. Alemão e francês são
// atendimento, não tradução: não entram aqui.
export const HREFLANG = { "pt-BR": "/", en: "/en", es: "/es", "x-default": "/" } as const;

// O Next substitui o objeto openGraph inteiro por nível, em vez de mesclar.
// Toda página que declara openGraph precisa reafirmar esta base.
export const OG_BASE = { type: "website", siteName: "Clínica QARA", locale: "pt_BR" } as const;

export const DEFAULT_OG_IMAGE = Object.freeze({
  url: "/images/qara-atendimento.webp",
  width: 1460,
  height: 973,
  alt: "Atendimento na Clínica QARA",
});

// Mesmo mapeamento que specialty-template.tsx e international.tsx já fazem à
// mão. acceptedAnswer.text tem de ser texto puro, sem marcação.
export function faqPageSchema(faq: readonly [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

// A clínica é uma entidade só, descrita de um lugar só: '/', '/en' e '/es'
// publicam este mesmo nó.
//
// A ordem das chaves é contrato de teste: rendered-html.test.mjs casa
// substrings contíguas de availableLanguage. Chaves novas entram no fim.
export function clinicNode() {
  return {
    "@type": "MedicalClinic",
    "@id": CLINIC_ID,
    name: "Clínica QARA",
    description: "Clínica dermatológica em Copacabana: dermatologia clínica e cirúrgica, cabelos, unhas, doenças inflamatórias, dermatopediatria e dermatologia estética.",
    url: SITE_URL,
    image: `${SITE_URL}${DEFAULT_OG_IMAGE.url}`,
    telephone: clinicContact.telephone,
    medicalSpecialty: "Dermatology",
    identifier: "CRM-RJ 1285041",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Santa Clara, 50, salas 521/522",
      addressLocality: "Rio de Janeiro",
      addressRegion: "RJ",
      postalCode: "22041-012",
      addressCountry: "BR",
    },
    geo: { "@type": "GeoCoordinates", latitude: -22.9716311, longitude: -43.1868668 },
    email: clinicContact.email,
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "21:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "13:00" },
    ],
    areaServed: "Copacabana, Rio de Janeiro",
    availableLanguage: ["pt-BR", "en", "es", "de", "fr"],
    hasMap: clinicContact.mapsUrl,
    sameAs: [clinicContact.instagramUrl, clinicContact.doctoraliaUrl],
  };
}
