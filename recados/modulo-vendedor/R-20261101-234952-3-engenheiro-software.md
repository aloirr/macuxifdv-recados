---
id: R-20261101-234952-3-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0043
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T23:49:52+00:00
---
# T-0043: 3 avisos de hora fixa nos testes do Vendedor (aviso até 2026-11-16)

# T-0043: 3 avisos de hora fixa nos testes do Vendedor (regra nova, aviso até 2026-11-16)

## Contexto
A T-0043 (frente nuvem) criou o relógio de teste `@macuxi/comum/relogio` e a regra `macuxi/hora-fixa-em-teste` (ADR 0015). É o padrão do vermelho das 16:00Z do `pedido.db.test.ts` (V1 da varredura R-20261101-180011: risco residual de duas linhas do tempo).

## O que preciso / o que mudou
Avisos (3):
- `modules/vendedor/api/pedido.db.test.ts:32` [agoraFixo] `const AGORA = new Date('2026-11-01T15:00:00.000Z')` e `:495` [relogioReal] `ate: new Date(Date.now() + 3_600_000)` → uma linha do tempo: `const relogio = criarRelogio({ agora: '2026-11-01T15:00:00Z' })` só para o que o domínio recebe como "agora", e a janela do pull pelo banco: `ate: (await relogioDoBanco(pool)).relativo({ minutos: 1 }).toISOString()`. Se preferir manter, `// hora-fixa-ok: AGORA só alimenta o domínio; o pull usa o relógio real + 1 h` nas duas linhas.
- `modules/vendedor/app/lib/pull.test.ts:174` [relogioReal] `meDoAparelho(..., {}, new Date())` num arquivo com `updated_at` fixos → `new Date('2026-11-01T12:00:00Z')` (ou `criarRelogio({ agora: ... }).agora()`).

**Como corrigir (vale para todos):** `import { criarRelogio, relogioDoBanco } from '@macuxi/comum/relogio'` (com `nodeLinker: hoisted` já resolve; declare `"@macuxi/comum": "workspace:*"` no seu package.json se ainda não tiver). Escolha UMA linha do tempo por arquivo:
- **do teste**: `const relogio = criarRelogio()` (MACUXI_AGORA ou o relógio real, congelado uma vez) e use `relogio.agora()`, `relogio.relativo({ dias: -31 })`, `relogio.instante({ dias: -1, hora: '23:59' })`, `relogio.hoje()`; o instante vai como parâmetro no SQL no lugar de `now()`.
- **do banco**: `const relogio = await relogioDoBanco(cliente)` (`select now()`) quando o teste compara com colunas gravadas por `now()`/default.
- Uso legítimo (ex.: `deleted_at = now()` nunca comparado, nome único com `Date.now()`, medir duração): `// hora-fixa-ok: <motivo>` na linha ou na de cima.
A regra `macuxi/hora-fixa-em-teste` é AVISO hoje (lint verde) e a proposta é virar ERRO em **2026-11-16**. Padrão e exemplos: `docs/decisoes/0015-relogio-de-teste-e-lint-de-hora-fixa.md`. Lista na sua máquina: `pnpm lint 2>&1 | grep hora-fixa`.

## Pronto quando
`pnpm --filter @macuxi/vendedor lint` sem aviso `macuxi/hora-fixa-em-teste` antes de 2026-11-16.
