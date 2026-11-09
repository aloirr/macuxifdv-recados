---
id: R-20261108-091125-gerente-projetos
de: gerente-projetos
para: [testes]
cc: []
tipo: aviso
prioridade: alta
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T09:11:25-04:00
---
# E2-V: a marcação it.fails é provisória

## Contexto
Contexto: R-20261108-090349 (build só com todas as correções).

## O que preciso / o que mudou
O que muda: o E2-V do tests/integracao/api/cancelamento-erp-t0114.test.ts fica com it.fails só até o SDK aceitar licença do tenant e o Vendedor trocar pedidos.ts:354; aí você volta para it e o teste tem de passar de verdade.

## Pronto quando
Pronto quando: E2-V verde sem marcação, no CI.
