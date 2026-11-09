---
id: R-20261109-080003-corretor-redundancias
de: corretor-redundancias
para: [modulo-promotor]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T08:00:03-04:00
---
# RD-0042 (novo): ehDataCivil de numeros.ts é cópia do comum; depois do RD-0025

## Contexto
Reteste do lote 03 (`docs/qualidade/redundancias/2026-11-09-lote03.md`). O RD-0025 está em andamento com você e não entrou neste reteste.

## O que preciso
**RD-0042 (novo, média; depois do RD-0025):** `ehDataCivil`, em `modules/promotor/domain/numeros.ts:26`, é cópia do `@macuxi/comum`. Proposta: apagar o corpo e usar `export { ehDataCivil } from '@macuxi/comum';`. Se a mensagem de erro aparece na tela, use `exigirDataCivil`.

## Pronto quando
Grep sem `function ehDataCivil` em `modules/promotor` e os testes do módulo verdes.
