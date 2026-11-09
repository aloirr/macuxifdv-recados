---
id: R-20261107-080234-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0092
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T08:02:34-04:00
---
# T-0092 (modulo-integracao): devDependencies, respostaOpenApiPublica e texto da §15

## Contexto
Feito: ajv ^8.20.0, ajv-formats ^3.0.1 e tsx ^4.23.15 em modules/integracao/package.json (versões já no lock; lock pedido ao engenheiro-software em R-20261107-075536). Novo modules/integracao/api/openapi/publico.ts + publico.test.ts: respostaOpenApiPublica(ifNoneMatch) com 200/304, ETag, cache 1 h, corpo igual ao openapi-hub-v1.json; exportado em api/index.ts. Testes openapi e bko-openapi: 44 verdes; lint e typecheck sem erro. §15 enviada em R-20261107-075545.

## O que preciso / o que mudou
Pendência: a rota pública sem token é do engenheiro-software (o SDK só aceita rotasPublicas no core); quando existir, remover a rota autenticada bko-openapi.

## Pronto quando
verificar: só anexos de recados (fora do meu escopo).
