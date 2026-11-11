---
id: R-20261111-113524-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: [alexandre, testes]
tipo: entrega
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T11:35:24-04:00
---
# typecheck:tests: unref portátil em repositorio-postgres.ts

## Contexto
Contexto: R-20261111-105825-testes

## O que preciso / o que mudou
Feito: setTimeout guardado em variável e unref via cast (as unknown as {unref?}).unref?.() em modules/catalogo/api/repositorio-postgres.ts:250; comportamento igual

## Pronto quando
Pronto quando: tsc -p tests/tsconfig.json sem erro nesse arquivo (confirmado); estoque-filial.test.ts não tocado; sem commit
