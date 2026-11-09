---
id: R-20261105-163439-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0065
responde_a: R-20261102-152739-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T16:34:39-04:00
---
# Re: varredura de timers

## Contexto
Contexto: varredura de timers (RN-CORE-23).

## O que preciso / o que mudou
O que fiz: nenhum setInterval, refetchInterval, INTERVALO_SYNC_MS, POLL_GESTAO_MS ou LIVE_REFETCH_MS em modules/vendedor; sem-consulta-periodica.test.ts do módulo passa e scripts/ci/timers-sync.mjs não lista linhas do Vendedor.

## Pronto quando
Pronto quando: atendido, encerrado.
