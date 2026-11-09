---
id: R-20261106-051610-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0084
responde_a: R-20261106-050237-modulo-catalogo
encerra: true
contrato: null
criado_em: 2026-11-06T05:16:10-04:00
---
# A4 do ranking: sem 🔴; 🟡 índice FTS na virada do ano e 🟡 medir desempenho com ano

## Contexto
Revisão da T-0084-A4 (RN-CAT-12): modules/catalogo/domain/ranking.ts (pontuacaoTextual por trecho), domain/ranking.test.ts (4 casos novos), app/texto-consultas.ts (anoAtual de ctx.agora()) e app/indice.ts. ranking.test.ts está verde aqui (38 casos).

## O que preciso
Veredito: sem 🔴. A regra está certa: com ano na consulta e aplicação com 2 ou mais trechos com anos, o veículo/modelo e o ano têm de casar no mesmo trecho. "pastilha uno 2015" sai, "uno 2012" e "palio 2015" ficam, e sem ano na consulta o comportamento é o antigo. A busca online (domain/vitrine.ts:182) e a do aparelho (domain/busca-consulta.ts:49) usam o mesmo `rankear`, então o critério 3 vale nas duas. O separador `[;|•\r\n]` é o mesmo de serve-em.ts:12. A decisão "trecho sem anos não cobre ano da consulta" repete o comportamento anterior (antes a aplicação inteira com anos já tirava "gol 2015" de "Uno 2010–2014; VW Gol"). Registre essa decisão no doc do módulo.

🟡 1. app/indice.ts:23 + :54 — o índice FTS local expande as faixas abertas ("2018 em diante") com o ano da hora em que indexa, e `montarConsultaFts` (packages/platform-sdk/src/busca.ts:87) liga os grupos com AND. Na virada para 2027, "civic 2027" não passa no FTS para produto indexado em 2026 até ele ser reindexado (o que só acontece quando a linha muda ou o índice é recriado), e o ranking nem chega a ver o produto. O relógio do processo em si não é o problema, porque no aparelho é a mesma fonte do ctx.agora(). O problema é o índice ficar velho. Prazo: antes de 2027-01-01. Proposta: eu ponho no platform-sdk um gancho opcional `geracao?: () => string` em `definirIndiceBusca` (se mudar em relação ao valor gravado, marca `_busca:<id>:reindexar`). Depois vocês usam `geracao: () => String(ano)` com o relógio injetado e trocam `criarRelogio()` por ele. Responda se topa; abro a tarefa pelo gerente.

🟡 2. Desempenho do caminho novo: os casos RF-CAT-02 (ranking.test.ts:290-321) usam docs sem `aplicacao`, então o caminho por trecho não é medido. Medi aqui 2.154 docs com 3 trechos: "pastilha uno" 0,95 s, "pastilha uno 2013" 1,5 a 1,75 s (de 1,6x a 1,8x, ainda abaixo do limite de 5 s no PC, mas o aparelho é mais lento). Peço (a) um caso de desempenho com aplicação de 3 trechos e ano na consulta e (b) se passar do orçamento no APK de preview, guardar em memória os trechos expandidos por (aplicacao, anoAtual), já que cada doc hoje expande N+1 vezes por busca.

🟢 3. "pastilha uno palio 2012" (2012 cabe nos dois trechos) passa a dar 0, e antes achava. Cada trecho é descartado porque o outro veículo está no outro trecho (ranking.ts:215). É uma consulta rara e não bloqueia. Se quiser cobrir: quando todos os trechos forem descartados por `emOutroTrecho`, aceitar se cada termo só de aplicação tiver um trecho que o contenha e cubra o ano. Coloque o caso no teste de qualquer jeito, para documentar a escolha.

## Pronto quando
A4 está aprovada (encerro este pedido de revisão). O 🟡 1 precisa de resposta sua sobre o gancho `geracao` e da correção antes de 2027-01-01. O 🟡 2 entra no próximo lote.
