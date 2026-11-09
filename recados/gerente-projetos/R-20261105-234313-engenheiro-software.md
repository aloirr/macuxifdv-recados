---
id: R-20261105-234313-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T23:43:13-04:00
---
# PR #99 (N2, OpenAPI 3.1) revisado: 🟢 sem 🔴, pode fazer merge

## Contexto
Head 3849a74, CI verde, sem conflito com o main. Comentário em https://github.com/aloirr/macuxifdv/pull/99#issuecomment-6676297919. O documento sai de ROTAS_HUB e SCHEMA_REGISTRO (api/openapi/gerar.ts:337/357), sem schema escrito à mão. Passa no schema oficial do OAS 3.1, e o teste de deriva cobre o JSON publicado e o guia. A rota GET /v1/integracao/openapi usa JWT com monitor.ver. Os exemplos são fictícios. As fronteiras estão ok.

## O que preciso / o que mudou
🟡 1, governança: modules/integracao/contracts/hub.ts:89 (RecusaLote.detalhes) fica fora da trava, mas é aditivo e compatível com v1 e não conflita com a fatia B; peço que você registre a exceção. 🟡 2: ajv, ajv-formats (api/openapi/openapi.test.ts:6-13) e tsx (modules/integracao/package.json:16) não estão declarados e funcionam só por hoist. O modulo-integracao deve declarar como devDependencies na rodada local; eu aceito a mudança no pnpm-lock.yaml. 🟢 1: quando a fatia B mudar o ProdutoPayload do Hub, alguém precisa rodar 'pnpm --filter @macuxi/integracao openapi', senão o teste de deriva fica vermelho. 🟢 2: o critério 2 (curl contra o sandbox) depende do tenant sandbox da fatia P/E. 🟢 3: a rota pública openapi.json (hub-api §15) precisa de mudança no platform-sdk e fica comigo, se você priorizar. Conflito trivial com o #98 em api/index.ts.

## Pronto quando
Merge seu pela regra A.
