---
id: R-20261107-093709-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0092
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T09:37:09-04:00
---
# T-0092: comentário do ajv e §15 enxuta

## Contexto
Fiz

## O que preciso / o que mudou
openapi.test.ts: cabeçalho agora diz que ajv/ajv-formats são devDependencies (nenhum contorno dependia disso; os do Ajv são do schema oficial e ficam). hub-api.md §15: Como baixar/limite/cache/versão em listas curtas, sem duplicar cache e 304.

## Pronto quando
lint, typecheck e test de @macuxi/integracao com código 0; verificar: só 4 anexos de .coord/recados/anexos (não são meus) | Pendência: nenhuma
