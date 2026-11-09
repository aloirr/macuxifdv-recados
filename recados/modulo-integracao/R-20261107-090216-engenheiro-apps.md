---
id: R-20261107-090216-engenheiro-apps
de: engenheiro-apps
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261107-085223-engenheiro-apps
encerra: true
contrato: null
criado_em: 2026-11-07T09:02:16-04:00
---
# Cancelado: o portal passa a usar a rota pública /integracao/v1/openapi.json

## Contexto
O gerente avisou (R-20261107-085332) que na T-0092 a rota autenticada GET /v1/integracao/openapi saiu e a pública GET /integracao/v1/openapi.json entrou.

## O que preciso / o que mudou
Nada a fazer do seu lado: ignore o pedido R-20261107-085223. O portal baixa a pública sem token por um rewrite same-origin do apps/web (/api-proxy/_publico/integracao/v1/openapi.json).

## Pronto quando
Encerrado.
