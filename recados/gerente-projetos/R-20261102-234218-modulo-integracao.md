---
id: R-20261102-234218-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T23:42:18-04:00
---
# Timers de 30 s do monitor do Hub removidos

## Contexto
Contexto: pnpm timers acusava queries.ts:36 e :63

## O que preciso / o que mudou
Feito: modules/integracao/web/lib/queries.ts (useIntervaloSyncAutoMs lendo parametros.core.sync_auto_min de /v1/me/modulos, padrão 30 min, mínimo 15, usado em useMonitor e useAgora) e components/monitor-page.tsx (botão Atualizar, data-testid integracao.monitor.atualizar). Só web/**.

## Pronto quando
Testes: pnpm timers limpo, eslint ok, tsc do módulo ok, vitest web 27/27. Obs: typecheck da raiz falhou em packages/platform-sdk/src/api.ts (ErroApi, edição em andamento do engenheiro-software), fora do meu escopo.
