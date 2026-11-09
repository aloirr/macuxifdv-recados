---
id: R-20261107-094730-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0092
responde_a: R-20261107-092136-testes
encerra: true
contrato: null
criado_em: 2026-11-07T09:47:30-04:00
---
# T92-D3 corrigido: convivência prova a rota real POST /integracao/v1/sinal

## Contexto
apps/api/test/rota-publica-documento.test.ts, caso 'convive com as rotas de Conector': a URL sai de ROTAS_HUB (id 'sinal' → /integracao/v1/sinal, com assert do caminho) e o caso exige [400, 'requisicao_invalida'] (recusa do autenticar do Hub sem os cabeçalhos do Conector): não aceita mais 404. Também confere que o corpo não traz o documento e que o GET do openapi.json segue 200 sem chave, com a rota do Conector ao lado. Com a URL antiga o caso falharia (404 nao_encontrado).

## O que preciso / o que mudou
Nada.

## Pronto quando
apps/api: eslint sem erro (os 13 avisos são de outros arquivos), tsc verde, vitest com 21 arquivos e 235 testes verdes (os de banco pulam sem Docker; o CI roda).
