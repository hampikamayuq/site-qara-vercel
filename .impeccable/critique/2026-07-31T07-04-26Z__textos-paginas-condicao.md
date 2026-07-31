---
target: textos das 14 páginas de condição novas (app/specialties-data.ts · app/page.tsx · public/llms.txt)
scope: content
p0_count: 0
p1_count: 2
p2_count: 2
p3_count: 3
timestamp: 2026-07-31T07-04-26Z
slug: textos-paginas-condicao
---
Method: leitura integral das 14 entradas novas de `specialties-data.ts` (lotes 1 e 2), da FAQ e do
parágrafo de localização novos da home e do `llms.txt`, contra PRODUCT.md (voz "precisa, serena e
acolhedora"; sem promessas; sem inventar serviços) e contra os marcadores usuais de texto gerado
por IA. Inventário mecânico: `grep -o "—"` por arquivo, escopado ao bloco novo (da chave `"acne"`
em diante — o conteúdo pré-existente aprovado fica fora desta rodada).

# Crítica dos textos das páginas de condição (lotes 1 e 2)

## P1-1 · travessões em massa — marcador de texto de IA

112 travessões (—) nos textos novos de `specialties-data.ts`, mais 2 na home (FAQ "Onde fica a
clínica" e parágrafo de localização) e 9 no `llms.txt`. O travessão como conector é o tique mais
reconhecível de texto gerado por IA, e a clínica pediu a remoção. Os textos pré-existentes também
usam — (49 ocorrências nas entradas antigas, mais páginas inline como `/cabelo`), mas são conteúdo
aprovado e ficam fora do escopo; se a clínica quiser, é uma rodada própria.

**Correção:** reescrever cada ocorrência com a pontuação que o período pede (vírgula, dois-pontos,
ponto e vírgula, parênteses ou frase nova) — substituição mecânica por um único caractere trocaria
um tique por outro.

## P1-2 · claim de preço não autorizado em /avaliacao-de-pintas

Em topics · Dermatoscopia: "…é feita em toda consulta, **sem custo adicional de exame**". A
clínica confirmou que a dermatoscopia acontece em toda consulta; não confirmou política de
cobrança. Afirmação de preço inventada, no mesmo grupo de risco do `priceRange` que ficou pendente
de decisão no plano de SEO.

**Correção:** cortar a oração de custo; manter o fato aprovado ("faz parte de toda consulta").

## P2-1 · coloquialismo fora da voz da marca

Em /cicatrizes-de-acne, topics · Controle da acne ativa: "Tratar cicatrizes com acne em atividade
**é enxugar gelo**". A voz documentada é precisa e serena; a expressão idiomática destoa do resto
do site, que não usa esse registro em nenhuma outra página.

**Correção:** "…com a acne em atividade compromete o resultado: novas lesões geram novas marcas."

## P2-2 · formato de endereço divergente na FAQ da home

A FAQ nova diz "Rua Santa Clara, 50 — salas 521/522"; o rodapé usa "Rua Santa Clara, 50 · salas
521/522". NAP consistente é exatamente o que o plano de SEO local exige do restante da web — o site
não deveria divergir de si mesmo. (O `streetAddress` do schema em `seo.ts` também usa "—", mas é
pré-existente e usado nos testes; fica registrado, não alterado nesta rodada.)

**Correção:** na FAQ e no `llms.txt`, usar vírgula ("Rua Santa Clara, 50, salas 521/522"), que
funciona em texto corrido; o "·" fica para os contextos tabulares (rodapé).

## P3-1 · aberturas de parágrafo em série

"Vale procurar avaliação quando…" abre o 2º parágrafo e "Na Clínica QARA, em Copacabana, …" abre o
3º em quase todas as 14 entradas novas. É o padrão herdado das entradas pré-existentes (as três
originais fazem o mesmo), então é template da casa, não defeito novo — mas com 21 páginas o padrão
fica visível para quem navega várias. Registrado; mexer nisso é decisão editorial da clínica, não
correção unilateral.

## P3-2 · política de acompanhantes afirmada sem confirmação

/dermatologia-geriatrica, FAQ "Familiares podem acompanhar a consulta?" responde "Sim" — plausível
e de baixo risco, mas é política de atendimento que a clínica não confirmou explicitamente.
Mantido; validar com a clínica na próxima revisão de conteúdo.

## P3-3 · frases-fórmula repetidas entre páginas

"As expectativas são alinhadas antes de qualquer decisão/procedimento" aparece em 4 páginas;
"conforme avaliação individual(izada)" em 8. Repetição funcional (são fatos verdadeiros de todas as
páginas), mas vale variar quando esses textos forem revisados por humanos. Registrado.
