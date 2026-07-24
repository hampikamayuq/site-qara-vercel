"use client";

/**
 * Captura de identificadores de clique do Google Ads (gclid / gbraid / wbraid)
 * e injeção deles no texto pré-preenchido dos links de WhatsApp.
 *
 * Fluxo:
 * 1. Na chegada, lê ?gclid= (ou gbraid/wbraid) da URL e grava num cookie
 *    first-party (90 dias). Assim o id sobrevive à navegação entre páginas.
 * 2. Reescreve todo link de WhatsApp (wa.me / api.whatsapp.com) para acrescentar
 *    "Cód: gclid:XXXX" ao fim da mensagem. A primeira mensagem que o paciente
 *    envia passa a conter o id -> o Kommo extrai e guarda como campo customizado.
 * 3. A conversão offline (etapas "agendada"/"confirmada") é reimportada ao
 *    Google Ads usando esse gclid. Só então os lances miram agendamento real.
 *
 * Sem gclid na URL nem no cookie, nada é alterado (degrada em silêncio).
 */

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const COOKIE = "qara_click_id";
const PARAMS = ["gclid", "gbraid", "wbraid"] as const;
const MARKER = "Cód:";

function readClickIdFromUrl(search: string): string | null {
  try {
    const q = new URLSearchParams(search);
    for (const p of PARAMS) {
      const v = q.get(p);
      if (v) return `${p}:${v}`;
    }
  } catch {}
  return null;
}

function readCookie(name: string): string | null {
  try {
    const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : null;
  } catch {
    return null;
  }
}

function writeCookie(name: string, value: string, days: number) {
  try {
    const exp = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp}; path=/; SameSite=Lax`;
  } catch {}
}

function appendClickId(href: string, clickId: string): string {
  try {
    const url = new URL(href, window.location.origin);
    const host = url.hostname.replace(/^www\./, "");
    if (host !== "wa.me" && host !== "api.whatsapp.com") return href;
    const text = url.searchParams.get("text") ?? "";
    if (text.includes(MARKER)) return href; // já marcado
    const suffix = `\n\n${MARKER} ${clickId}`;
    url.searchParams.set("text", text ? text + suffix : `Olá!${suffix}`);
    return url.toString();
  } catch {
    return href;
  }
}

function tagAll(clickId: string) {
  document
    .querySelectorAll<HTMLAnchorElement>('a[href*="wa.me"], a[href*="api.whatsapp.com"]')
    .forEach((a) => {
      const next = appendClickId(a.href, clickId);
      if (next !== a.href) a.href = next;
    });
}

export function GclidCapture() {
  const pathname = usePathname();

  // Captura na chegada + reescreve os links a cada página.
  useEffect(() => {
    const fromUrl = readClickIdFromUrl(window.location.search);
    if (fromUrl) writeCookie(COOKIE, fromUrl, 90);
    const clickId = fromUrl ?? readCookie(COOKIE);
    if (clickId) tagAll(clickId);
  }, [pathname]);

  // Fallback no clique, para links criados após a renderização.
  useEffect(() => {
    const clickId = readCookie(COOKIE);
    if (!clickId) return;
    const handler = (e: MouseEvent) => {
      const a =
        e.target instanceof Element
          ? (e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"]') as HTMLAnchorElement | null)
          : null;
      if (!a) return;
      const next = appendClickId(a.href, clickId);
      if (next !== a.href) a.href = next;
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  return null;
}
