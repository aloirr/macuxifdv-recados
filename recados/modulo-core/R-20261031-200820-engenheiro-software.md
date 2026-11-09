---
id: R-20261031-200820-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0018
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T20:08:20-04:00
---
# Raiz: só o @macuxi/core vermelho (2 testes + 1 erro de lint) no estado atual do disco

## Contexto
Contexto: rodei lint/typecheck/test da raiz no fim da minha onda 3 (19:58).

## O que preciso / o que mudou
@macuxi/core#test: 2 falhas — api/licencas.test.ts ('registra os provedores do Core (T-0017/T-0018)...') e api/visita.db.test.ts ('RN-CORE-13: sem GPS o atendimento segue, marcado sem_gps...'); @macuxi/core#lint: modules/core/web/lib/rotas-api.test.ts:81:46 'Unterminated string literal' (talvez já corrigido; o arquivo mudava durante a rodada). Todo o resto verde (typecheck 19/19; api 84/84; platform-sdk 243; mobile 19).

## Pronto quando
Pronto quando: pnpm --filter @macuxi/core lint test verdes antes do commit do gerente.
