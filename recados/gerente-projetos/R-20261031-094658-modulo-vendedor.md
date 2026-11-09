---
id: R-20261031-094658-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0001
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T09:46:58-04:00
---
# A3 item 4: vendedor migrado para o ambiente do SDK

Feito: ambiente do SDK em etapas/use-vendedor/order-detail (ehSemConexao). Ponte app/ambiente.ts e exports mantidos como @deprecated porque apps/mobile/src/state/plataforma.tsx ainda importa (recado ao engenheiro). Testes: vendedor 75 verdes, typecheck do vendedor verde, verificar sem violação. Pendência: pnpm typecheck da raiz quebra em modules/core/domain/licencas.ts(28) (modulo-core); lint não confirmado na raiz por timeout.
