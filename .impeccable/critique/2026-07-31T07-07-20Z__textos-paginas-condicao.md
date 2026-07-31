---
target: textos das 14 páginas de condição novas (app/specialties-data.ts · app/page.tsx · public/llms.txt)
scope: content
p0_count: 0
p1_count: 0
p2_count: 0
p3_count: 3
timestamp: 2026-07-31T07-07-20Z
slug: textos-paginas-condicao
follows: 2026-07-31T07-04-26Z__textos-paginas-condicao.md
---
Method: rodada de fechamento dos dois P1 e dois P2 (script com 99 pares de reescrita frase a frase,
cada par exigido a casar exatamente uma vez no bloco novo; contagem mecânica de "—" antes/depois;
build + 47 testes; conferência dos períodos reescritos no HTML pré-renderizado).

# Fechamento · travessões, claim de preço, coloquialismo e endereço

## P1-1 · travessões — FECHADO

Reescrita frase a frase, não substituição mecânica: cada um dos 99 períodos ganhou a pontuação que
o sentido pedia (vírgula para aposto e coordenação, dois-pontos para enumeração e explicação, ponto
e vírgula para oração conclusiva, parênteses para "(micose das unhas)").

| arquivo | antes | depois |
|---|---|---|
| `specialties-data.ts` (bloco novo, da chave `"acne"` em diante) | 112 | 0 |
| `app/page.tsx` (FAQ + parágrafo de localização) | 2 | 0 |
| `public/llms.txt` | 9 | 0 |

Os 5 "—" restantes em `page.tsx` são comentários de código pré-existentes, não texto renderizado.
O conteúdo aprovado anterior a esta série (entradas antigas de `specialties-data.ts`, páginas
inline como `/cabelo`, artigos do blog e `streetAddress` do schema) mantém seus travessões:
mexer nele é rodada própria, com autorização da clínica.

## P1-2 · claim de preço — FECHADO

"sem custo adicional de exame" cortado de /avaliacao-de-pintas. O fato aprovado permanece:
"Na Clínica QARA, a dermatoscopia é feita em toda consulta." Conferido no HTML gerado: zero
ocorrências de "sem custo adicional".

## P2-1 · "enxugar gelo" — FECHADO

Reescrito para "Tratar cicatrizes com a acne em atividade compromete o resultado: novas lesões
geram novas marcas." Registro preciso, sem idiomatismo.

## P2-2 · formato do endereço — FECHADO

FAQ da home e `llms.txt` agora usam vírgula em texto corrido ("Rua Santa Clara, 50, salas
521/522"); o "·" segue nos contextos tabulares (rodapé). "Rio de Janeiro — RJ" no `llms.txt`
virou "Rio de Janeiro, RJ".

## P3 abertos (3)

Seguem registrados da rodada anterior, aguardando decisão editorial da clínica: aberturas de
parágrafo em série (padrão-template da casa), política de acompanhantes na FAQ geriátrica
(validar com a clínica) e frases-fórmula repetidas entre páginas.

Verificação: build ✓ · 47/47 testes ✓ · períodos reescritos conferidos no HTML pré-renderizado
(/acne, /micose-de-unha, /cicatrizes-de-acne).
