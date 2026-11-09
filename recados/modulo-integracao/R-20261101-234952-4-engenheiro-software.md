---
id: R-20261101-234952-4-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0043
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T23:49:52+00:00
---
# T-0043: 10 avisos de hora fixa nos testes do Conector (aviso até 2026-11-16)

# T-0043: 10 avisos de hora fixa nos testes do Conector (regra nova, aviso até 2026-11-16)

## Contexto
A T-0043 (frente nuvem) criou o relógio de teste `@macuxi/comum/relogio` e a regra `macuxi/hora-fixa-em-teste` (ADR 0015): acusa instante fixo e relógio real misturados no mesmo arquivo de teste. A varredura do testes não achou risco no Conector; quase todos aqui são relógio real como "enchimento" ao lado de fixtures fixas.

## O que preciso / o que mudou
Avisos em `apps/conector/test` (10):
- `atualizacao.test.ts:148` [relogioReal] `guardarPolitica(store, ..., Date.now())` → `relogio.ms()` de `criarRelogio()`, ou hora-fixa-ok se o instante não importa.
- `integracao.pg.test.ts:61` [sqlRelogio] `SCHEMA_ERP`/`:231` `alterado_em = now() at time zone 'utc'` → o delta do ERP compara `alterado_em` com o cursor: derive o cursor de `relogioDoBanco(admin)` ou marque hora-fixa-ok com o motivo; `:79` `Date.now().toString(36)` no nome do banco → `// hora-fixa-ok: só nome único`; `:309, :343, :344` [relogioReal] `Date.now()` no store → `relogio.ms()`.
- `mapeamento.test.ts:64` e `oracle.test.ts:182` [relogioReal] `alterado_em: new Date()` em linha de fixture → um instante fixo como os vizinhos (`new Date('2026-03-01T10:00:00Z')`).
- `segredos-log.test.ts:119` [relogioReal, 2] `utimesSync(..., new Date(), new Date())` → `// hora-fixa-ok: mtime do arquivo de log (retenção pelo relógio real)` ou um relógio injetado na rotação, se ela aceitar.

**Como corrigir (vale para todos):** `import { criarRelogio, relogioDoBanco } from '@macuxi/comum/relogio'` (com `nodeLinker: hoisted` já resolve; declare `"@macuxi/comum": "workspace:*"` no seu package.json se ainda não tiver). Escolha UMA linha do tempo por arquivo:
- **do teste**: `const relogio = criarRelogio()` (MACUXI_AGORA ou o relógio real, congelado uma vez) e use `relogio.agora()`, `relogio.relativo({ dias: -31 })`, `relogio.instante({ dias: -1, hora: '23:59' })`, `relogio.hoje()`; o instante vai como parâmetro no SQL no lugar de `now()`.
- **do banco**: `const relogio = await relogioDoBanco(cliente)` (`select now()`) quando o teste compara com colunas gravadas por `now()`/default.
- Uso legítimo (ex.: `deleted_at = now()` nunca comparado, nome único com `Date.now()`, medir duração): `// hora-fixa-ok: <motivo>` na linha ou na de cima.
A regra `macuxi/hora-fixa-em-teste` é AVISO hoje (lint verde) e a proposta é virar ERRO em **2026-11-16**. Padrão e exemplos: `docs/decisoes/0015-relogio-de-teste-e-lint-de-hora-fixa.md`. Lista na sua máquina: `pnpm lint 2>&1 | grep hora-fixa`.

## Pronto quando
`pnpm --filter @macuxi/conector lint` sem aviso `macuxi/hora-fixa-em-teste` antes de 2026-11-16.
