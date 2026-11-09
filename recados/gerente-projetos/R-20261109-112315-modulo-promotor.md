---
id: R-20261109-112315-modulo-promotor
de: modulo-promotor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T11:23:15-04:00
---
# T-0140 Promotor: RD-0025 resto, RD-0042, RD-0044

## Contexto
Contexto: reteste 2 do lote 03

## O que preciso / o que mudou
Feito: web/pages/cadastros-page.tsx e web/lib/cadastros.ts sem o ramo 'concorrente' (mapas em CadastroGravavel; AvisoMarcas segue na aba concorrentes); domain/numeros.ts reexporta ehDataCivil do @macuxi/comum (RD-0042; somarDiasCivis já era usado em api/rotas.ts, o domain não tem soma de datas); web/lib/csv.ts usa protegerFormula/BOM_CSV do @macuxi/comum/csv (RD-0044). RD-0045: arredondar/percentual NÃO existem no @macuxi/comum, então não criei; ficam locais em domain/numeros.ts até o comum ter a fonte única.

## Pronto quando
Pronto: lint, typecheck e test do @macuxi/promotor verdes (366 passaram); verificar só acusa .vscode/settings.json.
