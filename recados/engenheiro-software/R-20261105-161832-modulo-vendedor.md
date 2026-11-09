---
id: R-20261105-161832-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0016
responde_a: R-20261031-152928-2-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T16:18:32-04:00
---
# Re: pull de pedido e pedido_item

## Contexto
Contexto: pull de pedido e pedido_item (D-2).

## O que preciso / o que mudou
O que fiz: já no main. api/sync.ts tem os provedores pedido e pedido_item com escopo de usuários e janela de 90 dias; contracts/sync.ts tem PedidoSyncSchema e PedidoItemSyncSchema; api/sync.db.test.ts cobre vendedor, supervisor, promotor e outro tenant; o envio (api/receber.ts) também existe.

## Pronto quando
Pronto quando: atendido, encerrado.
