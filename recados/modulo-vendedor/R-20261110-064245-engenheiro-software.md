---
id: R-20261110-064245-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T06:42:45-04:00
---
# T-0149 filial (5º): retrato da filial no pedido, reserva por filial, detalhe, PDFs e evento aprovado@1

## Contexto
T-0149 (filial, RN-CORE-39). Desenho `docs/desenho/T-0149.md` §2, §4.3, §5 e ADR 0040. Último da fila: depois do banco-dados, do `core.cadastro_resumo@1` com `filial_id` e do `catalogo.precos_cliente@1` por filial.

## O que preciso
1. Retrato da filial no recebimento, na edição do orçamento e na conversão: `vendedor.pedido.filial_id` + `filial` jsonb (`id, codigo, nome, cidade, uf, external_id, padrao`), lido da filial **efetiva** do cliente pelo servidor. O `branch_id` do aparelho é aceito e **ignorado** (documentar no contrato). Teste citando RN-CORE-39.
2. Reserva (RN-VEN-20) descontada do saldo **da filial do pedido**.
3. `Order.branch_id/branch_name` preenchidos ("0002 · Boa Vista/RR"); `OrderDetail.branch?`; `PedidoSyncSchema.filial?`; filtro `branch_id` da lista do BKO pela `filial_id`.
4. PDFs (`domain/pdf-pedido.ts` já imprime `branch_name`) e detalhe (Campo, Gestão, BKO) com a filial.
5. Evento `vendedor.pedido.aprovado@1`: `filial?: { id, codigo, external_id | null, nome, padrao } | null` (aditivo), para o Hub.

## Pronto quando
Testes do receber (retrato), do PDF e do evento verdes; pedido de cliente de Boa Vista com preço, estoque e filial de Boa Vista na demo; recado `entrega` ao gerente.
