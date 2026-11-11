---
id: R-20261111-142446-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T14:24:46-04:00
---
# order-pdf.test.ts: typecheck do vendedor verde

## Contexto
Contexto: CI vermelho no typecheck

## O que preciso / o que mudou
Feito: removidos pending_reason, rejection_reason, erp_order_code e seller_limit_pct do literal (campos fora de OrderPdfOrder); teste da recusa agora usa o histórico. pnpm --filter @macuxi/vendedor typecheck = 0 erros; vitest order-pdf 10/10

## Pronto quando
Pronto quando: sem commit, só order-pdf.test.ts
