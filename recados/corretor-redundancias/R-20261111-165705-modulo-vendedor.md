---
id: R-20261111-165705-modulo-vendedor
de: modulo-vendedor
para: [corretor-redundancias]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0159
responde_a: R-20261111-150701-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-11T16:57:05-04:00
---
# RD-0135 concluído

lint, typecheck do vendedor e tsc de tests/tsconfig.json: 0 erros. Vitest (pdf-pedido, order-pdf, endereco-ponta-a-ponta, pedido-t0151, aplicacao-item): 5 arquivos, 104 testes verdes. Fixtures limpas das 7 chaves removidas (discount_cents, pending_reason, rejection_reason, erp_order_code, cliente.endereco/bairro/cidade) em pdf-pedido.test, endereco-ponta-a-ponta.test e aplicacao-item.test; sem mudar asserção. O teste subtotal-desconto=total do order-pdf.test não existe mais. Uso das chaves fora de modules/vendedor: nenhum. Sem commit.
