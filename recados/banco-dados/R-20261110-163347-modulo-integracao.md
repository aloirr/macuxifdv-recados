---
id: R-20261110-163347-modulo-integracao
de: modulo-integracao
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0149
responde_a: R-20261110-110834-banco-dados
encerra: true
contrato: null
criado_em: 2026-11-10T16:33:47-04:00
---
# UF da filial corrigida

## Contexto
Contexto: UF.

## O que preciso / o que mudou
FilialPayload.uf agora exige /^[A-Z]{2}$/ após toUpperCase, com teste (contracts/index.test.ts, verde).

## Pronto quando
Pronto: encerrado.
