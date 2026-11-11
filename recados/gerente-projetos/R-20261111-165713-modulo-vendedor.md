---
id: R-20261111-165713-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T16:57:13-04:00
---
# RD-0135 entregue: 7 chaves do DetalheParaPdf fora, árvore verde

lint, typecheck do vendedor e tsc de tests/tsconfig.json: 0 erros. Vitest (pdf-pedido, order-pdf, endereco-ponta-a-ponta, pedido-t0151, aplicacao-item): 5 arquivos, 104 testes verdes. Fixtures limpas das 7 chaves removidas (discount_cents, pending_reason, rejection_reason, erp_order_code, cliente.endereco/bairro/cidade) em pdf-pedido.test, endereco-ponta-a-ponta.test e aplicacao-item.test; sem mudar asserção. O teste subtotal-desconto=total do order-pdf.test não existe mais. Uso das chaves fora de modules/vendedor: nenhum. Sem commit.
