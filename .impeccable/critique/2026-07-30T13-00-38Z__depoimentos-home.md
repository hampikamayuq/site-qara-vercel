---
target: seção de depoimentos da home (app/page.tsx · app/globals.css)
scope: section
p0_count: 0
p1_count: 0
p2_count: 0
p3_count: 0
timestamp: 2026-07-30T13-00-38Z
slug: depoimentos-home
follows: 2026-07-30T12-49-17Z__depoimentos-home.md
---
Method: rodada de fechamento dos dois P3 abertos (build + 47 testes · eslint · Chromium 1440/390 com
Range API para provar onde cada footer quebra, e medição de largura de dígito com e sem `tnum`).

# Fechamento dos P3 · alinhamento do footer e figuras tabulares

Os dois P3 vinham de antes desta série de mudanças e seguiam abertos. A clínica autorizou fechá-los.

## P3-1 · footer de nome longo — FECHADO

O cartão da Dalva quebrava com uma viúva: `Dalva Maria do Bomfim Lopes · Avaliação pública no` /
`Google`. Um `text-wrap: balance` em `.quotes-grid footer` equilibra as duas linhas, mas medido no
navegador ele escolheu quebrar **antes** do separador — `Dalva Maria do Bomfim Lopes` /
`· Avaliação pública no Google` —, e um `·` abrindo linha lê como marcador de lista: troca de um
defeito por outro. Foi preciso o par das duas coisas:

| | |
|---|---|
| CSS | `.quotes-grid footer { … text-wrap: balance; }` |
| conteúdo | `U+00A0` entre o nome e o `·` nos três footers, o que torna o footer uma string JSX |

Resultado medido (Range API, char a char, 1440px **e** 390px):

```
Mariana · Avaliação pública no Google                      → 1 linha
Dalva Maria do Bomfim Lopes ·  /  Avaliação pública no Google  → 2 linhas equilibradas (29 · 27)
Cristiane Taverna · Avaliação pública no Doctoralia        → 1 linha
```

O separador fecha a linha em vez de abrir a seguinte, e as duas linhas ficam quase do mesmo tamanho.
Bases seguem alinhadas entre os três cartões (footer da Dalva: `top` 164 + `h` 28 = 192; os outros
178 + 14 = 192), então nada se moveu no rodapé dos cartões.

O `U+00A0` é a primeira ocorrência de espaço não separável no repo — por isso está declarado em
comentário no `page.tsx`, nomeando o code point em vez de deixar um caractere invisível sem
explicação. Quem editar esses footers depois precisa saber que o espaço é intencional.

## P3-2 · `tabular-nums` na `.rating-row` — FECHADO, com ressalva honesta

`font-variant-numeric: tabular-nums` entrou em `.rating-row` (uma declaração, herdada por nota e
contagem), como a baseline exige para número de dado. **Hoje não muda um pixel**, e vale registrar
por que em vez de vender como ganho visual:

| fonte | teste | resultado |
|---|---|---|
| Telegraf (`5,0`, 1.5rem) | largura de `111` vs `000` **com** `tnum` | 33px vs 51px → a fonte **não traz** figuras tabulares; a declaração é no-op |
| Roboto (contagens, .875rem) | largura com `tnum` vs `normal` | 159px vs 159px → os dígitos já saem com a mesma largura |

Ou seja: o valor é prospectivo — quando a contagem mudar (142 → 150 → 1.042) a linha não vai
"pular" de largura, e se o Telegraf um dia ganhar `tnum` a nota entra junto. Mantive porque é a regra
documentada, custa uma declaração e não tem risco; não mantive por achar que melhorou o render de
hoje, porque não melhorou.

## Verificado

- **47/47 testes**, eslint 0 erros (17 warnings pré-existentes de `<img>`), console do navegador
  ZERO erros nos dois viewports.
- **Geometria intacta**: grid `377,3 · 377,3 · 377,3`, gap 24px, cartões em 222px, footers a 30px do
  pé; em 390px coluna única de 360px. Nenhuma altura mudou por causa das duas correções.
- **Contagens ainda pareadas** com os `aria-label`: `142 avaliações` e `589 opiniões`, 1× visível +
  1× em `aria-label`.
- **Baseline**: CSS só em `globals.css`, propriedades inseridas na ordem alfabética que o arquivo
  usa, nenhuma classe nova, nenhuma dependência (segue em 3), Server Component, nenhuma animação.
- **U+00A0 no HTML servido**: 3 no DOM + 3 no payload RSC do mesmo render, nenhum a mais.

## Issues

Nenhuma. Os três P3/P2 que esta série abriu estão fechados e não sobrou item conhecido na seção.

## Nota de processo, segunda ocorrência

O `next start` sobreviveu de novo e serviu o build anterior; a primeira medição desta rodada mostrou
o footer quebrando no lugar antigo e por um momento pareceu que a correção não funcionou. Duas causas
somadas: `pkill -f "next-server"` mata o próprio shell que roda o comando (o padrão casa com a linha
de comando dele mesmo), e `ps -C next-server` não encontrou o processo. O que funciona é
`pgrep/pkill -f 'next[-]server'` com a classe de caractere quebrando o auto-match, e confirmar por
`curl` que o HTML servido contém a mudança **antes** de abrir o navegador. Registrado nas duas
rodadas porque custou tempo nas duas.
