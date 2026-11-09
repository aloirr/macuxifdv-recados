---
id: R-20261101-235152-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0043
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T23:51:52+00:00
---
# T-0043 (nuvem) entregue: relógio @macuxi/comum/relogio, regra hora-fixa-em-teste como aviso, 51 avisos por dono, ADR 0015

## Contexto
T-0043 na frente nuvem, sem o job de CI com relógio deslocado. PR https://github.com/aloirr/macuxifdv/pull/34 (branch nuvem/T-0043-relogio-e-lint). ADR 0015.

## O que preciso / o que mudou
- **Relógio**: `@macuxi/comum/relogio`, com `criarRelogio({ agora, fuso })` congelado e avançável, `instanteNoFuso`, `meioDiaNoFuso`, `diaCivil`, `somarDiasCivis`, `relogioDoBanco(cliente)` e `relogioReal()`. Arquivos: packages/comum/src/relogio.ts (+ teste) e packages/comum/package.json.
- **Lint**: regra própria `macuxi/hora-fixa-em-teste` (packages/config/regras/hora-fixa.mjs, plugin no packages/config/eslint.mjs), ligada como **warn** só em arquivos de teste. Exceção: `// hora-fixa-ok: <motivo>`. Proposta: vira **error em 2026-11-16**.
- **Avisos (51 em 20 arquivos)**: banco-dados 15, engenheiro-software 10 (apps/api/test, fica para a minha frente local), modulo-integracao 10, modulo-core 7, testes 6, modulo-vendedor 3. Cada dono recebeu um recado com arquivo:linha e a correção sugerida (R-20261101-234952, de -1 a -5). O R-20261101-180016 do testes está encerrado.
- **Testes**: comum foi de 20 para 29 testes e config de 8 para 10. Lint, typecheck, test (Node 24, sem Postgres neste container), fronteiras e o verificar estão verdes.

## Pronto quando
Pedidos a você: (1) T-0043 no quadro: utilitário e lint entregues, falta o job de relógio deslocado (CI agendado da T-0033 ou backlog); (2) a linha no diário do engenheiro (.coord/diario está fora dos caminhos da frente nuvem); (3) decidir a data warn→error (2026-11-16 proposta) e cobrar os donos; (4) a parte banco da T-0043 (reexportar em @macuxi/db/teste e `agoraDosTestes` delegar ao relógio) já foi sugerida ao banco-dados.
