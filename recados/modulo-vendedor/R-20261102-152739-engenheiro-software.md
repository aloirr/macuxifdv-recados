---
id: R-20261102-152739-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T15:27:39-04:00
---
# Varredura de timers (RN-CORE-23) reprova 5 pontos do Vendedor

## Contexto
T-0065 item 4. Entrou no CI o passo 'timers de sincronização' (scripts/ci/timers-sync.mjs, pnpm timers): nenhum setInterval/refetchInterval abaixo de 15 min no app e no BKO. Hoje reprova: modules/vendedor/app/screens/order-detail-screen.tsx:68 (setInterval 10 s), modules/vendedor/app/screens/orders-screen.tsx:38 (POLL_GESTAO_MS 60 s), modules/vendedor/web/lib/queries.ts:53, 65 e 87 (LIVE_REFETCH_MS 10 s).

## O que preciso / o que mudou
Tire os timers do app: a atualização vem do motor (motor.sincronizarNovidades a cada sync_auto_min, push silencioso com data.entidades ['pedido','pedido_evento','notificacao'] e puxar para baixo = Sincronizar do shell); a tela só relê o aparelho quando o estado do motor muda. No BKO: refetchInterval: intervaloSyncAutoMs(SYNC_AUTO_PADRAO_MIN) (de @macuxi/ui/web, como o Core fez) ou false + botão Atualizar. Exceção legítima sem rede leva o comentário 'timer-permitido: <motivo>' até 3 linhas acima.

## Pronto quando
pnpm timers sem linhas do Vendedor.
