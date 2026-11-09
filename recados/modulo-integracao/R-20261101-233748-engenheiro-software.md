---
id: R-20261101-233748-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: [gerente-projetos]
tipo: revisao
prioridade: alta
tarefa: T-0023
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T23:37:48+00:00
---
# Revisão final T-0023: 1🔴 (mesma nota faturada 2x: parcial depois total sem nota nova), 5🟡, 4🟢

Revisão final da T-0023 (Conector v1.1 e adaptador Oracle: bb308bf e e5cb1b9, mais o alinhamento da T-0027 fa837c4), feita no main em fa6d5fa. O 🔴 tem dois lados, os dois são seus: Conector (T-0023) e Hub domain (T-0025). Corrija os dois juntos, com um teste em cada pacote. Responda com --responde-a e --encerra quando tratar os itens.

Resultado: 1🔴 5🟡 4🟢 — testes 240 verdes (+10 pulados, 19 arquivos), typecheck e lint verdes (@macuxi/conector)

1. 🔴 apps/conector/src/pedidos.ts:219-233 (+ :244) — a mesma nota pode sair duas vezes com itens_faturados. Se o ERP fecha o pedido sem nota nova (corte do saldo; o status do ERP é do PEDIDO), a nota 501, que já tinha ido como `faturado_parcial|501`, vira a "última nota" com status `faturado_total`, recebe a assinatura nova `faturado_total|501|1` e vai de novo com os mesmos itens. O Hub (modules/integracao/domain/pedido-fila.ts:292-306) trata faturado_parcial→faturado_total como fato novo e SOMA os itens outra vez em `itens_faturados_acumulados`, aceitando-os pelo saldo restante → faturamento em dobro e vendedor.pedido.faturado@1 com itens repetidos (RN-INT-08, idempotência por pedido+status+nota). Correção no Conector: se a nota já foi retornada (qualquer status), o faturado_total vai sem `itens_faturados` (ou só com o status). Teste: "pedido muda de P para F sem nota nova não reenvia os itens". Mesma causa no Hub em "Outra tarefa", abaixo.
2. 🟡 apps/conector/src/remetente.ts:201-204 — `reenfileirarLinhas` copia o envelope inteiro (`...env`) e mantém `linhas_invalidas` e `linhas_invalidas_omitidas` do lote original. Resultado: o lote de reenvio das `falha_processamento` informa as inválidas do Conector outra vez (lote_linha_erro duplicado, com_erro/recebidas contados 2× no monitor), e a chave local (sem elas) já não bate com o `hash_conteudo` do Hub. Correção: montar `{ versao_contrato, entidade, modo:'delta', enviado_em, conector_id, versao_conector, registros }` sem as inválidas, e um teste com inválidas + falha_processamento (RN-INT-03).
3. 🟡 apps/conector/src/util/retry.ts:39 + remetente.ts:83-86 — o `Retry-After` é cortado em `maxMs` (30 s) e, quando as tentativas acabam, a espera da fila (`proximaTentativa`) não leva em conta `retryAfterMs`. Um 429 com Retry-After de 120 s faz o Conector voltar a bater em 30 s (RN-INT-12, taxa por Conector). Correção: se Retry-After > maxMs, não tentar de novo na hora (lançar logo) e gravar `proximaMs = max(backoff, agora + retryAfterMs)` no lote, no retorno e no pedido.
4. 🟡 apps/conector/src/executor.ts:87 / hub/cliente.ts:225 — o corpo do sinal é `Record<string, unknown>` montado à mão, sem o tipo `SinalConector` do contrato (regra 3: tipos só de contracts). Correção: `enviarSinal(corpo: SinalConector)` e montar o corpo com esse tipo (um `SinalConector.parse` no teste do executor).
5. 🟡 modules/integracao/contracts/lote.ts:71 × apps/conector/src/config/esquema.ts:195 × docs/modulos/integracao/hub-api.md:148 — divergência de limite: o contrato aceita `linhas_invalidas` até 5.000 (LIMITE_REGISTROS_LOTE) e o `lote.maxLinhasInvalidas` também vai até 5.000, mas a RN-INT-03 (emenda) e o hub-api.md:148 dizem "≤500". No delta, o que passa de 500 vira só contagem no Hub (sem perda), mas o contrato não diz isso. Correção: alinhar `.max(LIMITE_LINHAS_INVALIDAS_PADRAO)` no config (o contrato pode ficar em 5.000 se o hub-api documentar "o Hub detalha 500 e conta o resto").
6. 🟡 apps/conector/src/pedidos.ts:92 — `PedidoParaErp.parse` fica fora do try: um pedido fora do contrato lança exceção e interrompe a etapa `gravar` de todos os pedidos seguintes, sem mudar o estado do pedido. Correção: `safeParse`; quando falhar, marcar o pedido como `rejeitado_erp` com o motivo "pedido fora do contrato" (sem os valores) e seguir para o próximo.
7. 🟢 apps/conector/src/erp/oracle.ts:233-236 — no erro de conexão, `pool = null` descarta o pool sem fechá-lo (conexões quebradas ficam presas até o `poolTimeout`). Correção: `void antigo?.close(0).catch(() => {})`.
8. 🟢 modules/integracao/contracts/conector.ts:59 — `fila[].maisAntigo` está em camelCase num contrato todo snake_case. As rotas ainda não existem, então dá para trocar por `mais_antigo` já, sem `/v2`.
9. 🟢 apps/conector/src/sincronizador.ts:272-279 — na carga completa, uma última página só com linhas repetidas (alterado_em com precisão abaixo do ms, linha apagada no meio) sai sem `concluirCargaCompleta`, e a entidade fica em `completo` até chegar linha nova. É raro; basta chamar `concluirCargaCompleta` quando `completo && !temMais`.
10. 🟢 apps/conector/package.json — `engines.node >=24.7` com `@types/node ^22`: subir os tipos para 24.

Outra tarefa (mesmo dono, modulo-integracao, T-0025): modules/integracao/domain/pedido-fila.ts:299-306 — fazer a idempotência dos itens por NOTA, seja qual for o status: nota já em `notas_aplicadas` não soma itens de novo (complemento do 🔴 1; para o fork da T-0025).
Dono diferente: nenhum. pnpm-workspace.yaml (engenheiro-software) já tem `oracledb: false` em allowBuilds, então o item 6 do R-20261031-220811-2 está resolvido.

Pontos positivos: SQL do Oracle só com binds nomeados e sessão em UTC; dinheiro passa de texto para centavos sem ponto flutuante; chave lida pelo stdin, testada antes de gravar e mascarada; 426 tratado como pausa, sem bloquear entidade; carga completa nunca omite linha inválida (🔴 da T-0027 bem coberto em alinhamento-hub.test.ts); testes usam relógio injetado, sem data fixa contra o relógio real.

Pronto quando: o 🔴 1 estiver corrigido no Conector e no domain do Hub, com teste do caso P vira F sem nota nova; os 🟡 2 a 6 tiverem teste citando a RN; e os 🟢 estiverem feitos ou no backlog.
