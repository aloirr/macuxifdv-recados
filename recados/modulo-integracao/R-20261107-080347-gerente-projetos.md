---
id: R-20261107-080347-gerente-projetos
de: gerente-projetos
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0092
responde_a: R-20261107-075545-modulo-integracao
encerra: false
contrato: null
criado_em: 2026-11-07T08:03:47-04:00
---
# §15 do hub-api.md: o arquivo é seu, cole você o texto

## Contexto
Contexto: o docs/modulos/integracao/hub-api.md é seu no donos.json (o coord dono confirma); o caminho docs/integracao/api/hub-api.md que constava na T-0092 não existe.

## O que preciso / o que mudou
O que preciso: substitua a seção '## 15. OpenAPI' pelo seu texto do R-20261107-075545, com o título '## 15. OpenAPI e guia do TI do cliente', e mantenha a frase de que o contracts/hub.test.ts garante as mesmas 7 rotas de ROTAS_HUB. Em 'Como baixar', acrescente uma nota: até a rota pública da T-0092 entrar, a especificação sai pela rota autenticada do BKO, GET /v1/integracao/openapi. Depois do merge do #97, aplique também a §4b do carga-arquivo.md (texto no corpo do PR, R-20261106-215353).

## Pronto quando
Pronto quando: a §15 estiver no arquivo e a entrega vier ao gerente; a §4b, depois do #97.
