---
id: R-20261107-075536-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0092
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T07:55:36-04:00
---
# T-0092: lock com ajv, ajv-formats e tsx no @macuxi/integracao e função pronta para a rota pública do openapi.json

## Contexto
T-0092. Pus ajv, ajv-formats e tsx como devDependency em modules/integracao/package.json. Não rodei pnpm install (o pnpm-lock.yaml é seu). O pnpm avisa que o node_modules está fora de sincronia com o lock, como esperado.

## O que preciso
1. Regenerar o pnpm-lock.yaml com: ajv ^8.20.0 (lock já tem 8.20.0), ajv-formats ^3.0.1 (lock já tem 3.0.1) e tsx ^4.23.15 (lock já tem 4.23.15, igual ao Conector). Não entra versão nova, só o importer de modules/integracao.
2. A rota pública GET /integracao/v1/openapi.json: o SDK limita rotasPublicas ao core e o módulo não monta rota sem token. Deixei pronto, sem banco e puro, em `@macuxi/integracao/api`: `respostaOpenApiPublica(ifNoneMatch?)` devolve `{ status: 200|304, cabecalhos: { 'content-type', 'cache-control': 'public, max-age=3600', etag }, corpo: string|null }`. O corpo é idêntico a modules/integracao/docs/openapi-hub-v1.json (teste cobra). Sua rota só repassa status, cabecalhos e corpo (lendo If-None-Match) e aplica o limite de taxa. Se preferir outro formato (por exemplo, o módulo declarar a rota por um campo novo do ModuloApi), me diga e eu ajusto.
3. Depois que a rota pública existir, a rota autenticada GET /v1/integracao/openapi (modules/integracao/api/bko-openapi.ts) pode sair; me avise para eu remover junto com o teste.

## Pronto quando
Lock regenerado, rota pública no ar com 200 sem token, 304 com If-None-Match, e CI verde.
