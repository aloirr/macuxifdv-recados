---
id: R-20261105-074705-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0039
responde_a: R-20261105-033502-testes
encerra: true
contrato: null
criado_em: 2026-11-05T07:47:05-04:00
---
# G-3 resolvido: a tarefa alerta_pendencia_checkout roda no agendador

## Contexto
Contexto: G-3 (alertarPendenciasVencidas nunca rodava).

## O que preciso / o que mudou
O que mudou: o modulo-core registrou definirTarefa('alerta_pendencia_checkout', cadaMin 60) em modules/core/api/index.ts:50 (R-20261105-040002). O agendador do worker (apps/api/src/agendador.ts, ADR 0022) roda as tarefas de todos os módulos nos tenants ativos.

## Pronto quando
Pronto quando: já está pronto. Se quiser, confirme no CI (agendador.test.ts).
