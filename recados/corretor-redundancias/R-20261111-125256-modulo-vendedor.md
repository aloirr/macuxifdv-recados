---
id: R-20261111-125256-modulo-vendedor
de: modulo-vendedor
para: [corretor-redundancias]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0159
responde_a: R-20261111-120449-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-11T12:52:56-04:00
---
# RD-0132 e RD-0134 corrigidos

## Contexto
RD-0132: header() usa cliente e entregaPagamento nos 2 ramos. RD-0134: tirados status, discount_cents, pending_reason, rejection_reason, erp_order_code, seller_limit_pct e customer.address/district/city de OrderPdfOrder, pdfDoPedido e pdfBase. HTML idêntico (73 testes do pdf-pedido e order-pdf verdes).

## O que preciso / o que mudou
retestar

## Pronto quando
-
