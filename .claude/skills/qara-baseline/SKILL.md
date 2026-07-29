---
name: qara-baseline
description: Baseline de UI do site da Clínica QARA — impede "slop" gerado por IA em CSS puro, sem Tailwind e sem dependências novas. Use antes de criar ou alterar qualquer interface, seção, componente ou estilo deste repositório.
license: MIT
metadata:
  origin: reescrito para este repo a partir do espírito de ibelick/ui-skills baseline-ui (MIT)
---

# QARA Baseline

Baseline opinativa deste repositório. `baseline-ui` do ui-skills **não se aplica aqui**: ela exige
Tailwind, `motion/react`, `cn` (clsx + tailwind-merge) e Base UI/Radix. Este site é Next.js App
Router com **CSS puro** e **zero dependências de runtime** além de `next`, `react`, `react-dom`.
As regras abaixo traduzem a mesma intenção para o stack real.

## Como usar

- `/qara-baseline` — aplique estas restrições a todo trabalho de UI nesta conversa.
- `/qara-baseline <arquivo>` — revise o arquivo contra as regras e relate:
  - violação (cite a linha/snippet exata)
  - por que importa (uma frase)
  - correção concreta (nível de código)

Prefira diffs mínimos. Não refatore código não relacionado.

## Fontes da verdade

Antes de inventar valor, leia:

- `DESIGN.md` — especificação normativa (tokens no frontmatter, regras na prosa)
- `app/globals.css` — tokens `--qara-*`, `--motion-*`, `--z-*` e todas as classes
- `app/ui.tsx` — `Header`, `Footer`, `SectionHeading`, `CtaBand`, `Breadcrumb`
- `/design-system` (`app/design-system/page.tsx`) — referência viva renderizada
- `design-system/` — previews isolados sincronizados via `/design-sync`

Se `DESIGN.md` e o CSS divergirem, o CSS é o que renderiza — relate o conflito, não o silencie.

## Stack

- NUNCA introduza Tailwind, CSS-in-JS, CSS Modules, `clsx`/`tailwind-merge` ou biblioteca de UI.
- NUNCA adicione dependência de runtime. O `package.json` tem 3 e deve continuar com 3.
- MUST escrever estilo em `app/globals.css`, na seção temática correspondente, com a mesma
  densidade de uma declaração por linha em ordem alfabética de propriedade já usada no arquivo.
- MUST reutilizar classe existente antes de criar classe nova; nomes em `kebab-case` sem prefixo.
- MUST manter componentes como Server Components; `"use client"` só quando há evento, `matchMedia`,
  observer ou estado — e o arquivo cliente deve ser folha, não wrapper de página.
- NUNCA use `useEffect` para o que pode ser expresso como renderização.

## Componentes e primitivas

- MUST usar HTML nativo antes de qualquer construção com `role`: `<button>`, `<a>`, `<details>`/
  `<summary>` (padrão já usado em mega-menu, menu mobile e FAQ), `<dl>` para pares rótulo/valor.
- NUNCA reconstrua à mão teclado, foco ou trap de foco: se o padrão nativo não resolve, pare e
  pergunte antes de inventar widget.
- MUST dar `aria-label` a botão/link só-ícone e `aria-hidden="true"` a ícone decorativo.
- MUST marcar estado de navegação com `aria-current` (padrão do `Header` e do `nav-spy`).
- NUNCA remova o `.skip-link`, e mantenha o foco visível: sem `outline: none` sem substituto.

## Interação

- NUNCA use `100vh` para altura de viewport cheia; use `100dvh` (padrão de `.mega-panel` e do
  `nav` do menu mobile).
- MUST respeitar `env(safe-area-inset-*)` em elemento `position: fixed` (ver `.whatsapp-float`).
- MUST manter alvo de toque com no mínimo 44px de altura/largura em mobile.
- MUST mostrar erro ao lado da ação que o gerou.
- NUNCA bloqueie colar em `input`/`textarea`.
- MUST manter o CTA de WhatsApp coerente com a intenção da página (ver `app/clinic-links.ts` e
  `appointmentLinks`): cada especialidade tem mensagem própria; não aponte para a mensagem genérica.

