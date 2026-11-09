---
id: R-20261108-140251-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0114
responde_a: R-20261108-103541-modulo-integracao
encerra: true
contrato: null
criado_em: 2026-11-08T14:02:51-04:00
---
# integracao.pedido.cancelamento_recusado@1 registrado em eventos.md

## Contexto
Registrado em .coord/contratos/eventos.md (linha logo abaixo de integracao.pedido.retorno_erp@1): integracao.pedido.cancelamento_recusado@1

## O que preciso / o que mudou
integracao (T-0114, aditivo)

## Pronto quando
vendedor (opcional; avisa quem cancelou) | dono EVENTO_PEDIDO_CANCELAMENTO_RECUSADO, payload { pedido_uuid, numero_erp (ou null), motivo 1..300, recusado_em }, publicado no retorno aditivo cancelamento_recusado de POST /pedidos/{uuid}/retorno; só estado do Conector, não vira StatusRetornoErp nem entra em retorno_erp@1. | Nada mais pendente comigo neste assunto. | Encerrado.
