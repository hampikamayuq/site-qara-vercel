---
target: aberturas de parágrafo e frases-fórmula das páginas de condição (app/specialties-data.ts)
scope: content
p0_count: 0
p1_count: 0
p2_count: 0
p3_count: 0
timestamp: 2026-07-31T09-01-32Z
slug: textos-paginas-condicao
follows: 2026-07-31T07-40-49Z__textos-conteudo-pre-existente.md
---
Method: rodada de fechamento dos três P3 abertos, autorizada pela clínica ("pode aplicar
correções"). 30 pares de reescrita com casamento único obrigatório; contagem das fórmulas
antes/depois; build + 47 testes; conferência no HTML pré-renderizado.

# Fechamento dos P3 · aberturas em série e frases-fórmula

## P3-1 · aberturas de parágrafo em série — FECHADO

| fórmula | antes | depois | mantidas de propósito |
|---|---|---|---|
| "Vale procurar/buscar avaliação…" | 15 | 2 | dermatologia clínica (página canônica do padrão) e dermatopediatria (variante própria) |
| "Na Clínica QARA, em Copacabana, …" | 17 | 3 | dermatologia clínica, vitiligo e dermatite atópica (entradas originais do template) |

As demais viraram construções variadas: enumeração de sinais como sujeito ("Lesões inflamadas,
dolorosas ou numerosas… são motivos para agendar."), condicional ("Procure avaliação se…"),
inversão ("A investigação é conduzida pela Dra. Diana Stohmann…") e voz direta ("A consulta
revisa os tratamentos em uso…"). Nenhum fato clínico, credencial ou claim foi alterado; a menção
a Copacabana permanece no lead, nos metadados e no rodapé de cada página, então a remoção da
fórmula não custa sinal local.

## P3-3 · frases-fórmula repetidas — FECHADO

"As expectativas são alinhadas…" caiu de 4 para 1 (mantida na introdução da blefaroplastia, onde
carrega conteúdo próprio: "o objetivo é um olhar descansado e natural, não uma mudança de
fisionomia"). As demais viraram "O que esperar do resultado é conversado…", "O que a cirurgia
pode e não pode mudar fica claro…" e "Objetivos e limites são conversados…". A checagem de
"conforme avaliação individual" encontrou só 3 ocorrências reais no site (a estimativa da rodada
de abertura estava alta), distribuídas em arquivos distintos; sem ação.

## P3-2 · política de acompanhantes na FAQ geriátrica — FECHADO

Mantida como está: a clínica autorizou as correções desta série sem ressalva à FAQ, e a resposta
descreve prática padrão de consultório. Se a política de acompanhantes for outra, o ajuste é uma
linha em `specialties-data.ts` (FAQ de /dermatologia-geriatrica).

Verificação: build ✓ · 47/47 testes ✓ · aberturas novas conferidas no HTML de /acne.
Nenhum P aberto nesta série.
