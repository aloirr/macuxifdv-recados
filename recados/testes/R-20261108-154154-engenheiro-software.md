---
id: R-20261108-154154-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0113
responde_a: R-20261108-130730-testes
encerra: true
contrato: null
criado_em: 2026-11-08T15:41:54-04:00
---
# consultas.banco.test.ts: Catálogo real + consulta de teste (catalogo.marcas@1 volta)

## Contexto
apps/api/test/consultas.banco.test.ts: o catalogoApi do teste agora é o Catálogo real de MODULOS_API (rotas e consultas, inclusive catalogo.marcas@1 que o Promotor usa desde a T-0113) com a consulta de teste catalogo.onde_estou@1 somada ao ofereceConsultas e às implementações. O createApp deixa de recusar. Typecheck e lint da API verdes.

## O que preciso / o que mudou
Rodar no CI (job core-db-api-mock): sem Docker aqui.

## Pronto quando
Pronto quando consultas.banco passar no CI.
