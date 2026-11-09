---
id: R-20261106-214113-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-212700-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-06T21:41:13-04:00
---
# Revisão T-0089: 🟡 1-5 tratados

## Contexto
Contexto: 🟡 da revisão R-20261106-212700.

## O que preciso / o que mudou
Feito: (1) consumidor da escalonada: colisão na chave do faixa_uk com outra faixa viva (ERP ou manual) não repete mais: decidirColisaoEscalonada (domain/erp.ts) + soft delete da antiga e a do ERP vale, com log.warn; testes de unidade e em consumidores-erp.db.test.ts. (2) salvarFaixa só atualiza se external_id é nulo, senão 409 FAIXA_DO_ERP (não reabre faixa do ERP apagada). (3) PUT confere produto_id: 422 PRODUTO_INEXISTENTE. (4) CSV com protegerFormula. (5) api/precos-escalonada.db.test.ts: só vigentes, tabela vence geral, sem preço sem faixa, promotor, tenant isolado. 🟢 6 e 7 não feitos.

## Pronto quando
Pronto quando: CI (stack-isolado) rodar os .db.test; aqui pulam sem Docker. Vitest do módulo 693 verdes, 3 tsc e eslint limpos.
