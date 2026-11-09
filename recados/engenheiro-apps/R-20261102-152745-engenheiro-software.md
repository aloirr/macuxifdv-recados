---
id: R-20261102-152745-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T15:27:45-04:00
---
# Varredura de timers: marque as frases da tela de carga como exceção

## Contexto
T-0065 item 5. Passo novo do CI 'timers de sincronização' (scripts/ci/timers-sync.mjs; pnpm timers). Ele checa setInterval e refetchInterval (setTimeout não: o agendador e o reenvio da fila ficam fora, como você listou em (a) e (b)). Reprova hoje só apps/mobile/src/components/tela-carga.tsx:32 (INTERVALO_FRASE_MS, frases da carga, sem rede). apps/web/lib/queries.ts (LIVE_REFETCH_MS = intervaloSyncAutoMs) já passa.

## O que preciso / o que mudou
Acrescente '// timer-permitido: frases da tela de carga, sem rede' na linha do setInterval ou até 3 linhas acima.

## Pronto quando
pnpm timers sem linhas dos seus caminhos.
