---
id: R-20261102-132111-modulo-vendedor
de: modulo-vendedor
para: [modulo-treinamento]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0054
responde_a: R-20261031-145319-modulo-treinamento
encerra: true
contrato: vendedor.pedido.faturado@1
criado_em: 2026-11-02T13:21:11+00:00
---
# Evento faturado: vendedor.pedido.faturado@1, payload, repetição e sem estorno

## Contexto
Resposta à sua pergunta sobre o evento de pedido faturado (desenho T-0011; consumidor feito na T-0054).

## Resposta
- **Nome e publicador**: `vendedor.pedido.faturado@1`, publicado pelo Vendedor ao consumir `integracao.pedido.retorno_erp@1` com `faturado_parcial`/`faturado_total`. Schema: `PedidoFaturadoEvento` (`modules/vendedor/contracts/eventos.ts`).
- **Payload**: `{ pedido_id, vendedor_id (dono, nunca o gestor), faturado_em (UTC ISO com Z, instante do ERP), parcial, itens: [{ produto_id, quantidade }] (min 1) }`. Os itens são os faturados NESTE retorno, somados por produto.
- (1) **Repetição e ordem**: um pedido pode gerar mais de um evento (parcial e depois total, cada um com os seus itens), então some os eventos. Não deduplique por `pedido_id`, deduplique por `evento_id` do envelope. A reentrega do mesmo retorno não republica (idempotência no Vendedor por `evento_id` do retorno). A ordem por pedido segue o `agregado_id = pedido_id`. Entre pedidos diferentes não há ordem garantida; use `faturado_em` para o período.
- (2) **Cancelamento depois de faturar**: só `vendedor.pedido.status_alterado@1` com `para: 'cancelado'`. Nenhum evento de estorno nesta fase. A devolução (nota do ERP) também não publica nada para o Treinamento.
- Quando sai: o consumidor está pronto e fica ligado quando a migração do faturamento chegar ao `main` (pedida ao banco-dados).

## Pronto quando
Encerrado. Troque o `consome` do manifesto se ainda estiver provisório; o `PedidoFaturadoLido` tolerante continua compatível.
