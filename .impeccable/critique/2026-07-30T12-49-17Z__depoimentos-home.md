---
target: seção de depoimentos da home (app/page.tsx — .quotes-grid)
scope: section
p0_count: 0
p1_count: 0
p2_count: 0
timestamp: 2026-07-30T12-49-17Z
slug: depoimentos-home
follows: 2026-07-30T12-41-08Z__depoimentos-home.md
---
Method: auditoria da correção do P2 da rodada anterior (build + 47 testes · eslint · Chromium
1440/390 com medição de caixa e console). Escopada à primeira citação; nada mais mudou.

# Auditoria · correção de pontuação da citação da Mariana

A rodada anterior registrou um P2: a citação usava `<br />` para separar as duas frases, e como a
linha 1→2 já quebrava no meio da frase, a quebra dura não lia como fronteira — o cartão soava
corrido. A clínica autorizou corrigir o texto.

## O que mudou

| | |
|---|---|
| antes | `Amei a experiência!! Ótimos profissionais e muito atenciosos<br />Confio de olhos fechados !!!` |
| depois | `Amei a experiência!! Ótimos profissionais e muito atenciosos. Confio de olhos fechados!!!` |

Três deltas, todos de pontuação e espaçamento: ponto de fim de frase onde o original usava quebra de
linha, remoção do espaço órfão antes de `!!!`, e o `<br />` que deixou de ter função. **Nenhuma
palavra alterada, nenhuma removida, nenhuma acrescentada** — é normalização tipográfica de citação,
não reescrita. O comentário acima do grid passou a declarar exatamente esse critério, em vez de
"verbatim", que virou impreciso no momento em que a pontuação foi normalizada.

## Verificado

- **P2 fechado.** Renderizado em 1440px, o cartão sai `Amei a experiência!! Ótimos / profissionais e
  muito atenciosos. Confio / de olhos fechados!!!` — a fronteira de frase agora é o ponto, e não
  depende de onde a linha quebra. Em 390px o mesmo.
- **Zero resíduo no build:** `atenciosos<br/>` → 0 ocorrências, `fechados !!!` → 0 ocorrências,
  a frase corrigida → presente.
- **Geometria intacta.** Grid segue `377,3 · 377,3 · 377,3` com gap 24px; os três cartões em 222px
  de altura e footer a 30px do pé; em 390px, coluna única de 360px. A correção não mexeu no número
  de linhas do cartão (3 antes, 3 depois), então nada se remediu.
- **Contagens e `aria-label` inalterados e ainda pareados:** `142 avaliações` e `589 opiniões`, 1×
  visível + 1× em `aria-label` cada.
- **Build limpo:** 47/47 testes, eslint 0 erros (17 warnings pré-existentes de `<img>`), console do
  navegador ZERO erros nos dois viewports. Nenhuma dependência, nenhuma linha de CSS.
- **Armadilha do processo, registrada para a próxima rodada:** o primeiro `next start` desta sessão
  sobreviveu ao `pkill` e continuou servindo o build antigo — a medição inicial teria validado o HTML
  anterior. Confirmar a frase servida por `curl` antes de medir no navegador deixou o erro visível.
  Vale como regra: auditoria de UI começa por conferir que o servidor serve o build que se quer medir.

## Issues

Nenhuma nesta rodada. Os dois P3 da rodada anterior seguem abertos e continuam sendo pré-existentes,
não introduzidos por esta mudança: footer de nome longo desalinha o cartão da Dalva, e `.rating-row`
não usa `tabular-nums` (`globals.css:144` é o único lugar que usa).

## Observação que não é issue

Os `!!` e `!!!` continuam como a paciente escreveu. Reduzi-los seria mexer na intensidade da fala —
outra categoria de edição, não normalização —, e a seção já rotula a origem de cada citação e linka
as duas notas para os perfis públicos, então a informalidade lê como voz de terceiro, não como copy
da clínica. Se a clínica quiser tom uniforme entre os três cartões, é decisão editorial dela e vale
uma rodada própria.
