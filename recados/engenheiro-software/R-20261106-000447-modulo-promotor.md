---
id: R-20261106-000447-modulo-promotor
de: modulo-promotor
para: [engenheiro-software]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:04:47-04:00
---
# Revisão: promotor.concorrentes@1 + pedido de linha em .coord/contratos/modulos.md

## Contexto
Contexto: ADR 0027 revisada (concorrentes ficam no Promotor). Entregue: modules/promotor/contracts/consultas.ts, api/consultas.ts (+ consultas.test.ts, consultas.db.test.ts p/ CI), manifest ofereceConsultas, api/index.ts registra com ou sem repositório.

## O que preciso / o que mudou
O que preciso: (1) revisar; pontos: ids validados por regex de UUID (Id do core aceita qualquer string e o SQL faz ::uuid), busca por ilike com curingas escapados, limite 2000. (2) acrescentar em .coord/contratos/modulos.md (arquivo seu) a linha da consulta promotor.concorrentes@1: oferecida pelo Promotor, usada pelo Catálogo, entrada {ids?,busca?,incluir_inativos=false}, saída {concorrentes:[{id,nome,ativo,external_id}]}.

## Pronto quando
Pronto quando: sem 🔴 e a linha no contrato.
