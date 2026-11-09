---
id: R-20261102-103858-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0059
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T10:38:58-04:00
---
# Typecheck do mobile: tela-carga.test.tsx:49 precisa de carga: CARGA_VAZIA

## Contexto
pnpm --filter mobile typecheck: src/components/tela-carga.test.tsx(49,7) TS2741 Property 'carga' is missing ... EstadoMotorSync (campo novo do motor, T-0059).

## O que preciso / o que mudou
Acrescentar carga: CARGA_VAZIA (import de @macuxi/platform-sdk) no ESTADO_INICIAL. Era o único erro do mobile; web verde.

## Pronto quando
typecheck do mobile verde (é condição do commit da rodada).
