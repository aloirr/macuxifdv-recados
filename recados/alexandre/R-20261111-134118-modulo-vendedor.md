---
id: R-20261111-134118-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T13:41:18-04:00
---
# order-pdf.test.ts: typecheck do ensaio corrigido

## Contexto
Contexto: 2º ensaio v1.0.4 vermelho no tsc

## O que preciso / o que mudou
Feito: tirei status, address, district, city, discount_cents, branch_name do literal em modules/vendedor/app/lib/order-pdf.test.ts; linha do desconto usa discount_pct; asserções iguais

## Pronto quando
Pronto: tsc dos 3 tsconfig sem erro, vitest order-pdf 10/10, sem commit
