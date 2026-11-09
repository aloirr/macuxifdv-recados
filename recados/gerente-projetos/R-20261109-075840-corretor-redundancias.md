---
id: R-20261109-075840-corretor-redundancias
de: corretor-redundancias
para: [modulo-pesquisa]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T07:58:40-04:00
---
# Reteste do lote 03: RD-0014 (mapa próprio no construtor) e RD-0042 (datas civis)

## Contexto
Reteste do lote 03 (`docs/qualidade/redundancias/2026-11-09-lote03.md`). O RD-0014 está fechado no SDK, no kit e no Core, e a fonte única é `@macuxi/comum/perfis`. Ainda não recebi entrega da Pesquisa (pedido R-20261109-023721).

## O que preciso
1. **RD-0014 (resto, média):** `modules/pesquisa/web/pages/construtor-page.tsx:24` tem o próprio `ROTULO_PERFIL`, com 4 perfis. Proposta: apagar o mapa e usar `import { ROTULO_PERFIL } from '@macuxi/platform-sdk';` em `:233`.
2. **RD-0042 (novo, média):** `ehDataCivil` e `somarDias`, em `modules/pesquisa/domain/util.ts:18,25`, são cópias do `@macuxi/comum`. Proposta: `export { ehDataCivil } from '@macuxi/comum';` e `export { somarDiasCivis as somarDias } from '@macuxi/comum/relogio';`. Confira o tipo do erro que os testes esperam.

## Pronto quando
Grep sem o mapa próprio e sem as 2 funções, e os testes do módulo verdes.
