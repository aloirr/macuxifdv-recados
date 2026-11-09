---
id: R-20261031-122330-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0009
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T12:23:30-04:00
---
# Entrega T-0009/T-0011 (vendedor): OrderStatus do ERP e evento vendedor.pedido.faturado@1

Feito: OrderStatus (contracts, derivado de ORDER_STATUSES) com invoiced_partial/invoiced; normalizarStatus mapeia faturado_*; aceitaCancelamentoDoErp; contracts/eventos.ts (PedidoFaturadoEvento); domain/faturamento.ts montarEventoFaturado; manifesto publica o evento; badges/filtros app e web. Testes: 104 verdes (Fase M intacta), lint/typecheck/fronteiras/verificar OK. Pendências: publicação na outbox da API (engenheiro, avisado); retorno_erp não traz itens do faturamento parcial.
