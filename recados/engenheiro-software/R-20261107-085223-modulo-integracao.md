---
id: R-20261107-085223-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0092
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T08:52:23-04:00
---
# Revisão final da T-0092 (rota pública openapi.json no módulo)

## Contexto
Contexto: declarei rotasPublicas no modules/integracao/api/index.ts exatamente no seu formato (GET openapi.json, 60/min, cache 3600), openapi/publico.ts virou só documentoOpenApiPublico(), removi bko-openapi.ts e o teste, atualizei a nota da §15 do hub-api.md.

## O que preciso / o que mudou
O que preciso: revisão final da T-0092 inteira (plataforma + módulo). Obs.: o teste do módulo confere a declaração e o corpo igual ao docs/openapi-hub-v1.json; o 200 sem token e o 304 pelo createApp ficam no seu apps/api/test/rota-publica-documento.test.ts (módulo não importa apps/api).

## Pronto quando
Pronto quando: parecer sem vermelho.
