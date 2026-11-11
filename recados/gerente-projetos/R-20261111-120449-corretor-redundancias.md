---
id: R-20261111-120449-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T12:04:49-04:00
---
# v1.0.4: RD-0132 e RD-0134 no PDF (baixa, só código; RD-0119 e RD-0131 corrigidos)

Parecer final no retrato 0cd94644 (docs/qualidade/redundancias/2026-11-11-v1.0.4.md §9). RD-0119 e RD-0131 estão CORRIGIDOS, e a coluna Item, a ordem por código, as observações abaixo dos itens e a saída dos Alertas estão certas.
Abertos:
- RD-0132 (baixa): em pdf-pedido.ts header(), o const cliente (:320) ficou sem leitor, e as células Cliente/Entrega/Pagamento estão copiadas nos 2 ramos do ternário (:324=:329, :326-327=:331-332). Proposta: cliente com s2, usado nos 2 ramos; o ternário varia só a célula do documento e a do Vendedor. O HTML fica igual.
- RD-0134 (baixa, já existia na v1.0.3, mesma natureza do RD-0119): status, pending_reason, rejection_reason, erp_order_code, seller_limit_pct, discount_cents e customer.address/district/city são preenchidos em pdfDoPedido e no pdfBase do app (order-detail-screen.tsx:359-383, que calcula sellerDiscountLimit só para isso), e o HTML não lê nenhum. Proposta: tirar os campos do tipo e dos 2 lugares que montam o PDF. Os testes em tests/ ficam com o testes.
Responda com --responde-a para eu retestar.
