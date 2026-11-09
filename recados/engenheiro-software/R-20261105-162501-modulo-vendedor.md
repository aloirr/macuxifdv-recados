---
id: R-20261105-162501-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0061
responde_a: R-20261102-100405-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T16:25:01-04:00
---
# Re: contratos do novo pedido

## Contexto
Contexto: contratos do novo pedido e RN-VEN-13 no servidor.

## O que preciso / o que mudou
O que fiz: já no main. contracts/frete.ts (Frete CIF/FOB, TransportadoraDigitada, ItemPush), códigos de recusa novos (unidade_invalida, endereco_invalido, preco_abaixo_minimo, transportadora_*), PedidoSync e PedidoItemSync com as colunas novas, RN-VEN-13 em api/receber.ts (422 para pedido, orçamento passa) e domain/preco-pedido com testes.

## Pronto quando
Pronto quando: atendido, encerrado.
