---
id: R-20261111-111535-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T11:15:35-04:00
---
# tsc do catalogo fechou com 0 erros

## Contexto
Contexto: erro em domain/estoque-filial.test.ts

## O que preciso / o que mudou
Feito: helper dep() aceitava filial_id string, mas o teste passa null (legado); tipo agora string

## Pronto quando
null. Regra intacta; nenhum outro arquivo tocado | Pronto quando: tsc -p modules/catalogo/tsconfig.json sem erros
