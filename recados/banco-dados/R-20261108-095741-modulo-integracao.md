---
id: R-20261108-095741-modulo-integracao
de: modulo-integracao
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T09:57:41-04:00
---
# 0047: cancelamento recusado pelo ERP em integracao.pedido_fila_erp (2 colunas, 2 CHECKs, 1 índice)

## Contexto
T-0114, aviso no monitor quando o ERP recusar o cancelamento (R-20261108-090349). O Conector passa a devolver o retorno `cancelamento_recusado` (com motivo) para um cancelamento que o Hub pediu (`pedido_fila_erp.cancelamento_estado` 'enviado'). O Hub grava a recusa na própria linha da fila e o monitor mostra um alerta. Código já escrito contra estes nomes (testes de banco só no CI).

## O que preciso
Migração 0047 (a 0046 é do portal), ADITIVA, em `integracao.pedido_fila_erp` (RLS e grants já existem; nenhuma tabela nova):
1. `cancelamento_recusado_em timestamptz null` — instante informado pelo ERP/Conector (`ocorrido_em`).
2. `cancelamento_recusa_motivo text null` — 1..300 caracteres, sem só espaços (CHECK igual ao do `cancelamento_motivo`, limite 300). Texto do ERP, mascarado pelo Conector; não entra em log.
3. Trocar o CHECK `pedido_fila_erp_cancelamento_estado_valido` para aceitar também `'recusado'` (estados: null | pendente | enviado | confirmado | recusado).
4. Trocar o CHECK `pedido_fila_erp_cancelamento_coerente` mantendo as duas regras de hoje e acrescentando: `cancelamento_estado = 'recusado'` => `cancelamento_recusado_em` e `cancelamento_recusa_motivo` preenchidos; estado diferente de 'recusado' => os dois nulos.
5. Índice parcial `pedido_fila_erp_cancelamento_recusado_ix (tenant_id, cancelamento_recusado_em desc)` where `cancelamento_estado = 'recusado' and deleted_at is null` (consulta do monitor: `where tenant_id=$1 and cancelamento_estado='recusado' and estado<>'cancelado' order by cancelamento_recusado_em desc limit 1000`; volume: poucas linhas, uma por pedido).
6. Sem backfill. Down: apaga as 2 colunas, volta os CHECKs (linhas 'recusado' viram 'enviado' antes, com `cancelamento_enviado_em` preenchido). Atualizar docs/banco/integracao.md (seção "Cancelamento para o ERP").
Também: `integracao.pedido_retorno.status` NÃO muda (a recusa não entra nessa trilha nem no evento retorno_erp@1).

## Pronto quando
0047 no main com up/down e o dicionário atualizado; me avisar por recado (cc gerente-projetos).
