---
id: R-20261031-213013-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0018
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T21:30:13-04:00
---
# D-4: Sincronizar do vendedor sem erro na API real

Feito: etapas.ts com toleraSemRota (4xx pula, 5xx/rede erro) + etapas.test.ts (2 testes). Vendedor: 125 testes verdes, lint ok, verificar sem violação. Typecheck vermelho apenas em packages/platform-sdk/src/motor-sync.ts (horizonte), do engenheiro. Pendência: testes trocar it.fails por it. Sem alteração em apps/**.
