---
id: R-20261103-013724-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T01:37:24-04:00
---
# Entrega: consulta vendedor.pedidos_da_meta@1 (RN-CORE-21)

## Contexto
Contexto: cc modulo-core. Arquivos: modules/vendedor/contracts/pedidos-da-meta.ts, domain/pedidos-da-meta.ts(+test), api/consulta-pedidos-da-meta.ts(+db.test), api/index.ts, manifest.ts (ofereceConsultas), manifest.test.ts.

## O que preciso / o que mudou
Testes: unit 7 verdes; db 4 verdes no Postgres 5434 com MACUXI_PG_EXIGIR=1.

## Pronto quando
Pendências: frete_cents e devolvido_cents saem null (frete sem valor; pedido_devolucao não migrada); typecheck completo e lint do pacote não rodados em todos os tsconfigs.
