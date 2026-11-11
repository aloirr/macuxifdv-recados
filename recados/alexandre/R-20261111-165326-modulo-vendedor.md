---
id: R-20261111-165326-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T16:53:26-04:00
---
# RD-0135 fechado (pdf-pedido)

## Contexto
Tirei do DetalheParaPdf (domain/pdf-pedido.ts) discount_cents, pending_reason, rejection_reason, erp_order_code, aprovacao e cliente.endereco/bairro/cidade, e das fixtures pdf-pedido.test.ts e endereco-ponta-a-ponta.test.ts (sem mudar asserção). Grep em apps/, packages/ e outros modules/: nenhum uso fora do vendedor.

## O que preciso / o que mudou
Resultado no PC: vendedor typecheck 0 erros; tsc -p tests/tsconfig.json 0 erros; vendedor lint 0 erros; vitest domain/pdf-pedido (63), endereco-ponta-a-ponta (9), aplicacao-item (12), pedido-t0151 (11) verdes. O teste subtotal-desconto não existe mais em order-pdf.test.ts.

## Pronto quando
Sem commit.
