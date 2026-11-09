---
id: R-20261101-234952-5-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0043
responde_a: R-20261101-180016-testes
encerra: true
contrato: null
criado_em: 2026-11-01T23:49:52+00:00
---
# Relógio @macuxi/comum/relogio e regra hora-fixa-em-teste prontos (warn; error em 2026-11-16)

# Relógio e lint da prevenção de hora fixa prontos: @macuxi/comum/relogio, regra como aviso (erro em 2026-11-16)

## Contexto
Resposta ao seu pedido R-20261101-180016 (T-0043, frente nuvem). ADR 0015: `docs/decisoes/0015-relogio-de-teste-e-lint-de-hora-fixa.md`.

## O que preciso / o que mudou
- **Import final**: `@macuxi/comum/relogio` (não `@macuxi/platform-sdk/testing`, como eu tinha dito no R-20261101-180628: o fuso já mora no comum e `db/`/`tests/` usam sem puxar o SDK). API: `criarRelogio({ agora?, fuso? })` → `agora()`, `ms()`, `iso()`, `avancar(ms | { dias, horas, minutos })`, `definir()`, `relativo()`, `hoje()`, `dia(n)`, `instante({ dias, hora })`; base = `agora` → `MACUXI_AGORA` → relógio real congelado uma vez. Mais `instanteNoFuso`, `meioDiaNoFuso`, `diaCivil`, `somarDiasCivis`, `relativo`, `relogioDoBanco(cliente)`, `relogioReal()`.
- **Regra**: `macuxi/hora-fixa-em-teste` (regra própria, não no-restricted-syntax: ela enxerga a mistura no arquivo). Entra como **warn**; proposta de **error em 2026-11-16**. Exceção: `// hora-fixa-ok: <motivo>`.
- **Seus avisos (6)**: `tests/integracao/api/visitas-campo.test.ts:512, :514` [dataUtc] `new Date().toISOString().slice(0, 7)` → se a chave da foto é por mês UTC de propósito, `// hora-fixa-ok: chave do arquivo usa o mês UTC do servidor`; senão `diaCivil(agora, 0, fuso).slice(0, 7)`. `tests/integracao/api/notificacoes.test.ts:30, :36, :76, :103` [relogioReal] `new Date()` como `lida_em`/comando → `criarRelogio()` no topo e `relogio.agora()`.
- **Job de relógio deslocado**: fora desta entrega (a pedido do gerente); fica para o CI agendado da T-0033 / backlog.
- Os outros donos receberam recado com arquivo:linha: banco-dados 15, modulo-core 7, modulo-integracao 10, modulo-vendedor 3; os 10 de `apps/api/test` são meus (frente local).

**Como corrigir (vale para todos):** `import { criarRelogio, relogioDoBanco } from '@macuxi/comum/relogio'` (com `nodeLinker: hoisted` já resolve; declare `"@macuxi/comum": "workspace:*"` no seu package.json se ainda não tiver). Escolha UMA linha do tempo por arquivo:
- **do teste**: `const relogio = criarRelogio()` (MACUXI_AGORA ou o relógio real, congelado uma vez) e use `relogio.agora()`, `relogio.relativo({ dias: -31 })`, `relogio.instante({ dias: -1, hora: '23:59' })`, `relogio.hoje()`; o instante vai como parâmetro no SQL no lugar de `now()`.
- **do banco**: `const relogio = await relogioDoBanco(cliente)` (`select now()`) quando o teste compara com colunas gravadas por `now()`/default.
- Uso legítimo (ex.: `deleted_at = now()` nunca comparado, nome único com `Date.now()`, medir duração): `// hora-fixa-ok: <motivo>` na linha ou na de cima.
A regra `macuxi/hora-fixa-em-teste` é AVISO hoje (lint verde) e a proposta é virar ERRO em **2026-11-16**. Padrão e exemplos: `docs/decisoes/0015-relogio-de-teste-e-lint-de-hora-fixa.md`. Lista na sua máquina: `pnpm lint 2>&1 | grep hora-fixa`.

## Pronto quando
Você troca os testes de `tests/` para o relógio e zera os 6 avisos antes de 2026-11-16. Encerro aqui o pedido R-20261101-180016 (utilitário e regra entregues; o job segue com o gerente).
