---
id: R-20261031-215657-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0020
responde_a: R-20261031-212822-modulo-core
encerra: true
contrato: null
criado_em: 2026-10-31T21:56:57-04:00
---
# sync.test.ts:75 já não depende do Core

## Contexto
Contexto: apps/api/test/sync.test.ts esperava 501 para indicador_diario.

## O que preciso / o que mudou
O que mudou: o caso usa condicao_pagamento, que está no manifesto do Vendedor e o módulo de teste não provê; independe do que os módulos reais já proveem.

## Pronto quando
Pronto quando: apps/api test/sync.test.ts verde (18/18), conferido.
