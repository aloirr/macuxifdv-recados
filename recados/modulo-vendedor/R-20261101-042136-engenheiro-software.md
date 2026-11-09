---
id: R-20261101-042136-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0029
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T04:21:36-04:00
---
# T-0029: receber do pedido, aprovar/rejeitar, telas Campo/Gestão/BKO e PDF — não começar antes do OK do gerente

## Contexto
T-0029 (fatia vertical do pedido: Campo → Gestão → BKO, com PDF; pedido do Alexandre R-20261101-020623 item 2). Desenho: `docs/desenho/T-0029.md` (§3 a §9 são seus), ADR 0011 (a aprovação mora no Vendedor; aprovação automática dentro da alçada; eventos no vocabulário RN-VEN-30) e ADR 0012 (consultas entre módulos). Também atende o pedido do modulo-integracao R-20261101-044224-3 (`vendedor.pedido.aprovado@1`). **NÃO COMEÇAR ANTES DO OK DO GERENTE.**

## O que preciso
- **Onda 1 (sem esperar o SDK)**: contratos §3.1 a §3.4 (`PedidoPush` = `CreateOrderRequest` + `condicao_pagamento_id`, `observacao` e `visita_id` opcionais; colunas novas do pull; `PedidoEventoSyncSchema`; `OrderDetail` + `cliente` e `aprovacao`; `AprovarPedidoRequest`/`RejeitarPedidoRequest`; os 4 eventos com schema, incluindo `aprovado@1` no formato `PedidoAprovadoParaFila`). Domínio puro com testes citando a RN: `statusDoContrato`, `nivelDaAlcada`, `politicaDosParametros`, `resultadoDoRecebimento`, `dataDoPreco`, `decidirAprovacao` (RN-VEN-30/10, RN-GES-04/08), `montarPedidoAprovado`, `textoPendencia`; `transitions` com `received → approved`; `orderActions(approved)` libera cancelar (RN-VEN-31). Mover `buildOrderPdfHtml` para `domain/pdf-pedido.ts` e criar `pdfDoPedido(detalhe)` (depois do E5 do engenheiro: `zonedParts` em `@macuxi/comum`). Mandar ao banco-dados a lista de status e de níveis.
- **Onda 2**: `receber` do `pedido` (§4: idempotência pelo UUID + `hash_envio`, carteira, `core.cadastro_resumo@1`, `catalogo.precos_cliente@1`, RN-VEN-14, `validateOrder` com `credit: null`, retratos, histórico, `tx.auditar`, eventos, `em` no aceito); rotas `aprovar`/`rejeitar` (§5); lista, detalhe e alçadas (§6, escopo = `escopoDoPedido`); provedores `pedido_evento`, `condicao_pagamento`, `cliente_condicao`; manifesto (§7: perfis com supervisor, gerente e admin, `apps.gestao`, `pedido.ver` com admin, `aprovado@1`, `usaConsultas`); telas (§8: Campo lendo do sync ⊕ sobreposição, Fase M só no modo demo; aba Pedidos no Gestão com Aprovar/Rejeitar online; BKO na API nova com filtros, painel de aprovação e gaveta); PDF nos três canais (§9).
- Fora da fatia: edição de pedido já aceito (reenvio diferente = `conflito`), crédito, estoque, pedido em nome, ERP (§14).

## Pronto quando
Lint, typecheck e testes do módulo verdes; casos do §12 que dependem só do módulo cobertos no próprio pacote; `verificar modulo-vendedor` sem violação; entrega ao gerente com cópia ao engenheiro (revisão) e ao testes. Divergência com o desenho: pergunte neste fio antes de implementar.
