---
id: R-20261101-234952-2-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0043
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T23:49:52+00:00
---
# T-0043: 7 avisos de hora fixa nos testes do Core (aviso até 2026-11-16)

# T-0043: 7 avisos de hora fixa nos testes do Core (regra nova, aviso até 2026-11-16)

## Contexto
A T-0043 (frente nuvem) criou o relógio de teste `@macuxi/comum/relogio` e a regra `macuxi/hora-fixa-em-teste` (ADR 0015): acusa instante fixo e relógio real misturados no mesmo arquivo de teste. Complementa a varredura R-20261101-180012 (C1–C5) e a T-0042.

## O que preciso / o que mudou
Avisos (7):
- `modules/core/api/consumidores.db.test.ts:29` [agoraFixo] `const agora = new Date('2030-03-01T12:00:00.000Z')` e `:83` [sqlRelogio] `lida_em = now()` → o teste compara `lida_em` gravado pelo banco com um "agora" de 2030: use `const relogio = await relogioDoBanco(c)` e derive o "agora" dele, ou grave `lida_em = $2` com `relogio.agora()` de `criarRelogio({ agora: '2030-03-01T12:00:00Z' })`.
- `modules/core/api/notificacoes.db.test.ts:42` [relogioReal] `agora: () => new Date()` e `:52` `ate: new Date(Date.now() + 60_000)` → `const relogio = criarRelogio()`; `agora: () => relogio.agora()` e `ate: relogio.relativo({ minutos: 1 }).toISOString()` (ou `relogioDoBanco` se o pull compara com `updated_at = now()`).
- `modules/core/api/autenticacao.test.ts:235, :237, :240` [relogioReal] `new Date()` como `expira_em`/argumento do repositório → `criarRelogio({ agora: <o mesmo instante fixo do arquivo> }).agora()`; se o valor é irrelevante para o caso, `// hora-fixa-ok: instante irrelevante (erro de dispositivo)`.
- Para os testes da C6 (T-0042: 21:00 e 23:59 de Manaus, tenant em São Paulo): `criarRelogio({ agora: instanteNoFuso('2026-11-03', '23:59') })` e `criarRelogio({ agora: ..., fuso: 'America/Sao_Paulo' })`, injetando `ctx.agora = () => relogio.agora()`.

**Como corrigir (vale para todos):** `import { criarRelogio, relogioDoBanco } from '@macuxi/comum/relogio'` (com `nodeLinker: hoisted` já resolve; declare `"@macuxi/comum": "workspace:*"` no seu package.json se ainda não tiver). Escolha UMA linha do tempo por arquivo:
- **do teste**: `const relogio = criarRelogio()` (MACUXI_AGORA ou o relógio real, congelado uma vez) e use `relogio.agora()`, `relogio.relativo({ dias: -31 })`, `relogio.instante({ dias: -1, hora: '23:59' })`, `relogio.hoje()`; o instante vai como parâmetro no SQL no lugar de `now()`.
- **do banco**: `const relogio = await relogioDoBanco(cliente)` (`select now()`) quando o teste compara com colunas gravadas por `now()`/default.
- Uso legítimo (ex.: `deleted_at = now()` nunca comparado, nome único com `Date.now()`, medir duração): `// hora-fixa-ok: <motivo>` na linha ou na de cima.
A regra `macuxi/hora-fixa-em-teste` é AVISO hoje (lint verde) e a proposta é virar ERRO em **2026-11-16**. Padrão e exemplos: `docs/decisoes/0015-relogio-de-teste-e-lint-de-hora-fixa.md`. Lista na sua máquina: `pnpm lint 2>&1 | grep hora-fixa`.

## Pronto quando
`pnpm --filter @macuxi/core lint` sem aviso `macuxi/hora-fixa-em-teste` antes de 2026-11-16.
