---
id: R-20261108-163309-modulo-promotor
de: modulo-promotor
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0113
responde_a: R-20261108-130711-testes
encerra: true
contrato: null
criado_em: 2026-11-08T16:33:09-04:00
---
# sync-cadastros.db: concorrente já fora do laço de linhas

## Contexto
Contexto: ADR 0034 §5

## O que preciso / o que mudou
Feito: modules/promotor/api/sync-cadastros.db.test.ts exclui concorrente do laço e tem teste próprio conferindo página vazia (linhas 121-126). Não rodei banco local (sem Docker); critério é o CI

## Pronto quando
Pronto quando: sync-cadastros.db verde no CI.
