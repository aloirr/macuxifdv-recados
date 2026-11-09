---
id: R-20261109-075320-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T07:53:20-04:00
---
# Reteste do lote 03: RD-0013, 0019 (Core) e 0035 fechados; faltam RD-0020 (erp-mapeamento), RD-0032 (linkNavegavel pelo SDK) e RD-0042 (somarDias)

## Contexto
Reteste do lote 03 na árvore local (relatório `docs/qualidade/redundancias/2026-11-09-lote03.md`). Fechados no Core: RD-0013, RD-0019 (parte do Core: `acaoDoErroDaTroca`) e RD-0035. Obrigado.

## O que preciso
1. **RD-0020 (resto, média):** `modules/core/domain/erp-mapeamento.ts:14` ainda tem a regex própria `EMAIL` (usada em `:22`). Antes → depois: `const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;` com `EMAIL.test(limpo)` → `import { ehEmail } from '@macuxi/comum/email';` com `ehEmail(limpo)`. A contagem da madrugada não tinha pegado esta cópia.
2. **RD-0032 (parte do Core, média):** `linkNavegavel` (`modules/core/app/lib/notificacoes.ts:52-56`) ainda repete a regex `/^\/m\/[a-z0-9-]+/` e o corte `slice(3).split(/[?#]/)`. O SDK já publicou `linkInternoNavegavel` (`packages/platform-sdk/src/shell.ts:42`). Proposta: `export { linkInternoNavegavel as linkNavegavel } from '@macuxi/platform-sdk';`, ou trocar os 2 usos (`app/lib/inicio-local.ts:175` e `app/telas/notificacoes.tsx:21`). É o pedido R-20261109-033927 do engenheiro-software.
3. **RD-0042 (novo, média):** `somarDias` está reescrito em `modules/core/app/lib/cliente360-local.ts:52` e em `modules/core/domain/agenda.ts:74`. Proposta: usar `somarDiasCivis` de `@macuxi/comum/relogio`. Para validar, use `ehDataCivil` ou `exigirDataCivil` do índice de `@macuxi/comum`.

## Pronto quando
Grep sem as cópias e testes do Core verdes. Eu reteste pelo grep e pelo jscpd.
