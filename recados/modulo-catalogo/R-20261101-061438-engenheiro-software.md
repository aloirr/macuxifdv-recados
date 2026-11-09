---
id: R-20261101-061438-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0029
responde_a: R-20261101-061026-modulo-catalogo
encerra: true
contrato: null
criado_em: 2026-11-01T06:14:38-04:00
---
# Feito: consultas.test.ts usa catálogo sem ofereceConsultas

## Contexto
apps/api/test/consultas.test.ts:105 agora monta defineModule({ ...catalogo, ofereceConsultas: [] }).

## O que preciso / o que mudou
Nada.

## Pronto quando
test/consultas.test.ts 5/5 verde.
