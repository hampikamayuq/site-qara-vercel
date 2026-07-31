---
target: todo o conteúdo pré-existente renderizado (blog, especialidades antigas, páginas inline, equipe, en/es, schema)
scope: content
p0_count: 0
p1_count: 0
p2_count: 0
p3_count: 3
timestamp: 2026-07-31T07-40-49Z
slug: textos-conteudo-pre-existente
follows: 2026-07-31T07-07-20Z__textos-paginas-condicao.md
---
Method: extensão autorizada pela clínica da rodada anterior ("pode apagar os travessões das outras
páginas também"). Inventário mecânico por arquivo; reescrita frase a frase via pares explícitos
(cada par obrigado a casar o número esperado de vezes); classe mecânica única: separador de título
de referência "ORG — Título" → "ORG · Título". Verificação: build + 47 testes + varredura de "—"
em todo o HTML pré-renderizado, incluindo /en e /es.

# Fechamento · travessões do conteúdo pré-existente

## Reescritas por arquivo

| arquivo | antes | depois | tratamento |
|---|---|---|---|
| `app/blog/article-content.ts` | 148 | 0 | 104 pares frase a frase |
| `app/blog/articles.ts` | 91 | 0 | 53 títulos de referência → "·" + 34 pares de prosa |
| `app/specialties-data.ts` (entradas antigas) | 34 | 0 | 19 pares (um com 2 ocorrências: FAQ idêntica de psoríase em duas páginas) |
| `app/cabelo/page.tsx` | 12 | 0 | 8 pares |
| `app/international.tsx` (en/es) | 12 | 0 | 12 pares, respeitando a gramática de cada língua |
| `app/cirurgia-dermatologica/page.tsx` | 7 | 0 | 5 pares |
| `app/cirurgia-controle-de-margens/page.tsx` | 6 | 0 | 4 pares |
| `app/biopsia` · `app/cancer-de-pele` · `app/hidradenite` | 3+3+1 | 0 | 6 pares |
| `app/equipe/[slug]/page.tsx` | 3 | 0 | rótulo e title separator → "·" |
| `app/ui.tsx` | 2 | 0 | aria-label do wordmark → vírgula; mensagem de orientação do WhatsApp → duas frases |
| `app/seo.ts` (`streetAddress`) | 1 | 0 | "Rua Santa Clara, 50, salas 521/522" — NAP agora idêntico em schema, FAQ e llms.txt |

Critérios de pontuação: vírgulas para aposto e coordenação; parênteses para definição entre
travessões duplos ("A biópsia (retirada de um pequeno fragmento…)"); dois-pontos para enumeração e
explicação; ponto e vírgula quando a segunda oração é independente. Aspas simples de citações
('baby hairs', 'carne esponjosa') preservadas.

## O que permanece com "—", de propósito

- Comentários de código (page.tsx, seo.ts, gtm, robots, sitemap, motion-controller, tests):
  não renderizam.
- `/design-system` (18 no HTML): página de referência interna de design, espelha DESIGN.md.
- Docs internos (DESIGN.md, PRODUCT.md, README, docs/, arquivos antigos do .impeccable).

## Verificação

Build ✓ · 47/47 testes ✓ · varredura de "—" em todos os HTML pré-renderizados: única página com
ocorrências é `/design-system` (fora do escopo) · `streetAddress` novo confirmado no JSON-LD da
home · frases reescritas conferidas em /en e /es.

## P3 abertos (herdados)

Aberturas de parágrafo em série, política de acompanhantes na FAQ geriátrica e frases-fórmula
repetidas — seguem aguardando decisão editorial da clínica.
