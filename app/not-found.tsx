import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "./ui";
import { clinicContact } from "./clinic-links";

// Identidade própria: sem isto a página de erro herda o title da home. E
// `alternates: null` apaga o canonical/hreflang herdados — uma página de erro
// deve ficar sem canonical, não com um apontando para outro lugar.
//
// `robots` é obrigatório aqui, mesmo que o Next já emita um noindex próprio para
// not-found: sem a chave, esta página herda o `index, follow` do layout e sai com
// duas diretivas contraditórias. Com ela, as duas tags concordam em noindex.
export const metadata: Metadata = {
  title: "Página não encontrada | Clínica QARA",
  description: "Este endereço não está disponível. Veja as especialidades ou o conteúdo médico da Clínica QARA.",
  alternates: null,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <><Header conversionContext="not_found"/><main id="conteudo" className="status-page"><div className="shell status-inner"><p className="kicker">Página não encontrada</p><h1>Este endereço não está disponível.</h1><p>O conteúdo pode ter mudado de endereço. Você pode voltar ao início, consultar as <Link className="text-link" href="/#cuidados">especialidades</Link> ou ler o <Link className="text-link" href="/blog">conteúdo médico</Link>.</p><div className="actions"><Link className="button button-primary" href="/">Voltar ao início</Link><a className="button button-secondary" href={clinicContact.whatsappUrl} target="_blank" rel="noopener noreferrer" data-conversion-event="whatsapp_click" data-conversion-placement="not_found" data-conversion-variant="whatsapp" data-conversion-context="not_found">Falar com a equipe</a></div></div></main><Footer/></>;
}