## Animação

- NUNCA adicione animação que não foi pedida.
- MUST animar somente `transform` e `opacity`.
- NUNCA anime `width`, `height`, `top`, `left`, `margin`, `padding` ou `filter`/`backdrop-filter`.
- MUST usar os tokens de movimento existentes — `--motion-duration-fast|base|slow`, `--motion-ease`,
  `--motion-distance`. NUNCA introduza curva de easing nova.
- MUST manter feedback de interação (hover, foco, press) em no máximo 200ms; `--motion-duration-fast`
  (350ms) é para entrada, não para feedback.
- NUNCA dirija animação por evento de `scroll`: use `animation-timeline: view()` com `@supports`, e
  `IntersectionObserver` para revelar/pausar (padrão de `app/motion-controller.tsx`).
- NUNCA anime CSS variable consumida por `transform`/`opacity`/posição.
- MUST respeitar `prefers-reduced-motion`: toda entrada nova precisa cair no bloco `@media
  (prefers-reduced-motion: reduce)` no fim de `app/globals.css`.
- MUST usar `unobserve` após revelar, e `cancelAnimationFrame` no cleanup.

## Tipografia

- MUST usar apenas Telegraf (display/headline) e Roboto (título/corpo/label). Nenhuma fonte nova.
- MUST manter `text-wrap: balance` em títulos e `text-wrap: pretty` em corpo (regra global já
  existe em `app/globals.css:60-61`; não a contorne com override local).
- MUST usar `font-variant-numeric: tabular-nums` em número tabular (horário, telefone, dado).
- SHOULD usar `line-clamp` em UI densa em vez de cortar conteúdo no servidor.
- NUNCA altere `letter-spacing` fora dos valores de `DESIGN.md`; os degraus de `typography.scale`
  são fechados — se precisar de tamanho novo, justifique e adicione ao `DESIGN.md` no mesmo diff.

## Layout e profundidade

- MUST usar a escala `--z-*` (`--z-scrim: 9`, `--z-dropdown: 20`) e **estendê-la** em vez de
  escrever número cru. Valores crus legados: `.skip-link` 100, `.site-header` 10,
  `.whatsapp-float` 8, `.blog-index` 5, e o empilhamento local do `.craft-hero` (0–3).
- MUST usar os raios sancionados: `surface` 24px, `compact` 12px, `pill` 999px.
- MUST usar a escala de espaçamento (8 / 12 / 24 / 48 / 112px) — sem valor intermediário novo.
- SHOULD manter o plano padrão sem sombra; elevação é ambiente, não card flutuante.

## Design

- NUNCA use gradiente decorativo ou de marca. As três exceções sancionadas são scrims de
  legibilidade (`.craft-hero::after`) e a textura de `.clinic-detail`; não crie a quarta.
- NUNCA use roxo, multicolor ou glow — a paleta é grafite/tinta + taupe + blush.
- MUST usar tokens `--qara-*` existentes antes de introduzir cor nova.
- SHOULD limitar a um acento por view.
- MUST dar a estado vazio uma próxima ação clara.
- NUNCA anime `blur()` nem `backdrop-filter`; o `blur(14px)` do `.site-header` é estático por
  decisão, e `backdrop-filter` cria containing block (ver comentário em `app/globals.css:428`).

## Performance

- NUNCA aplique `will-change` fora de animação ativa (hoje o arquivo não tem nenhum — mantenha).
- MUST manter imagem com `width`/`height` ou `aspect-ratio` para não gerar CLS.
- NUNCA reintroduza `loading.tsx`: já foi removido por travar o LCP (commit `e465f85`).
- MUST rodar `npm test` (build + testes de nó) antes de considerar a mudança pronta.

## Conversão e idioma

- MUST disparar conversão pelo contrato existente (`app/conversion-events.mjs`,
  `conversion-tracker.tsx`); nenhum evento novo fora dele.
- MUST manter `lang` correto por rota (`app/document-language.tsx`) e `hreflang` só para página
  que realmente existe (`/`, `/en`, `/es`).
