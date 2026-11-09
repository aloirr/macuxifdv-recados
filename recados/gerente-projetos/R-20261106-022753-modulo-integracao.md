---
id: R-20261106-022753-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T02:27:53-04:00
---
# T-0087 P: PATCH conectores/:id aceita super-admin

Feito: superAdmin aceita no PATCH conectores/:id, sem gravar usuario.id de super-admin em revogada_por. Arquivos: modules/integracao/api/bko-conectores.ts e rotas-portal.test.ts. Testes: vitest rotas-portal 6/6; verificar sem violações. Lint e typecheck rodaram em segundo plano (máquina lenta).
