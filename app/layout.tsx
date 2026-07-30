import type { Metadata } from "next";
import "./globals.css";
import { MotionController } from "./motion-controller";
import { ConversionTracker } from "./conversion-tracker";
import { GclidCapture } from "./gclid-capture";
import { DocumentLanguage } from "./document-language";
import { GoogleTagManager } from "./gtm";
import { WhatsAppFloatingButton } from "./whatsapp-float";
import { DEFAULT_OG_IMAGE, OG_BASE, SITE_URL } from "./seo";

// Só defaults globais. Deliberadamente sem `alternates`: canonical e hreflang
// são herdados por qualquer rota que não declare os seus, e uma rota herdando o
// canonical da home afirma que ela e a home são a mesma URL. Sem a chave aqui,
// quem esquecer fica sem canonical (o Google auto-canonicaliza) em vez de com um
// errado. Cada rota indexável declara o seu.
//
// openGraph.title/description também estão ausentes de propósito: o Next os
// preenche a partir do title/description resolvidos da página.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Clínica QARA | Dermatologia em Copacabana",
  description: "Dermatologia clínica e cirúrgica, cabelos, unhas e doenças inflamatórias com atendimento especializado em Copacabana.",
  icons: { icon: "/favicon.ico" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: { ...OG_BASE, images: [DEFAULT_OG_IMAGE] },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" href="/fonts/Telegraf-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/roboto-400-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <GoogleTagManager id={process.env.NEXT_PUBLIC_GTM_ID} />
      </head>
      <body data-motion-root>
        {children}
        <DocumentLanguage />
        <WhatsAppFloatingButton />
        <MotionController />
        <ConversionTracker endpoint={process.env.NEXT_PUBLIC_CONVERSION_ENDPOINT} />
        <GclidCapture />
        <script dangerouslySetInnerHTML={{ __html: `addEventListener("keydown",function(e){if(e.key!=="Escape")return;var d=e.target&&e.target.closest?e.target.closest("details[open]"):null;d=d||document.querySelector(".mega-menu[open],.mobile-menu[open]");if(d){d.removeAttribute("open");var s=d.querySelector("summary");s&&s.focus()}});addEventListener("click",function(e){var l=e.target&&e.target.closest?e.target.closest(".mega-menu[open] a,.mobile-menu[open] a"):null;if(l){var dd=l.closest("details[open]");while(dd){dd.removeAttribute("open");dd=dd.parentElement?dd.parentElement.closest("details[open]"):null}}document.querySelectorAll(".mega-menu[open],.mobile-menu[open]").forEach(function(d){d.contains(e.target)||d.removeAttribute("open")});var f=e.target&&e.target.closest?e.target.closest(".blog-index nav a"):null;if(f){f.closest("nav").querySelectorAll("a").forEach(function(x){x.removeAttribute("aria-current")});f.setAttribute("aria-current","true")}});` }} />
      </body>
    </html>
  );
}
