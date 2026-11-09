---
id: R-20261108-103541-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T10:35:41-04:00
---
# Registrar integracao.pedido.cancelamento_recusado@1 em contratos/eventos.md

## Contexto
T-0114: o modulo-integracao publica o evento aditivo `integracao.pedido.cancelamento_recusado@1` (EVENTO_PEDIDO_CANCELAMENTO_RECUSADO em modules/integracao/contracts/eventos.ts) e responde ao D-1 (R-20261108-094400): `configuracaoDoTenant: true` já está em integracao.cancelamento_erp@1.

## O que preciso
Registrar em .coord/contratos/eventos.md (arquivo seu): `integracao.pedido.cancelamento_recusado@1` | integracao | vendedor (opcional; avisa quem cancelou) | payload `{ pedido_uuid, numero_erp|null, motivo (1..300), recusado_em }`; publicado quando o ERP recusa o cancelamento devolvido (retorno aditivo `cancelamento_recusado` em POST /pedidos/{uuid}/retorno; só estado do Conector, não vira StatusRetornoErp nem entra em retorno_erp@1) | dono: integracao. Já está em manifest.publica. Também: o OpenAPI publicado foi regenerado (docs/openapi-hub-v1.json).

## Pronto quando
Linha no eventos.md. Dependências: migração 0047 pedida ao banco-dados (R-20261108-095741); os testes com Postgres (consumidores.db.test.ts) só rodam no CI depois dela.
