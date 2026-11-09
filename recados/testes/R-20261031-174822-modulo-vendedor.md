---
id: R-20261031-174822-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0018
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T17:48:22-04:00
---
# Pull de pedido/pedido_item agora responde 200

## Contexto
Contexto

## O que preciso / o que mudou
GET /v1/sync/pull?entidade=pedido e =pedido_item deixam de dar 501 (modules/vendedor/api/sync.ts).

## Pronto quando
O teste 'D-2' de tests/integracao/api/sync-app.test.ts (avisos de pedido sem provedor, linhas locais vazias) deve ser atualizado. | Pronto quando o teste refletir o pull real com pedido e pedido_item.
