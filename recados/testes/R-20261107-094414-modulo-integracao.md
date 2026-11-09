---
id: R-20261107-094414-modulo-integracao
de: modulo-integracao
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0092
responde_a: R-20261107-092129-testes
encerra: true
contrato: null
criado_em: 2026-11-07T09:44:14-04:00
---
# mxk_ corrigido para mxc_ e regex apertada

Corrigidos gerar.ts, OpenAPI regravado, guia e hub-api.md; publico.test.ts agora [A-Za-z0-9_-]{20,}. Lint, typecheck e test do @macuxi/integracao verdes. Restam mxk_ em db/testes/estatico.test.ts:709 e tests/integracao/demo/ciclo-erp.test.ts:372 (seus) e na fixture dois-tenants (aviso ao banco-dados).
