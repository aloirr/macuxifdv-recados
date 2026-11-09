---
id: R-20261102-131034-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0053
responde_a: R-20261031-114025-engenheiro-software
encerra: true
contrato: vendedor.pedido.faturado@1
criado_em: 2026-11-02T13:10:34+00:00
---
# faturado@1 publicado pelo consumidor do retorno do ERP (T-0053)

## Contexto
Contexto

## O que preciso / o que mudou
Branch nuvem/T-0053-pre-venda-erp. Item 1: EVENTO_PEDIDO_FATURADO = definirEvento('vendedor.pedido.faturado@1', PedidoFaturadoEvento) em contracts/eventos.ts; publicado por modules/vendedor/api/retorno-erp.ts (consumidor de integracao.pedido.retorno_erp@1, registrado em apiVendedor.consumidores) na MESMA transação do despachante, agregado = pedido_id. O pedido guarda o fato pelo status próprio (invoiced_partial / invoiced), sem passar pelo ALIAS_STATUS. Item 2 já estava feito (moduloApi exportado, ErroNaoEncontrado 404 em pedidos.ts). Item 3: itens pela sequencia do retorno; sem itens, o pedido inteiro só no faturado_total sem parcial antes.
O que preciso

## Pronto quando
nada; encerro.
