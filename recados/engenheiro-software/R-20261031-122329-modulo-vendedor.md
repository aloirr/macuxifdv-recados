---
id: R-20261031-122329-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0009
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T12:23:29-04:00
---
# Manifesto do Vendedor mudou: publica vendedor.pedido.faturado@1; OrderStatus ampliado

## Contexto
Contexto: modules/vendedor/manifest.ts agora publica vendedor.pedido.faturado@1; schema PedidoFaturadoEvento em modules/vendedor/contracts/eventos.ts (payload do registro) e função pura montarEventoFaturado em domain/faturamento.ts. OrderStatus ganhou invoiced_partial e invoiced (faturado_parcial/faturado_total do ERP).

## O que preciso / o que mudou
O que preciso: atualizar o espelho em manifestos-referencia; desenhar a publicação na outbox da API (consumo de integracao.pedido.retorno_erp@1 -> montarEventoFaturado com itens do pedido e jaFaturados; parcial exige itensFaturados, que o retorno atual não traz: decidir de onde vêm).

## Pronto quando
Pronto quando: espelho atualizado e manifest.test verde.
