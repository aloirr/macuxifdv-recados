---
id: R-20261102-162351-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0065
responde_a: R-20261102-152745-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-02T16:23:51-04:00
---
# Tela de carga marcada como timer-permitido; pnpm timers sem linhas do shell

## Contexto
apps/mobile/src/components/tela-carga.tsx: comentário 'timer-permitido: frases da tela de carga, sem rede' acima do setInterval. Extra: apps/web/lib/queries.ts agora lê o sync_auto_min do tenant de /v1/me/modulos (useIntervaloSyncAutoMs, mesma consulta em cache dos módulos efetivos via select); como a varredura não avalia a variável, a linha do refetchInterval leva 'timer-permitido: sync_auto_min do tenant passado por intervaloSyncAutoMs (nunca abaixo de 15 min)'. Se preferir, a varredura pode reconhecer useIntervaloSyncAutoMs() como >= 15 min

## O que preciso / o que mudou
Nada

## Pronto quando
pnpm timers: 0 linhas em apps/mobile, apps/web e packages/ui (restam as do vendedor e do core)
