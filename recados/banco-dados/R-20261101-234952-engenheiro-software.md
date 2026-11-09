---
id: R-20261101-234952-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0043
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T23:49:52+00:00
---
# T-0043: 15 avisos de hora fixa no db/testes (aviso até 2026-11-16)

# T-0043: 15 avisos de hora fixa no db/testes (regra nova, aviso até 2026-11-16)

## Contexto
A T-0043 (frente nuvem, branch nuvem/T-0043-relogio-e-lint) criou o relógio de teste `@macuxi/comum/relogio` e a regra de lint `macuxi/hora-fixa-em-teste` (ADR 0015). Ela acusa instante fixo e relógio real misturados no mesmo arquivo de teste. Varredura de origem: R-20261101-180014 (B1–B4) e T-0042.

## O que preciso / o que mudou
Avisos no db/testes (15):
- `db/testes/seed-demo.test.ts:25` [agoraFixo] `const hoje = '2026-11-04'` → é o B1 (reprova em 2027-03-10). Troque por `criarRelogio().hoje()` ou, se a seed usa `current_date`, por `(await relogioDoBanco(c)).hoje()`.
- `db/testes/seed-demo.test.ts:341` [sqlRelogio] `bloqueio_ate = now() + interval '1 hour'` → se nada compara com instante fixo: `// hora-fixa-ok: bloqueio relativo ao now() do banco`.
- `db/testes/sessao.test.ts:80` [sqlRelogio, 7 now() no arquivo] e `:219, :220, :228, :231, :244, :255` [relogioReal] `new Date()` passado ao repositório → `const relogio = await relogioDoBanco(c)` no início e `relogio.agora()` nas chamadas; os instantes fixos de 207–225 (expira_em/revogado_em) passam a ser `relogio.relativo({ dias: 30 })` etc.
- `db/testes/sprint1.test.ts:111` e `db/testes/t0029.test.ts:125` [sqlRelogio] `deleted_at = now()` → `// hora-fixa-ok: soft delete, nunca comparado`.
- `db/testes/t0032.test.ts:70` [sqlRelogio] `deleted_at = now()` → hora-fixa-ok; `:403, :404, :407` [relogioReal] `new Date(Date.now() - 31 * 86_400_000)` → a retenção é calculada pelo now() do banco: `const relogio = await relogioDoBanco(c); relogio.relativo({ dias: -31 })` (B2).
- Sugestão (T-0043 item banco): `@macuxi/db/teste` reexportar `criarRelogio`/`relogioDoBanco` e `agoraDosTestes` delegar a `criarRelogio().agora()` (mesma variável MACUXI_AGORA), para não haver dois utilitários.

**Como corrigir (vale para todos):** `import { criarRelogio, relogioDoBanco } from '@macuxi/comum/relogio'` (com `nodeLinker: hoisted` já resolve; declare `"@macuxi/comum": "workspace:*"` no seu package.json se ainda não tiver). Escolha UMA linha do tempo por arquivo:
- **do teste**: `const relogio = criarRelogio()` (MACUXI_AGORA ou o relógio real, congelado uma vez) e use `relogio.agora()`, `relogio.relativo({ dias: -31 })`, `relogio.instante({ dias: -1, hora: '23:59' })`, `relogio.hoje()`; o instante vai como parâmetro no SQL no lugar de `now()`.
- **do banco**: `const relogio = await relogioDoBanco(cliente)` (`select now()`) quando o teste compara com colunas gravadas por `now()`/default.
- Uso legítimo (ex.: `deleted_at = now()` nunca comparado, nome único com `Date.now()`, medir duração): `// hora-fixa-ok: <motivo>` na linha ou na de cima.
A regra `macuxi/hora-fixa-em-teste` é AVISO hoje (lint verde) e a proposta é virar ERRO em **2026-11-16**. Padrão e exemplos: `docs/decisoes/0015-relogio-de-teste-e-lint-de-hora-fixa.md`. Lista na sua máquina: `pnpm lint 2>&1 | grep hora-fixa`.

## Pronto quando
`pnpm --filter @macuxi/db lint` sem aviso `macuxi/hora-fixa-em-teste` (corrigido ou com hora-fixa-ok e motivo) antes de 2026-11-16.
