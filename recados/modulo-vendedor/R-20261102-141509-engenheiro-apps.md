---
id: R-20261102-141509-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T14:15:09-04:00
---
# RN-CORE-23: tirar os timers curtos do Vendedor (20 s, 60 s, 10 s, BKO 10 s) e usar o hook novo

## Contexto
T-0065 (A), RN-CORE-23 e R-20261102-120404: as telas não podem consultar o servidor sozinhas. Quem sincroniza é o agendador único do shell: ao abrir o app, ao voltar depois de 30 min, a cada `sync_auto_min` (padrão 30, mínimo 15) e quando chega um push. Puxar para baixo = Sincronizar, com proteção de 30 s.
O hook mudou e o parâmetro `atualizacao_auto_min` (R-20261102-123955) foi CANCELADO. Agora o hook é `useAtualizacaoAutomatica({ atualizar?, tz? })`, de `@macuxi/ui/mobile`, e devolve `{ puxando, puxar, rodape, atualizadoEm }`:
- `puxar` dispara o motor (fila + pull), com proteção de 30 s;
- `atualizar` é só a releitura LOCAL da tela e roda sozinha depois de cada sincronização concluída, inclusive a automática e a do push;
- `rodape` = "Atualizado às hh:mm · puxe para sincronizar" ou "Atualizado há instantes".
Os parâmetros antigos `intervaloMin` e `ativo` são aceitos e ignorados.

## O que preciso (no PR #44 ou logo depois do merge)
1. `modules/vendedor/app/state/use-vendedor.ts:55` (`INTERVALO_SYNC_MS = 20_000`) e `:151`: tire a trava de 20 s e a chamada a `motor.sincronizar()` dentro de `atualizarPedidos`. Ela passa a só reler o aparelho.
2. `modules/vendedor/app/screens/orders-screen.tsx:22` (`POLL_GESTAO_MS = 60_000`) e `:38` (`setInterval`): tire o timer e use `const auto = useAtualizacaoAutomatica({ atualizar: refreshOrders, tz })`, com `<Screen refreshing={auto.puxando} onRefresh={auto.puxar}>` e o `auto.rodape` no fim da lista.
3. `modules/vendedor/app/screens/order-detail-screen.tsx:68` (`setInterval` de 10 s): tire. Use `useAtualizacaoAutomatica({ atualizar: () => loadOrder(id) })`. O push de pedido aprovado já faz o shell sincronizar a entidade, e o hook relê.
4. `modules/vendedor/web/lib/queries.ts:16` (`LIVE_REFETCH_MS = 10_000`), usado nas linhas 53, 65 e 87: troque por `intervaloSyncAutoMs(SYNC_AUTO_PADRAO_MIN)` (30 min, de `@macuxi/ui/web`) e ponha um botão "Atualizar" nas páginas (ex.: aprovação no BKO, item 6).

## Pronto quando
`grep -rn "setInterval\|refetchInterval\|INTERVALO_SYNC_MS\|POLL_GESTAO_MS" modules/vendedor` não mostra nenhum timer de consulta abaixo de 15 min, e puxar para baixo em Pedidos dispara o motor na hora (dois puxões em menos de 30 s fazem só um).
