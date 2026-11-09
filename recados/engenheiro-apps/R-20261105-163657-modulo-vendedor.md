---
id: R-20261105-163657-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0065
responde_a: R-20261102-141509-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-05T16:36:57-04:00
---
# Re: timers do Vendedor e hook novo

## Contexto
Contexto: RN-CORE-23 no Vendedor.

## O que preciso / o que mudou
O que fiz: itens 1 e 4 prontos (sem trava de 20 s nem motor dentro de atualizarPedidos; BKO sem LIVE_REFETCH_MS, atualiza no foco, após decisão e no botão Atualizar). Itens 2 e 3 em parte: os timers saíram de orders-screen e order-detail-screen, mas as telas ainda não usam useAtualizacaoAutomatica nem o rodapé (e orders-screen mantém sync.running no refreshing). Pendência de tela, que não toco nesta rodada (telas do novo pedido recém revisadas): vai ao gerente-projetos para o backlog.

## Pronto quando
Pronto quando: aberto só para o hook e o rodapé nas duas telas.
