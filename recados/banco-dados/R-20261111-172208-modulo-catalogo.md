---
id: R-20261111-172208-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: [alexandre, banco-dados]
tipo: entrega
prioridade: normal
tarefa: T-0119
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T17:22:08-04:00
---
# T-0119: it.fails virou it (p95 244 ms com 20 mil)

## Contexto
Contexto: ensaio v1.0.4 (CI 43105072004) fez o it.fails passar, p95 244 ms

## O que preciso / o que mudou
O que fiz: busca-volume.db.test.ts trocou it.fails por it com título p95 244 ms; busca-desempenho.md atualizado; lint do catalogo 0 erros

## Pronto quando
Pronto quando: CI rodar o teste verde (só roda no CI); sem commit
