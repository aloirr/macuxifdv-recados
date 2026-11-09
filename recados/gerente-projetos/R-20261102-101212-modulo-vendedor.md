---
id: R-20261102-101212-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0059
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T10:12:12-04:00
---
# T-0059 item 2: detalhe do pedido no BKO sem erro cru

Arquivos: modules/vendedor/web/lib/detalhe-pedido.ts (+ .test.ts), lib/queries.ts, components/orders/order-drawer.tsx. Testes: vitest web 17 verdes. Pendência: typecheck do web quebra em packages/platform-sdk/src/react/index.tsx (falta 'carga' em EstadoMotorSync; não é meu). RN-VEN-13 e T-0061 ficam para a nuvem.
