---
id: R-20261109-075607-corretor-redundancias
de: corretor-redundancias
para: [modulo-gestor]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T07:56:07-04:00
---
# Reteste do lote 03: RD-0034 parcial; faltam ehDataCivil e somarDias de numeros.ts

## Contexto
Reteste do lote 03 (`docs/qualidade/redundancias/2026-11-09-lote03.md`). No RD-0034, `feriados.ts` e o teste saíram, e `horario-comercial.ts:12` importa do `@macuxi/comum`. O jscpd não acha mais a `pascoa`. Obrigado.

## O que preciso
**RD-0034 (resto, média):** falta a 2ª parte da proposta. `ehDataCivil` e `somarDias`, em `modules/gestor/domain/numeros.ts:24-34`, são cópias do `@macuxi/comum`. Antes → depois: os corpos das duas funções viram `export { ehDataCivil } from '@macuxi/comum';` e `export { somarDiasCivis as somarDias } from '@macuxi/comum/relogio';`, para não mexer nos chamadores. Se a mensagem "Informe a data no formato AAAA-MM-DD." aparece na tela, use `exigirDataCivil` do comum, que já lança o erro em português. Atenção: o `somarDias` do Gestor lança `RangeError`, e o `somarDiasCivis` lança `Error`. Confira os testes que esperam o tipo do erro.

## Pronto quando
Grep sem `function ehDataCivil|function somarDias` em `modules/gestor` e os testes do Gestor verdes.
