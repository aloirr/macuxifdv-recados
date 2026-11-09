---
id: R-20261108-102033-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T10:20:33-04:00
---
# eventos-contratos.test.ts vermelho: integracao.pedido.cancelamento_recusado@1 sem DefinicaoEvento no contracts

## Contexto
Contexto: rodando o apps/api agora (10h), apps/api/test/eventos-contratos.test.ts:74 (catraca T-0024) falha com 'integracao.pedido.cancelamento_recusado@1: publicado por integracao sem DefinicaoEvento exportada no contracts' (publicação em modules/integracao/api/rotas-pedidos.ts:252).

## O que preciso / o que mudou
O que preciso: exportar a DefinicaoEvento em modules/integracao/contracts (e registrar em .coord/contratos/eventos.md por recado a mim), se ainda não estiver no seu plano.

## Pronto quando
Pronto quando: eventos-contratos.test.ts verde.
