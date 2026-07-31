# Plano de SEO + GEO — Clínica QARA

**Data:** julho de 2026 · **Escopo:** busca orgânica (Google), busca local (Google Maps / "perto de mim") e visibilidade em respostas de IA (ChatGPT, Gemini, Perplexity, AI Overviews). Considera que a clínica já investe em Google Ads e Instagram.

---

## 1. Diagnóstico

O site já tem uma base técnica acima da média do mercado local:

- Metadados únicos por página, canonical e hreflang (pt-BR/en/es).
- Dados estruturados completos: `MedicalClinic` (com geo, horários, idiomas), `Physician` com CRM/RQE, `FAQPage` em todas as páginas de especialidade, `MedicalWebPage` + referências nos artigos, `BreadcrumbList`.
- Sitemap e robots gerados pelo framework; site estático e rápido (Core Web Vitals sob teste de orçamento de performance).
- GTM com rastreio de conversão do WhatsApp e captura de `gclid` (atribuição de Ads).
- Blog com 28 artigos com autoria médica identificada e referências científicas — sinal E-E-A-T que os concorrentes não têm.

**A lacuna estava na cobertura de conteúdo de alta intenção**: acne, melasma, rosácea, transplante capilar, toxina botulínica e preenchimento só existiam como artigos de blog, não como páginas de serviço. Isso foi corrigido nesta entrega (ver §3).

## 2. Concorrentes (Copacabana / Zona Sul)

| Concorrente | Pontos fortes | Fraquezas exploráveis |
|---|---|---|
| **Doctoralia / BoaConsulta** (agregadores) | Dominam a 1ª página de "dermatologista copacabana"; volume de avaliações | Não competem em conteúdo de condição; a QARA já tem perfil no Doctoralia — usar como canal, não como rival |
| **Dr. Paulo Oldani** (paulooldani.com.br) | Título local forte; blog ativo (30+ posts); páginas de laser, toxina e preenchimento; 2 endereços | Sem dados estruturados; conteúdo sem referências científicas; tratamentos numa página única |
| **AAD Dermatologia** (aaddermatologia.com.br) | 30+ procedimentos descritos; blog ativo; menciona estações de metrô | Sem schema; sem autoria médica clara por artigo |
| **Dr. Raphael Peryassú** | Nicho forte (cirurgia de Mohs) | Escopo estreito; a QARA cobre cirurgia com controle de margens com página própria |

**Estratégia:** não competir por volume de posts, e sim por (a) páginas de condição com profundidade médica e schema completo, (b) domínio do pack local via Google Business Profile e avaliações, (c) ser a fonte "citável" para IA — onde referências, credenciais e entidade consistente decidem.

## 3. O que foi implementado nesta entrega (código)

1. **6 novas páginas de condição/tratamento**, no padrão editorial já aprovado (template de especialidade, FAQ com schema, autoria médica real, mensagens de WhatsApp específicas para atribuição):
   - `/acne` · `/melasma` · `/rosacea` (Dr. Diego; Dr. Fabrício na acne adolescente)
   - `/transplante-capilar` (Dra. Diana, técnica FUE)
   - `/toxina-botulinica` · `/preenchimento` (Dr. Diego; Dr. Miguel na equipe)
2. **Ligação interna completa**: mega-menu, lista de condições da home, artigos do blog apontando para a página da condição correspondente (um clique a menos até a conversão), sitemap.
3. **SEO local**: parágrafo de acesso na home (metrô Siqueira Campos, bairros da Zona Sul) e nova pergunta na FAQ da home ("Onde fica a clínica e como chegar?") — ambos alimentam o schema.
4. **GEO**: `public/llms.txt` (resumo da entidade para crawlers de IA), decisão documentada de permitir bots de IA no robots, `lastModified` real por rota no sitemap.

### Keywords-alvo por página (validar volumes no Keyword Planner do Google Ads)

| Página | Keywords principais |
|---|---|
| `/` | dermatologista copacabana · dermatologista zona sul rj · clínica dermatológica rio de janeiro |
| `/acne` | tratamento acne · dermatologista acne rio de janeiro · acne adulta tratamento |
| `/melasma` | tratamento melasma · melasma tem cura · clarear melasma rio de janeiro |
| `/rosacea` | rosácea tratamento · dermatologista rosácea |
| `/transplante-capilar` | transplante capilar rio de janeiro · transplante capilar fue · implante capilar rj |
| `/toxina-botulinica` | botox copacabana · toxina botulínica rio de janeiro |
| `/preenchimento` | preenchimento facial rj · preenchimento ácido hialurônico |
| `/cabelo` | dermatologista queda de cabelo · tricologista rio de janeiro |
| `/en`, `/es` | english speaking dermatologist rio de janeiro · dermatólogo en río de janeiro |

## 4. Ações fora do site (responsável: clínica / gestor de marketing)

### 4.1 Google Business Profile (maior alavanca local — prioridade 1)

