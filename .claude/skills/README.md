# Skills do repositório

Skills carregadas automaticamente por agentes que trabalham neste repo.

| Skill | Origem | Papel |
| --- | --- | --- |
| `qara-baseline` | próprio | Baseline de UI deste stack (CSS puro, zero deps). Ler antes de mexer em interface. |
| `fixing-accessibility` | vendorizado | Auditoria de ARIA, teclado, foco, formulários. |
| `fixing-metadata` | vendorizado | Auditoria de title/description/canonical/OG/JSON-LD/hreflang. |
| `fixing-motion-performance` | vendorizado | Auditoria de jank: compositor, scroll-linked, blur, layers. |

## Procedência das skills vendorizadas

Copiadas de [ibelick/ui-skills](https://github.com/ibelick/ui-skills), licença MIT
(texto completo em `LICENSE-ui-skills`), commit
`3ebd1725ca6835f281188141e21b6874a21f7b32` (2026-07-27).

O corpo de cada `SKILL.md` é **cópia literal do upstream**. A única alteração é o bloco
`metadata:` no frontmatter, que registra autor, origem e commit. Para atualizar:

```bash
git clone --depth 1 https://github.com/ibelick/ui-skills /tmp/ui-skills
# copiar skills/<nome>/SKILL.md, reaplicar o bloco metadata: e atualizar o commit acima
```

Vendorizado em vez de `npx ui-skills get <slug>` de propósito: o CLI adiciona dependência de
rede a cada uso, o roteamento por `ui-skills start` é não determinístico, e conteúdo upstream
mudaria sob nós sem revisão. Aqui o conteúdo é fixo e versionado com o site.

## O que foi deliberadamente deixado de fora

- **`baseline-ui`** — exige Tailwind, `motion/react`, `cn` (clsx + tailwind-merge) e Base UI/Radix.
  Este site usa CSS puro em `app/globals.css` e tem 3 dependências de runtime (`next`, `react`,
  `react-dom`). Substituído por `qara-baseline`, que traduz a mesma intenção para os tokens
  `--qara-*`, `--motion-*` e `--z-*` reais.
- **`create-design-md`** — `DESIGN.md` já existe e já segue exatamente o schema que a skill
  produz (`colors` / `typography` / `rounded` / `spacing` / `components` com refs `{colors.graphite}`).
  Rodá-la só criaria risco de reescrever decisões de marca já fixadas por rodadas de crítica.
- **`improve-ui`** — protocolo bom (read-only, prova em três etapas, plano em `design-plans/`),
  mas sobrepõe o `.impeccable/critique` que já roda neste repo. Se um dia o `.impeccable` sair,
  esta é a primeira candidata a entrar.
- **`ui-skills-root`** — camada de roteamento que só faz sentido junto com o CLI.
