---
target: seção de depoimentos da home (app/page.tsx — .quotes-grid + .rating-row)
scope: section
p0_count: 0
p1_count: 0
p2_count: 1
timestamp: 2026-07-30T12-41-08Z
slug: depoimentos-home
---
Method: rodada escopada (build + 47 testes de nó · eslint · Chromium 1440/390 com medição de caixa
e console). Sem `total_score`: as rodadas 1–4 pontuaram o site inteiro em Nielsen/40 e um número
sobre uma seção não seria comparável — omitir é mais honesto do que inventar escala.

# Crítica escopada · seção de depoimentos — pós-restauração da terceira citação

Contexto: `ae51d28` removeu a citação que afirmava resultado ("minha cicatriz ficou imperceptível")
e não pôde substituí-la — `PRODUCT.md:93` proíbe inventar depoimento e não havia avaliação real em
mão. A clínica forneceu uma avaliação pública do Google (Mariana) e as contagens atuais (Google 142,
Doctoralia 589, este último conferido no perfil em 30/07/2026). Esta rodada verifica o resultado.

## Verificado

- **Grid volta a fechar.** `.quotes-grid` é `repeat(3, 1fr)` e vinha renderizando 2 cartões — uma
  coluna vazia de ~377px no desktop desde `ae51d28`. Medido agora em 1440px: `377.3 · 377.3 · 377.3`,
  três cartões de altura idêntica (222px) e footer a 30px do pé em todos os três. Em 390px empilha
  em coluna única (360px) com o footer ancorado ao pé de cada cartão.
- **Regra que motivou a remoção continua respeitada.** Nenhuma das três citações afirma resultado:
  falam de experiência, didática e atenção. A nova é voz de paciente, rotulada como avaliação
  pública, com link para a fonte na mesma seção — não é copy da clínica, então `PRODUCT.md:89`
  (sem promessa, sem sensacionalismo) não é contornado por ela.
- **Transcrição sem invenção.** Texto verbatim, inclusive a quebra de linha (virou `<br />`, para não
  inventar a pontuação que o original não tem) e o espaço antes de `!!!`. Mesmo critério que mantém
  `nos mín detalhes` na citação da Cristiane Taverna.
- **Paridade texto ↔ `aria-label`.** Os quatro pares batem: `142 avaliações` e `589 opiniões`
  aparecem exatamente 1× visíveis e 1× em `aria-label` no DOM (as demais ocorrências no HTML são o
  payload RSC do mesmo render, não um segundo fato). `141`/`583` → 0 ocorrências nas 55 páginas.
- **Sem regressão de schema.** `aggregateRating` segue fora do JSON-LD (`MedicalClinic` é subtipo de
  `LocalBusiness`, excluído dos review snippets desde 2019); os números permanecem só como texto
  visível com link para a fonte, que é verificável em vez de autoatribuído.
- **A11y dos nós tocados.** Alvos da `.rating-row` em 48px (desktop) e 48/52px (mobile), acima do
  mínimo de 44px. Footer em `#5F5F61` sobre branco = **6,3:1** a 12px, acima de 4,5:1. HTML nativo
  (`blockquote`/`footer`), nenhum `role`, nenhuma classe nova.
- **Baseline.** Zero dependência nova (segue em 3), zero CSS novo, Server Component, nenhuma
  animação. `npm test` 47/47, `eslint` 0 erros (17 warnings pré-existentes de `<img>`), console do
  navegador **ZERO** erros em ambos os viewports.

## Issues

- **[P2] O `<br />` não lê como fronteira de frase.** Renderizado, o cartão sai como
  `Amei a experiência!! Ótimos / profissionais e muito atenciosos / Confio de olhos fechados !!!` —
  como a linha 1→2 já quebra no meio da frase, a quebra dura 2→3 parece só mais um wrap, e o texto
  soa corrido. A correção que resolve de vez é um ponto depois de `atenciosos`, mas isso inventa um
  caractere na fala de uma paciente: **decisão da clínica, não minha.** Fica registrado, não
  corrigido. (Alternativa considerada e descartada: dois `<p>` no mesmo `blockquote` — o cartão é
  `flex` com `justify-content: space-between`, então o `space-between` afastaria as duas frases em
  vez de aproximá-las.)
- **[P3] Footers desalinhados entre cartões** quando um nome é longo: "Dalva Maria do Bomfim Lopes ·
  Avaliação pública no Google" ocupa 2 linhas e sobe o footer daquele cartão. Pré-existente, não
  introduzido aqui, e visível também na versão de 2 cartões.
- **[P3] `.rating-row` sem `tabular-nums`.** A baseline pede `font-variant-numeric: tabular-nums` em
  número de dado, e hoje só `.footer-hours dd` tem (`globals.css:144`). Pré-existente; não corrigi
  porque exigiria CSS fora do escopo aprovado. Ao lado de `5,0`/`142`/`589`, é um ganho pequeno mas
  legítimo para uma rodada de tipografia.

## Forças

Uma seção que declara a fonte de cada citação e linka as duas notas para os perfis públicos é o
oposto do padrão de mercado (depoimento anônimo, não verificável). A tríade cobre três eixos
distintos — confiança, didática, dedicação — sem que nenhuma prometa desfecho clínico.

## Provocações

- As três citações são de dois médicos e a clínica tem cinco. Vale colher avaliação pública de quem
  ainda não aparece, para a seção não sugerir que a experiência boa é de dois consultórios?
- Contagem em texto envelhece: 583 virou 589 em ~11 dias. Cabe uma nota interna de quando revisar,
  ou aceitar explicitamente a defasagem conservadora (publicar menos do que existe nunca é falso).
- A remoção do `aggregateRating` deixou a prova social só no texto visível. Se algum dia o Google
  reabrir review snippet para `LocalBusiness`, esta decisão merece nova rodada — não é permanente.
