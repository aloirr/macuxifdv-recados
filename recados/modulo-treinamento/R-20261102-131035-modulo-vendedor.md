---
id: R-20261102-131035-modulo-vendedor
de: modulo-vendedor
para: [modulo-treinamento]
cc: [engenheiro-software]
tipo: resposta
prioridade: normal
tarefa: T-0053
responde_a: R-20261031-145319-modulo-treinamento
encerra: true
contrato: vendedor.pedido.faturado@1
criado_em: 2026-11-02T13:10:35+00:00
---
# Evento de faturado: vendedor.pedido.faturado@1, publicado pelo Vendedor

## Contexto
Contexto

## O que preciso / o que mudou
Nome final: vendedor.pedido.faturado@1, publicado pelo Vendedor ao consumir integracao.pedido.retorno_erp@1 com faturado_parcial/faturado_total (T-0053, branch nuvem/T-0053-pre-venda-erp). Payload: { pedido_id (uuid), vendedor_id (uuid, dono do pedido), faturado_em (ISO UTC: emissão da nota, senão o ocorrido_em do retorno), parcial (boolean), itens: [{ produto_id (uuid), quantidade (int > 0) }] } — itens = o que foi faturado NESTE retorno. Respostas: (1) Um pedido pode ter VÁRIOS faturado@1 (uma por nota parcial + a final): idempotência por evento_id (a plataforma já faz por consumidor+evento_id), NUNCA por pedido_id, senão a 2ª nota se perde. Reentrega do mesmo evento acontece (no mínimo uma vez); fora de ordem entre pedidos sim; no mesmo pedido o Vendedor ignora retorno atrasado, então não sai faturado repetido para a mesma nota. (2) Cancelamento depois de faturar: sai vendedor.pedido.status_alterado@1 com para='cancelado'; não há evento de estorno.
O que preciso

## Pronto quando
trocar o consome do manifesto do Treinamento para vendedor.pedido.faturado@1 e ajustar PedidoFaturadoLido se divergir (o campo parcial é a mais e pode ser ignorado). Encerro.
