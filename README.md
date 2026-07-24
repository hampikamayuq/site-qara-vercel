# Site Clínica QARA

Site institucional da Clínica QARA — dermatologia clínica e cirúrgica em
Copacabana. Next.js 16 (App Router) + React 19, sem framework de estilo: o
design system vive em `app/globals.css` e está documentado em `DESIGN.md`.

Todas as rotas são estáticas ou SSG — não há banco de dados nem API.

## Pré-requisitos

- Node.js `>=22.13.0`

## Comandos

```bash
npm install     # instala dependências
npm run dev     # servidor de desenvolvimento
npm run build   # build de produção
npm start       # sobe o build localmente
npm test        # build + suíte de testes
npm run lint    # eslint
```

## Estrutura

- `app/` — rotas e componentes. Cada especialidade e artigo é uma rota própria.
- `app/globals.css` — design system completo (tokens, tipografia, componentes).
- `app/specialties-data.ts` e `app/specialty-template.tsx` — as páginas de
  especialidade compartilham um template comum.
- `app/blog/` — artigos, conteúdo e referências (`articles.ts`,
  `article-content.ts`, `article-evidence.ts`). Todo artigo precisa de um
  registro de evidência com citações resolvíveis — `npm test` verifica isso.
- `app/clinic-links.ts` — fonte única de WhatsApp, e-mail, Maps e Doctoralia.
  Nenhuma página deve repetir esses destinos.
- `next.config.ts` — headers de segurança e os redirects 308 das URLs legadas
  do WordPress.
- `tests/` — `node --test`, roda contra o HTML pré-renderizado em `.next`.
- `scripts/blog-cover/` — gerador das capas dos artigos.

## Deploy

Hospedado na Vercel, com deploy automático a cada push. O framework é
detectado sozinho; não há `vercel.json` porque a configuração padrão do Next
já é a correta.

Variáveis de ambiente, ambas opcionais:

- `NEXT_PUBLIC_GTM_ID` — container do Google Tag Manager (`GTM-XXXXXXX`). Sem
  ela nada é carregado: nenhum request ao Google, nenhum cookie. Rastrear é
  uma decisão explícita.
- `NEXT_PUBLIC_CONVERSION_ENDPOINT` — endpoint próprio para receber os eventos
  de conversão. Sem ela o tracker degrada silenciosamente.

## Conversão

Todo CTA carrega atributos `data-conversion-*`, lidos por
`app/conversion-tracker.tsx` e empurrados para `window.dataLayer`. Os eventos
disponíveis para virar conversão no Google Ads:

| Evento | Onde |
|---|---|
| `whatsapp_click` | 15 CTAs (hero, header, rodapé, botão flutuante, páginas de especialidade) |
| `phone_click` | contato |
| `maps_click` | seção de localização |
| `specialty_view` | page view das páginas de especialidade |
| `doctor_profile_view` | page view dos perfis médicos |
| `article_to_specialty_click` | artigo do blog → especialidade |

No GTM, cada um vira um gatilho de evento personalizado (o nome do evento
chega no campo `event`) ligado a uma tag de conversão do Google Ads.

## Notas

- As imagens usam `<img>` com `srcset` escrito à mão, não `next/image`. É
  intencional: os testes verificam esse markup e as variantes responsivas
  (`-640`, `-1024`) já são geradas no repositório.
- Os redirects legados ficam em `next.config.ts`, não como páginas chamando
  `permanentRedirect()`. Como página a resposta sai 200 com `<meta refresh>`
  em vez de 308, o que enfraquece o sinal para o Google. Há teste garantindo
  isso.
