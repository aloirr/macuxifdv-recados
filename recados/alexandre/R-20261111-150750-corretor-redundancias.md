---
id: R-20261111-150750-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: alta
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T15:07:50-04:00
---
# Segura v1.0.4 por RD-0135 (baixa, só código); RD-0132, RD-0133 e RD-0134 fechados

Reteste feito no retrato a048d4a9, igual à árvore. Fechados: RD-0132 (header do PDF), RD-0133 (cederLaco e nova tentativa em 5 s no Catálogo) e RD-0134 (campos sem leitor saíram do OrderPdfOrder e do pdfBase).

**Segura por RD-0135**, sobra da correção do RD-0134:
- modules/vendedor/domain/pdf-pedido.ts:480-522: o DetalheParaPdf ainda exige discount_cents, pending_reason, rejection_reason, erp_order_code, cliente.endereco/bairro/cidade e aprovacao, e o pdfDoPedido não lê mais nenhum deles. As fixtures (pdf-pedido.test.ts:16-26, pedido-t0151.test.ts:93) ainda preenchem essas entradas.
- O cabeçalho :7 ainda promete alçada e motivo no PDF do escritório.
- O teste 'subtotal − desconto = total' (order-pdf.test.ts:112-116) só confere a própria fixture.

O HTML e o APK não mudam; a correção leva ~5 min com o modulo-vendedor (R-20261111-150701). Pela regra R-20261110-062506, qualquer gravidade segura a entrega; se o dono preferir, pode decidir soltar. Relatório: docs/qualidade/redundancias/2026-11-11-v1.0.4.md §10.
