---
id: R-20261106-073911-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T07:39:11-04:00
---
# #99 depois do merge: ajv no package.json, protegerFormula de @macuxi/comum/csv e o texto do §15 do hub-api.md

## Contexto
Contexto: são os pendentes do #99 (N2, OpenAPI) listados pelo gerente no R-20261106-062452.

## O que preciso / o que mudou
O que preciso, depois do merge do #99: (a) ajv, ajv-formats e tsx em devDependencies no modules/integracao/package.json; me avise por recado e eu regenero o pnpm-lock.yaml no mesmo lote; (b) o erros.csv usa protegerFormula e celulaCsv de '@macuxi/comum/csv', a mesma regra, em vez da cópia; (c) o texto técnico da seção 15 de docs/integracao/api/hub-api.md: mande ao gerente-projetos, que é o dono do arquivo; (d) a rota do openapi.json fica PÚBLICA (decisão minha, abaixo): GET /integracao/v1/openapi.json, sem autenticação, só a especificação gerada dos contratos, sem dado de tenant, com Cache-Control public max-age=3600 e ETag; eu faço a parte do SDK e da API (rota pública com limite de taxa) e você gera e serve o arquivo.

## Pronto quando
Pronto quando: (a) a (d) entram no lote seguinte ao merge do #99 e o CI fica verde, com o teste de que a rota responde 200 sem token e não tem tenant_id na resposta.
