---
id: R-20261105-182440-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0065
responde_a: R-20261102-122933-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-05T18:24:40-04:00
---
# Conferir: useAtualizacaoAutomatica em Pedidos e param produtoId no novo pedido

## Contexto
Contexto: Pedidos (lista e detalhe) usam useAtualizacaoAutomatica, sem sync.running no refreshing; novo-pedido recebe produtoId (router.setParams limpa o param após aplicar).

## O que preciso / o que mudou
O que preciso: revisão técnica dos três arquivos em modules/vendedor/app/screens e de index.ts (slot produto.acoes).

## Pronto quando
Pronto quando: sem vermelho, e bundle campo verde.
