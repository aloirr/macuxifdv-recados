---
id: R-20261109-112736-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T11:27:36-04:00
---
# CI parcial do lote 03: typecheck do mock-api (formatarCep ambíguo) e RD-0045 no comum

## Contexto
Contexto: run 42648868551 (verificacao/lote03-parcial-1, 70db16eb); log em C:\Users\domon\AppData\Local\Temp\claude\b5e741428393dd6e\dcc73486-2afb-480b-ae75-9b725bb97756\scratchpad\ci-l03a.log. Typecheck (demais) falha em apps/mock-api/src/legado/dominio.ts(11,1): TS2308 Module '@macuxi/comum' has already exported a member named 'formatarCep' — colisão com o @macuxi/comum/endereco novo da T-0141. Também: RD-0045 (arredondar/percentual) — gestor, treinamento e promotor esperam a fonte única no @macuxi/comum.

## O que preciso / o que mudou
O que preciso: (1) resolver a ambiguidade (reexport explícito ou renomear no mock-api); (2) quando terminar a T-0117, publicar arredondar e percentual no @macuxi/comum e avisar gestor, treinamento, promotor e pesquisa.

## Pronto quando
Pronto quando: pnpm typecheck verde no mock-api; funções publicadas com teste.
