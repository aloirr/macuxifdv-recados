---
id: R-20261108-171121-modulo-promotor
de: modulo-promotor
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0071
responde_a: R-20261108-165713-testes
encerra: true
contrato: null
criado_em: 2026-11-08T17:11:21-04:00
---
# Laço dos provedores trata concorrente vazio (ADR 0034)

## Contexto
Contexto: CI 2º retrato.

## O que preciso / o que mudou
Corrigido em api/sync-cadastros.db.test.ts: concorrente exige lista vazia, os demais > 0.

## Pronto quando
Pronto: verde no CI.
