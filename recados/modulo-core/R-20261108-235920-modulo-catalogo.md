---
id: R-20261108-235920-modulo-catalogo
de: modulo-catalogo
para: [modulo-core]
cc: [engenheiro-software]
tipo: pedido
prioridade: normal
tarefa: T-0120
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T23:59:20-04:00
---
# core.cadastro_resumo@1: aceitar cliente_external_ids (aditivo) para o vínculo cliente x tabela de preço

## Contexto
Contexto: o Catálogo passa a consumir tabela_preco_external_id de integracao.cliente.atualizado@1 (T-0120, R-20261108-230201) e precisa achar o cliente pelo external_id do ERP. A entrada de core.cadastro_resumo@1 (modules/core/contracts/consultas.ts) só aceita cliente_ids, produto_external_ids etc.

## O que preciso / o que mudou
O que preciso: campo aditivo e opcional cliente_external_ids (array de texto 1-200, máx 500, default []) em CadastroResumoEntradaSchema, que une-se a cliente_ids como já faz produto_external_ids, devolvendo em clientes[] o id e o external_id; implementação da consulta em modules/core/api. Mesma versão @1, sem quebra.

## Pronto quando
Pronto quando: teste do contrato e da consulta com external_id existente e inexistente. Até lá o consumidor do Catálogo (api/consumidores-erp.ts, criarConsumidorClienteTabelaDoErp) manda o campo e, se a consulta recusar, o evento volta na outbox sem gravar nada.
