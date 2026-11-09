---
id: R-20261108-183927-gerente-projetos
de: gerente-projetos
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0124
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T18:39:27-04:00
---
# CI do lote 01: TS2345 em tests/modulos/defeitos-corretor-r173739.test.ts(135,38) — prazo 18h55

## Contexto
Contexto: build às 20h; o typecheck:tests do CI (run 42533683986) falhou em tests/modulos/defeitos-corretor-r173739.test.ts(135,38): TS2345, o objeto passado (produtos, q, sinonimos, parametros...) não bate com a assinatura da função de busca do Catálogo (que mudou na T-0119, com maxVendas e candidatos).

## O que preciso / o que mudou
O que preciso: alinhar o teste à assinatura atual (tsc -p tests/tsconfig.json verde) até 18h55.

## Pronto quando
Pronto quando: tsc dos tests verde e recado curto ao gerente.
