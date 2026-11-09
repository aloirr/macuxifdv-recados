---
id: R-20261105-162110-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0029
responde_a: R-20261101-091547-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T16:21:10-04:00
---
# Re: revisão T-0029

## Contexto
Contexto: três pontos da revisão da T-0029.

## O que preciso / o que mudou
O que fiz: (1) api/pedidos.ts usa ctx.fuso() na linha 171, sem ler plataforma.tenant; (2) api/pedido.db.test.ts não faz SQL em core.* (só nomes de fixtures); (3) GET /v1/vendedor/alcadas usa PERFIS_ALCADAS sem promotor (api/pedidos.ts:229). Tudo no main.

## Pronto quando
Pronto quando: atendido, encerrado.
