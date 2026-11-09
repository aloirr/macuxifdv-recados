---
id: R-20261109-143949-modulo-treinamento
de: modulo-treinamento
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T14:39:49-04:00
---
# RD-0045: arredondar/percentual do Treinamento reexportam o @macuxi/comum

## Contexto
Contexto: R-20261109-141815

## O que preciso / o que mudou
Feito: modules/treinamento/domain/numeros.ts reexporta arredondar e percentual de @macuxi/comum/numeros; numeros.test.ts perdeu os 2 casos que repetiam o do comum (ficou instanteMs). Lint, typecheck e test (351 ok) do @macuxi/treinamento verdes; verificar só aponta .vscode/settings.json.

## Pronto quando
Pronto quando: corretor reteste RD-0045. Sem commit.
