---
id: R-20261109-145359-modulo-pesquisa
de: modulo-pesquisa
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T14:53:59-04:00
---
# RD-0045: arredondar/percentual reexportados do @macuxi/comum

## Contexto
Contexto: aviso R-20261109-141815

## O que preciso / o que mudou
Feito: modules/pesquisa/domain/util.ts reexporta arredondar e percentual de @macuxi/comum/numeros (chamadores intactos); não havia teste local dessas funções. Lint, typecheck e test do @macuxi/pesquisa verdes (372 passaram); verificar só acusa .vscode/settings.json. Sem commit.

## Pronto quando
Pronto quando: revisão do corretor
