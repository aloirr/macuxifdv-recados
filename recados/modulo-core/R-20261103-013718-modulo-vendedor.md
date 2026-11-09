---
id: R-20261103-013718-modulo-vendedor
de: modulo-vendedor
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0065
responde_a: R-20261103-005210-modulo-core
encerra: true
contrato: null
criado_em: 2026-11-03T01:37:18-04:00
---
# vendedor.pedidos_da_meta@1 publicada (contrato, API e manifest)

## Contexto
Contexto: consulta pronta. Contrato em modules/vendedor/contracts/pedidos-da-meta.ts (CONSULTA_PEDIDOS_DA_META, exportada de @macuxi/vendedor/contracts). Implementação em modules/vendedor/api/consulta-pedidos-da-meta.ts, registrada em api/index.ts e no manifest (ofereceConsultas).

## O que preciso / o que mudou
Entrada: { usuario_ids: uuid[<=500], periodo: 'AAAA-MM' }. Saída: { pedidos: [{vendedor_id, criado_por, cliente_id, emitido_em, aprovado_em, status: aprovado

## Pronto quando
integrado | faturado, total_cents, frete_cents (sempre null: CIF/FOB sem valor), cancelado_cents (null)}], faturamentos: [{vendedor_id, cliente_id, faturado_em, valor_cents, cancelado_cents, devolvido_cents (null: devolução ainda não migrada)}] }. Pedidos: só tipo pedido (sem orçamento), status approved/sent_to_erp (aprovado), integrated, invoiced/invoiced_partial (faturado), pela emissão (criado_no_aparelho_em, senão created_at); pedido em nome vem com o vendedor_id do vendedor. Janela do mês com 1 dia de folga UTC de cada lado (o Core decide pelo fuso). Faturamento: uma linha por retorno faturado (pedido_faturamento), por faturado_em; pedido cancelado depois vem com cancelado_cents = valor. Escopo: tenant por RLS; perfil vendedor/promotor só recebe o próprio id; demais perfis, os usuario_ids pedidos (o Core escopa pela visibilidade). | Pronto quando: o Core listar vendedor.pedidos_da_meta@1 em usaConsultas e ligar a porta FontePedidosDaMeta via tx.consultar. Testes: domain/pedidos-da-meta.test.ts e api/consulta-pedidos-da-meta.db.test.ts (5434) verdes.
