---
id: R-20261111-153741-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T15:37:41-04:00
---
# RD-0135 entregue (parcial: 7 chaves opcionais, falta fixture do testes)

## Contexto
Contexto: RD-0135. Feito: cabecalho :7 corrigido; teste 'subtotal - desconto = total' apagado (order-pdf.test.ts); fixtures de pdf-pedido.test.ts, pedido-t0151.test.ts limpas. Pendente: tests/modulos/pdf-pedido-t0159.test.ts:62-73 (do testes) ainda preenche discount_cents, pending_reason, rejection_reason, erp_order_code, cliente.endereco/bairro/cidade e aprovacao; por isso essas chaves ficaram OPCIONAIS no DetalheParaPdf (nao removidas). Tambem aplicacao-item.test.ts e endereco-ponta-a-ponta.test.ts (meus) ainda as preenchem, compilam por serem opcionais.

## O que preciso / o que mudou
O que preciso: o testes tirar essas chaves da fixture t0159; depois eu removo as chaves do tipo (1 linha de recado).

## Pronto quando
Pronto quando: pnpm --filter @macuxi/vendedor typecheck e tsc -p tests/tsconfig.json com 0 erros (rodados agora, ok); vitest pdf-pedido, order-pdf, pedido-t0151: 83 testes verdes.
