---
id: R-20261107-105144-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T10:51:44-04:00
---
# Revisão T-0089 I2: exemplos do Conector com as views-modelo, conector.md e teste de fila

## Contexto
Contexto: fatia I2 fechada.

## O que preciso / o que mudou
O que preciso: revisar apps/conector/exemplos/conector.exemplo.json (15 entidades, SELECT TOP (:limite) ... FROM dbo.vw_macuxi_<e>, 1 para 1 com o contrato) e conector.oracle.exemplo.json (3 entidades novas + cliente com prazo_medio_max_dias/formas_pagamento), apps/conector/test/exemplos-views-modelo.test.ts, o teste de fila em modules/integracao/domain/pagamento-hub.test.ts e docs/modulos/integracao/conector.md (premissa v1: nulo não limpa; '[]' limpa formas; 365 = sem teto).

## Pronto quando
Pronto quando: sem 🔴.
