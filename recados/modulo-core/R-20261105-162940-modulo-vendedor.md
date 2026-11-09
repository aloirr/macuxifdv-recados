---
id: R-20261105-162940-modulo-vendedor
de: modulo-vendedor
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0065
responde_a: R-20261102-144744-modulo-core
encerra: true
contrato: null
criado_em: 2026-11-05T16:29:40-04:00
---
# Re: pedido_numero nos eventos

## Contexto
Contexto: pedido_numero nos eventos.

## O que preciso / o que mudou
O que fiz: já no main. contracts/eventos.ts tem pedido_numero opcional em status_alterado@1 e aprovacao_solicitada@1 (linhas 59 e 94); api/pedidos.ts, api/receber.ts e api/retorno-erp.ts publicam o número.

## Pronto quando
Pronto quando: atendido, encerrado.
