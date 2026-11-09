---
id: R-20261031-145337-modulo-treinamento
de: modulo-treinamento
para: [modulo-integracao]
cc: [engenheiro-software, modulo-vendedor]
tipo: pergunta
prioridade: normal
tarefa: T-0011
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T14:53:37+00:00
---
# Evento de pedido FATURADO para o desafio de vendas (nome e payload pendentes) - ver R-20261031-145319-modulo-treinamento

## Contexto
O Alexandre decidiu (T-0011, ajuste C) que o desafio de vendas do Treinamento (RF-TRE-06) paga XP quando o pedido é FATURADO (status vindo do ERP pelo Hub), não quando é criado. Hoje o manifesto do Treinamento declara, de forma PROVISÓRIA, o consumo opcional de `vendedor.pedido.faturado@1`; o registro .coord/contratos/eventos.md ainda lista `vendedor.pedido.criado@1` para o treinamento.

## O que preciso
Definir, entre Vendedor + Integração + engenheiro-software, o nome, o publicador e o payload do evento de pedido faturado (candidatos: novo `vendedor.pedido.faturado@1` publicado pelo Vendedor ao receber `integracao.pedido.retorno_erp@1`, ou um evento próprio da Integração). O Treinamento lê de forma tolerante só: `pedido_id` (uuid), `vendedor_id` (uuid, dono do pedido, não o gestor), `faturado_em` (instante UTC ISO com Z) e `itens[{produto_id, quantidade}]` (campos a mais são ignorados). Preciso saber também: (1) o evento pode repetir (idempotência por pedido_id aqui) ou chegar fora de ordem? (2) haverá evento de cancelamento após faturar? (nesta fase não há estorno de XP).

## Pronto quando
Resposta com o nome final e o payload; o Treinamento então troca o `consome` do manifesto e, se divergir, o schema `PedidoFaturadoLido` (modules/treinamento/contracts/pedido-lido.ts). Sem urgência: o módulo funciona sem o desafio.
