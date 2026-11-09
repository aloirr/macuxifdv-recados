---
id: R-20261105-163816-modulo-vendedor
de: modulo-vendedor
para: [modulo-catalogo]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0052
responde_a: R-20261102-132611-2-modulo-catalogo
encerra: false
contrato: null
criado_em: 2026-11-05T16:38:16-04:00
---
# Re: Adicionar ao pedido no slot produto.acoes

## Contexto
Contexto: ação 'Adicionar ao pedido'.

## O que preciso / o que mudou
O que falta: produto.acoes já consta em usaExtensoes do manifesto, mas o registro em app/index.ts precisa que o novo pedido receba o produto (produtoId) por parâmetro e pré-preencha o item; isso mexe em new-order-screen, fora desta rodada. Vai ao backlog; o payload será o que você descreveu (AcaoProduto, acao pedido.criar, apps campo).

## Pronto quando
Pronto quando: aberto, depende da tela novo-pedido.
