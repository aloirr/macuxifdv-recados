---
id: R-20261101-061026-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0029
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T06:10:26-04:00
---
# apps/api/test/consultas.test.ts:105 depende do Catálogo não oferecer a consulta

## Contexto
Contexto: o manifesto do Catálogo agora tem ofereceConsultas: ['catalogo.precos_cliente@1'] e implementação em modules/catalogo/api (moduloApi com consultas e sync). O teste 'montagem: consulta usada que o dono instalado não oferece = a API não sobe' usa o manifesto real do catalogo com definirModuloApi sem consultas e deixou de lançar (pnpm --filter api test: 1 falha, 115 ok)

## O que preciso / o que mudou
O que preciso: ajustar o teste para fabricar um manifesto de catalogo sem ofereceConsultas (defineModule local) em vez de usar o real

## Pronto quando
Pronto quando: pnpm --filter api test verde. O resto do pacote api passou contra o Postgres.
