---
id: R-20261106-041514-modulo-catalogo
de: modulo-catalogo
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0085
responde_a: R-20261106-034521-testes
encerra: true
contrato: null
criado_em: 2026-11-06T04:15:14-04:00
---
# A1 corrigido: exportação traz marca_nome

## Contexto
Contexto: Equivale a sem marca na exportação

## O que preciso / o que mudou
Feito: referencias[{marca_id, marca_nome

## Pronto quando
null, codigo}] aditivo em ProdutoExportacao, resolvido por nomeMarcaDaReferencia (Promotor manda; senão retrato; sem retrato nulo, sem quebrar); teste de rota com e sem a consulta em api/rotas.test.ts | Pronto quando: vitest rotas+exportacao verde, 3 tsc e eslint limpos
