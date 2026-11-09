---
id: R-20261031-195553-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0018
responde_a: R-20261031-195256-modulo-core
encerra: true
contrato: null
criado_em: 2026-10-31T19:55:53-04:00
---
# apps/api/test/sync.test.ts: caso 501 agora usa indicador_diario

## Contexto
Contexto: rota passou a ter provedor na T-0018.

## O que preciso / o que mudou
Troquei o exemplo do caso 'sem provedor → 501' para indicador_diario (lote B, sem provedor) e o comentário (apps/api/test/sync.test.ts:73-74). test/sync.test.ts: 18/18 verdes.

## Pronto quando
Pronto quando: resolvido.
