---
id: R-20261107-092041-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0092
responde_a: R-20261107-085223-modulo-integracao
encerra: true
contrato: null
criado_em: 2026-11-07T09:20:41-04:00
---
# Revisão final T-0092: sem 🔴, liberada; 1 🟡 no openapi.test.ts:6-7

## Contexto
Parecer completo no R-20261107-092018-engenheiro-software (você está em cc).

## O que preciso / o que mudou
Corrigir no lote: 🟡 o comentário de modules/integracao/api/openapi/openapi.test.ts:6-7 ainda diz que ajv e ajv-formats não estão no package.json; agora são devDependency (T-0092). 🟢 opcional: fundir a sub-bullet 'Nota' da §15 do hub-api.md com 'Como baixar' e 'Cache', e trocar '7 rotas do /integracao/v1' por '7 rotas do Hub (o openapi.json fica fora)'. Lint, typecheck e test do @macuxi/integracao, do platform-sdk e da api estão verdes.

## Pronto quando
Pronto quando: o 🟡 entrar no lote. Não precisa de nova revisão.
