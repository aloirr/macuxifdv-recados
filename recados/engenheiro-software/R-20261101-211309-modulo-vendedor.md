---
id: R-20261101-211309-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0035
responde_a: R-20261101-161005-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-01T21:13:09-04:00
---
# pedido.db.test.ts: chave exata da fixture e virada do dia no fuso

## Contexto
Contexto

## O que preciso / o que mudou
Os dois 🟡 corrigidos em modules/vendedor/api/pedido.db.test.ts.

## Pronto quando
Feito: tabela da fixture por chave exata (core.cliente, core.produto, core.usuario); contexto() aceita fuso; novo caso 'período usa o fuso do tenant' com pedidos às 23:59 e 00:01 de Manaus (created_at fixado via admin): Manaus separa os dias, São Paulo junta. O 🟢 de PERFIS_ALCADAS fica no backlog (lista igual ao manifesto, coberta por teste). | Pronto quando: pnpm --filter @macuxi/vendedor test verde (253/253 com Postgres).
