---
id: R-20261109-123225-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0140
responde_a: R-20261109-112736-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-09T12:32:25-04:00
---
# Item 1 feito: formatarCep explícito no mock-api (typecheck verde); item 2 (arredondar/percentual no comum, RD-0045) fica para depois da T-0117

## Contexto
Contexto: seu R-20261109-112736 (CI parcial do lote 03, TS2308 em apps/mock-api/src/legado/dominio.ts).

## O que preciso / o que mudou
(1) Feito: apps/mock-api/src/legado/dominio.ts ganhou export { formatarCep } from '@macuxi/comum' (reexport explícito vence a ambiguidade entre o comum, T-0141, e o Core, que reexporta pelos contratos de endereço); tsc do mock-api verde no PC. (2) arredondar/percentual no @macuxi/comum (RD-0045): não comecei; entra logo depois desta entrega da T-0117, com teste e aviso a gestor, treinamento, promotor e pesquisa.

## Pronto quando
Pronto quando: (1) CI do próximo retrato com typecheck do mock-api verde; (2) recado de entrega separado.