- [ ] Confirmar acesso de proprietário ao perfil da clínica no Google.
- [ ] Categoria principal: **Dermatologista**; secundárias: Clínica dermatológica, Clínica de cirurgia plástica *apenas se aplicável* — não inventar.
- [ ] Preencher **Serviços** espelhando as páginas do site (uma entrada por página de condição, com link).
- [ ] NAP idêntico ao site e ao Doctoralia: `Clínica QARA · Rua Santa Clara, 50 — salas 521/522, Copacabana, Rio de Janeiro — RJ, 22041-012 · +55 21 99218-9718`.
- [ ] Horários iguais aos do site (seg–sex 8h–21h, sáb 8h–13h) e atributos de idiomas.
- [ ] Fotos reais da clínica e da equipe (as mesmas do site) e 1 post por semana (pode reaproveitar o conteúdo do Instagram).
- [ ] Semear a seção **Perguntas e respostas** com as FAQs do site (a própria clínica pode perguntar e responder).

### 4.2 Rotina de avaliações (alimenta pack local **e** respostas de IA)

- [ ] Mensagem padrão pós-consulta no WhatsApp com o link direto de avaliação do Google (obter o "review link" no painel do GBP).
- [ ] Meta: manter fluxo constante (ex.: 8–12 novas avaliações/mês) — recência importa tanto quanto a nota.
- [ ] Responder todas as avaliações (inclusive no Doctoralia), sem discutir dados clínicos.
- [ ] **Não** publicar `aggregateRating` no schema do site: o Google exclui LocalBusiness de review snippet autoatribuído (decisão já documentada nos testes do site). A nota 5,0 visível com link para a fonte permanece.

### 4.3 Google Ads (sinergia com o orgânico)

- [ ] Apontar cada grupo de anúncio para a página correspondente — **não para a home**: acne → `/acne`, botox → `/toxina-botulinica`, transplante → `/transplante-capilar` etc. Melhora o Índice de qualidade (CPC menor) e a atribuição, porque cada página tem mensagem de WhatsApp própria.
- [ ] Minerar o **relatório de termos de pesquisa** mensalmente: termos que convertem no pago e ainda não têm página viram candidatos a nova página orgânica (substitui ferramenta de keywords paga).
- [ ] Usar o Keyword Planner (grátis com a conta de Ads) para validar os volumes da tabela do §3.
- [ ] Campanha local (Performance Max local ou extensões de local) conectada ao GBP para "dermatologista perto de mim".

### 4.4 Instagram (@qaraclinica)

- [ ] Link da bio → página da campanha ativa (não só a home), com UTM: `?utm_source=instagram&utm_medium=social&utm_campaign=<nome>` — o rastreio de conversão do site já classifica o canal.
- [ ] Destaques espelhando as especialidades do site, cada um com link da página correspondente.
- [ ] Reaproveitar as FAQs das páginas como conteúdo (carrossel/Reels): mesmo texto já validado clinicamente.

### 4.5 Citações e consistência de entidade (base do GEO)

- [ ] Mesmos nome, endereço, telefone e descrição em: site, GBP, Doctoralia, BoaConsulta, Instagram e qualquer diretório futuro. Os modelos de IA "resolvem" a entidade cruzando essas fontes.
- [ ] Completar os perfis dos médicos no Doctoralia com links para as páginas de perfil do site.

## 5. Pendências que dependem de decisão/dados da clínica

| Item | O que falta | Onde entra |
|---|---|---|
| URL pública do Google Business Profile | Confirmar/obter | `sameAs` do schema `MedicalClinic` (hoje: Instagram + Doctoralia) |
| Faixa de preço (`priceRange`) | Decisão de publicar valores | Schema + FAQ ("quanto custa a consulta") — só com dados reais |
| Logo em arquivo de imagem | Asset não existe no repositório (wordmark é texto) | `logo` no schema + OG images em paisagem (1200×630) para as páginas de especialidade |
| Página no Google Maps de cada médico | Verificar perfis individuais | Consistência de entidade |

## 6. Métricas de acompanhamento (mensal)

1. **Google Search Console**: impressões/cliques por página nova; posição média para as keywords do §3; aparência em rich results (FAQ).
2. **Pack local**: posição para "dermatologista copacabana" e "dermatologista perto de mim" (buscar em aba anônima/celular); visualizações e ações no painel do GBP.
3. **Conversões**: eventos `whatsapp_click` por página e por canal de aquisição (o site já separa organic/paid_search/paid_social via GTM + gclid).
4. **GEO**: 1×/mês, perguntar a ChatGPT/Gemini/Perplexity "dermatologista em Copacabana" e variações de condição ("onde tratar melasma no Rio de Janeiro") e registrar se/como a QARA aparece.
5. **Avaliações**: contagem e recência no Google e Doctoralia.

## 7. Roadmap sugerido (próximos ciclos)

1. **Curto prazo:** executar checklist do GBP (§4.1) e rotina de avaliações (§4.2); redirecionar destinos dos anúncios (§4.3); registrar propriedade no Search Console e enviar o sitemap, se ainda não feito.
2. **Médio prazo:** OG images em paisagem; página "Perguntas frequentes" consolidada se o Search Console mostrar demanda; artigos novos guiados pelo relatório de termos do Ads (ex.: "quanto custa consulta dermatológica", se a clínica decidir falar de preço).
3. **Contínuo:** um artigo/mês com autoria médica; revisar datas de `lastModified` a cada atualização real de conteúdo; monitorar concorrentes (novas páginas de serviço deles = candidatas a resposta nossa, com nossa profundidade).
