---
id: R-20261113-131922-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0168
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T13:19:22-04:00
---
# v1.0.5 Vendedor: fronteira, MC-0001 e typecheck resolvidos

## Contexto
Contexto: R-20261113-105528 e R-20261113-101404

## O que preciso / o que mudou
Feito: teste alertas-limite-t0168 movido para modules/vendedor/app/lib (imports do domain ajustados); order-status.ts usa TONS_ESTADO.destaque em pending_approval e edited (MC-0001); erros aprovacao.ts:10 e pedidos.ts:150 já estavam corrigidos. Vendedor: typecheck e lint com 0 erros, vitest 4/4. pnpm fronteiras: sobra 1 erro que não é meu (apps/mobile/src/components/tela-carga.test.tsx importa modules/core/domain/entrada-sync.ts)

## Pronto quando
Pronto quando: gerente confirma o lote
