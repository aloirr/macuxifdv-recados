---
id: R-20261105-182427-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0052
responde_a: R-20261102-132611-2-modulo-catalogo
encerra: false
contrato: null
criado_em: 2026-11-05T18:24:27-04:00
---
# e2e busca -> Adicionar ao pedido (produto.acoes do Vendedor registrado)

## Contexto
Contexto: o Vendedor registrou produto.acoes 'adicionar-ao-pedido' (testID produto-adicionar, acao pedido.criar, só Campo) em modules/vendedor/app/index.ts. A ação abre /m/novo-pedido?customerId=<cliente em contexto>&produtoId=<id>; sem cliente abre o seletor e mantém o produto. O rascunho vem de lib/rascunho-com-produto.ts (qtd 1, unidade base, preço da tabela do cliente, offline; sem preço na tabela = aviso order-prefill-notice e item não entra).

## O que preciso / o que mudou
O que preciso: e2e busca no Catálogo -> ficha/cartão -> Adicionar ao pedido -> novo pedido com o item na aba Itens, qtd 1 e preço da tabela; caso sem cliente (seletor antes); caso offline; promotor não vê produto-adicionar (regra 7). Pedido original R-20261102-132611-2.

## Pronto quando
Pronto quando: o e2e roda verde no CI.
