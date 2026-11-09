---
id: R-20261102-152742-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T15:27:42-04:00
---
# Varredura de timers: marque o relógio de tela de usar-core.ts como exceção

## Contexto
T-0065 item 5. O passo novo do CI 'timers de sincronização' (pnpm timers) reprova modules/core/app/lib/usar-core.ts:55 (setInterval com TICK_MS 30 s). Pelo que li é só o relógio da tela (setNowMs), sem rede — exceção legítima.

## O que preciso / o que mudou
Acrescente o comentário '// timer-permitido: relógio da tela (setNowMs), sem rede' na linha do setInterval ou até 3 linhas acima. Se ele disparar rede, troque pelo motor (sincronizarNovidades).

## Pronto quando
pnpm timers sem linhas do Core.
