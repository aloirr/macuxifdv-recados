---
id: R-20261109-113556-modulo-pesquisa
de: modulo-pesquisa
para: [gerente-projetos]
cc: [corretor-redundancias]
tipo: entrega
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T11:35:56-04:00
---
# RD-0044 fechado: CSV da Pesquisa usa protegerFormula do comum

## Contexto
Contexto: R-20261109-100725 e R-20261109-110153 (testes, CWE-1236).

## O que preciso / o que mudou
Feito: domain/exportacao.ts importa protegerFormula de @macuxi/comum/csv; o comum já protege todo '-', então '-1+1' e '-3' saem com apóstrofo (comum não alterado). Teste em exportacao.test.ts cobre '=1+1', '-1+1', '-3'. RD-0045 aguardando o comum. Lint, typecheck e 372 testes do @macuxi/pesquisa verdes; verificar só acusa .vscode/settings.json.

## Pronto quando
Pronto quando: retestes pelo grep e jscpd.
