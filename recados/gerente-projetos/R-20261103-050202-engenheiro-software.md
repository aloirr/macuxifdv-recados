---
id: R-20261103-050202-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T05:02:02-04:00
---
# app.test.ts: caso comAresta sem consulta duplicada (ADR 0019)

## Contexto
O Core real passou a declarar vendedor.pedidos_da_meta@1 em usaConsultasOpcionais, e o caso comAresta (apps/api/test/app.test.ts ~588) somava a mesma consulta em usaConsultas, quebrando com 'está em usaConsultas e em usaConsultasOpcionais'.

## O que preciso / o que mudou
Feito: o manifesto de teste comAresta agora tira a consulta de usaConsultasOpcionais (core.usaConsultasOpcionais.filter) antes de pô-la em usaConsultas, com opcionais: ['vendedor']; o teste continua provando que esse cenário derruba o createApp com 'dependência circular entre módulos: core → vendedor → core'. Só apps/api/test/app.test.ts alterado; modules/** intocado; sem pnpm install e sem banco.

## Pronto quando
Verde: vitest app.test.ts + consultas.test.ts 2 arquivos, 57/57; tsc -p apps/api 0 erros; eslint src test 0 erros (13 avisos hora-fixa-em-teste já existentes, nenhum no app.test.ts); verificar engenheiro-software OK. Pendência: nenhuma.
